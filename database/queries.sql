-- ============================================================================
-- GONDAR SMARTCIVIC - ESSENTIAL POSTGIS SPATIAL QUERIES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- QUERY 1: Find All Pending Incidents Within a Specific Sub-City Boundary Polygon
-- Uses ST_Contains to match incident Point geometries against sub_city Polygon
-- ----------------------------------------------------------------------------
SELECT 
    i.ticket_code,
    i.title,
    i.category,
    i.urgency,
    i.status,
    i.channel_origin,
    i.caller_phone,
    i.landmark_description,
    ST_Y(i.location) AS latitude,
    ST_X(i.location) AS longitude,
    sc.name AS sub_city_name,
    sc.name_am AS sub_city_amharic,
    i.created_at
FROM incidents i
JOIN sub_cities sc ON ST_Contains(sc.boundary, i.location)
WHERE sc.name = 'Maraki' -- Parameterized: $1
  AND i.status IN ('SUBMITTED', 'VERIFIED', 'ASSIGNED', 'IN_PROGRESS')
ORDER BY 
    CASE i.urgency
        WHEN 'CRITICAL' THEN 1
        WHEN 'HIGH' THEN 2
        WHEN 'MEDIUM' THEN 3
        ELSE 4
    END,
    i.created_at ASC;

-- ----------------------------------------------------------------------------
-- QUERY 2: Proximity Query - Active Water Leaks Within 3 Kilometers of a Coordinate
-- Casts geometries to geography for accurate meter-based spatial calculation on WGS 84
-- Center Coordinate: Fasil Ghebbi (12.6035 N, 37.4620 E)
-- ----------------------------------------------------------------------------
SELECT 
    i.ticket_code,
    i.title,
    i.status,
    i.caller_phone,
    i.landmark_description,
    ROUND((ST_Distance(
        i.location::geography, 
        ST_SetSRID(ST_MakePoint(37.4620, 12.6035), 4326)::geography
    ))::numeric, 1) AS distance_meters,
    i.created_at
FROM incidents i
WHERE i.category = 'WATER_LEAK'
  AND i.status NOT IN ('RESOLVED', 'REJECTED')
  AND ST_DWithin(
        i.location::geography,
        ST_SetSRID(ST_MakePoint(37.4620, 12.6035), 4326)::geography,
        3000 -- Radius in meters
  )
ORDER BY distance_meters ASC;

-- ----------------------------------------------------------------------------
-- QUERY 3: Nearest Available Maintenance Crew Dispatch Recommendation
-- Finds the closest available crew to a newly reported incident for automated triage
-- ----------------------------------------------------------------------------
SELECT 
    mc.id AS crew_id,
    mc.crew_name,
    mc.lead_technician_name,
    mc.phone_number,
    ROUND((ST_Distance(
        mc.current_location::geography,
        i.location::geography
    ))::numeric, 1) AS distance_meters,
    ROUND(((ST_Distance(
        mc.current_location::geography,
        i.location::geography
    ) / 1000) / 25 * 60)::numeric, 0) AS estimated_eta_minutes -- Assumes 25 km/h urban speed
FROM incidents i, maintenance_crews mc
WHERE i.ticket_code = 'GDR-4821'
  AND mc.is_available = TRUE
  AND mc.department_id = i.department_id
ORDER BY distance_meters ASC
LIMIT 3;

-- ----------------------------------------------------------------------------
-- QUERY 4: Sub-City Municipal Incident Density & Resolution KPI
-- Calculates total incidents and resolution efficiency per sub-city for analytics
-- ----------------------------------------------------------------------------
SELECT 
    sc.name AS sub_city,
    sc.name_am AS sub_city_am,
    COUNT(i.id) AS total_incidents,
    COUNT(CASE WHEN i.status = 'RESOLVED' THEN 1 END) AS resolved_count,
    COUNT(CASE WHEN i.status IN ('SUBMITTED', 'ASSIGNED', 'IN_PROGRESS') THEN 1 END) AS active_count,
    ROUND(
        AVG(EXTRACT(EPOCH FROM (i.resolved_at - i.created_at)) / 3600)::numeric, 
        1
    ) AS avg_resolution_hours
FROM sub_cities sc
LEFT JOIN incidents i ON ST_Contains(sc.boundary, i.location)
GROUP BY sc.id, sc.name, sc.name_am
ORDER BY total_incidents DESC;

-- ----------------------------------------------------------------------------
-- QUERY 5: High-Priority Inundation & Rescue Triage (Kiremt Disaster Response)
-- Finds all Tier-1 residential flood emergencies with trapped individuals or
-- waist-deep water inside living quarters requiring immediate Fire & Red Cross dispatch
-- ----------------------------------------------------------------------------
SELECT 
    i.ticket_code,
    i.title,
    i.water_depth_level,
    i.inundation_type,
    i.trapped_persons_count,
    i.caller_phone,
    i.landmark_description,
    sc.name AS sub_city,
    sc.name_am AS sub_city_am,
    ST_Y(i.location) AS latitude,
    ST_X(i.location) AS longitude,
    i.created_at
FROM incidents i
JOIN sub_cities sc ON i.sub_city_id = sc.id
WHERE i.category = 'FLOOD_EMERGENCY'
  AND (i.is_life_threatening = TRUE 
       OR i.inundation_type = 'INSIDE_LIVING_QUARTERS' 
       OR i.trapped_persons_count > 0 
       OR i.water_depth_level IN ('KNEE_DEEP', 'WAIST_DEEP_OR_HIGHER'))
  AND i.status NOT IN ('RESOLVED', 'REJECTED')
ORDER BY 
    i.trapped_persons_count DESC,
    CASE i.water_depth_level
        WHEN 'WAIST_DEEP_OR_HIGHER' THEN 1
        WHEN 'KNEE_DEEP' THEN 2
        ELSE 3
    END,
    i.created_at ASC;

-- ----------------------------------------------------------------------------
-- QUERY 6: Geofenced Early Warning Broadcast Recipient Extraction
-- Extracts all unique citizen phone numbers residing or reporting within
-- an active river basin hazard perimeter (e.g., Angereb or Keha basin geofence)
-- ----------------------------------------------------------------------------
SELECT DISTINCT 
    i.caller_phone,
    sc.name AS sub_city
FROM incidents i
JOIN sub_cities sc ON i.sub_city_id = sc.id
WHERE i.caller_phone IS NOT NULL
  AND ST_Contains(
        -- Example Geofenced Polygon around Angereb/Keha lowland confluence
        ST_GeomFromText('POLYGON((37.450 12.595, 37.480 12.595, 37.480 12.630, 37.450 12.630, 37.450 12.595))', 4326),
        i.location
  );
