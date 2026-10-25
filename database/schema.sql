-- ============================================================================
-- GONDAR SMARTCIVIC (ETHIOCIVIC-HUB) - COMPLETE POSTGRESQL + POSTGIS SCHEMA
-- Municipality: Gondar City Administration, Amhara Region, Ethiopia
-- Coordinates: 12.6000° N, 37.4667° E | SRID: 4326 (WGS 84)
-- ============================================================================

-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ----------------------------------------------------------------------------
-- 1. ENUMERATIONS
-- ----------------------------------------------------------------------------
DROP TYPE IF EXISTS channel_origin_enum CASCADE;
CREATE TYPE channel_origin_enum AS ENUM (
    'APP',
    'WEB',
    'USSD',
    'SMS',
    'IVR'
);

DROP TYPE IF EXISTS incident_category_enum CASCADE;
CREATE TYPE incident_category_enum AS ENUM (
    'FLOOD_EMERGENCY',     -- High-Priority Flash Flood, River Inundation & Trapped Citizens
    'WATER_LEAK',
    'POWER_OUTAGE',
    'SOLID_WASTE',
    'ROAD_DAMAGE',
    'DRAINAGE_BLOCK',
    'STREETLIGHT_OUT',
    'OTHER'
);

DROP TYPE IF EXISTS water_depth_level_enum CASCADE;
CREATE TYPE water_depth_level_enum AS ENUM (
    'SURFACE_RUNOFF',           -- Light street runoff (< 10 cm)
    'ANKLE_DEEP',               -- Ankle-deep flood water (10-20 cm)
    'KNEE_DEEP',                -- Knee-deep flood water (20-50 cm)
    'WAIST_DEEP_OR_HIGHER'      -- Waist-deep / Life-threatening torrential surge (> 50 cm)
);

DROP TYPE IF EXISTS inundation_type_enum CASCADE;
CREATE TYPE inundation_type_enum AS ENUM (
    'ROAD_OVERFLOW',            -- Road and street blocked by river overflow
    'DRAINAGE_BLOCKAGE',        -- Storm drain canal burst/overflowing
    'COMPOUND_FLOODED',         -- Residential courtyard/compound submerged
    'INSIDE_LIVING_QUARTERS'    -- Floodwaters inside home / residents trapped (ጎርፍ ወደ ቤት መግባት)
);

DROP TYPE IF EXISTS urgency_level_enum CASCADE;
CREATE TYPE urgency_level_enum AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
);

DROP TYPE IF EXISTS incident_status_enum CASCADE;
CREATE TYPE incident_status_enum AS ENUM (
    'SUBMITTED',
    'VERIFIED',
    'ASSIGNED',
    'IN_PROGRESS',
    'RESOLVED',
    'REJECTED',
    'DUPLICATE'
);

DROP TYPE IF EXISTS user_role_enum CASCADE;
CREATE TYPE user_role_enum AS ENUM (
    'CITIZEN',
    'DISPATCHER',
    'DEPARTMENT_HEAD',
    'FIELD_CREW_LEAD',
    'SUPER_ADMIN'
);

-- ----------------------------------------------------------------------------
-- 2. ADMINISTRATIVE BOUNDARIES: SUB-CITIES & KEBELES
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS kebeles CASCADE;
DROP TABLE IF EXISTS sub_cities CASCADE;

CREATE TABLE sub_cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    name_am VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    boundary GEOMETRY(Polygon, 4326) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sub_cities_boundary ON sub_cities USING GIST (boundary);

CREATE TABLE kebeles (
    id SERIAL PRIMARY KEY,
    sub_city_id INTEGER NOT NULL REFERENCES sub_cities(id) ON DELETE CASCADE,
    kebele_number VARCHAR(50) NOT NULL,
    boundary GEOMETRY(Polygon, 4326) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_subcity_kebele UNIQUE (sub_city_id, kebele_number)
);

CREATE INDEX idx_kebeles_boundary ON kebeles USING GIST (boundary);

-- ----------------------------------------------------------------------------
-- 3. MUNICIPAL DEPARTMENTS & REPAIR CREWS
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS maintenance_crews CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_en VARCHAR(200) NOT NULL,
    name_am VARCHAR(200) NOT NULL,
    contact_phone VARCHAR(50),
    contact_email VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE maintenance_crews (
    id SERIAL PRIMARY KEY,
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    sub_city_id INTEGER REFERENCES sub_cities(id) ON DELETE SET NULL,
    crew_name VARCHAR(150) NOT NULL,
    lead_technician_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    current_location GEOMETRY(Point, 4326),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_maintenance_crews_location ON maintenance_crews USING GIST (current_location);

-- ----------------------------------------------------------------------------
-- 4. SYSTEM USERS & DISPATCHERS
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(200) NOT NULL,
    phone_number VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(150) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role_enum DEFAULT 'CITIZEN',
    department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
    crew_id INTEGER REFERENCES maintenance_crews(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 5. INCIDENTS (CORE SPATIAL ENTITY)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS incidents CASCADE;

CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_code VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category incident_category_enum NOT NULL,
    urgency urgency_level_enum DEFAULT 'MEDIUM',
    status incident_status_enum DEFAULT 'SUBMITTED',
    channel_origin channel_origin_enum NOT NULL,
    
    -- Citizen Contact & Privacy
    caller_phone VARCHAR(50),
    is_anonymous BOOLEAN DEFAULT FALSE,
    citizen_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- PostGIS Geolocation
    location GEOMETRY(Point, 4326) NOT NULL,
    gps_accuracy_meters NUMERIC(6, 2),
    landmark_description TEXT,
    
    -- Administrative Location
    sub_city_id INTEGER REFERENCES sub_cities(id) ON DELETE SET NULL,
    kebele_id INTEGER REFERENCES kebeles(id) ON DELETE SET NULL,
    
    -- Flood Disaster & Inundation Module Extensions
    is_life_threatening BOOLEAN DEFAULT FALSE,
    water_depth_level water_depth_level_enum,
    inundation_type inundation_type_enum,
    trapped_persons_count INTEGER DEFAULT 0,
    
    -- Municipal Allocation
    department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
    assigned_crew_id INTEGER REFERENCES maintenance_crews(id) ON DELETE SET NULL,
    assigned_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_incidents_location ON incidents USING GIST (location);
CREATE INDEX idx_incidents_ticket_code ON incidents(ticket_code);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_category ON incidents(category);
CREATE INDEX idx_incidents_channel ON incidents(channel_origin);
CREATE INDEX idx_incidents_flood_life_threat ON incidents(is_life_threatening) WHERE is_life_threatening = TRUE;
CREATE INDEX idx_incidents_created_at ON incidents(created_at DESC);

-- ----------------------------------------------------------------------------
-- 5B. EMERGENCY MASS BROADCASTS & EARLY WARNING (GEOFENCED ALERTS)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS emergency_broadcasts CASCADE;

CREATE TABLE emergency_broadcasts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    message_am TEXT NOT NULL,
    message_en TEXT NOT NULL,
    sub_city_id INTEGER REFERENCES sub_cities(id) ON DELETE SET NULL,
    river_basin VARCHAR(100), -- 'Angereb River Basin', 'Keha River Catchment', 'General Lowlands'
    geofence_perimeter GEOMETRY(Polygon, 4326),
    recipient_count INTEGER DEFAULT 0,
    severity VARCHAR(50) DEFAULT 'CRITICAL',
    dispatched_by VARCHAR(100) DEFAULT 'Gondar Municipal Disaster Dispatcher',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_emergency_broadcasts_geofence ON emergency_broadcasts USING GIST (geofence_perimeter);

-- ----------------------------------------------------------------------------
-- 6. INCIDENT MEDIA (PHOTOS & IVR RECORDINGS)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS incident_media CASCADE;

CREATE TABLE incident_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    media_type VARCHAR(50) NOT NULL, -- 'PHOTO_BEFORE', 'PHOTO_AFTER', 'IVR_VOICE_NOTE'
    file_path TEXT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size_bytes INTEGER,
    duration_seconds INTEGER,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_incident_media_incident_id ON incident_media(incident_id);

-- ----------------------------------------------------------------------------
-- 7. AUDIT TRAIL LOGS
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS ticket_audit_logs CASCADE;

CREATE TABLE ticket_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    previous_status incident_status_enum,
    new_status incident_status_enum NOT NULL,
    performed_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_incident ON ticket_audit_logs(incident_id);

-- ----------------------------------------------------------------------------
-- 8. AUTOMATIC REVERSE-GEOCODING TRIGGER
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION trg_auto_tag_incident_boundaries()
RETURNS TRIGGER AS $$
BEGIN
    -- Detect sub-city from polygon boundary
    SELECT id INTO NEW.sub_city_id
    FROM sub_cities
    WHERE ST_Contains(boundary, NEW.location)
    LIMIT 1;

    -- Detect kebele from polygon boundary
    SELECT id INTO NEW.kebele_id
    FROM kebeles
    WHERE ST_Contains(boundary, NEW.location)
    LIMIT 1;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_incident_boundaries
BEFORE INSERT OR UPDATE OF location ON incidents
FOR EACH ROW
EXECUTE FUNCTION trg_auto_tag_incident_boundaries();

-- ----------------------------------------------------------------------------
-- 9. GONDAR MUNICIPAL SEED DATA
-- ----------------------------------------------------------------------------

-- Departments & Disaster Response Agencies
INSERT INTO departments (code, name_en, name_am, contact_phone, contact_email) VALUES
('GWSA', 'Gondar Water & Sewerage Authority', 'የጎንደር ውሀና ፍሳሽ አገልግሎት', '+251581110245', 'info@gwsa.gov.et'),
('EEU', 'Ethiopian Electric Utility - Gondar District', 'የኢትዮጵያ ኤሌክትሪክ አገልግሎት - የጎንደር ዲስትሪክት', '+251581114322', 'gondar@eeu.gov.et'),
('SANITATION', 'Gondar Sanitation & Beautification Agency', 'የጎንደር ከተማ ፅዳትና ውበት አስተዳደር', '+251581116789', 'clean@gondar.gov.et'),
('ROADS', 'Gondar Municipal Roads Authority', 'የጎንደር መንገዶች ባለስልጣን', '+251581119876', 'roads@gondar.gov.et'),
('DISASTER_FIRE', 'Gondar Fire & Disaster Prevention Agency', 'የጎንደር ከተማ እሳትና አደጋ ስጋት አመራር', '+251581119911', 'disaster@gondar.gov.et'),
('RED_CROSS', 'Ethiopian Red Cross Society - Gondar Branch', 'የኢትዮጵያ ቀይ መስቀል ማህበር - የጎንደር ቅርንጫፍ', '+251581113344', 'redcross.gondar@redcross.org.et'),
('MUNICIPALITY', 'Gondar Central Municipal Administration', 'የጎንደር ማዘጋጃ ቤት ዋና አስተዳደር', '+251581112233', 'admin@gondar.gov.et');

-- Sub-Cities with Polygon Geometries in Gondar Urban Center (12 Sub-Cities)
INSERT INTO sub_cities (name, name_am, code, boundary) VALUES
('Fasil', 'ፋሲል', 'SC-FASIL', ST_GeomFromText('POLYGON((37.455 12.600, 37.470 12.600, 37.470 12.615, 37.455 12.615, 37.455 12.600))', 4326)),
('Maraki', 'ማራኪ', 'SC-MARAKI', ST_GeomFromText('POLYGON((37.465 12.615, 37.485 12.615, 37.485 12.635, 37.465 12.635, 37.465 12.615))', 4326)),
('Arada', 'አራዳ', 'SC-ARADA', ST_GeomFromText('POLYGON((37.445 12.595, 37.460 12.595, 37.460 12.610, 37.445 12.610, 37.445 12.595))', 4326)),
('Azezo-Teda', 'አዘዞ ቴዳ', 'SC-AZEZO', ST_GeomFromText('POLYGON((37.410 12.530, 37.450 12.530, 37.450 12.580, 37.410 12.580, 37.410 12.530))', 4326)),
('Zobel', 'ዞብል', 'SC-ZOBEL', ST_GeomFromText('POLYGON((37.470 12.590, 37.490 12.590, 37.490 12.610, 37.470 12.610, 37.470 12.590))', 4326)),
('Jantekel', 'ጃንተከል', 'SC-JANTEKEL', ST_GeomFromText('POLYGON((37.430 12.610, 37.455 12.610, 37.455 12.630, 37.430 12.630, 37.430 12.610))', 4326)),
('Bilajig', 'ብላጅግ', 'SC-BILAJIG', ST_GeomFromText('POLYGON((37.475 12.625, 37.495 12.625, 37.495 12.645, 37.475 12.645, 37.475 12.625))', 4326)),
('Gubaie', 'ጉባኤ', 'SC-GUBAIE', ST_GeomFromText('POLYGON((37.445 12.610, 37.465 12.610, 37.465 12.625, 37.445 12.625, 37.445 12.610))', 4326)),
('Adebabay-Piassa', 'አደባባይ ፒያሳ', 'SC-PIASSA', ST_GeomFromText('POLYGON((37.460 12.605, 37.475 12.605, 37.475 12.618, 37.460 12.618, 37.460 12.605))', 4326)),
('Selam', 'ሰላም', 'SC-SELAM', ST_GeomFromText('POLYGON((37.430 12.585, 37.450 12.585, 37.450 12.605, 37.430 12.605, 37.430 12.585))', 4326)),
('Mintiwab', 'ምንትዋብ', 'SC-MINTIWAB', ST_GeomFromText('POLYGON((37.420 12.620, 37.440 12.620, 37.440 12.640, 37.420 12.640, 37.420 12.620))', 4326)),
('Abraj', 'አብራጅ', 'SC-ABRAJ', ST_GeomFromText('POLYGON((37.440 12.570, 37.460 12.570, 37.460 12.590, 37.440 12.590, 37.440 12.570))', 4326));

-- Maintenance Crews
INSERT INTO maintenance_crews (department_id, sub_city_id, crew_name, lead_technician_name, phone_number, current_location, is_available) VALUES
(1, 1, 'GWSA Rapid Pipe Unit #1', 'Bekele Alemu', '+251918012345', ST_SetSRID(ST_MakePoint(37.462, 12.605), 4326), TRUE),
(1, 2, 'GWSA Maraki Unit #2', 'Kassahun Worku', '+251918023456', ST_SetSRID(ST_MakePoint(37.475, 12.625), 4326), TRUE),
(2, 3, 'EEU Arada Transformer Crew', 'Mulugeta Tadesse', '+251918034567', ST_SetSRID(ST_MakePoint(37.452, 12.602), 4326), TRUE),
(3, 4, 'Sanitation Azezo Truck Crew #4', 'Yohannes Getachew', '+251918045678', ST_SetSRID(ST_MakePoint(37.430, 12.555), 4326), TRUE),
(4, 5, 'Roads Zobel Paving Crew', 'Daniel Mesfin', '+251918056789', ST_SetSRID(ST_MakePoint(37.480, 12.595), 4326), TRUE);

-- Sample Incidents across Channels
INSERT INTO incidents (ticket_code, title, description, category, urgency, status, channel_origin, caller_phone, location, landmark_description, sub_city_id, department_id) VALUES
('GDR-4821', 'High-Pressure Water Main Burst', 'Flooding road near Maraki Campus main gate. Clean water wastage.', 'WATER_LEAK', 'HIGH', 'IN_PROGRESS', 'WEB', '+251918112233', ST_SetSRID(ST_MakePoint(37.4725, 12.6240), 4326), 'Maraki Campus Main Gate', 2, 1),
('GDR-3190', 'Fallen Electric Line Sparking', 'Low hanging electrical wire sparking during wind.', 'POWER_OUTAGE', 'CRITICAL', 'ASSIGNED', 'USSD', '+251921334455', ST_SetSRID(ST_MakePoint(37.4580, 12.6030), 4326), 'Piazza behind Old Post Office', 1, 2),
('GDR-7742', 'Illegal Solid Waste Dumping', 'Large pile of decomposing garbage blocking storm drain.', 'SOLID_WASTE', 'MEDIUM', 'SUBMITTED', 'SMS', '+251930556677', ST_SetSRID(ST_MakePoint(37.4250, 12.5520), 4326), 'Azezo Market Junction', 4, 3),
('GDR-9201', 'Collapsed Drainage Slab', 'Deep trench exposed on pedestrian walkway. Hazard to schoolchildren.', 'ROAD_DAMAGE', 'HIGH', 'SUBMITTED', 'IVR', '+251944778899', ST_SetSRID(ST_MakePoint(37.4510, 12.6080), 4326), 'Jantekel Medhanialem Church Gate', 6, 4);

-- Sample Audit Trail
INSERT INTO ticket_audit_logs (incident_id, previous_status, new_status, action_note)
SELECT id, 'SUBMITTED', 'IN_PROGRESS', 'Dispatched GWSA Rapid Pipe Unit #1 to Maraki'
FROM incidents WHERE ticket_code = 'GDR-4821';
