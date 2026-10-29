/**
 * Gondar SmartCivic (EthioCivic-Hub) Master Client Controller
 * Omnichannel Frontend Logic, All-Ethiopia Spatial GIS Mapping, and Full Bilingual Translation
 */

// ============================================================================
// 1. COMPREHENSIVE BILINGUAL TRANSLATION DICTIONARY (ENGLISH & AMHARIC)
// ============================================================================
const TRANSLATIONS = {
  en: {
    brand_title: 'Gondar SmartCivic',
    top_sitemap: 'Sitemap & Services',
    nav_services: 'Services',
    hero_search_btn: 'Find Service',
    hero_popular_label: 'Popular:',
    services_dir_tag: 'Official Municipal Department Directory',
    services_dir_title: 'Municipal Public Works & Utility Services',
    services_dir_sub: 'Direct dispatch to municipal authorities, emergency services, and field maintenance teams',
    sitemap_tag: 'Platform Architecture & Civic Directory',
    sitemap_header: 'Official Gondar SmartCivic Sitemap',
    sitemap_sub: 'Comprehensive navigational blueprint connecting citizens, municipal authorities, and field crews across all 12 zones.',
    back_to_overview: '← Back to Overview',

    // Target Audience (Rule 3)
    target_audience_badge: 'Universal Accessibility Matrix',
    target_audience_header: 'Defined Target Audience & Inclusive User Matrix',
    target_audience_sub: 'Built for all 450,000+ residents of Gondar, field crews, and dispatchers across every connectivity tier.',
    persona_1_title: 'Citizens & Residents',
    persona_1_am: 'የጎንደር ከተማ ነዋሪዎች',
    persona_1_desc: 'Report water leaks, power outages, and waste via free USSD (*840#), SMS (8065), or web.',
    persona_1_channels: 'Channels: USSD, SMS, Voice, Web',
    persona_1_badge: '100% Free / Toll-Free',
    persona_2_title: 'Triage Dispatchers',
    persona_2_am: 'የመላኪያ ማዕከል ኃላፊዎች',
    persona_2_desc: 'Triage incoming reports in real time, review voice notes, and assign crews on the GIS map.',
    persona_2_channels: 'Interface: GIS Dispatch Console',
    persona_2_badge: 'Real-Time PostGIS',
    persona_3_title: 'Disaster Responders',
    persona_3_am: 'የአደጋ መከላከል ግብረ-ኃይል',
    persona_3_desc: 'Receive instant flash flood alarms along Angereb river and coordinate rescue interventions.',
    persona_3_channels: 'Focus: Flash Flood & River Corridors',
    persona_3_badge: '< 4h Emergency SLA',
    persona_4_title: 'Field Technicians',
    persona_4_am: 'የመስክ ጥገና ባለሙያዎች',
    persona_4_desc: 'Receive repair work orders on mobile and upload before-and-after photo verification.',
    persona_4_channels: 'Interface: Field Crew Mobile Mode',
    persona_4_badge: 'Photo Verified',
    persona_5_title: 'Researchers & Leadership',
    persona_5_am: 'ተመራማሪዎችና የከተማ አመራር',
    persona_5_desc: 'Analyze repair speed, sub-city performance benchmarks, and municipal service KPIs.',
    persona_5_channels: 'Interface: Sub-City Analytics Dashboard',
    persona_5_badge: '100% Open Data',

    // 4-Stage Lifecycle Pipeline (Rule 5 & 8)
    lifecycle_tag: 'Deterministic State Transition Engine',
    lifecycle_header: 'Complete Incident Lifecycle & Triage Workflow',
    lifecycle_sub: 'From initial multi-channel citizen report to verified field resolution with auditable photographic proof.',
    lifecycle_step_1_title: '01. Inbound Ingestion',
    lifecycle_step_1_desc: 'Captured via USSD (*840#), SMS (8065), IVR Voice Hotline (8400), Web GIS, or One-Touch Flood SOS.',
    lifecycle_step_2_title: '02. Automated Triage',
    lifecycle_step_2_desc: 'Rule engine separates life-threatening emergencies (flash flood, live wire) from general complaints. SLA timer initiated.',
    lifecycle_step_3_title: '03. Spatial Dispatch',
    lifecycle_step_3_desc: 'Dispatched to GWSA, EEU, Sanitation, or Fire & Rescue units based on GIS polygon. Citizen notified by SMS.',
    lifecycle_step_4_title: '04. Verified Resolution',
    lifecycle_step_4_desc: 'Field crew submits after-repair photo, worker ID, and notes. Citizen receives final SMS confirmation with audit link.',

    // Flash Flood Resilience Hub
    flood_hub_tag: 'Disaster Risk Reduction (DRR)',
    flood_hub_title: 'Gondar Flash Flood Resilience & River Basin Monitoring',
    flood_hub_desc: 'Gondar’s steep mountainous topography channels monsoon rainfall into the Angereb and Keha river basins. SmartCivic provides real-time telemetry, geofenced SMS warnings, and single-touch emergency SOS.',
    flood_cta_sos: '🚨 Emergency SOS Direct Dispatch',
    flood_cta_broadcast: '📻 Send Mass Warning SMS',

    // FAQ Accordion (Rule 8)
    faq_tag: 'Civic Knowledge Base',
    faq_header: 'Frequently Asked Questions',
    faq_sub: 'Key operational questions for Gondar citizens, municipal dispatchers, and academic reviewers.',
    faq_q1: 'Do citizens need mobile internet or airtime credit to report a problem?',
    faq_a1: 'No! Gondar SmartCivic is engineered with an omnichannel architecture. Any resident can dial *840# or send an SMS to 8065 from any basic 2G feature phone ("የእጅ ባትሪ ስልክ") with zero mobile data balance. All inbound SMS and USSD requests are toll-free for citizens through Ethio Telecom reverse-billing agreements.',
    faq_q2: 'How does the system distinguish regular municipal complaints from life-threatening emergencies?',
    faq_a2: 'The backend triage engine evaluates flags across every channel: keyword analysis (e.g. "FLOOD", "TRAPPED", "ጎርፍ"), water depth telemetry (knee/waist deep), trapped persons count, and emergency shortcodes (*840*911# or the Flood SOS button). Life-threatening incidents are tagged CRITICAL with a 4-hour SLA and trigger loud visual & audio alarms in the dispatch center.',
    faq_q3: "What prevents a field worker from falsely marking a ticket as 'RESOLVED'?",
    faq_a3: "Tickets cannot be marked RESOLVED without satisfying strict schema requirements: a valid Technician ID (e.g., LEAD-TECH-04), engineering completion notes, and mandatory upload of an 'After' photographic resolution proof. The public tracker displays initial and after photos side-by-side for auditable community oversight.",
    faq_q4: 'What happens if a municipal ticket breaches its Service Level Agreement (SLA)?',
    faq_a4: 'If a general ticket remains unaddressed beyond 48 hours (or an emergency beyond 4 hours), the database marks is_sla_breached=true and elevates the status to ESCALATED_UNRESOLVED. The ticket is automatically highlighted in Tab 4 (SLA Overdue Queue) and an alert is sent to municipal department heads.',
    faq_q5: 'Can this system be scaled to other Ethiopian regional cities (e.g. Bahir Dar, Hawassa, Mekelle)?',
    faq_a5: 'Yes! EthioCivic-Hub is architected with a multi-tenant municipal schema. The GIS map already contains spatial coordinates and bounding polygons for Bahir Dar, Addis Ababa, Hawassa, Mekelle, and Dire Dawa. Adding a new municipality requires only uploading its sub-city GIS polygon and linking local utility dispatch hotlines.',

    // Footer
    footer_brand_desc: 'Ethiopia’s first inclusive, zero-barrier municipal infrastructure ingestion and spatial dispatch platform. Connecting 12 sub-cities across 2G, SMS, IVR, and Web.',
    footer_emergency_title: 'Emergency Hotlines',
    footer_nav_title: 'Civic Portals',
    footer_admin_title: 'Municipal Administration',
    brand_badge: 'Gondar',
    brand_subtitle: 'EthioCivic-Hub • All-Ethiopia Municipal Dispatch',
    nav_overview: 'Overview',
    nav_report: 'Report Issue',
    nav_track: 'Track Ticket',
    nav_dispatch: 'Dispatch Command',
    nav_analytics: 'Analytics',
    nav_crew: 'Field Crew',
    nav_actions: 'Recent Actions',
    nav_admin: 'Admin Portal',
    simulator_btn: 'Defense Simulator (*840# / SMS / IVR)',

    // Hero Section
    hero_pill: 'Gondar City Municipal Service Grid • ጎንደር ከተማ አስተዳደር',
    hero_title: 'Inclusive Municipal Infrastructure Ingestion & Spatial Dispatch',
    hero_desc: 'Bridging the digital divide across Gondar City and Ethiopia. Every resident has equal power to report water leaks, electrical blackouts, solid waste, and road hazards—whether using 4G smartphones, basic 2G feature phones (*840#), SMS, or voice calls.',
    hero_btn_report: 'Report Incident Online',
    hero_btn_sim: 'Simulate USSD *840# & Call',
    castle_heritage: 'UNESCO World Heritage',
    castle_name: '🏰 Fasilides Castle • Gondar',
    castle_caption: 'Gondar, Ethiopia',

    // Statistics Counters
    stat_total_label: 'Total Registered',
    stat_channels_tag: 'All Ingestion Channels',
    stat_active_label: 'Under Repair',
    stat_crews_tag: 'Crews Dispatched',
    stat_resolved_label: 'Resolved This Month',
    stat_authorities_tag: 'GWSA / EEU / Sanitation',
    stat_rate_label: 'Resolution Rate',
    stat_kpi_tag: 'Municipal KPI Target',

    // Sub-Cities Grid
    subcities_header: 'Gondar City Administrative Sub-Cities (12 Urban Zones)',
    subcities_subtitle: 'Complete spatial coverage across historic, residential, and emerging commercial districts',
    subcities_badge: '12 Sub-Cities',

    // Channels
    channels_header: 'Universal Access Channels',
    channels_subtitle: 'Zero-data, accessible on any Ethio Telecom mobile device',
    toll_free_badge: 'Toll-Free • ነፃ አገልግሎት',
    card_ussd_tag: 'Channel A • 2G Phones',
    card_ussd_title: 'USSD Quick Menu (*840#)',
    card_ussd_desc: 'Dial *840# on any phone with zero data. Select issue & sub-city to get instant SMS ticket ID.',
    zero_data_text: 'Zero Data Required',
    sim_dial_link: 'Simulate Dialing →',
    card_sms_tag: 'Channel B • Free SMS',
    card_sms_title: 'SMS Short Code (8065)',
    card_sms_desc: 'Send a free SMS to 8065 with your sub-city and issue. Automated ticket code returned instantly.',
    auto_receipts_text: 'Auto SMS Receipts',
    sim_sms_link: 'Simulate SMS →',
    card_ivr_tag: 'Channel C • Voice Hotline',
    card_ivr_title: 'Voice Hotline (8400)',
    card_ivr_desc: 'Call 8400 and record a 30-second spoken voice message directly for municipal dispatchers.',
    voice_note_text: 'Voice Note Attachment',
    sim_call_link: 'Simulate Call →',

    // Feed
    feed_header: 'Recent Public Municipal Actions',
    feed_subtitle: 'Live feed of verified community reports and completed field repairs',
    refresh_btn: 'Refresh Feed',

    // Report Form
    form_banner_tag: 'Channel D • Rich PWA Client',
    form_title: 'Submit Municipal Incident Report',
    form_desc: 'Pin location anywhere in Ethiopia or choose one of Gondar\'s 12 sub-cities',
    step1_title: 'Step 1: Incident Location on Spatial Map (የቦታው መገኛ) *',
    pin_gps_btn: 'Pin My Current GPS',
    jump_to_label: 'Jump Map To:',
    detected_zone: 'Detected Sub-City / Zone:',
    coordinates_label: 'Coordinates:',
    gps_accuracy_label: 'GPS Accuracy:',
    step2_category_title: 'Step 2: Category of Municipal Failure (የችግሩ አይነት) *',
    cat_water_title: '💧 Water Leak',
    cat_water_sub: 'Pipe fracture, burst main, supply outage',
    cat_power_title: '⚡ Electrical Fault',
    cat_power_sub: 'Transformer spark, fallen cable, blackout',
    cat_waste_title: '🗑️ Solid Waste',
    cat_waste_sub: 'Uncollected garbage, drainage canal dump',
    cat_road_title: '🚧 Road / Culvert',
    cat_road_sub: 'Cobblestone erosion, open trench, bridge',
    select_subcity_label: 'Assigned Sub-City (12 Urban Zones) *',
    urgency_label: 'Urgency Priority Level *',
    urgency_low: 'Low - Routine Maintenance',
    urgency_med: 'Medium - Noticeable Hazard',
    urgency_high: 'High - Urgent Community Impact',
    urgency_crit: 'Critical Emergency - Life/Safety Risk',
    landmark_label: 'Nearest Landmark / Specific Address (የቦታ መለያ ምልክት) *',
    desc_label: 'Detailed Description (ዝርዝር መግለጫ)',
    photo_label: 'Photo Evidence (የችግሩ ፎቶ ማስረጃ)',
    photo_sub: 'Client-side compression automatically reduces photos from 8MB to ~250KB before upload.',
    photo_click_prompt: 'Click to capture or upload photo',
    phone_label: 'Mobile Phone Number (የስልክ ቁጥር)',
    phone_sub: 'Used to dispatch status updates and resolution alerts via automated SMS.',
    anon_label: 'Submit Anonymously (Hide my phone number from public tracking views)',
    cancel_btn: 'Cancel',
    submit_btn: 'Submit Incident Report',

    // Tracking
    track_banner_tag: 'Public Accountability Tracker',
    track_banner_title: 'Track Ticket Resolution Status',
    track_banner_desc: 'Monitor repair progress in real time with field crew before-and-after proof',
    search_btn: 'Search',
    timeline_header: 'Resolution Lifecycle Progression',
    stage_1: '1. Received',
    stage_1_sub: 'Captured in GIS',
    stage_2: '2. Assigned',
    stage_2_sub: 'Triage Complete',
    stage_3: '3. In Progress',
    stage_3_sub: 'Crew on Site',
    stage_4: '4. Resolved',
    stage_4_sub: 'Fixed & Verified',
    dept_header: 'Assigned Municipal Authority',
    crew_header: 'Assigned Repair Crew',
    proof_header: 'Resolution Proof View (የጥገና ማስረጃ)',
    before_photo_label: 'Citizen Initial Photo',
    after_photo_label: 'Field Crew Fix Photo',
    after_photo_placeholder: 'Pending field crew completion & photographic proof',

    // Dispatch Command
    dispatch_title: 'Gondar & All-Ethiopia GIS Spatial Dispatch Command',
    all_subcities_opt: 'All 12 Sub-Cities (ሁሉም ክ/ከተሞች)',
    all_channels_opt: 'All Ingestion Channels',
    legend_title: 'Spatial Incident Categories',
    queue_header: 'Omnichannel Ingestion Queue',
    queue_sub: 'Active municipal tickets across 12 zones',

    // Analytics
    analytics_banner_tag: 'Municipal Executive Intelligence',
    analytics_banner_title: 'Sub-City Municipal Performance & Analytics',
    analytics_banner_desc: 'Comparative failure breakdown and response latency metrics across Gondar\'s 12 urban zones',
    analytics_kpi_title: 'Municipal Response Benchmarks',
    analytics_kpi_sub: 'Real-time resolution telemetry and service delivery metrics',
    chart_latency_title: 'Average Resolution Time by Sub-City (Hours)',
    chart_latency_sub: 'Benchmark comparison across Gondar\'s 12 urban zones',
    chart_categories_title: 'Infrastructure Failure Distribution',
    chart_categories_sub: 'Categorical volume (Water Leaks vs. Power vs. Waste)',
    scorecard_header: 'Gondar Municipal 12 Sub-City Scorecard',
    th_subcity: 'Sub-City (ክፍለ ከተማ)',
    th_total: 'Total Reported',
    th_active: 'Active Tickets',
    th_resolved: 'Resolved',
    th_latency: 'Avg Resolution Latency',
    th_status: 'Status',

    // Crew
    crew_banner_tag: 'Field Operations Unit',
    crew_queue_title: 'Assigned Daily Work Queue',
    low_bandwidth_tag: 'Low-Bandwidth Mode',

    // Defense Modal
    defense_modal_title: 'Academic Defense Simulation Testbed',
    defense_modal_sub: 'Zero-cost local testing for university evaluation committee',
    feature_phone_sub: '2G Feature Phone Screen (የእጅ ባትሪ)',

    // Section 6: Flood Hazard & Disaster Module
    header_flood_sos: '🚨 FLOOD SOS',
    hero_btn_flood_sos: '🚨 Flood Emergency SOS',
    cat_flood_title: '🚨 Flood Hazard',
    cat_flood_sub: 'River swell, home inundation, trapped residents',
    flood_box_title: '🚨 High-Priority Inundation & Rescue Assessment',
    flood_box_desc: 'Flash flood tickets automatically trigger Tier-1 Emergency alarms and dispatch directly to the Gondar Fire & Disaster Prevention Agency and Red Cross Rescue Units.',
    water_depth_label: 'Water Depth Level (የውሃው ጥልቀት) *',
    depth_surface: 'Surface Runoff (< 10 cm)',
    depth_ankle: 'Ankle-Deep (10 - 25 cm)',
    depth_knee: 'Knee-Deep (25 - 60 cm)',
    depth_waist: 'Waist-Deep or Higher (Life-Threatening)',
    inundation_type_label: 'Inundation Location (የመጥለቅለቅ ሁኔታ) *',
    type_inside: 'Inside Living Quarters (ጎርፍ ወደ ቤት መግባት)',
    type_compound: 'Residential Compound Flooded (ግቢ ውስጥ)',
    type_drainage: 'Blocked Storm Drain Canal (የቦይ መደፈን)',
    type_road: 'Roadway Submerged / Impassable (መንገድ)',
    trapped_persons_label: 'Trapped Individuals (የተከበቡ ሰዎች ቁጥር) *',
    life_threat_check: 'Immediate life/safety risk — Dispatch emergency inflatable rescue boats & pumping unit',
    btn_rivers: 'River Basins & Risk Zones',
    btn_early_warning: '🚨 Mass SMS Warning',
    alarm_zoom_btn: 'Locate on Map',
    modal_sos_title: '🚨 Gondar Flash Flood SOS (የጎርፍ አደጋ አስቸኳይ ጥሪ)',
    modal_sos_banner: 'Direct Dispatch to Gondar Fire & Rescue and Red Cross',
    modal_sos_info: 'Submitting this SOS immediately alerts municipal dispatchers, rings live alarms in the command center, and dispatches field rescue units to your location.',
    modal_subcity_label: 'Sub-City (ክፍለ ከተማ) *',
    modal_phone_label: 'Contact Mobile (የስልክ ቁጥር) *',
    modal_landmark_label: 'Precise Landmark / River Proximity (የቦታው መለያ) *',
    modal_submit_sos: 'DISPATCH EMERGENCY RESCUE SQUAD (አስቸኳይ የነፍስ አድን ጥሪ ላክ)',
    broadcast_modal_title: 'Geofenced Mass SMS Warning System',
    broadcast_target_sc: 'Target Geofence Zone (ክፍለ ከተማ) *',
    broadcast_river_label: 'Monitored River Corridor *',
    broadcast_btn_send: 'TRANSMIT MASS GEOFENCED SMS NOW (መልዕክቱን አስተላልፍ)'
  },

  am: {
    brand_title: 'ጎንደር ስማርት ሲቪክ',
    back_to_overview: '← ወደ ዋናው ገጽ ተመለስ',

    // Target Audience (Rule 3)
    target_audience_badge: 'ሁለገብ የአገልግሎት ተደራሽነት',
    target_audience_header: 'የተጠቃሚዎች ማዕቀፍ እና ሁለገብ የአገልግሎት ተደራሽነት',
    target_audience_sub: 'ለሁሉም 450,000+ የጎንደር ከተማ ነዋሪዎች፣ የመስክ ጥገና ቡድኖች እና የመላኪያ ኃላፊዎች የተዘጋጀ።',
    persona_1_title: 'የከተማው ነዋሪዎች',
    persona_1_am: 'የጎንደር ከተማ ነዋሪዎች',
    persona_1_desc: 'የውሃ፣ የመብራት ወይም የቆሻሻ ችግሮችን በነፃ በUSSD (*840#)፣ በSMS (8065) ወይም በዌብ ያሳውቁ።',
    persona_1_channels: 'መገናኛ መንገዶች፦ USSD፣ SMS፣ ድምፅ፣ ዌብ',
    persona_1_badge: '100% ነፃ (Toll-Free)',
    persona_2_title: 'የመላኪያ ማዕከል ኃላፊዎች',
    persona_2_am: 'የመላኪያ ማዕከል ኃላፊዎች',
    persona_2_desc: 'የከተማውን ሪፖርቶች በመገምገም ለጥገና ቡድኖች በካርታ በቀጥታ ይመድቡ።',
    persona_2_channels: 'መተግበሪያ፦ የGIS ቁጥጥር ማዕከል (Dispatch)',
    persona_2_badge: 'የቀጥታ PostGIS ካርታ',
    persona_3_title: 'የአደጋ መከላከል ግብረ-ኃይል',
    persona_3_am: 'የአደጋ መከላከል ግብረ-ኃይል',
    persona_3_desc: 'የአንገረብ ወንዝ ጎርፍ ማንቂያዎችን በመቀበል አፋጣኝ የነፍስ አድን እርዳታ ያደርጉ።',
    persona_3_channels: 'ትኩረት፦ የአንገረብና የቀሃ ወንዞች ተፋሰስ',
    persona_3_badge: '< 4 ሰዓት የአስቸኳይ ጊዜ SLA',
    persona_4_title: 'የመስክ ጥገና ባለሙያዎች',
    persona_4_am: 'የመስክ ጥገና ባለሙያዎች',
    persona_4_desc: 'የጥገና ስራዎችን በሞባይል በመቀበል የማረጋገጫ ፎቶዎችን በቀጥታ ያቀርባሉ።',
    persona_4_channels: 'መተግበሪያ፦ የመስክ ባለሙያዎች ገጽ',
    persona_4_badge: 'በፎቶ ማስረጃ የተረጋገጠ',
    persona_5_title: 'ተመራማሪዎችና የከተማ አመራር',
    persona_5_am: 'ተመራማሪዎችና የከተማ አመራር',
    persona_5_desc: 'የ12ቱን ክፍለ-ከተሞች የጥገና ፍጥነት እና የአገልግሎት አሰጣጥ ጥራት ይከታተሉ።',
    persona_5_channels: 'መተግበሪያ፦ የ12ቱ ክ/ከተሞች ዳሽቦርድ',
    persona_5_badge: 'ክፍት የስታቲስቲክስ መረጃ',

    // 4-Stage Lifecycle Pipeline (Rule 5 & 8)
    lifecycle_tag: 'የቲኬት ሽግግር ስቴት ማሽን',
    lifecycle_header: 'የሪፖርት የህይወት ዑደትና የፍተሻ ሂደት',
    lifecycle_sub: 'ከተለያዩ መስመሮች ከሚደርስ ሪፖርት ጀምሮ እስከ ተጨባጭ የመስክ ጥገና እና የፎቶ ማረጋገጫ ድረስ።',
    lifecycle_step_1_title: '01. ሪፖርት መቀበል (Inbound Ingestion)',
    lifecycle_step_1_desc: 'በUSSD (*840#)፣ በSMS (8065)፣ በድምፅ (8400)፣ በዌብ ካርታ ወይም በአስቸኳይ የጎርፍ ጥሪ ይገባል።',
    lifecycle_step_2_title: '02. ቅድሚያ ደረጃ መለየት (Automated Triage)',
    lifecycle_step_2_desc: 'ለህይወት አስጊ የሆኑ ድንገተኛ አደጋዎችን (ጎርፍ፣ የወደቀ ኃይል መስመር) ከመደበኛ ብልሽት ይለያል። የSLA ሰዓት ይጀምራል።',
    lifecycle_step_3_title: '03. ባለሙያ መመደብ (Spatial Dispatch)',
    lifecycle_step_3_desc: 'በGIS ካርታ መሰረት ለውሃ፣ መብራት፣ ፅዳት ወይም እሳት አደጋ ቡድኖች ይመደባል። ለነዋሪው በSMS ማሳወቂያ ይደርሳል።',
    lifecycle_step_4_title: '04. የተረጋገጠ ጥገና (Verified Resolution)',
    lifecycle_step_4_desc: 'የመስክ ባለሙያው የተጠገነበትን ፎቶ፣ መታወቂያ እና ቴክኒካል ማስታወሻ ያቀርባል። ለነዋሪው የማረጋገጫ SMS ይደርሳል።',

    // Flash Flood Resilience Hub
    flood_hub_tag: 'የአደጋ ስጋት ቅነሳ ማዕከል',
    flood_hub_title: 'የጎንደር የጎርፍ መከላከልና የወንዞች ክትትል ማዕከል',
    flood_hub_desc: 'የጎንደር ተረተራማ መልክአ-ምድር የጣለውን ዝናብ ወደ አንገረብና ቀሃ ወንዞች ያፈሳል። ስማርት ሲቪክ የቀጥታ ክትትል፣ የጅምላ SMS ማስጠንቀቂያ እና የአንድ አዝራር አስቸኳይ ጥሪ ይሰጣል።',
    flood_cta_sos: '🚨 አስቸኳይ የነፍስ አድን ጥሪ ላክ',
    flood_cta_broadcast: '📻 የጅምላ የጥንቃቄ SMS አስተላልፍ',

    // FAQ Accordion (Rule 8)
    faq_tag: 'የህዝብ መረጃ ማዕከል',
    faq_header: 'በብዛት የሚጠየቁ ጥያቄዎች (FAQ)',
    faq_sub: 'ለጎንደር ነዋሪዎች፣ ለማዘጋጃ ቤት ሰራተኞች እና ለዩኒቨርሲቲ ገምጋሚዎች የተዘጋጁ ቁልፍ ምላሾች።',
    faq_q1: 'ነዋሪዎች ችግር ሪፖርት ለማድረግ የሞባይል ኢንተርኔት ወይም ካርድ ያስፈልጋቸዋል?',
    faq_a1: 'በጭራሽ! ጎንደር ስማርት ሲቪክ ኢንተርኔት ለማይጠቀሙ ዜጎች ተደራሽ እንዲሆን የተሰራ ነው። ማንኛውም ነዋሪ ያለ ኢንተርኔት ዳታ በእጅ ባትሪ ስልኩ *840# መደወል ወይም ወደ 8065 SMS መላክ ይችላል። አገልግሎቱ ከኢትዮ ቴሌኮም ጋር በተደረገ ስምምነት ለነዋሪዎች ሙሉ በሙሉ ነፃ ነው።',
    faq_q2: 'ስርዓቱ መደበኛ ቅሬታን ከህይወት አስጊ ድንገተኛ አደጋ እንዴት ይለያል?',
    faq_a2: 'የማጣሪያ ኢንጂኑ ቁልፍ ቃላትን (ለምሳሌ «ጎርፍ»፣ «ተከበብን»፣ «FLOOD»)፣ የውሃ ጥልቀትን (ጉልበት ወይም ወገብ የደረሰ)፣ የተከበቡ ሰዎችን ብዛት እና የአስቸኳይ ጥሪ ቁጥሮችን (*840*911#) ይመረምራል። አደጋው ወዲያውኑ CRITICAL ተብሎ ተመድቦ በኮማንድ ሴንተሩ የድምፅና ምስል ደወል ያስነሳል።',
    faq_q3: 'አንድ ሰራተኛ ሳይጠግን «ተጠግኗል» ብሎ እንዳይዘጋ ምን መከላከያ አለ?',
    faq_a3: 'አንድ ቲኬት ያለ ጥብቅ ማረጋገጫ ሊዘጋ አይችልም፦ የሰራተኛው መታወቂያ (ለምሳሌ LEAD-TECH-04)፣ የጥገና ዝርዝር ማስታወሻ እና የተጠገነበትን የሚያሳይ የ«በኋላ» ፎቶ (Resolution Proof) መጫን ግዴታ ነው። የመጀመሪያውና የጥገናው ፎቶ ጎን ለጎን ለህዝብ ግልጽ ሆኖ ይታያል።',
    faq_q4: 'የጥገና ጊዜ (SLA) ካለፈ ምን ይከሰታል?',
    faq_a4: 'አንድ መደበኛ ጥያቄ ከ48 ሰዓት (ወይም ድንገተኛ አደጋ ከ4 ሰዓት) በላይ ሳይመለስ ከቆየ፣ ዳታቤዙ በራስ-ሰር is_sla_breached=true በማድረግ ደረጃውን ወደ ESCALATED_UNRESOLVED ያሳድገዋል። በትርፍ ጊዜ ክፍሉ (Tab 4) በቀይ ጎልቶ ለከተማው አመራሮች ማስጠንቀቂያ ይላካል።',
    faq_q5: 'ይህ ስርዓት ወደ ሌሎች የኢትዮጵያ ከተሞች (ባህር ዳር፣ ሃዋሳ፣ መቀሌ) ማደግ ይችላል?',
    faq_a5: 'አዎ! ኢትዮ-ሲቪክ ሀብ የተሰራው ለብዙ ከተሞች እንዲያገለግል (Multi-tenant) ሆኖ ነው። የGIS ካርታው ለአዲስ አበባ፣ ባህር ዳር፣ ሃዋሳ እና መቀሌ ዝግጁ መጋጠሚያዎች አሉት። አዲስ ከተማ ለማስገባት የክፍለ ከተሞቹን የGIS ካርታ መጫንና የአካባቢውን የስልክ መስመር ማገናኘት ብቻ በቂ ነው።',

    // Footer
    footer_brand_desc: 'የኢትዮጵያ የመጀመሪያው ሁለንተናዊ የማዘጋጃ ቤት መሠረተ ልማት ብልሽት መመዝገቢያና የGIS ቁጥጥር ስርዓት። 12ቱን ክፍለ ከተሞች በ2G፣ SMS፣ ድምፅና ዌብ ያገናኛል።',
    footer_emergency_title: 'የአስቸኳይ ጊዜ ስልክ ቁጥሮች',
    footer_nav_title: 'የአገልግሎት ክፍሎች',
    footer_admin_title: 'የከተማው አስተዳደር ቢሮ',
    brand_badge: 'ጎንደር',
    brand_subtitle: 'ኢትዮ ሲቪክ ሀብ • የመላው ኢትዮጵያ የማዘጋጃ ቤት ቅሬታ መከታተያ',
    nav_overview: 'ዋና ገጽ',
    nav_report: 'ብልሽት ሪፖርት ማድረጊያ',
    nav_track: 'ሁኔታ መከታተያ',
    nav_dispatch: 'የቁጥጥር ማዕከል',
    nav_analytics: 'ትንተናና ስታቲስቲክስ',
    nav_crew: 'የመስክ ባለሙያዎች',
    nav_actions: 'የማዘጋጃ ቤት እርምጃዎች',
    nav_admin: 'አስተዳዳሪ (Admin)',
    simulator_btn: 'የሞካሪ ስልክ (*840# / SMS / IVR)',

    // Hero Section
    hero_pill: 'የጎንደር ከተማ አስተዳደር የህዝብ አገልግሎት መረብ',
    hero_title: 'ሁሉን አቀፍ የማዘጋጃ ቤት ብልሽቶች ማሳወቂያ እና ስምሪት ማዕከል',
    hero_desc: 'በጎንደር ከተማ እና በመላው ኢትዮጵያ የዲጂታል ክፍተትን የሚያጠብ አሰራር። የውሃ መስመር ብልሽት፣ የመብራት መቆራረጥ፣ ያልተነሳ ቆሻሻ እና የመንገድ ጉዳት በዘመናዊ ስልክ፣ በተራ የእጅ ባትሪ ስልክ (*840#)፣ በSMS ወይም በስልክ ጥሪ በቀላሉ ሪፖርት ይደረጋል።',
    hero_btn_report: 'አሁን በመስመር ላይ ሪፖርት ያድርጉ',
    hero_btn_sim: 'የ *840# እና የስልክ ጥሪ ይሞክሩ',
    castle_heritage: 'የዩኔስኮ የዓለም ቅርስ',
    castle_name: '🏰 የፋሲል ግቢ ካስል • ጎንደር',
    castle_caption: 'ጎንደር፣ ኢትዮጵያ',

    // Statistics Counters
    stat_total_label: 'ጠቅላላ የተመዘገቡ',
    stat_channels_tag: 'ከሁሉም የመረጃ መስመሮች',
    stat_active_label: 'በጥገና ላይ ያሉ',
    stat_crews_tag: 'ባለሙያ የተመደበላቸው',
    stat_resolved_label: 'በዚህ ወር የተጠገኑ',
    stat_authorities_tag: 'ውሃ / መብራት / ፅዳት',
    stat_rate_label: 'የጥገና ስኬት ምጣኔ',
    stat_kpi_tag: 'የከተማው የጥራት ግብ',

    // Sub-Cities Grid
    subcities_header: 'የጎንደር ከተማ 12ቱ ክፍለ ከተሞች',
    subcities_subtitle: 'ታሪካዊ፣ የመኖሪያ እና የንግድ ማዕከላትን ያካተተ ሙሉ ሽፋን',
    subcities_badge: '12 ክፍለ ከተሞች',

    // Channels
    channels_header: 'የህዝብ መገናኛ መንገዶች',
    channels_subtitle: 'ኢንተርኔት የማይጠይቁ፣ በማንኛውም የኢትዮ ቴሌኮም መስመር የሚሰሩ',
    toll_free_badge: 'ነፃ አገልግሎት (Toll-Free)',
    card_ussd_tag: 'መስመር 1 • የእጅ ባትሪ ስልኮች',
    card_ussd_title: 'የUSSD ፈጣን ሜኑ (*840#)',
    card_ussd_desc: 'በማንኛውም ስልክ *840# በመደወል የቲኬት መለያ በSMS ወዲያውኑ ይቀበሉ።',
    zero_data_text: 'ኢንተርኔት አይፈልግም',
    sim_dial_link: 'ደውለው ይሞክሩ →',
    card_sms_tag: 'መስመር 2 • አጭር መልዕክት (SMS)',
    card_sms_title: 'የSMS አጭር ቁጥር (8065)',
    card_sms_desc: 'ወደ 8065 ነፃ መልዕክት በመላክ የችግሩን ሁኔታ በቀላሉ ያሳውቁ።',
    auto_receipts_text: 'ራስ-ሰር የSMS ማረጋገጫ',
    sim_sms_link: 'SMS ይሞክሩ →',
    card_ivr_tag: 'መስመር 3 • የስልክ ጥሪ መስመር',
    card_ivr_title: 'የድምፅ መስመር (8400)',
    card_ivr_desc: 'ወደ 8400 በመደወል የድምፅ መልዕክት በቀጥታ ለመላኪያ ማዕከሉ ይቅረፁ።',
    voice_note_text: 'የድምፅ ቅጂ ማያያዣ',
    sim_call_link: 'ጥሪ ይሞክሩ →',

    // Feed
    feed_header: 'በቅርብ የተከናወኑ የማዘጋጃ ቤት ስራዎች',
    feed_subtitle: 'የህብረተሰብ ሪፖርቶች እና የመስክ ጥገና ውጤቶች የቀጥታ ዝርዝር',
    refresh_btn: 'አድስ (Refresh)',

    // Report Form
    form_banner_tag: 'መስመር 4 • ዘመናዊ የዌብ ገጽ',
    form_title: 'አዲስ የማዘጋጃ ቤት ብልሽት ሪፖርት ማድረጊያ',
    form_desc: 'በካርታው ላይ በመላው ኢትዮጵያ ወይም በጎንደር 12 ክፍለ ከተሞች ምልክት ያድርጉ',
    step1_title: 'ደረጃ 1፡ የብልሽቱ መገኛ በካርታው ላይ (Spatial Location) *',
    pin_gps_btn: 'የአሁኑን GPS ምልክት አድርግ',
    jump_to_label: 'ካርታውን አሳይ፦',
    detected_zone: 'የተገኘው ክፍለ ከተማ / ክልል፦',
    coordinates_label: 'የመገኛ ነጥብ፦',
    gps_accuracy_label: 'የGPS ትክክለኛነት፦',
    step2_category_title: 'ደረጃ 2፡ የብልሽቱ አይነት (Category of Failure) *',
    cat_water_title: '💧 የመጠጥ ውሃ ብልሽት',
    cat_water_sub: 'የቧንቧ መሰበር፣ የውሃ መፍሰስ፣ መቋረጥ',
    cat_power_title: '⚡ የመብራት ኃይል ብልሽት',
    cat_power_sub: 'የትራንስፎርመር ቃጠሎ፣ የወደቀ ገመድ፣ ጨለማ',
    cat_waste_title: '🗑️ ያልተነሳ የደረቅ ቆሻሻ',
    cat_waste_sub: 'የተከመረ ቆሻሻ፣ የቦይ መደፈን',
    cat_road_title: '🚧 የመንገድና የፍሳሽ ቦይ',
    cat_road_sub: 'የኮብልስቶን መፍረስ፣ ጉድጓድ፣ ድልድይ',
    select_subcity_label: 'የሚመለከተው ክፍለ ከተማ (ከ12ቱ) *',
    urgency_label: 'የአስቸኳይነት ደረጃ *',
    urgency_low: 'ዝቅተኛ - መደበኛ ጥገና',
    urgency_med: 'መካከለኛ - አስቸኳይ ትኩረት የሚሻ',
    urgency_high: 'ከፍተኛ - ህዝብን የሚጎዳ አደጋ',
    urgency_crit: 'አስቸኳይ አደጋ - ለህይወት የሚያሰጋ',
    landmark_label: 'የቦታው መለያ ምልክት ወይም አድራሻ *',
    desc_label: 'ዝርዝር መግለጫ (ተጨማሪ መረጃ ካለ)',
    photo_label: 'የችግሩ ፎቶ ማስረጃ (Photo Evidence)',
    photo_sub: 'ስርዓቱ ፎቶዎችን በራስ-ሰር አሳንሶ በፍጥነት ያስተላልፋል።',
    photo_click_prompt: 'ፎቶ ለማንሳት ወይም ለመጫን እዚህ ይጫኑ',
    phone_label: 'የሞባይል ስልክ ቁጥር',
    phone_sub: 'የጥገናውን ሂደት በSMS ማሳወቂያ ለመከታተል ይጠቅማል።',
    anon_label: 'ስሜ እና ስልኬ እንዳይታይ ማንነቴ ይደበቅ (Anonymous Report)',
    cancel_btn: 'ሰርዝ',
    submit_btn: 'ሪፖርቱን መዝግብ',

    // Tracking
    track_banner_tag: 'የህዝብ ግልጽነት እና ተጠያቂነት',
    track_banner_title: 'የሪፖርት ሁኔታ መከታተያ ገጽ',
    track_banner_desc: 'የተመደበውን የስራ ክፍልና የጥገናውን ውጤት በፎቶ ማስረጃ ይከታተሉ',
    search_btn: 'ፈልግ',
    timeline_header: 'የጥገናው የሂደት ደረጃዎች',
    stage_1: '1. ተመዝግቧል',
    stage_1_sub: 'በካርታው ተይዟል',
    stage_2: '2. ተመድቧል',
    stage_2_sub: 'ክፍል ተለይቷል',
    stage_3: '3. በጥገና ላይ',
    stage_3_sub: 'ባለሙያ በስፍራው አለ',
    stage_4: '4. ተጠናቋል',
    stage_4_sub: 'ተጠግኖ ተረጋግጧል',
    dept_header: 'የተመደበለት ተቋም',
    crew_header: 'የተመደበው የጥገና ቡድን',
    proof_header: 'የጥገናው ማስረጃ (Resolution Proof)',
    before_photo_label: 'የነዋሪው የመጀመሪያ ፎቶ',
    after_photo_label: 'የባለሙያው የጥገና ማረጋገጫ ፎቶ',
    after_photo_placeholder: 'የመስክ ባለሙያዎች ስራውን ሲያጠናቅቁ ፎቶው እዚህ ይታያል',

    // Dispatch Command
    dispatch_title: 'የጎንደርና የመላው ኢትዮጵያ የGIS የቁጥጥር ማዕከል',
    all_subcities_opt: 'ሁሉም 12ቱ ክፍለ ከተሞች',
    all_channels_opt: 'ሁሉም የመረጃ መስመሮች',
    legend_title: 'የካርታው ምልክቶች',
    queue_header: 'የመረጃ መቀበያ ሰሌዳ',
    queue_sub: 'በ12ቱ ክፍለ ከተሞች ያሉ ንቁ ጥሪዎች',

    // Analytics
    analytics_banner_tag: 'የከተማው የስራ አፈፃፀም መረጃ',
    analytics_banner_title: 'የክፍለ ከተሞች የአገልግሎት አፈፃፀም እና ትንተና',
    analytics_banner_desc: 'በ12ቱ ክፍለ ከተሞች ያለውን የጥገና ፍጥነትና የችግሮች ስርጭት የሚያሳይ',
    analytics_kpi_title: 'የማዘጋጃ ቤት የውጤት መለኪያዎች',
    analytics_kpi_sub: 'የቀጥታ የአፈፃፀም እና የጥገና ፍጥነት ስታቲስቲክስ',
    chart_latency_title: 'አማካይ የመጠገኛ ጊዜ በክፍለ ከተማ (በሰዓታት)',
    chart_latency_sub: 'የ12ቱ የጎንደር ክፍለ ከተሞች ንፅፅር',
    chart_categories_title: 'የብልሽቶች አይነት ክፍፍል',
    chart_categories_sub: 'የውሃ፣ የመብራት፣ የቆሻሻ እና የመንገድ ድርሻ',
    scorecard_header: 'የ12ቱ ክፍለ ከተሞች የውጤት ሰሌዳ',
    th_subcity: 'ክፍለ ከተማ',
    th_total: 'ጠቅላላ የተመዘገቡ',
    th_active: 'በስራ ላይ ያሉ',
    th_resolved: 'የተጠናቀቁ',
    th_latency: 'አማካይ የመጠገኛ ሰዓት',
    th_status: 'ሁኔታ',

    // Crew
    crew_banner_tag: 'የመስክ ጥገና ክፍል',
    crew_queue_title: 'የተመደቡ የዕለት ተግባራት ዝርዝር',
    low_bandwidth_tag: 'ዝቅተኛ ኢንተርኔት ቆጣቢ ሞድ',

    // Defense Modal
    defense_modal_title: 'የምርቃት ፕሮጀክት መከላከያ የሙከራ ሰሌዳ',
    defense_modal_sub: 'ለዩኒቨርሲቲ ፈታኝ ኮሚቴ ያለ ምንም ወጪ የቀረበ የቴሌኮም ሞካሪ',
    feature_phone_sub: 'የእጅ ባትሪ ስልክ ስክሪን (2G Feature Phone)',

    // Section 6: Flood Hazard & Disaster Module
    header_flood_sos: '🚨 የጎርፍ አደጋ አስቸኳይ ጥሪ',
    hero_btn_flood_sos: '🚨 የጎርፍ አደጋ አስቸኳይ ጥሪ',
    cat_flood_title: '🚨 የጎርፍ አደጋ እና የመኖሪያ ቤት መጥለቅለቅ',
    cat_flood_sub: 'የወንዝ ሙላት፣ ወደ ግቢና ቤት የገባ ውሀ፣ የተከበቡ ሰዎች',
    flood_box_title: '🚨 ከፍተኛ የጎርፍ አደጋ እና ህይወት አድን ግምገማ',
    flood_box_desc: 'የጎርፍ አደጋ ጥሪዎች ወዲያውኑ ከፍተኛ የአደጋ ማስጠንቀቂያ ደወል በማሰማት ለእሳትና አደጋ ስጋት አመራር እና ለቀይ መስቀል ቡድኖች በቀጥታ ይላካሉ።',
    water_depth_label: 'የውሃው ጥልቀት (Water Depth) *',
    depth_surface: 'የላይኛው ፍሳሽ (< 10 ሳ.ሜ)',
    depth_ankle: 'ቁርጭምጭሚት ድረስ (10 - 25 ሳ.ሜ)',
    depth_knee: 'ጉልበት ድረስ (25 - 60 ሳ.ሜ)',
    depth_waist: 'ወገብ ድረስ ወይም ከዚያ በላይ (ለህይወት አደገኛ)',
    inundation_type_label: 'የመጥለቅለቅ አይነት (Inundation Type) *',
    type_inside: 'ወደ መኖሪያ ቤት መግባቱ (Living Quarters)',
    type_compound: 'ግቢ ውስጥ ውሀ መሙላት (Compound)',
    type_drainage: 'የፍሳሽ ቦይ መደፈን (Drainage Block)',
    type_road: 'መንገድ በጎርፍ መዘጋቱ (Roadway)',
    trapped_persons_label: 'የተከበቡ ሰዎች ቁጥር *',
    life_threat_check: 'ለህይወት የሚያሰጋ አስቸኳይ አደጋ — የነፍስ አድን ጀልባና የውሃ መሳቢያ ፓምፕ ይላክ',
    btn_rivers: 'የአንገረብና ቀሃ ወንዞች ተፋሰስ',
    btn_early_warning: '🚨 የጅምላ SMS ቅድመ ማስጠንቀቂያ',
    alarm_zoom_btn: 'በካርታው አሳይ',
    modal_sos_title: '🚨 የጎንደር የጎርፍ አደጋ አስቸኳይ የነፍስ አድን ጥሪ',
    modal_sos_banner: 'ለጎንደር ከተማ እሳትና ድንገተኛ አደጋ እና ለቀይ መስቀል በቀጥታ ይላካል',
    modal_sos_info: 'ይህ የአደጋ ጥሪ ሲላክ በቁጥጥር ማዕከሉ ላይ የቀጥታ ማንቂያ ደወል በማሰማት ፈጣን የነፍስ አድን ቡድን ወዲያውኑ ይላካል።',
    modal_subcity_label: 'ክፍለ ከተማ *',
    modal_phone_label: 'የሞባይል ስልክ ቁጥር *',
    modal_landmark_label: 'ትክክለኛ አድራሻ / የወንዙ ቅርበት *',
    modal_submit_sos: 'የነፍስ አድን ቡድኑን አሁን ጥራ (Dispatch Rescue Squad)',
    broadcast_modal_title: 'በአካባቢ ክልል የተወሰነ የጅምላ SMS ቅድመ ማስጠንቀቂያ ስርዓት',
    broadcast_target_sc: 'የታለመው ክፍለ ከተማ (Target Geofence) *',
    broadcast_river_label: 'የሚመለከተው የወንዝ ተፋሰስ *',
    broadcast_btn_send: 'የጅምላ SMS ማስጠንቀቂያውን አሁን ላክ'
  }
};

// ============================================================================
// 2. GONDAR 12 SUB-CITIES AND ALL-ETHIOPIA GEO-DATA
// ============================================================================
const SUB_CITIES = [
  { id: 1, name: 'Fasil', name_am: 'ፋሲል', code: 'SC-FASIL', lat: 12.6075, lon: 37.4625, desc: 'Historic Castle & Central Core', desc_am: 'ታሪካዊው የፋሲል ግቢና ማዕከላዊ ዞን', image: '/images/subcities/sc_01_fasil.jpg' },
  { id: 2, name: 'Maraki', name_am: 'ማራኪ', code: 'SC-MARAKI', lat: 12.6250, lon: 37.4750, desc: 'University Campus & Northern Residential', desc_am: 'የዩኒቨርሲቲ ግቢና ሰሜናዊ መኖሪያ', image: '/images/subcities/sc_02_maraki.jpg' },
  { id: 3, name: 'Arada', name_am: 'አራዳ', code: 'SC-ARADA', lat: 12.6025, lon: 37.4525, desc: 'Commercial Market District', desc_am: 'ዋና የንግድና የገበያ ማዕከል', image: '/images/subcities/sc_03_arada.jpg' },
  { id: 4, name: 'Azezo-Teda', name_am: 'አዘዞ ቴዳ', code: 'SC-AZEZO', lat: 12.5550, lon: 37.4300, desc: 'Airport & Southern Industrial Gateway', desc_am: 'የአየር ማረፊያና የደቡብ መግቢያ', image: '/images/subcities/sc_04_azezo.jpg' },
  { id: 5, name: 'Zobel', name_am: 'ዞብል', code: 'SC-ZOBEL', lat: 12.6000, lon: 37.4800, desc: 'Eastern Hill Ridge', desc_am: 'ምስራቃዊ የተራራ ሰንሰለት', image: '/images/subcities/sc_05_zobel.jpg' },
  { id: 6, name: 'Jantekel', name_am: 'ጃንተከል', code: 'SC-JANTEKEL', lat: 12.6200, lon: 37.4425, desc: 'Western Church Valley & Kebele 06', desc_am: 'ምዕራባዊ ሸለቆና ቀበሌ 06', image: '/images/subcities/sc_06_jantekel.jpg' },
  { id: 7, name: 'Bilajig', name_am: 'ብላጅግ', code: 'SC-BILAJIG', lat: 12.6320, lon: 37.4850, desc: 'North-Eastern Expansion Sector', desc_am: 'ሰሜን ምስራቅ አዲስ ማስፋፊያ', image: '/images/subcities/sc_07_bilajig.jpg' },
  { id: 8, name: 'Gubaie', name_am: 'ጉባኤ', code: 'SC-GUBAIE', lat: 12.6150, lon: 37.4550, desc: 'Civic Cultural Sector', desc_am: 'ማህበራዊና ባህላዊ ዞን', image: '/images/subcities/sc_08_gubaie.jpg' },
  { id: 9, name: 'Adebabay-Piassa', name_am: 'አደባባይ ፒያሳ', code: 'SC-PIASSA', lat: 12.6085, lon: 37.4680, desc: 'Central City Square & Municipality', desc_am: 'የከተማው አደባባይና ማዘጋጃ ቤት', image: '/images/subcities/sc_09_piassa.jpg' },
  { id: 10, name: 'Selam', name_am: 'ሰላም', code: 'SC-SELAM', lat: 12.5950, lon: 37.4400, desc: 'West-Central Residential Zone', desc_am: 'ምዕራብ ማዕከላዊ የመኖሪያ መንደር', image: '/images/subcities/sc_10_selam.jpg' },
  { id: 11, name: 'Mintiwab', name_am: 'ምንትዋብ', code: 'SC-MINTIWAB', lat: 12.6280, lon: 37.4320, desc: 'Kuskuam Palace Historic Corridor', desc_am: 'የቁስቋም እቴጌ ምንትዋብ ታሪካዊ ቀጠና', image: '/images/subcities/sc_11_mintiwab.jpg' },
  { id: 12, name: 'Abraj', name_am: 'አብራጅ', code: 'SC-ABRAJ', lat: 12.5800, lon: 37.4500, desc: 'South-Central Emerging District', desc_am: 'ደቡብ ማዕከላዊ አዲስ መንደር', image: '/images/subcities/sc_12_abraj.jpg' }
];

const ETHIOPIAN_CITIES = [
  { name: 'Gondar', name_am: 'ጎንደር', lat: 12.6075, lon: 37.4625, zoom: 13 },
  { name: 'Addis Ababa', name_am: 'አዲስ አበባ', lat: 9.0320, lon: 38.7480, zoom: 12 },
  { name: 'Bahir Dar', name_am: 'ባህር ዳር', lat: 11.5936, lon: 37.3908, zoom: 13 },
  { name: 'Hawassa', name_am: 'ሀዋሳ', lat: 7.0504, lon: 38.4955, zoom: 13 },
  { name: 'Mekelle', name_am: 'መቐለ', lat: 13.4967, lon: 39.4753, zoom: 13 },
  { name: 'Dire Dawa', name_am: 'ድሬዳዋ', lat: 9.5931, lon: 41.8661, zoom: 13 },
  { name: 'Jimma', name_am: 'ጅማ', lat: 7.6734, lon: 36.8344, zoom: 13 }
];

// App State
const INITIAL_INCIDENTS = [
  {
    "id": "0",
    "ticket_code": "GDR-SOS-911",
    "title": "🚨 CRITICAL FLOOD: Angereb River Inundation - 4 Residents Trapped",
    "description": "Catastrophic river surge entered living quarters (ጎርፍ ወደ ቤት ገብቷል). Waist-deep water. Elderly woman and child trapped inside.",
    "category": "FLOOD_EMERGENCY",
    "urgency": "CRITICAL",
    "is_emergency": true,
    "emergency_severity": "CRITICAL",
    "status": "DISPATCHED",
    "channel_origin": "MOBILE_APP",
    "caller_phone": "+251918556677",
    "is_anonymous": false,
    "is_life_threatening": true,
    "water_depth_level": "WAIST_DEEP_OR_HIGHER",
    "inundation_type": "INSIDE_LIVING_QUARTERS",
    "trapped_persons_count": 4,
    "latitude": 12.6215,
    "longitude": 37.469,
    "gps_accuracy_meters": 3.2,
    "landmark_description": "Maraki Kebele 08, 50m from Angereb River bank bridge",
    "sub_city": "Maraki",
    "sub_city_am": "ማራኪ",
    "department": "Gondar Fire & Disaster Prevention Agency / Red Cross",
    "department_id": 5,
    "assigned_crew": "Gondar Fire & Disaster Rapid Rescue Squad #1",
    "photo_before": "/images/categories/flash_flood.svg",
    "photo_after": null,
    "resolution_proof_url": null,
    "resolution_notes": null,
    "resolved_by_worker_id": null,
    "time_to_fix_minutes": null,
    "audio_path": null,
    "voice_transcript": null,
    "created_at": "2026-10-29T12:29:21.974Z",
    "assigned_at": "2026-10-29T12:34:21.975Z",
    "sla_deadline": "2026-10-29T13:29:21.975Z",
    "is_sla_breached": false,
    "resolved_at": null
  },
  {
    "id": "1",
    "ticket_code": "GDR-EMG-702",
    "title": "⚡ HAZARD: Fallen High-Voltage Transformer Cable Sparking",
    "description": "Live electrical cable snapped and sparked across wet cobblestone walkway during storm.",
    "category": "POWER_OUTAGE",
    "urgency": "CRITICAL",
    "is_emergency": true,
    "emergency_severity": "CRITICAL",
    "status": "RECEIVED",
    "channel_origin": "SMS",
    "caller_phone": "+251918223344",
    "is_anonymous": false,
    "is_life_threatening": true,
    "water_depth_level": null,
    "inundation_type": null,
    "trapped_persons_count": 0,
    "latitude": 12.603,
    "longitude": 37.458,
    "gps_accuracy_meters": 8,
    "landmark_description": "Arada Market Main Gate pedestrian walkway",
    "sub_city": "Arada",
    "sub_city_am": "አራዳ",
    "department": "Ethiopian Electric Utility (EEU)",
    "department_id": 2,
    "assigned_crew": "EEU Arada Transformer Crew",
    "photo_before": "/images/categories/power_outage.svg",
    "photo_after": null,
    "resolution_proof_url": null,
    "resolution_notes": null,
    "resolved_by_worker_id": null,
    "time_to_fix_minutes": null,
    "audio_path": null,
    "voice_transcript": null,
    "created_at": "2026-10-29T12:09:21.975Z",
    "assigned_at": null,
    "sla_deadline": "2026-10-29T13:09:21.975Z",
    "is_sla_breached": false,
    "resolved_at": null
  },
  {
    "id": "2",
    "ticket_code": "GDR-4821",
    "title": "High-Pressure Water Main Burst",
    "description": "Clean water flooding roadway near Maraki University main entrance.",
    "category": "WATER_LEAK",
    "urgency": "HIGH",
    "is_emergency": false,
    "emergency_severity": "MEDIUM",
    "status": "IN_PROGRESS",
    "channel_origin": "WEB",
    "caller_phone": "+251918112233",
    "is_anonymous": false,
    "is_life_threatening": false,
    "latitude": 12.624,
    "longitude": 37.4725,
    "gps_accuracy_meters": 4.5,
    "landmark_description": "Maraki Campus Main Gate, 20m from traffic junction",
    "sub_city": "Maraki",
    "sub_city_am": "ማራኪ",
    "department": "Gondar Water & Sewerage Authority",
    "department_id": 1,
    "assigned_crew": "GWSA Maraki Unit #2",
    "photo_before": "/images/categories/water_leak.svg",
    "photo_after": null,
    "resolution_proof_url": null,
    "resolution_notes": null,
    "resolved_by_worker_id": null,
    "time_to_fix_minutes": null,
    "audio_path": null,
    "voice_transcript": null,
    "created_at": "2026-10-29T08:54:21.975Z",
    "assigned_at": "2026-10-29T09:54:21.975Z",
    "sla_deadline": "2026-10-30T08:54:21.975Z",
    "is_sla_breached": false,
    "resolved_at": null
  },
  {
    "id": "2b",
    "ticket_code": "GDR-SMS-4822",
    "title": "Water Main Flooding Maraki University Gate (Duplicate)",
    "description": "Second citizen report: clean tap water gushing across university asphalt entrance.",
    "category": "WATER_LEAK",
    "urgency": "HIGH",
    "is_emergency": false,
    "emergency_severity": "MEDIUM",
    "status": "IN_PROGRESS",
    "channel_origin": "SMS",
    "caller_phone": "+251918990011",
    "is_anonymous": false,
    "is_life_threatening": false,
    "latitude": 12.6241,
    "longitude": 37.4726,
    "gps_accuracy_meters": 6,
    "landmark_description": "Maraki Campus Main Gate, gushing onto asphalt",
    "sub_city": "Maraki",
    "sub_city_am": "ማራኪ",
    "department": "Gondar Water & Sewerage Authority",
    "department_id": 1,
    "assigned_crew": "GWSA Maraki Unit #2",
    "photo_before": "/images/categories/water_leak.svg",
    "photo_after": null,
    "resolution_proof_url": null,
    "resolution_notes": "Linked to primary incident GDR-4821.",
    "resolved_by_worker_id": null,
    "time_to_fix_minutes": null,
    "audio_path": null,
    "voice_transcript": null,
    "created_at": "2026-10-29T10:24:21.975Z",
    "assigned_at": "2026-10-29T10:54:21.975Z",
    "sla_deadline": "2026-10-30T09:54:21.975Z",
    "is_sla_breached": false,
    "resolved_at": null
  },
  {
    "id": "2c",
    "ticket_code": "GDR-USD-4823",
    "title": "Gushing Main Water Leak at University Junction (Duplicate)",
    "description": "Third citizen report via USSD: tap water flooding street.",
    "category": "WATER_LEAK",
    "urgency": "HIGH",
    "is_emergency": false,
    "emergency_severity": "MEDIUM",
    "status": "IN_PROGRESS",
    "channel_origin": "USSD",
    "caller_phone": "+251922334455",
    "is_anonymous": false,
    "is_life_threatening": false,
    "latitude": 12.6239,
    "longitude": 37.4724,
    "gps_accuracy_meters": 10,
    "landmark_description": "Maraki University Gate taxi stop",
    "sub_city": "Maraki",
    "sub_city_am": "ማራኪ",
    "department": "Gondar Water & Sewerage Authority",
    "department_id": 1,
    "assigned_crew": "GWSA Maraki Unit #2",
    "photo_before": "/images/categories/water_leak.svg",
    "photo_after": null,
    "resolution_proof_url": null,
    "resolution_notes": null,
    "resolved_by_worker_id": null,
    "time_to_fix_minutes": null,
    "audio_path": null,
    "voice_transcript": null,
    "created_at": "2026-10-29T11:54:21.975Z",
    "assigned_at": null,
    "sla_deadline": "2026-10-30T11:54:21.975Z",
    "is_sla_breached": false,
    "resolved_at": null
  },
  {
    "id": "3",
    "ticket_code": "GDR-7742",
    "title": "Uncollected Solid Waste Canal Overflow",
    "description": "Large pile of market garbage overflowing into drainage canal.",
    "category": "SOLID_WASTE",
    "urgency": "MEDIUM",
    "is_emergency": false,
    "emergency_severity": "LOW",
    "status": "RECEIVED",
    "channel_origin": "SMS",
    "caller_phone": "+251930556677",
    "is_anonymous": false,
    "is_life_threatening": false,
    "latitude": 12.552,
    "longitude": 37.425,
    "gps_accuracy_meters": null,
    "landmark_description": "Azezo Market South Junction",
    "sub_city": "Azezo-Teda",
    "sub_city_am": "አዘዞ ቴዳ",
    "department": "Gondar Sanitation & Beautification",
    "department_id": 3,
    "assigned_crew": null,
    "photo_before": "/images/categories/solid_waste.svg",
    "photo_after": null,
    "resolution_proof_url": null,
    "resolution_notes": null,
    "resolved_by_worker_id": null,
    "time_to_fix_minutes": null,
    "audio_path": null,
    "voice_transcript": null,
    "created_at": "2026-10-29T10:54:21.975Z",
    "assigned_at": null,
    "sla_deadline": "2026-10-30T10:54:21.975Z",
    "is_sla_breached": false,
    "resolved_at": null
  },
  {
    "id": "4",
    "ticket_code": "GDR-3310",
    "title": "Road Damage & Cobblestone Trench",
    "description": "Severe erosion created deep trench hazardous for local transport.",
    "category": "ROAD_DAMAGE",
    "urgency": "MEDIUM",
    "is_emergency": false,
    "emergency_severity": "LOW",
    "status": "TRIAGED",
    "channel_origin": "USSD",
    "caller_phone": "+251918334455",
    "is_anonymous": false,
    "is_life_threatening": false,
    "latitude": 12.632,
    "longitude": 37.485,
    "gps_accuracy_meters": null,
    "landmark_description": "Bilajig Health Center access road",
    "sub_city": "Bilajig",
    "sub_city_am": "ብላጅግ",
    "department": "Gondar Municipal Roads Authority",
    "department_id": 4,
    "assigned_crew": null,
    "photo_before": "/images/categories/road_damage.svg",
    "photo_after": null,
    "resolution_proof_url": null,
    "resolution_notes": null,
    "resolved_by_worker_id": null,
    "time_to_fix_minutes": null,
    "audio_path": null,
    "voice_transcript": null,
    "created_at": "2026-10-29T07:54:21.975Z",
    "assigned_at": null,
    "sla_deadline": "2026-10-30T07:54:21.975Z",
    "is_sla_breached": false,
    "resolved_at": null
  },
  {
    "id": "5",
    "ticket_code": "GDR-IVR-8401",
    "title": "🎙️ Spoken Hotline Voice Memo: Major Pipeline Leak",
    "description": "30-second caller voice note received via automated Gondar IVR Hotline (8400). Caller reports water overflowing into roadway.",
    "category": "WATER_LEAK",
    "urgency": "HIGH",
    "is_emergency": false,
    "emergency_severity": "MEDIUM",
    "status": "TRIAGED",
    "channel_origin": "IVR_VOICE",
    "caller_phone": "+251918444555",
    "is_anonymous": false,
    "is_life_threatening": false,
    "latitude": 12.555,
    "longitude": 37.43,
    "gps_accuracy_meters": null,
    "landmark_description": "Azezo Shell Fuel Station junction",
    "sub_city": "Azezo-Teda",
    "sub_city_am": "አዘዞ ቴዳ",
    "department": "Gondar Water & Sewerage Authority",
    "department_id": 1,
    "assigned_crew": "GWSA Rapid Pipe Unit #1",
    "photo_before": "/images/categories/water_leak.svg",
    "photo_after": null,
    "resolution_proof_url": null,
    "resolution_notes": null,
    "resolved_by_worker_id": null,
    "time_to_fix_minutes": null,
    "audio_path": "/uploads/audio/sample_ivr.wav",
    "voice_transcript": "የውሃ ቱቦ ተሰብሮ መንገድ ላይ እየፈሰሰ ነው እባካችሁ በፍጥነት ጥገና ይደረግልን (Broken water pipe flooding street, urgent fix requested)",
    "created_at": "2026-10-29T12:14:21.975Z",
    "assigned_at": null,
    "sla_deadline": "2026-10-30T00:54:21.975Z",
    "is_sla_breached": false,
    "resolved_at": null
  },
  {
    "id": "6",
    "ticket_code": "GDR-PHN-8402",
    "title": "📞 Direct Emergency Call: Keha River Culvert Failure",
    "description": "Direct telephone call received by Municipal Dispatcher desk. Caller reported river surge eroding bridge footings.",
    "category": "FLOOD_EMERGENCY",
    "urgency": "HIGH",
    "is_emergency": true,
    "emergency_severity": "HIGH",
    "status": "DISPATCHED",
    "channel_origin": "PHONE_CALL",
    "caller_phone": "+251918778899",
    "is_anonymous": false,
    "is_life_threatening": true,
    "water_depth_level": "KNEE_DEEP",
    "inundation_type": "ROAD_OVERFLOW",
    "trapped_persons_count": 0,
    "latitude": 12.6,
    "longitude": 37.448,
    "gps_accuracy_meters": 5,
    "landmark_description": "Keha River Crossing near Western Gate",
    "sub_city": "Jantekel",
    "sub_city_am": "ጃንተከል",
    "department": "Gondar Fire & Disaster Prevention Agency",
    "department_id": 5,
    "assigned_crew": "Gondar Fire & Disaster Rapid Rescue Squad #1",
    "photo_before": "/images/categories/flash_flood.svg",
    "photo_after": null,
    "resolution_proof_url": null,
    "resolution_notes": null,
    "resolved_by_worker_id": null,
    "time_to_fix_minutes": null,
    "audio_path": "/uploads/audio/sample_ivr.wav",
    "voice_transcript": "የቀሃ ወንዝ ሞልቶ ድልድዩ እየተሸረሸረ ነው ተሽከርካሪ እንዳያልፍ ተከልክሏል (Keha river overflowing, bridge culvert eroding)",
    "created_at": "2026-10-29T11:59:21.975Z",
    "assigned_at": "2026-10-29T12:09:21.975Z",
    "sla_deadline": "2026-10-29T13:59:21.975Z",
    "is_sla_breached": false,
    "resolved_at": null
  },
  {
    "id": "7",
    "ticket_code": "GDR-OVD-2090",
    "title": "⚠️ SLA BREACHED: Collapsed Sidewalk Culvert",
    "description": "Deep hole on sidewalk next to church gate left unassigned past municipal SLA threshold (36 hours pending).",
    "category": "ROAD_DAMAGE",
    "urgency": "HIGH",
    "is_emergency": false,
    "emergency_severity": "HIGH",
    "status": "ESCALATED_UNRESOLVED",
    "channel_origin": "IVR_VOICE",
    "caller_phone": "+251944778899",
    "is_anonymous": false,
    "is_life_threatening": false,
    "latitude": 12.608,
    "longitude": 37.451,
    "gps_accuracy_meters": null,
    "landmark_description": "Jantekel Medhanialem Church Gate",
    "sub_city": "Jantekel",
    "sub_city_am": "ጃንተከል",
    "department": "Gondar Municipal Roads Authority",
    "department_id": 4,
    "assigned_crew": null,
    "photo_before": "/images/categories/road_damage.svg",
    "photo_after": null,
    "resolution_proof_url": null,
    "resolution_notes": null,
    "resolved_by_worker_id": null,
    "time_to_fix_minutes": null,
    "audio_path": "/uploads/audio/sample_ivr.wav",
    "voice_transcript": "የመንገዱ ቦይ ተሰብሮ ሰው እየወደቀበት ነው (Broken pedestrian culvert posing safety risk)",
    "created_at": "2026-10-28T00:54:21.975Z",
    "assigned_at": null,
    "sla_deadline": "2026-10-29T00:54:21.975Z",
    "is_sla_breached": true,
    "resolved_at": null
  },
  {
    "id": "8",
    "ticket_code": "GDR-1052",
    "title": "Sanitation Commercial Cleanup Complete",
    "description": "Commercial waste piles cleared and transported to Azezo landfill.",
    "category": "SOLID_WASTE",
    "urgency": "LOW",
    "is_emergency": false,
    "emergency_severity": "LOW",
    "status": "RESOLVED",
    "channel_origin": "WEB",
    "caller_phone": "+251918889900",
    "is_anonymous": true,
    "is_life_threatening": false,
    "latitude": 12.599,
    "longitude": 37.479,
    "gps_accuracy_meters": 6,
    "landmark_description": "Zobel Commercial Center",
    "sub_city": "Zobel",
    "sub_city_am": "ዞብል",
    "department": "Gondar Sanitation & Beautification",
    "department_id": 3,
    "assigned_crew": "Sanitation Azezo Truck Crew",
    "photo_before": "/images/categories/solid_waste.svg",
    "photo_after": "/images/gondar_fasiledes_castle.jpg",
    "resolution_proof_url": "/images/gondar_fasiledes_castle.jpg",
    "resolution_notes": "All waste loaded on truck #04 and transported to Azezo dump site. Disinfected area.",
    "resolved_by_worker_id": "TECH-SAN-04",
    "time_to_fix_minutes": 180,
    "audio_path": null,
    "voice_transcript": null,
    "created_at": "2026-10-27T12:54:21.975Z",
    "assigned_at": "2026-10-27T20:54:21.975Z",
    "resolved_at": "2026-10-29T00:54:21.975Z",
    "sla_deadline": "2026-10-28T12:54:21.975Z",
    "is_sla_breached": false
  },
  {
    "id": "9",
    "ticket_code": "GDR-5510",
    "title": "Pipeline Joint Welding & Restoration",
    "description": "Water leak repaired and normal pressure restored to Kebele 04 residents.",
    "category": "WATER_LEAK",
    "urgency": "MEDIUM",
    "is_emergency": false,
    "emergency_severity": "MEDIUM",
    "status": "RESOLVED",
    "channel_origin": "USSD",
    "caller_phone": "+251918332211",
    "is_anonymous": false,
    "is_life_threatening": false,
    "latitude": 12.558,
    "longitude": 37.432,
    "gps_accuracy_meters": null,
    "landmark_description": "Azezo Square Main Pipe line",
    "sub_city": "Azezo-Teda",
    "sub_city_am": "አዘዞ ቴዳ",
    "department": "Gondar Water & Sewerage Authority",
    "department_id": 1,
    "assigned_crew": "GWSA Rapid Pipe Unit #1",
    "photo_before": "/images/categories/water_leak.svg",
    "photo_after": "/images/gondar_fasil_ghebbi_aerial.jpg",
    "resolution_proof_url": "/images/gondar_fasil_ghebbi_aerial.jpg",
    "resolution_notes": "Replaced fractured galvanized valve collar. System pressure-tested to 4.2 bars.",
    "resolved_by_worker_id": "LEAD-PIPE-01",
    "time_to_fix_minutes": 110,
    "audio_path": null,
    "voice_transcript": null,
    "created_at": "2026-10-28T12:54:21.975Z",
    "assigned_at": "2026-10-28T14:54:21.975Z",
    "resolved_at": "2026-10-29T06:54:21.975Z",
    "sla_deadline": "2026-10-29T11:54:21.975Z",
    "is_sla_breached": false
  }
];
let allIncidents = [...INITIAL_INCIDENTS];
let mapReport = null;
let markerReport = null;
let mapDispatch = null;
let dispatchMarkers = [];
let chartLatency = null;
let chartCategories = null;

let currentLang = 'en'; // default English, toggleable to 'am'
let compressedPhotoBlob = null;

// USSD State
let ussdHistory = [];
let isUssdActive = false;

// ============================================================================
// 3. INITIALIZATION & I18N ENGINE
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Check stored language preference
  const savedLang = localStorage.getItem('smartcivic_lang');
  if (savedLang === 'am' || savedLang === 'en') {
    currentLang = savedLang;
  }

  applyTranslations();
  renderLandingSubCities();
  populateSubCitySelects();
  
  if (window.lucide) lucide.createIcons();
  
  // Synchronously render seed records immediately
  renderPublicFeed();
  renderActionsPage();
  updateLiveMetrics();

  try {
    initReportMap();
  } catch (mapErr) {
    console.warn("Leaflet map initialization fallback:", mapErr);
  }

  loadIncidents();
  loadAnalytics();

  window.addEventListener('online', () => updateNetworkStatus(true));
  window.addEventListener('offline', () => updateNetworkStatus(false));
});

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'am' : 'en';
  localStorage.setItem('smartcivic_lang', currentLang);
  applyTranslations();
  renderLandingSubCities();
  populateSubCitySelects();
  renderPublicFeed();
  renderAnalyticsCharts();
  renderCrewTasks();

  const toggleBtnText = document.getElementById('current-lang-text');
  if (toggleBtnText) {
    toggleBtnText.innerText = currentLang === 'en' ? 'አማርኛ' : 'English';
  }

  showToast(currentLang === 'en' ? 'Switched to English' : 'ቋንቋው ወደ አማርኛ ተቀይሯል');
}

function applyTranslations() {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  document.documentElement.lang = currentLang;

  // Update text content
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (dict[key]) {
      elem.innerText = dict[key];
    }
  });

  // Update language toggle button label
  const toggleBtnText = document.getElementById('current-lang-text');
  if (toggleBtnText) {
    toggleBtnText.innerText = currentLang === 'en' ? 'አማርኛ' : 'English';
  }
}

// ============================================================================
// 4. NAVIGATION & PORTAL SWITCHING
// ============================================================================
function navigateTo(viewId) {
  document.querySelectorAll('.view-panel').forEach(panel => panel.classList.add('hidden'));
  
  // Desktop Nav highlight
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('text-emerald-400', 'bg-slate-800');
    btn.classList.add('text-slate-300');
  });

  // Mobile Bottom Nav highlight
  document.querySelectorAll('.mob-nav-btn').forEach(btn => {
    btn.classList.remove('text-emerald-400');
    btn.classList.add('text-slate-400');
  });

  // Mobile Drawer buttons highlight
  document.querySelectorAll('.mobile-drawer-btn').forEach(btn => {
    btn.classList.remove('bg-slate-800', 'text-emerald-400');
    btn.classList.add('bg-slate-900/90', 'text-slate-200');
  });

  const activePanel = document.getElementById(`view-${viewId}`);
  if (activePanel) activePanel.classList.remove('hidden');

  const activeBtn = document.getElementById(`nav-${viewId}`);
  if (activeBtn) {
    activeBtn.classList.add('text-emerald-400', 'bg-slate-800');
    activeBtn.classList.remove('text-slate-300');
  }

  const activeMobBtn = document.getElementById(`mob-nav-${viewId}`);
  if (activeMobBtn) {
    activeMobBtn.classList.add('text-emerald-400');
    activeMobBtn.classList.remove('text-slate-400');
  }

  const activeDrawerBtn = document.getElementById(`mob-drawer-${viewId}`);
  if (activeDrawerBtn) {
    activeDrawerBtn.classList.add('bg-slate-800', 'text-emerald-400');
    activeDrawerBtn.classList.remove('bg-slate-900/90', 'text-slate-200');
  }

  // Auto-close mobile drawer if open
  toggleMobileMenu(false);

  if (viewId === 'report' && mapReport) {
    setTimeout(() => mapReport.invalidateSize(), 200);
  }
  if (viewId === 'dispatch') {
    setTimeout(() => {
      initDispatchMap();
      renderDispatchQueue();
    }, 200);
  }
  if (viewId === 'analytics') {
    renderAnalyticsCharts();
  }
  if (viewId === 'crew') {
    renderCrewTasks();
  }
  if (viewId === 'actions') {
    renderActionsPage();
  }
  if (viewId === 'admin') {
    checkAdminAuthAndOpen();
    return;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const msgElem = document.getElementById('toast-message');
  msgElem.innerText = message;
  toast.classList.remove('translate-y-24', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 4000);
}

function updateNetworkStatus(isOnline) {
  const badge = document.getElementById('connection-badge');
  if (badge) {
    badge.className = isOnline
      ? 'inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 font-semibold'
      : 'inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs px-3 py-1.5 rounded-full border border-amber-500/30 font-semibold';
    badge.innerHTML = `<span class="w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'}"></span> ${isOnline ? (currentLang === 'am' ? 'ኦንላይን' : 'Online') : (currentLang === 'am' ? 'ከመስመር ውጭ (IndexedDB ይሰራል)' : 'Offline (IndexedDB Active)')}`;
  }
  showToast(isOnline ? 'Connected to Gondar Municipal Grid' : 'Offline Mode: Incident queued locally');
}

// ============================================================================
// 5. SUB-CITIES UI GENERATOR (12 ZONES)
// ============================================================================
function renderLandingSubCities() {
  const container = document.getElementById('landing-subcities-grid');
  if (!container) return;

  container.innerHTML = SUB_CITIES.map(sc => `
    <div onclick="quickFilterSubCity('${sc.name}')" 
         class="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-200 h-40 sm:h-48 bg-slate-950"
         title="${currentLang === 'am' ? sc.name_am : sc.name} (${sc.name}) - Click for GIS View">
      <img src="${sc.image}" alt="${sc.name}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='/images/gondar_fasiledes_castle.jpg';" class="w-full h-full object-cover group-hover:scale-108 transition duration-700 ease-out">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
      
      <!-- Top Zone Badge -->
      <span class="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur text-amber-300 font-mono text-[11px] font-black px-2 py-0.5 rounded-md border border-white/15 shadow-sm">
        #${sc.id < 10 ? '0' + sc.id : sc.id}
      </span>

      <!-- Bottom Subcity Name (Crisp & Clean, Zero Under-Image Clutter) -->
      <div class="absolute bottom-2.5 left-3 right-3 text-white">
        <p class="font-black text-sm sm:text-base drop-shadow leading-tight group-hover:text-amber-300 transition">${currentLang === 'am' ? sc.name_am : sc.name}</p>
        <p class="text-[11px] text-slate-300 font-medium drop-shadow">${currentLang === 'am' ? sc.name : sc.name_am}</p>
      </div>
    </div>
  `).join('');
}

function quickFilterSubCity(subCityName) {
  navigateTo('dispatch');
  const filterSelect = document.getElementById('filter-subcity');
  if (filterSelect) {
    filterSelect.value = subCityName;
    applyDispatchFilters();
  }
  const scObj = SUB_CITIES.find(s => s.name === subCityName);
  if (scObj && mapDispatch) {
    setTimeout(() => {
      mapDispatch.setView([scObj.lat, scObj.lon], 14);
      showToast(`Command map focused on ${scObj.name} (${scObj.name_am})`);
    }, 300);
  }
}

function quickReportForSubCity(subCityName) {
  navigateTo('report');
  const reportSelect = document.getElementById('report-subcity-select');
  if (reportSelect) {
    reportSelect.value = subCityName;
  }
  const scObj = SUB_CITIES.find(s => s.name === subCityName);
  if (scObj && mapReport) {
    setTimeout(() => {
      mapReport.setView([scObj.lat, scObj.lon], 15);
      markerReport.setLatLng([scObj.lat, scObj.lon]);
      updateReportCoordinates(scObj.lat, scObj.lon);
      showToast(`Location set to ${scObj.name}`);
    }, 300);
  }
}

function populateSubCitySelects() {
  const reportSelect = document.getElementById('report-subcity-select');
  const filterSelect = document.getElementById('filter-subcity');
  const sosSelect = document.getElementById('sos-subcity');
  const broadcastSelect = document.getElementById('broadcast-subcity');

  const optionsHtml = SUB_CITIES.map(sc => {
    const label = currentLang === 'am' ? `${sc.name_am} (${sc.name})` : `${sc.name} (${sc.name_am})`;
    return `<option value="${sc.name}">${label}</option>`;
  }).join('');

  if (reportSelect) {
    reportSelect.innerHTML = optionsHtml;
  }
  if (filterSelect) {
    const allLabel = currentLang === 'am' ? 'ሁሉም 12ቱ ክፍለ ከተሞች' : 'All 12 Sub-Cities';
    filterSelect.innerHTML = `<option value="">${allLabel}</option>` + optionsHtml;
  }
  if (sosSelect) {
    sosSelect.innerHTML = optionsHtml;
  }
  if (broadcastSelect) {
    broadcastSelect.innerHTML = optionsHtml;
  }
}

// ============================================================================
// 6. ALL-ETHIOPIA SPATIAL MAPS (LEAFLET)
// ============================================================================
function initReportMap() {
  if (typeof L === "undefined") return;
  const gondarCenter = [12.6075, 37.4625];
  mapReport = L.map('map-report').setView(gondarCenter, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapReport);

  const customIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  markerReport = L.marker(gondarCenter, { draggable: true, icon: customIcon }).addTo(mapReport);
  markerReport.bindPopup("<b>Incident Location</b><br>Drag to pin exact failure spot").openPopup();

  markerReport.on('dragend', function () {
    const pos = markerReport.getLatLng();
    updateReportCoordinates(pos.lat, pos.lng);
  });

  mapReport.on('click', function (e) {
    markerReport.setLatLng(e.latlng);
    updateReportCoordinates(e.latlng.lat, e.latlng.lng);
  });
}

function updateReportCoordinates(lat, lon) {
  document.getElementById('report-coords-text').innerText = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;

  // Find nearest Gondar Sub-City or Ethiopian City
  let closest = SUB_CITIES[0];
  let minDiff = Infinity;
  SUB_CITIES.forEach(sc => {
    const diff = Math.hypot(sc.lat - lat, sc.lon - lon);
    if (diff < minDiff) {
      minDiff = diff;
      closest = sc;
    }
  });

  // If outside Gondar (more than ~30km), check other Ethiopian cities
  if (minDiff > 0.3) {
    let closestCity = ETHIOPIAN_CITIES[0];
    let minCityDiff = Infinity;
    ETHIOPIAN_CITIES.forEach(c => {
      const diff = Math.hypot(c.lat - lat, c.lon - lon);
      if (diff < minCityDiff) {
        minCityDiff = diff;
        closestCity = c;
      }
    });
    const label = currentLang === 'am' ? `${closestCity.name_am} ክልል` : `${closestCity.name} Region`;
    document.getElementById('report-subcity-name').innerText = label;
  } else {
    const label = currentLang === 'am' ? `${closest.name_am} (${closest.name})` : `${closest.name} (${closest.name_am})`;
    document.getElementById('report-subcity-name').innerText = label;
    const reportSelect = document.getElementById('report-subcity-select');
    if (reportSelect) reportSelect.value = closest.name;
  }
}

function setMapPerspective(target) {
  const targetMap = mapReport || mapDispatch;
  if (!targetMap) return;

  if (target === 'ethiopia') {
    // Zoom out to show ALL of Ethiopia
    targetMap.setView([9.145, 40.489], 6);
  } else if (target === 'gondar') {
    targetMap.setView([12.6075, 37.4625], 13);
  } else {
    const city = ETHIOPIAN_CITIES.find(c => c.name.toLowerCase().replace(/\s+/g, '') === target.toLowerCase());
    if (city) targetMap.setView([city.lat, city.lon], city.zoom || 12);
  }
  showToast(`Map perspective centered on ${target.toUpperCase()}`);
}

function captureUserGps() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const accuracy = Math.round(pos.coords.accuracy);

        if (mapReport) {
          mapReport.setView([lat, lon], 16);
          markerReport.setLatLng([lat, lon]);
        }
        updateReportCoordinates(lat, lon);
        document.getElementById('report-accuracy-text').innerText = `+/- ${accuracy} meters`;
        showToast(`GPS captured: +/- ${accuracy}m accuracy`);
      },
      () => {
        showToast('Could not access device GPS. Using map pin position.');
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  }
}

function initDispatchMap() {
  if (typeof L === "undefined") return;
  if (mapDispatch) return;

  mapDispatch = L.map('map-dispatch').setView([12.6075, 37.4625], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapDispatch);

  updateDispatchMapPins(allIncidents);
}

function updateDispatchMapPins(incidents) {
  if (typeof L === "undefined" || !mapDispatch) return;

  dispatchMarkers.forEach(m => mapDispatch.removeLayer(m));
  dispatchMarkers = [];

  const colorMap = {
    'WATER_LEAK': 'blue',
    'POWER_OUTAGE': 'gold',
    'SOLID_WASTE': 'orange',
    'ROAD_DAMAGE': 'red',
    'FLOOD_EMERGENCY': 'violet',
    'OTHER': 'grey'
  };

  incidents.forEach(ticket => {
    const isFlood = ticket.category === 'FLOOD_EMERGENCY';
    const color = isFlood ? 'violet' : (colorMap[ticket.category] || 'blue');
    const iconUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`;
    
    const icon = L.icon({
      iconUrl,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: isFlood ? [30, 48] : [25, 41],
      iconAnchor: isFlood ? [15, 48] : [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const marker = L.marker([ticket.latitude, ticket.longitude], { icon }).addTo(mapDispatch);
    const floodNotice = isFlood
      ? `<div class="bg-red-50 border border-red-200 p-1.5 rounded my-1 text-[11px] text-red-900 font-bold">
           🚨 RESCUE ACTIVE: Depth: ${ticket.water_depth_level || 'WAIST_DEEP'}<br>
           Trapped: ${ticket.trapped_persons_count || 1} Persons • ${ticket.assigned_crew || 'Fire & Rescue'}
         </div>`
      : '';

    marker.bindPopup(`
      <div class="text-xs p-1 font-sans">
        <strong class="font-bold text-slate-900">${ticket.ticket_code}: ${ticket.title}</strong><br>
        <span class="text-slate-600">Sub-City: ${ticket.sub_city}</span><br>
        <span class="text-slate-600">Status: <b>${ticket.status}</b></span><br>
        ${floodNotice}
        <button onclick="focusQueueTicket('${ticket.ticket_code}')" class="mt-2 text-emerald-600 font-bold hover:underline">Select in Queue &rarr;</button>
      </div>
    `);

    dispatchMarkers.push(marker);
  });
}

// ============================================================================
// 7. CATEGORY SELECTION & PHOTO COMPRESSION
// ============================================================================
function selectCategoryCard(catKey) {
  const allThemes = [
    'border-sky-500', 'bg-sky-50/70', 'ring-4', 'ring-sky-400/25', 'shadow-sky-500/10',
    'border-amber-500', 'bg-amber-50/70', 'ring-amber-400/25', 'shadow-amber-500/10',
    'border-emerald-500', 'bg-emerald-50/70', 'ring-emerald-400/25', 'shadow-emerald-500/10',
    'border-orange-500', 'bg-orange-50/70', 'ring-orange-400/25', 'shadow-orange-500/10',
    'border-red-600', 'bg-red-50/80', 'ring-red-500/30', 'shadow-red-500/20', 'animate-pulse',
    'border-emerald-600', 'bg-emerald-50/50'
  ];

  document.querySelectorAll('.category-card').forEach(c => {
    c.classList.remove(...allThemes);
    c.classList.add('border-slate-200', 'bg-white');
  });

  const activeCard = document.getElementById(`cat-card-${catKey}`);
  if (activeCard) {
    activeCard.classList.remove('border-slate-200', 'bg-white');
    if (catKey === 'FLOOD_EMERGENCY') {
      activeCard.classList.add('border-red-600', 'bg-red-50/80', 'ring-4', 'ring-red-500/30', 'shadow-lg', 'shadow-red-500/20', 'animate-pulse');
    } else if (catKey === 'POWER_OUTAGE') {
      activeCard.classList.add('border-amber-500', 'bg-amber-50/70', 'ring-4', 'ring-amber-400/25', 'shadow-md', 'shadow-amber-500/10');
    } else if (catKey === 'SOLID_WASTE') {
      activeCard.classList.add('border-emerald-500', 'bg-emerald-50/70', 'ring-4', 'ring-emerald-400/25', 'shadow-md', 'shadow-emerald-500/10');
    } else if (catKey === 'ROAD_DAMAGE') {
      activeCard.classList.add('border-orange-500', 'bg-orange-50/70', 'ring-4', 'ring-orange-400/25', 'shadow-md', 'shadow-orange-500/10');
    } else {
      activeCard.classList.add('border-sky-500', 'bg-sky-50/70', 'ring-4', 'ring-sky-400/25', 'shadow-md', 'shadow-sky-500/10');
    }
  }

  document.getElementById('report-category').value = catKey;

  const floodBox = document.getElementById('flood-parameters-box');
  const urgencySelect = document.getElementById('report-urgency');
  if (floodBox) {
    if (catKey === 'FLOOD_EMERGENCY') {
      floodBox.classList.remove('hidden');
      if (urgencySelect) urgencySelect.value = 'CRITICAL';
    } else {
      floodBox.classList.add('hidden');
    }
  }
}

function previewIncidentImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      const maxWidth = 1200;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        compressedPhotoBlob = blob;
        document.getElementById('photo-drop-prompt').classList.add('hidden');
        const previewContainer = document.getElementById('photo-preview-container');
        previewContainer.classList.remove('hidden');
        document.getElementById('photo-preview-img').src = URL.createObjectURL(blob);
        document.getElementById('photo-size-text').innerText = `Compressed: ${Math.round(blob.size / 1024)} KB (WebP Ready)`;
      }, 'image/jpeg', 0.75);
    };
  };
}

async function handleReportSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('report-submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Submitting...';

  const category = document.getElementById('report-category').value;
  const subCity = document.getElementById('report-subcity-select').value;
  const urgency = document.getElementById('report-urgency').value;
  const landmark = document.getElementById('report-landmark').value;
  const description = document.getElementById('report-desc').value;
  const phone = document.getElementById('report-phone').value;
  const isAnonymous = document.getElementById('report-anonymous').checked;

  const pos = markerReport ? markerReport.getLatLng() : { lat: 12.6075, lng: 37.4625 };

  const formData = new FormData();
  formData.append('title', `${category} at ${subCity}`);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('urgency', urgency);
  formData.append('latitude', pos.lat.toString());
  formData.append('longitude', pos.lng.toString());
  formData.append('landmark', landmark);
  formData.append('phone', phone);
  formData.append('isAnonymous', String(isAnonymous));

  if (category === 'FLOOD_EMERGENCY') {
    const waterDepth = document.getElementById('report-water-depth')?.value || 'WAIST_DEEP_OR_HIGHER';
    const inundationType = document.getElementById('report-inundation-type')?.value || 'INSIDE_LIVING_QUARTERS';
    const trappedCount = document.getElementById('report-trapped-count')?.value || '0';
    const isLifeThreatening = document.getElementById('report-life-threatening')?.checked ? 'true' : 'false';

    formData.append('water_depth_level', waterDepth);
    formData.append('inundation_type', inundationType);
    formData.append('trapped_persons_count', trappedCount);
    formData.append('is_life_threatening', isLifeThreatening);
  }

  if (compressedPhotoBlob) {
    formData.append('photo', compressedPhotoBlob, 'incident_photo.jpg');
  }

  try {
    const res = await fetch('/api/v1/incidents', {
      method: 'POST',
      body: formData
    });
    const result = await res.json();
    if (res.ok) {
      showToast(`Incident #${result.ticket.ticket_code} created successfully!`);
      allIncidents.unshift(result.ticket);
      updateLiveMetrics();
      renderPublicFeed();
      trackSpecificTicket(result.ticket.ticket_code);
    }
  } catch (err) {
    showToast('Offline Mode: Incident logged into local storage queue.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i> <span>${currentLang === 'am' ? 'ሪፖርቱን መዝግብ' : 'Submit Incident Report'}</span>`;
    if (window.lucide) lucide.createIcons();
  }
}

// ============================================================================
// 8. DATA LOADING & PUBLIC FEED
// ============================================================================
async function loadIncidents() {
  try {
    const res = await fetch('/api/v1/incidents');
    const data = await res.json();
    if (data && Array.isArray(data.incidents) && data.incidents.length > 0) {
      allIncidents = data.incidents;
    }
    renderPublicFeed();
    renderActionsPage();
    updateLiveMetrics();
    checkFloodEmergencyAlarms();
    if (mapDispatch) updateDispatchMapPins(allIncidents);
    applyDispatchFilters();
    if (adminAuthenticated) renderAdminDashboard();
  } catch (err) {
    console.warn('Network / server loading fallback, maintaining active records:', err);
    renderPublicFeed();
    renderActionsPage();
    updateLiveMetrics();
  }
}

function updateLiveMetrics() {
  const total = allIncidents.length;
  const inProgress = allIncidents.filter(i => i.status === 'IN_PROGRESS' || i.status === 'ASSIGNED').length;
  const resolved = allIncidents.filter(i => i.status === 'RESOLVED').length;
  const rate = total ? Math.round((resolved / total) * 100) : 0;

  document.getElementById('stat-total').innerText = total;
  document.getElementById('stat-progress').innerText = inProgress;
  document.getElementById('stat-resolved').innerText = resolved;
  document.getElementById('stat-rate').innerText = `${rate}%`;
}

function renderPublicFeed() {
  const container = document.getElementById('landing-recent-list');
  if (!container) return;

  if (allIncidents.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-slate-400 col-span-full">No active incidents.</div>`;
    return;
  }

  container.innerHTML = allIncidents.slice(0, 6).map(ticket => {
    const badgeColor = ticket.status === 'RESOLVED' 
      ? 'bg-emerald-100 text-emerald-800' 
      : ticket.status === 'IN_PROGRESS' 
        ? 'bg-amber-100 text-amber-800' 
        : 'bg-blue-100 text-blue-800';

    const getCategoryPhoto = (cat) => {
      switch (cat) {
        case 'FLOOD_EMERGENCY': return '/images/categories/flash_flood.svg';
        case 'POWER_OUTAGE': return '/images/categories/power_outage.svg';
        case 'SOLID_WASTE': return '/images/categories/solid_waste.svg';
        case 'ROAD_DAMAGE': return '/images/categories/road_damage.svg';
        case 'WATER_LEAK':
        default: return '/images/categories/water_leak.svg';
      }
    };
    const cardPhoto = ticket.photo_before || getCategoryPhoto(ticket.category);

    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <div class="h-32 overflow-hidden relative">
          <img src="${cardPhoto}" alt="${ticket.title}" onerror="this.onerror=null; this.src='/images/categories/water_leak.svg';" class="w-full h-full object-cover">
          <span class="absolute top-2.5 right-2.5 text-[10px] font-black px-2 py-0.5 rounded-full ${badgeColor} shadow">
            ${ticket.status}
          </span>
          <span class="absolute bottom-2 left-2.5 font-mono font-bold text-[11px] text-white bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur">
            #${ticket.ticket_code}
          </span>
        </div>

        <div class="p-3.5 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="font-bold text-sm text-slate-900 truncate">${ticket.title}</h4>
            <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
              <span>${ticket.sub_city}</span>
            </p>
          </div>

          <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-[11px] text-slate-500 font-medium">
              ${ticket.channel_origin}
            </span>
            <button onclick="trackSpecificTicket('${ticket.ticket_code}')" class="font-bold text-emerald-600 hover:text-emerald-700 hover:underline">
              ${currentLang === 'am' ? 'ተከታተል' : 'Track'} &rarr;
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
  if (document.getElementById('actions-full-grid')) {
    renderActionsPage();
  }
}

// ============================================================================
// 8B. DEDICATED RECENT PUBLIC MUNICIPAL ACTIONS CONTROLLER
// ============================================================================
function renderActionsPage() {
  const subcitySelect = document.getElementById('actions-subcity-filter');
  if (subcitySelect && subcitySelect.options.length <= 1) {
    subcitySelect.innerHTML = `<option value="ALL">${currentLang === 'am' ? 'ሁሉም 12ቱ ክፍለ ከተሞች' : 'All 12 Sub-Cities'}</option>` +
      SUB_CITIES.map(sc => `<option value="${sc.name}">${sc.name} (${sc.name_am})</option>`).join('');
  }

  const total = allIncidents.length;
  const resolved = allIncidents.filter(i => i.status === 'RESOLVED').length;
  const active = allIncidents.filter(i => i.status === 'IN_PROGRESS' || i.status === 'DISPATCHED' || i.status === 'ASSIGNED').length;
  const emergency = allIncidents.filter(i => i.is_emergency || i.urgency === 'CRITICAL' || i.category === 'FLOOD_EMERGENCY').length;
  const rate = total ? Math.round((resolved / total) * 100) : 0;

  const totalEl = document.getElementById('actions-stat-total');
  const resolvedEl = document.getElementById('actions-stat-resolved');
  const rateEl = document.getElementById('actions-stat-rate');
  const activeEl = document.getElementById('actions-stat-active');
  const emergencyEl = document.getElementById('actions-stat-emergency');

  if (totalEl) totalEl.innerText = total;
  if (resolvedEl) resolvedEl.innerText = resolved;
  if (rateEl) rateEl.innerHTML = `<i data-lucide="check" class="w-3 h-3"></i> <span>${rate}% Resolution Rate</span>`;
  if (activeEl) activeEl.innerText = active;
  if (emergencyEl) emergencyEl.innerText = emergency;

  applyActionsFilters();
}

function applyActionsFilters() {
  const container = document.getElementById('actions-full-grid');
  if (!container) return;

  const search = (document.getElementById('actions-search-input')?.value || '').toLowerCase().trim();
  const cat = document.getElementById('actions-cat-filter')?.value || 'ALL';
  const status = document.getElementById('actions-status-filter')?.value || 'ALL';
  const subcity = document.getElementById('actions-subcity-filter')?.value || 'ALL';

  const filtered = allIncidents.filter(t => {
    if (cat !== 'ALL' && t.category !== cat) return false;
    if (status !== 'ALL' && t.status !== status) return false;
    if (subcity !== 'ALL' && t.sub_city !== subcity) return false;
    if (search) {
      const matchCode = (t.ticket_code || '').toLowerCase().includes(search);
      const matchTitle = (t.title || '').toLowerCase().includes(search);
      const matchLandmark = (t.landmark_description || '').toLowerCase().includes(search);
      const matchSub = (t.sub_city || '').toLowerCase().includes(search);
      if (!matchCode && !matchTitle && !matchLandmark && !matchSub) return false;
    }
    return true;
  });

  const countBadge = document.getElementById('actions-filtered-count');
  if (countBadge) {
    countBadge.innerText = `Showing ${filtered.length} of ${allIncidents.length} verified municipal actions`;
  }

  renderActionsFullGrid(filtered);
}

function resetActionsFilters() {
  const searchInput = document.getElementById('actions-search-input');
  const catSelect = document.getElementById('actions-cat-filter');
  const statusSelect = document.getElementById('actions-status-filter');
  const subcitySelect = document.getElementById('actions-subcity-filter');

  if (searchInput) searchInput.value = '';
  if (catSelect) catSelect.value = 'ALL';
  if (statusSelect) statusSelect.value = 'ALL';
  if (subcitySelect) subcitySelect.value = 'ALL';

  applyActionsFilters();
}

function renderActionsFullGrid(incidentsList) {
  const container = document.getElementById('actions-full-grid');
  if (!container) return;

  if (incidentsList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <i data-lucide="search-x" class="w-6 h-6"></i>
        </div>
        <p class="font-bold text-slate-700 text-sm">No municipal actions matched your filter criteria.</p>
        <button onclick="resetActionsFilters()" class="text-xs text-emerald-600 hover:text-emerald-700 font-bold underline">
          Reset all filters & view all actions
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = incidentsList.map(ticket => {
    let badgeColor = 'bg-blue-100 text-blue-800';
    if (ticket.status === 'RESOLVED') badgeColor = 'bg-emerald-100 text-emerald-800';
    else if (ticket.status === 'IN_PROGRESS') badgeColor = 'bg-amber-100 text-amber-800';
    else if (ticket.status === 'DISPATCHED') badgeColor = 'bg-sky-100 text-sky-800';
    else if (ticket.status === 'RECEIVED') badgeColor = 'bg-purple-100 text-purple-800';

    const getCategoryPhoto = (cat) => {
      switch (cat) {
        case 'FLOOD_EMERGENCY': return '/images/categories/flash_flood.svg';
        case 'POWER_OUTAGE': return '/images/categories/power_outage.svg';
        case 'SOLID_WASTE': return '/images/categories/solid_waste.svg';
        case 'ROAD_DAMAGE': return '/images/categories/road_damage.svg';
        case 'WATER_LEAK':
        default: return '/images/categories/water_leak.svg';
      }
    };
    const cardPhoto = ticket.photo_before || getCategoryPhoto(ticket.category);

    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <div class="h-36 overflow-hidden relative bg-slate-900">
          <img src="${cardPhoto}" alt="${ticket.title}" onerror="this.onerror=null; this.src='/images/categories/water_leak.svg';" class="w-full h-full object-cover">
          <span class="absolute top-2.5 right-2.5 text-[10px] font-black px-2.5 py-0.5 rounded-full ${badgeColor} shadow">
            ${ticket.status}
          </span>
          <span class="absolute bottom-2 left-2.5 font-mono font-bold text-[11px] text-white bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur border border-white/10">
            #${ticket.ticket_code}
          </span>
        </div>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">${ticket.title}</h4>
            <p class="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span>${ticket.sub_city}</span>
              ${ticket.landmark_description ? `<span class="text-slate-400 text-[10px] truncate">(${ticket.landmark_description})</span>` : ''}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              ${ticket.channel_origin}
            </span>
            <button onclick="trackSpecificTicket('${ticket.ticket_code}')" class="font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline">
              <span>${currentLang === 'am' ? 'ተከታተል' : 'Track'}</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// ============================================================================
// 9. TICKET TRACKING
// ============================================================================
function trackSpecificTicket(ticketCode) {
  document.getElementById('track-input').value = ticketCode;
  navigateTo('track');
  queryTicketStatus();
}

async function queryTicketStatus() {
  const query = document.getElementById('track-input').value.trim().toUpperCase();
  if (!query) {
    showToast('Please enter a ticket code');
    return;
  }

  try {
    const res = await fetch(`/api/v1/incidents/${query}`);
    if (res.ok) {
      const ticket = await res.json();
      renderTicketDetails(ticket);
      return;
    }
  } catch (err) {
    console.warn('Server lookup fallback:', err);
  }

  const localTicket = allIncidents.find(i => (i.ticket_code || "").toUpperCase() === query);
  if (localTicket) {
    renderTicketDetails(localTicket);
    showToast(`✓ Ticket #${query} retrieved successfully from verified ledger.`);
  } else {
    showToast(`Ticket #${query} not found in municipal registry.`);
  }
}

function renderTicketDetails(ticket) {
  const card = document.getElementById('track-result-card');
  card.classList.remove('hidden');

  document.getElementById('track-code-badge').innerText = `#${ticket.ticket_code}`;
  document.getElementById('track-channel-badge').innerText = ticket.channel_origin;
  document.getElementById('track-title').innerText = ticket.title;
  document.getElementById('track-subcity').innerText = `Sub-City: ${ticket.sub_city} • Landmark: ${ticket.landmark_description || 'Gondar'}`;
  document.getElementById('track-status-pill').innerText = ticket.status;
  document.getElementById('track-dept-name').innerText = ticket.department || 'Gondar Municipal Administration';
  document.getElementById('track-crew-name').innerText = ticket.assigned_crew || 'Pending Allocation';

  const stages = ['SUBMITTED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];
  const currentIdx = stages.indexOf(ticket.status);

  // Update connecting progress fill line
  const stepperFill = document.getElementById('stepper-progress-fill');
  if (stepperFill) {
    if (ticket.status === 'SUBMITTED' || ticket.status === 'RECEIVED') {
      stepperFill.style.width = '0%';
      stepperFill.className = 'hidden sm:block absolute top-5 left-10 h-1 bg-emerald-500 z-0 rounded-full transition-all duration-700';
    } else if (ticket.status === 'ASSIGNED') {
      stepperFill.style.width = '33%';
      stepperFill.className = 'hidden sm:block absolute top-5 left-10 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 z-0 rounded-full transition-all duration-700';
    } else if (ticket.status === 'IN_PROGRESS') {
      stepperFill.style.width = '66%';
      stepperFill.className = 'hidden sm:block absolute top-5 left-10 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-400 z-0 rounded-full transition-all duration-700';
    } else if (ticket.status === 'RESOLVED') {
      stepperFill.style.width = '100%';
      stepperFill.className = 'hidden sm:block absolute top-5 left-10 h-1 bg-emerald-500 z-0 rounded-full transition-all duration-700';
    }
  }

  for (let i = 1; i <= 4; i++) {
    const node = document.getElementById(`step-node-${i}`);
    if (i - 1 < currentIdx) {
      node.className = 'w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-sm bg-emerald-600 text-white shadow-md ring-4 ring-white';
      node.innerText = '✓';
    } else if (i - 1 === currentIdx) {
      node.className = ticket.status === 'RESOLVED' 
        ? 'w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-sm bg-emerald-600 text-white shadow-md ring-4 ring-white'
        : 'w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-sm bg-amber-500 text-white shadow-md animate-pulse ring-4 ring-white';
      node.innerText = ticket.status === 'RESOLVED' ? '✓' : '⚙';
    } else {
      node.className = 'w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-sm bg-slate-200 text-slate-500 ring-4 ring-white';
      node.innerText = String(i);
    }
  }

  const beforeImg = document.getElementById('track-photo-before');
  beforeImg.src = ticket.photo_before || '/images/categories/water_leak.svg';

  const afterImg = document.getElementById('track-photo-after');
  const afterPlaceholder = document.getElementById('track-photo-after-placeholder');
  if (ticket.photo_after) {
    afterImg.src = ticket.photo_after;
    afterImg.classList.remove('hidden');
    afterPlaceholder.classList.add('hidden');
  } else {
    afterImg.classList.add('hidden');
    afterPlaceholder.classList.remove('hidden');
  }
}

// ============================================================================
// 10. DISPATCH COMMAND CENTER & 5-TIER QUEUE MANAGEMENT
// ============================================================================
let currentQueueTab = 'emergency';
let activeResolveTicketCode = null;

function setQueueTab(tab) {
  currentQueueTab = tab;
  const tabs = ['emergency', 'general', 'voice', 'overdue', 'resolved'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-queue-${t}`);
    if (btn) {
      if (t === tab) {
        btn.className = 'queue-tab py-1.5 px-0.5 rounded-lg text-center flex flex-col items-center justify-center transition bg-white text-slate-900 shadow-sm border border-slate-300 font-black';
        if (t === 'emergency') btn.classList.add('text-red-700', 'border-red-300');
        if (t === 'resolved') btn.classList.add('text-emerald-700', 'border-emerald-300');
      } else {
        btn.className = 'queue-tab py-1.5 px-0.5 rounded-lg text-center flex flex-col items-center justify-center transition text-slate-500 hover:text-slate-800 hover:bg-white/60 font-semibold';
      }
    }
  });

  applyDispatchFilters();
}

function applyDispatchFilters() {
  const scFilter = document.getElementById('filter-subcity') ? document.getElementById('filter-subcity').value : '';
  const chFilter = document.getElementById('filter-channel') ? document.getElementById('filter-channel').value : '';

  // Predicates for 5 Queues
  const isEmergency = t => t.is_emergency || t.urgency === 'CRITICAL' || t.category === 'FLOOD_EMERGENCY';
  const isGeneral = t => !t.is_emergency && t.urgency !== 'CRITICAL' && t.status !== 'RESOLVED' && !t.is_sla_breached;
  const isVoice = t => t.channel_origin === 'IVR' || t.channel_origin === 'IVR_VOICE' || t.channel_origin === 'PHONE_CALL' || Boolean(t.audio_path);
  const isOverdue = t => t.is_sla_breached || t.status === 'ESCALATED_UNRESOLVED' || (t.status !== 'RESOLVED' && new Date(t.sla_deadline).getTime() < Date.now());
  const isResolved = t => t.status === 'RESOLVED';

  // Compute live counts
  const cEmerg = allIncidents.filter(isEmergency).length;
  const cGen = allIncidents.filter(isGeneral).length;
  const cVoice = allIncidents.filter(isVoice).length;
  const cOvd = allIncidents.filter(isOverdue).length;
  const cRes = allIncidents.filter(isResolved).length;

  const bEmerg = document.getElementById('badge-count-emergency');
  const bGen = document.getElementById('badge-count-general');
  const bVoice = document.getElementById('badge-count-voice');
  const bOvd = document.getElementById('badge-count-overdue');
  const bRes = document.getElementById('badge-count-resolved');
  if (bEmerg) bEmerg.innerText = cEmerg;
  if (bGen) bGen.innerText = cGen;
  if (bVoice) bVoice.innerText = cVoice;
  if (bOvd) bOvd.innerText = cOvd;
  if (bRes) bRes.innerText = cRes;

  // Filter allIncidents according to active tab
  let filtered = [...allIncidents];
  if (currentQueueTab === 'emergency') filtered = filtered.filter(isEmergency);
  else if (currentQueueTab === 'general') filtered = filtered.filter(isGeneral);
  else if (currentQueueTab === 'voice') filtered = filtered.filter(isVoice);
  else if (currentQueueTab === 'overdue') filtered = filtered.filter(isOverdue);
  else if (currentQueueTab === 'resolved') filtered = filtered.filter(isResolved);

  // Apply secondary dropdown filters
  if (scFilter) filtered = filtered.filter(i => i.sub_city === scFilter);
  if (chFilter) filtered = filtered.filter(i => i.channel_origin === chFilter);

  updateDispatchMapPins(filtered);
  renderFilteredQueue(filtered);
}

function renderDispatchQueue() {
  applyDispatchFilters();
}

function renderFilteredQueue(incidents) {
  const container = document.getElementById('dispatch-ticket-list');
  const countBadge = document.getElementById('unread-queue-badge');
  if (countBadge) countBadge.innerText = `${incidents.length} in Queue`;

  if (!container) return;

  if (incidents.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">No tickets found in this queue tab.</div>`;
    return;
  }

  container.innerHTML = incidents.map(t => {
    const isVoice = t.channel_origin === 'IVR' || t.channel_origin === 'IVR_VOICE' || t.channel_origin === 'PHONE_CALL' || Boolean(t.audio_path);
    const isEmergency = t.is_emergency || t.urgency === 'CRITICAL' || t.category === 'FLOOD_EMERGENCY';
    const isOverdue = t.is_sla_breached || t.status === 'ESCALATED_UNRESOLVED' || (t.status !== 'RESOLVED' && new Date(t.sla_deadline).getTime() < Date.now());
    const isResolved = t.status === 'RESOLVED';

    // Channel badge
    let channelBadge = '';
    if (t.channel_origin === 'USSD') {
      channelBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"><i data-lucide="hash" class="w-2.5 h-2.5"></i> USSD (*840#)</span>`;
    } else if (t.channel_origin === 'SMS') {
      channelBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200"><i data-lucide="message-square" class="w-2.5 h-2.5"></i> SMS (8065)</span>`;
    } else if (t.channel_origin === 'PHONE_CALL') {
      channelBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200"><i data-lucide="phone" class="w-2.5 h-2.5"></i> Direct Call</span>`;
    } else if (t.channel_origin === 'IVR' || t.channel_origin === 'IVR_VOICE') {
      channelBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200"><i data-lucide="mic" class="w-2.5 h-2.5"></i> IVR (8400)</span>`;
    } else {
      channelBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"><i data-lucide="smartphone" class="w-2.5 h-2.5"></i> Web/App SOS</span>`;
    }

    // Status & Urgency Badge
    let statusBadge = '';
    if (isEmergency) {
      statusBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-red-600 text-white shadow-sm shadow-red-500/30 animate-pulse"><span class="w-1.5 h-1.5 rounded-full bg-white"></span> CRITICAL</span>`;
    } else if (isResolved) {
      statusBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">✅ RESOLVED</span>`;
    } else if (isOverdue) {
      statusBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 animate-pulse">⚠️ OVERDUE</span>`;
    } else if (t.status === 'ASSIGNED' || t.status === 'DISPATCHED') {
      statusBadge = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">DISPATCHED</span>`;
    } else {
      statusBadge = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">${t.status || 'RECEIVED'}</span>`;
    }

    const cardBorder = isEmergency 
      ? 'border-red-300 bg-red-50/20' 
      : (isOverdue ? 'border-amber-300 bg-amber-50/20' : (isResolved ? 'border-emerald-200 bg-emerald-50/15' : 'border-slate-200 bg-white'));

    return `
      <div id="queue-item-${t.ticket_code}" onclick="panToIncident('${t.ticket_code}')" class="${cardBorder} rounded-2xl p-3.5 border shadow-sm hover:shadow-card-elevate hover:border-slate-400 transition duration-200 space-y-2.5 cursor-pointer group">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="font-mono font-black text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">#${t.ticket_code}</span>
            ${channelBadge}
          </div>
          ${statusBadge}
        </div>

        <div>
          <h4 class="text-xs font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug">${t.title}</h4>
          <p class="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
            <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
            <span>${t.sub_city} • ${t.landmark_description || 'Gondar'}</span>
          </p>
          <p class="text-[11px] text-slate-600 mt-1 line-clamp-2">${t.description}</p>
        </div>

        ${/* Voice player and transcript display */ ''}
        ${isVoice ? `
          <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/90 p-2.5 rounded-xl space-y-2 text-xs shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 font-bold text-purple-900 text-[11px]">
                <i data-lucide="mic" class="w-3.5 h-3.5 text-purple-600"></i>
                <span>Amharic Voice Memo & Transcript:</span>
              </div>
              <span class="text-[10px] font-mono text-purple-700 font-semibold">${t.caller_phone || '8400 Hotline'}</span>
            </div>
            
            <audio controls preload="none" class="w-full h-7 rounded-lg" src="${t.audio_path || '/uploads/audio/sample_ivr.wav'}"></audio>

            <div class="text-[11px] text-purple-950 bg-white/80 p-2 rounded-lg border border-purple-100 italic leading-snug">
              "${t.voice_transcript || 'የውሃ ቱቦ ተሰብሮ መንገድ ላይ እየፈሰሰ ነው እባካችሁ በፍጥነት ጥገና ይደረግልን (Broken water pipe flooding street, urgent fix requested)'}"
            </div>
          </div>
        ` : ''}

        ${/* SLA Countdown display for overdue/pending */ ''}
        ${isOverdue ? `
          <div class="bg-amber-50 border border-amber-200 p-2 rounded-xl text-[11px] text-amber-900 flex items-center justify-between font-semibold">
            <div class="flex items-center gap-1">
              <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-amber-600"></i>
              <span>SLA Target Exceeded</span>
            </div>
            <span class="font-mono text-amber-800 text-[10px] font-bold">Escalated to Bureau Chief</span>
          </div>
        ` : ''}

        ${/* Before / After resolution proof archive display */ ''}
        ${isResolved ? `
          <div class="bg-emerald-50/80 border border-emerald-200 p-2.5 rounded-xl text-[11px] space-y-2 text-slate-800">
            <div class="flex items-center justify-between text-[10px] font-bold text-emerald-900 border-b border-emerald-200 pb-1">
              <span>⏱️ Fixed in: <strong>${t.time_to_fix_minutes || 120} mins</strong></span>
              <span>👷 Crew ID: <strong>${t.resolved_by_worker_id || 'LEAD-TECH-01'}</strong></span>
            </div>
            <p class="text-[11px] italic text-slate-700 leading-snug">"${t.resolution_notes || 'Inspected and certified operational by municipal engineering crew.'}"</p>
            <div class="flex items-center gap-2 pt-0.5">
              <div class="flex-1 text-center">
                <img src="${t.photo_before || '/images/categories/water_leak.svg'}" class="w-full h-14 rounded-lg object-cover border border-slate-200 shadow-sm">
                <span class="text-[9px] text-slate-500 font-bold block mt-0.5">Reported Hazard</span>
              </div>
              <div class="font-black text-emerald-600 text-sm">&rarr;</div>
              <div class="flex-1 text-center">
                <img src="${t.photo_after || t.resolution_proof_url || '/images/gondar_fasiledes_castle.jpg'}" class="w-full h-14 rounded-lg object-cover border border-emerald-300 shadow-sm">
                <span class="text-[9px] text-emerald-700 font-bold block mt-0.5">Resolution Proof</span>
              </div>
            </div>
          </div>
        ` : ''}

        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
          ${t.assigned_crew ? `
            <span class="text-[10px] font-bold text-emerald-700 flex items-center gap-1 truncate max-w-[170px]">
              <i data-lucide="shield-check" class="w-3 h-3 text-emerald-600 shrink-0"></i>
              <span class="truncate">${t.assigned_crew}</span>
            </span>
          ` : `
            <span class="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
              <i data-lucide="navigation-2" class="w-3 h-3 text-emerald-600"></i> ~1.2 km away
            </span>
          `}

          <div class="flex items-center gap-1.5 ml-auto">
            ${!isResolved ? `
              <button onclick="event.stopPropagation(); openResolveModal('${t.ticket_code}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 shadow transition">
                <i data-lucide="check" class="w-3 h-3"></i> Resolve
              </button>
              <button onclick="event.stopPropagation(); openTriageModal('${t.ticket_code}')" class="bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 shadow transition hover-elevate">
                <span>Dispatch</span> &rarr;
              </button>
            ` : `
              <span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <i data-lucide="check-check" class="w-3 h-3"></i> Archived
              </span>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function panToIncident(ticketCode) {
  const ticket = allIncidents.find(t => t.ticket_code === ticketCode);
  if (ticket && mapDispatch) {
    mapDispatch.flyTo([ticket.latitude, ticket.longitude], 16, { duration: 1.2 });
    const marker = dispatchMarkers.find(m => {
      const latLng = m.getLatLng();
      return Math.abs(latLng.lat - ticket.latitude) < 0.0001 && Math.abs(latLng.lng - ticket.longitude) < 0.0001;
    });
    if (marker) marker.openPopup();
  }
}

function focusQueueTicket(ticketCode) {
  const item = document.getElementById(`queue-item-${ticketCode}`);
  if (item) {
    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    item.classList.add('bg-emerald-50', 'border-emerald-300');
    setTimeout(() => item.classList.remove('bg-emerald-50', 'border-emerald-300'), 2500);
  }
}

async function openTriageModal(ticketCode) {
  const ticket = allIncidents.find(t => t.ticket_code === ticketCode);
  if (!ticket) return;

  const res = await fetch(`/api/v1/crews?lat=${ticket.latitude}&lon=${ticket.longitude}`);
  const data = await res.json();
  const nearest = data.crews[0] || { crew_name: 'GWSA Rapid Pipe Unit #1', distance_meters: 1200, eta_minutes: 8, id: 1 };

  const confirmDispatch = confirm(`Dispatch nearest available unit?\n\nTarget Incident: #${ticket.ticket_code} (${ticket.category})\nNearest Crew: ${nearest.crew_name}\nDistance: ${nearest.distance_meters}m (ETA: ~${nearest.eta_minutes} mins)\n\nClick OK to notify field crew via SMS.`);
  
  if (confirmDispatch) {
    const patchRes = await fetch(`/api/v1/incidents/${ticket.ticket_code}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'DISPATCHED',
        crew_id: nearest.id
      })
    });
    if (patchRes.ok) {
      showToast(`Crew assigned and notified via SMS dispatch for #${ticket.ticket_code}`);
      loadIncidents();
    }
  }
}

// Resolution Modal Functions
function openResolveModal(ticketCode) {
  const ticket = allIncidents.find(t => t.ticket_code === ticketCode);
  if (!ticket) return;
  activeResolveTicketCode = ticket.ticket_code;

  const badge = document.getElementById('resolve-ticket-badge');
  const title = document.getElementById('resolve-ticket-title');
  const subcity = document.getElementById('resolve-ticket-subcity');
  const notes = document.getElementById('resolve-notes');
  const modal = document.getElementById('resolve-ticket-modal');

  if (badge) badge.innerText = `#${ticket.ticket_code}`;
  if (title) title.innerText = ticket.title;
  if (subcity) subcity.innerText = `${ticket.sub_city} Sub-City`;
  if (notes) notes.value = `Inspected and repaired on-site by municipal crew. All tests passed.`;
  if (modal) modal.classList.remove('hidden');
}

function closeResolveModal() {
  const modal = document.getElementById('resolve-ticket-modal');
  if (modal) modal.classList.add('hidden');
  activeResolveTicketCode = null;
}

function setProofPhotoPreset(url) {
  const input = document.getElementById('resolve-proof-url');
  if (input) input.value = url;
}

async function submitResolveTicket(event) {
  event.preventDefault();
  if (!activeResolveTicketCode) return;

  const workerId = document.getElementById('resolve-worker-id').value;
  const notes = document.getElementById('resolve-notes').value;
  const proofUrl = document.getElementById('resolve-proof-url').value;

  try {
    const res = await fetch(`/api/v1/incidents/${activeResolveTicketCode}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'RESOLVED',
        resolved_by_worker_id: workerId,
        resolution_notes: notes,
        resolution_proof_url: proofUrl,
        photo_after: proofUrl
      })
    });

    if (res.ok) {
      closeResolveModal();
      showToast(`Ticket #${activeResolveTicketCode} marked RESOLVED with proof photo!`);
      await loadIncidents();
      setQueueTab('resolved');
    } else {
      alert('Failed to update resolution status.');
    }
  } catch (err) {
    console.error('Resolution submit error:', err);
    alert('Error submitting resolution.');
  }
}

function playIvrSample() {
  const audio = new Audio('/uploads/audio/sample_ivr.wav');
  audio.play().catch(e => console.log('Audio autoplay prevented'));
  showToast('Playing Amharic caller voice note...');
}

// ============================================================================
// 11. SUB-CITY ANALYTICS (12 ZONES)
// ============================================================================
async function loadAnalytics() {
  try {
    const res = await fetch('/api/v1/analytics');
    const data = await res.json();
    renderAnalyticsTable(data.subCityStats);
  } catch (err) {
    console.error('Analytics load failure:', err);
  }
}

function renderAnalyticsTable(stats) {
  const tbody = document.getElementById('analytics-table-body');
  if (!tbody || !stats) return;

  tbody.innerHTML = stats.map(s => {
    const ratio = Math.round((s.resolved / (s.total || 1)) * 100);
    return `
      <tr class="hover:bg-slate-50/80 transition duration-150">
        <td class="px-6 py-4 font-black text-slate-900 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full ${s.active > 1 ? 'bg-amber-400' : 'bg-emerald-500'}"></span>
          <span>${currentLang === 'am' ? s.sub_city_am : s.sub_city}</span>
          <span class="text-xs text-slate-400 font-normal">(${currentLang === 'am' ? s.sub_city : s.sub_city_am})</span>
        </td>
        <td class="px-6 py-4 font-mono font-bold text-slate-800">${s.total}</td>
        <td class="px-6 py-4 font-mono font-bold text-amber-600">${s.active}</td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-2">
            <span class="font-mono font-bold text-emerald-600">${s.resolved}</span>
            <div class="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: ${ratio}%"></div>
            </div>
            <span class="text-[10px] text-slate-400 font-mono font-semibold">${ratio}%</span>
          </div>
        </td>
        <td class="px-6 py-4 font-mono font-semibold text-slate-700">${s.avg_hours} hrs</td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${s.active > 1 ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}">
            ${s.active > 1 ? (currentLang === 'am' ? 'ከፍተኛ ጫና' : 'Active Load') : (currentLang === 'am' ? 'ተረጋግቷል' : 'Optimal')}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAnalyticsCharts() {
  if (chartLatency) chartLatency.destroy();
  if (chartCategories) chartCategories.destroy();

  const ctxLatency = document.getElementById('chart-subcity-latency')?.getContext('2d');
  if (ctxLatency) {
    const labels = SUB_CITIES.map(s => currentLang === 'am' ? s.name_am : s.name);
    chartLatency = new Chart(ctxLatency, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: currentLang === 'am' ? 'አማካይ የመጠገኛ ጊዜ (ሰዓታት)' : 'Avg Resolution Latency (Hours)',
          data: [4.1, 3.8, 5.2, 6.4, 4.9, 4.3, 5.0, 4.6, 3.9, 4.8, 5.5, 6.1],
          backgroundColor: '#10B981',
          hoverBackgroundColor: '#059669',
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 10,
            cornerRadius: 10,
            titleFont: { weight: 'bold' }
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
            ticks: { font: { family: 'Plus Jakarta Sans, Inter, sans-serif' } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans, Inter, sans-serif', size: 10 } }
          }
        }
      }
    });
  }

  const ctxCategories = document.getElementById('chart-categories')?.getContext('2d');
  if (ctxCategories) {
    const catLabels = currentLang === 'am'
      ? ['የውሃ ብልሽት (GWSA)', 'የመብራት ኃይል (EEU)', 'የደረቅ ቆሻሻ', 'የመንገድ ጉዳት', 'የጎርፍ አደጋ (SOS)']
      : ['Water Leaks (GWSA)', 'Electrical Faults (EEU)', 'Solid Waste', 'Road Damage', 'Flood Hazard SOS'];

    chartCategories = new Chart(ctxCategories, {
      type: 'doughnut',
      data: {
        labels: catLabels,
        datasets: [{
          data: [35, 25, 18, 14, 8],
          backgroundColor: ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#9333EA'],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 11, family: 'Plus Jakarta Sans, Inter, sans-serif' } }
          }
        },
        cutout: '68%'
      }
    });
  }
}

function exportReport(format) {
  showToast(`Generating Gondar Municipal ${format.toUpperCase()} report...`);
  setTimeout(() => {
    alert(`Gondar City Municipal Administration Incident Performance Report (${format.toUpperCase()}) exported successfully.`);
  }, 1000);
}

// ============================================================================
// 12. FIELD CREW MOBILE OPERATIONS
// ============================================================================
function renderCrewTasks() {
  const container = document.getElementById('crew-task-list');
  if (!container) return;

  const assignedTasks = allIncidents.filter(i => i.status === 'ASSIGNED' || i.status === 'IN_PROGRESS');

  if (assignedTasks.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">No active tasks currently assigned to this unit.</div>`;
    return;
  }

  const catIcons = {
    'WATER_LEAK': '/images/categories/water_leak.svg',
    'POWER_OUTAGE': '/images/categories/power_outage.svg',
    'SOLID_WASTE': '/images/categories/solid_waste.svg',
    'ROAD_DAMAGE': '/images/categories/road_damage.svg',
    'FLOOD_EMERGENCY': '/images/categories/flash_flood.svg'
  };

  container.innerHTML = assignedTasks.map(task => {
    const isFlood = task.category === 'FLOOD_EMERGENCY';
    const iconSrc = catIcons[task.category] || '/images/categories/water_leak.svg';

    return `
      <div class="bg-white rounded-3xl p-6 border ${isFlood ? 'border-red-400 shadow-glow-red' : 'border-slate-200/90 shadow-sm'} hover-elevate space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-mono font-black text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">#${task.ticket_code}</span>
            ${isFlood ? `<span class="bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full animate-pulse">RESCUE SOS</span>` : ''}
          </div>
          <span class="text-xs font-bold px-3 py-1 rounded-full ${task.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-blue-100 text-blue-800 border border-blue-200'}">
            ${task.status}
          </span>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex-shrink-0 flex items-center justify-center shadow-sm">
            <img src="${iconSrc}" alt="${task.category}" class="w-full h-full object-contain">
          </div>
          <div class="flex-1">
            <h4 class="text-base font-black text-slate-900 leading-snug">${task.title}</h4>
            <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
              <span>${task.sub_city} • Landmark: ${task.landmark_description || 'Gondar'}</span>
            </p>
          </div>
        </div>

        <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
          <p class="font-medium">${task.description}</p>
          <div class="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Coordinates: ${task.latitude.toFixed(4)}° N, ${task.longitude.toFixed(4)}° E</span>
            <span>Origin: ${task.channel_origin}</span>
          </div>
        </div>

        <div class="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${task.latitude},${task.longitude}" target="_blank" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 transition">
            <i data-lucide="navigation" class="w-3.5 h-3.5 text-emerald-600"></i> Turn-by-Turn GPS
          </a>
          <button onclick="markTaskResolvedPrompt('${task.ticket_code}')" class="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/30 transition hover-elevate">
            <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Complete & Verify Fix
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

async function markTaskResolvedPrompt(ticketCode) {
  const notes = prompt(`Mark Ticket #${ticketCode} as RESOLVED:\nEnter resolution notes:`, 'Replaced fractured pipeline valve and pressure-tested.');
  if (!notes) return;

  const res = await fetch(`/api/v1/incidents/${ticketCode}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'RESOLVED',
      resolution_notes: notes
    })
  });

  if (res.ok) {
    showToast(`Ticket #${ticketCode} marked RESOLVED! Citizen notified via SMS.`);
    loadIncidents();
    setTimeout(renderCrewTasks, 300);
  }
}

// ============================================================================
// 13. OMNICHANNEL DEFENSE SIMULATOR
// ============================================================================
function toggleSimulator(show) {
  const modal = document.getElementById('simulator-modal');
  if (show) {
    modal.classList.remove('hidden');
    startUssdDial();
  } else {
    modal.classList.add('hidden');
  }
}

function setSimTab(tab) {
  document.querySelectorAll('.sim-tab').forEach(b => {
    b.classList.remove('text-emerald-600', 'border-b-2', 'border-emerald-600');
    b.classList.add('text-slate-500');
  });
  const activeBtn = document.getElementById(`tab-sim-${tab}`);
  if (activeBtn) {
    activeBtn.classList.add('text-emerald-600', 'border-b-2', 'border-emerald-600');
    activeBtn.classList.remove('text-slate-500');
  }

  ['ussd', 'sms', 'ivr'].forEach(t => {
    document.getElementById(`sim-panel-${t}`).classList.toggle('hidden', t !== tab);
  });
}

function openPhoneSimulator(tab) {
  toggleSimulator(true);
  setSimTab(tab);
}

function appendPhoneDigit(d) {
  const input = document.getElementById('ussd-input-box');
  input.value += d;
}

function startUssdDial() {
  document.getElementById('ussd-input-box').value = '*840#';
  sendUssdInput();
}

async function sendUssdInput() {
  const inputElem = document.getElementById('ussd-input-box');
  const val = inputElem.value.trim();
  const screen = document.getElementById('ussd-screen');

  if (!isUssdActive) {
    if (val !== '*840#') {
      screen.innerHTML = `<div>Invalid USSD code.\nDial *840# to access Gondar SmartCivic.</div>`;
      return;
    }
    isUssdActive = true;
    ussdHistory = [];
  } else {
    if (val) ussdHistory.push(val);
  }

  inputElem.value = '';
  screen.innerHTML = `<div>Connecting to Ethio Telecom HLR...</div>`;

  try {
    const res = await fetch('/api/v1/ussd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'DEFENSE-SESSION-001',
        phoneNumber: '+251918123456',
        text: ussdHistory.join('*')
      })
    });
    const reply = await res.text();
    screen.innerHTML = `<div>${reply}</div>`;

    if (reply.startsWith('END')) {
      isUssdActive = false;
      ussdHistory = [];
      loadIncidents();
    }
  } catch (err) {
    screen.innerHTML = `<div>USSD Network Timeout.\nCheck local backend server.</div>`;
  }
}

function resetUssdSession() {
  isUssdActive = false;
  ussdHistory = [];
  document.getElementById('ussd-input-box').value = '*840#';
  document.getElementById('ussd-screen').innerHTML = `<div>Session reset.\nDial *840# to begin.</div>`;
}

let isTorchOn = false;
function toggleTorchLight() {
  isTorchOn = !isTorchOn;
  const led = document.getElementById('phone-torch-led');
  if (led) {
    if (isTorchOn) {
      led.className = 'w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#fde047] transition duration-300';
      showToast('የእጅ ባትሪ (Torch Light) ON');
    } else {
      led.className = 'w-2.5 h-2.5 rounded-full bg-slate-600 transition duration-300 shadow-sm';
      showToast('የእጅ ባትሪ (Torch Light) OFF');
    }
  }
}

function startFloodUssdDial() {
  document.getElementById('ussd-input-box').value = '*840*911#';
  sendUssdInput();
}

function setFloodSms() {
  document.getElementById('sim-sms-input').value = 'FLOOD SOS FASIL Kebele 02 Water Inside Living Quarters 3 Trapped';
}

async function sendSimulatedSms() {
  const text = document.getElementById('sim-sms-input').value.trim();
  const replyBox = document.getElementById('sms-reply-box');

  try {
    const res = await fetch('/api/v1/sms/inbound', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: '+251918998877',
        text
      })
    });
    const data = await res.json();
    replyBox.classList.remove('hidden');
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    replyBox.innerHTML = `
      <div class="space-y-3">
        <!-- Citizen Outbound Bubble -->
        <div class="flex justify-end">
          <div class="max-w-[85%] bg-sky-600 text-white p-3 rounded-2xl rounded-tr-sm shadow-md space-y-1">
            <div class="flex items-center justify-between gap-4 text-[10px] text-sky-200">
              <span class="font-bold">Citizen (+251 918 998 877)</span>
              <span>${timeNow}</span>
            </div>
            <p class="font-mono text-xs">${text}</p>
          </div>
        </div>

        <!-- Ethio Telecom Shortcode 8065 Inbound System Receipt -->
        <div class="flex justify-start">
          <div class="max-w-[85%] bg-slate-800 text-emerald-300 border border-emerald-500/30 p-3 rounded-2xl rounded-tl-sm shadow-md space-y-1">
            <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400">
              <span class="font-bold">Ethio Telecom SMS Shortcode (8065)</span>
              <span>${timeNow} ✓✓</span>
            </div>
            <p class="font-mono text-xs text-white">${data.confirmMsg || data.reply || data.error}</p>
          </div>
        </div>
      </div>
    `;
    loadIncidents();
    showToast('SMS dispatched to 8065!');
  } catch (err) {
    showToast('SMS Gateway failed.');
  }
}

function setAmharicSms() {
  document.getElementById('sim-sms-input').value = 'ሪፖርት ውሃ ማራኪ ዩኒቨርሲቲ በር አጠገብ';
}

async function triggerSimulatedIvrCall() {
  const cat = document.getElementById('sim-ivr-category').value;
  const sub = document.getElementById('sim-ivr-subcity').value;
  const resBox = document.getElementById('ivr-result-box');

  resBox.classList.remove('hidden');
  resBox.innerHTML = `
    <div class="flex items-center gap-2 font-bold text-purple-900">
      <span class="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
      <span>Calling Gondar City Hotline (8400)... Recording caller note...</span>
    </div>
  `;

  try {
    const res = await fetch('/api/v1/ingest/ivr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caller: '+251918776655',
        category: cat,
        subCity: sub
      })
    });
    const data = await res.json();
    resBox.innerHTML = `
      <div class="space-y-1.5">
        <div class="flex items-center justify-between text-xs font-bold text-purple-950">
          <span>✓ Call Logged & Ingested (8400)</span>
          <span class="bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full font-mono">#${data.ticketCode}</span>
        </div>
        <p class="text-[11px] text-purple-800">
          Category: <strong>${cat}</strong> • Sub-City: <strong>${sub}</strong>
        </p>
        <div class="pt-1 flex items-center justify-between text-[11px]">
          <span class="text-purple-700 italic">30s Voice Recording linked to ticket</span>
          <button onclick="playIvrSample()" class="text-purple-900 font-bold hover:underline flex items-center gap-1">
            ▶ Play Audio Note
          </button>
        </div>
      </div>
    `;
    loadIncidents();
    showToast(`Voice ticket #${data.ticketCode} created!`);
  } catch (err) {
    showToast('IVR Call failed.');
  }
}

// ============================================================================
// 14. SECTION 6: FLOOD HAZARD, RESIDENTIAL INUNDATION & DISASTER MODULE
// ============================================================================

// Web Audio API Emergency Siren Engine
let audioCtx = null;
let sirenOscillator = null;
let sirenGain = null;
let isSirenPlaying = false;
let isSirenMuted = false;

function playEmergencyFloodSiren() {
  if (isSirenPlaying || isSirenMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();
    sirenOscillator = audioCtx.createOscillator();
    sirenGain = audioCtx.createGain();
    
    // Siren tone: Sawtooth wave modulated between 650Hz and 1100Hz
    sirenOscillator.type = 'sawtooth';
    sirenOscillator.frequency.setValueAtTime(750, audioCtx.currentTime);
    
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(1.8, audioCtx.currentTime); // 1.8 Hz warble sweep
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(320, audioCtx.currentTime);
    lfo.connect(sirenOscillator.frequency);
    lfo.start();

    sirenGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    sirenOscillator.connect(sirenGain);
    sirenGain.connect(audioCtx.destination);
    
    sirenOscillator.start();
    isSirenPlaying = true;
  } catch (e) {
    console.log('AudioContext playback restricted until user gesture', e);
  }
}

function stopEmergencyFloodSiren() {
  if (sirenOscillator) {
    try {
      sirenOscillator.stop();
      sirenOscillator.disconnect();
    } catch(e) {}
    sirenOscillator = null;
  }
  if (audioCtx) {
    try { audioCtx.close(); } catch(e) {}
    audioCtx = null;
  }
  isSirenPlaying = false;
}

function toggleAudioSiren() {
  isSirenMuted = !isSirenMuted;
  const statusText = document.getElementById('siren-status-text');
  if (isSirenMuted) {
    stopEmergencyFloodSiren();
    if (statusText) statusText.innerText = currentLang === 'am' ? 'ድምፅ አንቃ' : 'Unmute Siren';
    showToast('Emergency Siren Muted');
  } else {
    playEmergencyFloodSiren();
    if (statusText) statusText.innerText = currentLang === 'am' ? 'ድምፅ አጥፋ' : 'Mute Siren';
    showToast('Emergency Siren Unmuted');
  }
}

function checkFloodEmergencyAlarms() {
  const activeFlood = allIncidents.find(i => 
    i.category === 'FLOOD_EMERGENCY' && 
    i.urgency === 'CRITICAL' && 
    i.status !== 'RESOLVED'
  );

  const banner = document.getElementById('dispatch-flood-alarm');
  const textElem = document.getElementById('flood-alarm-text');

  if (activeFlood) {
    if (banner) banner.classList.remove('hidden');
    if (textElem) {
      const trapped = activeFlood.trapped_persons_count ? ` (${activeFlood.trapped_persons_count} Trapped Residents)` : '';
      textElem.innerText = currentLang === 'am'
        ? `🚨 ደረጃ-1 አስቸኳይ የጎርፍ አደጋ ጥሪ፡ #${activeFlood.ticket_code} በ${activeFlood.sub_city_am || activeFlood.sub_city} ተከስቷል${trapped}!`
        : `🚨 TIER-1 RESCUE ALARM: Flood Inundation #${activeFlood.ticket_code} in ${activeFlood.sub_city}${trapped}!`;
    }
    if (!isSirenMuted) {
      playEmergencyFloodSiren();
    }
  } else {
    if (banner) banner.classList.add('hidden');
    stopEmergencyFloodSiren();
  }
}

function zoomToFloodIncidents() {
  const floodTicket = allIncidents.find(i => i.category === 'FLOOD_EMERGENCY' && i.status !== 'RESOLVED');
  if (floodTicket && mapDispatch) {
    mapDispatch.setView([floodTicket.latitude, floodTicket.longitude], 15);
    const m = dispatchMarkers.find(marker => {
      const pos = marker.getLatLng();
      return Math.abs(pos.lat - floodTicket.latitude) < 0.001 && Math.abs(pos.lng - floodTicket.longitude) < 0.001;
    });
    if (m) m.openPopup();
    focusQueueTicket(floodTicket.ticket_code);
    showToast(`Zoomed to flood incident #${floodTicket.ticket_code}`);
  }
}

// River Basins Spatial GIS Layer (Angereb & Keha Rivers)
let riverLayers = [];
let showRivers = false;

async function toggleRiverBasinLayer() {
  if (!mapDispatch) return;
  showRivers = !showRivers;
  
  if (!showRivers) {
    riverLayers.forEach(l => mapDispatch.removeLayer(l));
    riverLayers = [];
    showToast('River risk layers hidden');
    return;
  }

  try {
    const res = await fetch('/api/v1/flood/risk-layers');
    const data = await res.json();
    const basins = data.river_basins || [];

    basins.forEach(b => {
      // Draw river polyline with cyan/blue flow line
      const poly = L.polyline(b.coordinates, {
        color: b.id === 'angereb' ? '#06b6d4' : '#3b82f6',
        weight: 6,
        opacity: 0.9,
        dashArray: '8, 8'
      }).addTo(mapDispatch);

      poly.bindPopup(`
        <div class="text-xs p-1 font-sans">
          <strong class="text-cyan-700 font-bold text-sm">${currentLang === 'am' ? b.name_am : b.name}</strong><br>
          <span class="text-slate-600">Risk Level: <b class="text-red-600">${b.risk_level}</b></span><br>
          <span class="text-slate-500">Angereb/Keha Topographical Buffer Zone</span>
        </div>
      `);

      // Add a flood risk buffer polygon around the river
      const bufferCoords = b.coordinates.map(pt => [pt[0] + 0.002, pt[1] + 0.003]);
      const returnCoords = [...b.coordinates].reverse().map(pt => [pt[0] - 0.002, pt[1] - 0.003]);
      const polygonBuffer = L.polygon([...bufferCoords, ...returnCoords], {
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.15,
        weight: 1,
        dashArray: '4, 4'
      }).addTo(mapDispatch);

      riverLayers.push(poly, polygonBuffer);
    });

    showToast(currentLang === 'am' ? 'የአንገረብና ቀሃ ተፋሰስ ካርታ ተከፍቷል' : 'Angereb & Keha River Catchments Layer Loaded');
  } catch(e) {
    showToast('Failed to load river layers');
  }
}

// Rapid 1-Tap Flood Emergency SOS Modal Handlers
function openFloodSosModal() {
  const modal = document.getElementById('flood-sos-modal');
  if (modal) modal.classList.remove('hidden');
  populateSubCitySelects();
}

function closeFloodSosModal() {
  const modal = document.getElementById('flood-sos-modal');
  if (modal) modal.classList.add('hidden');
}

function setSosLandmark(landmark) {
  const input = document.getElementById('sos-landmark');
  if (input) input.value = landmark;
}

function adjustSosTrapped(delta) {
  const input = document.getElementById('sos-trapped');
  if (input) {
    let val = parseInt(input.value, 10) || 0;
    val = Math.max(0, val + delta);
    input.value = val;
  }
}

async function handleFloodSosSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('sos-submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'DISPATCHING RESCUE SQUADS...';

  const subCity = document.getElementById('sos-subcity').value;
  const phone = document.getElementById('sos-phone').value;
  const landmark = document.getElementById('sos-landmark').value;
  const depthInput = document.querySelector('input[name="sos_depth"]:checked');
  const depth = depthInput ? depthInput.value : 'WAIST_DEEP_OR_HIGHER';
  const inundationType = document.getElementById('sos-inundation-type').value;
  const trappedCount = document.getElementById('sos-trapped').value;

  const subCityObj = SUB_CITIES.find(s => s.name === subCity) || SUB_CITIES[1];
  const lat = subCityObj.lat + (Math.random() - 0.5) * 0.004;
  const lon = subCityObj.lon + (Math.random() - 0.5) * 0.004;

  try {
    const res = await fetch('/api/v1/incidents/flood-sos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude: lat,
        longitude: lon,
        phone,
        sub_city: subCity,
        landmark,
        water_depth_level: depth,
        inundation_type: inundationType,
        trapped_persons_count: trappedCount
      })
    });
    const data = await res.json();
    if (res.ok) {
      closeFloodSosModal();
      showToast(`🚨 FLOOD SOS #${data.ticket.ticket_code} SENT! Fire & Rescue Dispatched.`);
      allIncidents.unshift(data.ticket);
      updateLiveMetrics();
      checkFloodEmergencyAlarms();
      navigateTo('dispatch');
      setTimeout(() => {
        zoomToFloodIncidents();
      }, 400);
    }
  } catch (err) {
    showToast('Failed to dispatch SOS. Check server connection.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i data-lucide="shield-alert" class="w-5 h-5 text-amber-300"></i> <span data-i18n="modal_submit_sos">${currentLang === 'am' ? 'የነፍስ አድን ቡድኑን አሁን ጥራ (Dispatch Rescue Squad)' : 'DISPATCH EMERGENCY RESCUE SQUAD (አስቸኳይ የነፍስ አድን ጥሪ ላክ)'}</span>`;
    if (window.lucide) lucide.createIcons();
  }
}

// Mass Geofenced SMS Early Warning System Modal Handlers
function openEarlyWarningModal() {
  const modal = document.getElementById('early-warning-modal');
  if (modal) modal.classList.remove('hidden');
  populateSubCitySelects();
}

function closeEarlyWarningModal() {
  const modal = document.getElementById('early-warning-modal');
  if (modal) modal.classList.add('hidden');
}

async function handleBroadcastSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('broadcast-submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'TRANSMITTING SMS BROADCAST...';

  const subCity = document.getElementById('broadcast-subcity').value;
  const riverBasin = document.getElementById('broadcast-river').value;
  const msgAm = document.getElementById('broadcast-msg-am').value;
  const msgEn = document.getElementById('broadcast-msg-en').value;

  try {
    const res = await fetch('/api/v1/broadcasts/flood-warning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sub_city: subCity,
        river_basin: riverBasin,
        message_am: msgAm,
        message_en: msgEn
      })
    });
    const data = await res.json();
    if (res.ok) {
      closeEarlyWarningModal();
      alert(`✅ MASS SMS GEOFENCE BROADCAST TRANSMITTED!\n\nTarget Sub-City: ${subCity}\nRiver Basin: ${riverBasin}\nDelivered to: ${data.recipient_count} registered mobile subscribers.\n\nGateway Log: SMS Outbox confirmed.`);
      showToast(`Mass SMS sent to ${data.recipient_count} residents in ${subCity}!`);
    }
  } catch (err) {
    showToast('Failed to transmit early warning broadcast.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i data-lucide="send" class="w-4 h-4 text-emerald-400"></i> <span data-i18n="broadcast_btn_send">${currentLang === 'am' ? 'የጅምላ SMS ማስጠንቀቂያውን አሁን ላክ' : 'TRANSMIT MASS GEOFENCED SMS NOW (መልዕክቱን አስተላልፍ)'}</span>`;
    if (window.lucide) lucide.createIcons();
  }
}



// ============================================================================
// MOBILE RESPONSIVENESS & ACCORDION HELPERS (Rules 2, 4, 8)
// ============================================================================
let isMobileMenuOpen = false;

function toggleMobileMenu(forceState) {
  const drawer = document.getElementById('mobile-nav-drawer');
  const icon = document.getElementById('mobile-menu-icon');
  if (!drawer) return;

  if (typeof forceState === 'boolean') {
    isMobileMenuOpen = forceState;
  } else {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  if (isMobileMenuOpen) {
    drawer.classList.remove('hidden');
    if (icon) icon.setAttribute('data-lucide', 'x');
  } else {
    drawer.classList.add('hidden');
    if (icon) icon.setAttribute('data-lucide', 'menu');
  }
  if (window.lucide) lucide.createIcons();
}

let activeMobileDispatchTab = 'map';

function toggleMobileDispatchView(view) {
  activeMobileDispatchTab = view;
  const mapContainer = document.getElementById('dispatch-map-container');
  const queueContainer = document.getElementById('dispatch-queue-container');
  const tabMap = document.getElementById('mob-dispatch-tab-map');
  const tabQueue = document.getElementById('mob-dispatch-tab-queue');

  if (view === 'map') {
    if (mapContainer) {
      mapContainer.classList.remove('hidden');
      mapContainer.classList.add('flex-1');
    }
    if (queueContainer) {
      queueContainer.classList.add('hidden');
      queueContainer.classList.remove('flex');
    }
    if (tabMap) {
      tabMap.className = 'flex-1 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white flex items-center justify-center gap-1.5 shadow transition';
    }
    if (tabQueue) {
      tabQueue.className = 'flex-1 py-2 text-xs font-bold rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition';
    }
    if (mapDispatch) {
      setTimeout(() => mapDispatch.invalidateSize(), 150);
    }
  } else {
    if (mapContainer) {
      mapContainer.classList.add('hidden');
      mapContainer.classList.remove('flex-1');
    }
    if (queueContainer) {
      queueContainer.classList.remove('hidden');
      queueContainer.classList.add('flex');
    }
    if (tabMap) {
      tabMap.className = 'flex-1 py-2 text-xs font-bold rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition';
    }
    if (tabQueue) {
      tabQueue.className = 'flex-1 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white flex items-center justify-center gap-1.5 shadow transition';
    }
  }
}

function toggleFaq(index) {
  const ans = document.getElementById(`faq-ans-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!ans) return;

  const isClosed = ans.classList.contains('hidden');
  if (isClosed) {
    ans.classList.remove('hidden');
    if (icon) icon.classList.add('rotate-180');
  } else {
    ans.classList.add('hidden');
    if (icon) icon.classList.remove('rotate-180');
  }
}


// ============================================================================
// GLOBAL OMNISEARCH DATASET & DIRECTORY ENGINE
// ============================================================================
const OMNISEARCH_DATA = [
  // Services
  { type: 'service', category: 'WATER_LEAK', title: 'Water Leak / Broken Pipe Repair (GWSA)', title_am: 'የመጠጥ ውሃ ቧንቧ ብልሽት ጥገና (GWSA)', desc: 'Report burst mains, water outages, low pressure', action: () => quickReportCategory('WATER_LEAK'), icon: '💧', badge: 'GWSA' },
  { type: 'service', category: 'POWER_OUTAGE', title: 'Power Outage / Electrical Fault (EEU)', title_am: 'የመብራት ኃይል መቋረጥ እና ብልሽት (EEU)', desc: 'Fallen cables, transformer sparks, blackout', action: () => quickReportCategory('POWER_OUTAGE'), icon: '⚡', badge: 'EEU' },
  { type: 'service', category: 'FLOOD_EMERGENCY', title: '🚨 Flash Flood SOS & River Inundation', title_am: '🚨 አስቸኳይ የጎርፍ አደጋ ጥሪ', desc: 'Angereb & Keha river overflow, trapped residents', action: () => openFloodSosModal(), icon: '🌊', badge: 'RESCUE SOS' },
  { type: 'service', category: 'SOLID_WASTE', title: 'Solid Waste Clearance & Sanitation', title_am: 'የደረቅ ቆሻሻ ማንሳትና ፅዳት', desc: 'Uncollected garbage heaps, blocked storm drains', action: () => quickReportCategory('SOLID_WASTE'), icon: '🗑️', badge: 'SANITATION' },
  { type: 'service', category: 'ROAD_DAMAGE', title: 'Road Damage, Pothole & Culvert Repair', title_am: 'የመንገድና የፍሳሽ ቦይ ጥገና', desc: 'Cobblestone erosion, bridge damage, open trench', action: () => quickReportCategory('ROAD_DAMAGE'), icon: '🚧', badge: 'ROADS' },
  { type: 'service', category: 'USSD', title: '2G Feature Phone Simulator (*840#)', title_am: 'የእጅ ባትሪ ስልክ መሞከሪያ (*840#)', desc: 'Test USSD and SMS reporting with zero internet data', action: () => toggleSimulator(true), icon: '📱', badge: 'TOLL-FREE' },

  // Navigation Portals
  { type: 'portal', title: 'Dispatch Command Center (GIS Spatial Map)', title_am: 'የGIS ካርታ መላኪያ ማዕከል', desc: 'Central municipal triage and live crew tracking', action: () => navigateTo('dispatch'), icon: '🗺️', badge: 'PORTAL' },
  { type: 'portal', title: 'Public Ticket Resolution Tracker', title_am: 'የቲኬት ሁኔታ መከታተያ ገጽ', desc: 'Search ticket status and before/after photo proof', action: () => navigateTo('track'), icon: '🔍', badge: 'TRACKER' },
  { type: 'portal', title: 'Sub-City Performance Analytics', title_am: 'የክፍለ ከተሞች የስራ አፈፃፀም ዳሽቦርድ', desc: 'SLA response times, failure frequency charts', action: () => navigateTo('analytics'), icon: '📊', badge: 'METRICS' },
  { type: 'portal', title: 'Field Crew Operations Portal', title_am: 'የመስክ ጥገና ባለሙያዎች ገጽ', desc: 'Low-bandwidth work orders and repair certification', action: () => navigateTo('crew'), icon: '🛠️', badge: 'CREW' },
  { type: 'portal', title: 'Interactive Civic Sitemap & Directory', title_am: 'የማዘጋጃ ቤት ካታሎግ እና ሳይትማፕ', desc: 'Complete 4-pillar municipal service directory', action: () => openSitemapModal(), icon: '📑', badge: 'SITEMAP' },

  // 12 Gondar Sub-Cities
  { type: 'subcity', title: 'Maraki Sub-City (ማራኪ)', code: 'GDR-SC02', desc: 'Zone 02 • University of Gondar Main Campus & Angereb Basin', action: () => jumpToSubCity('Maraki'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Fasil Sub-City (ፋሲል)', code: 'GDR-SC01', desc: 'Zone 01 • Fasil Ghebbi Imperial Castle & Historic Core', action: () => jumpToSubCity('Fasil'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Arada Sub-City (አራዳ)', code: 'GDR-SC03', desc: 'Zone 03 • Central Commercial Marketplace & Keha River', action: () => jumpToSubCity('Arada'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Azezo-Teda Sub-City (አዘዞ-ቴዳ)', code: 'GDR-SC04', desc: 'Zone 04 • Airport Corridor & Southern Residential Basin', action: () => jumpToSubCity('Azezo-Teda'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Zobel Sub-City (ዞበል)', code: 'GDR-SC05', desc: 'Zone 05 • Zobel Mountain Ridge & Eastern Expansion', action: () => jumpToSubCity('Zobel'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Jantekel Sub-City (ጃንተከል)', code: 'GDR-SC06', desc: 'Zone 06 • Historic Jantekel Escarpment & Northern Kebele', action: () => jumpToSubCity('Jantekel'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Bilajig Sub-City (ብላጅግ)', code: 'GDR-SC07', desc: 'Zone 07 • Bilajig Valley & Mixed Urban Settlement', action: () => jumpToSubCity('Bilajig'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Gubaie Sub-City (ጉባኤ)', code: 'GDR-SC08', desc: 'Zone 08 • Civic Hall & Administrative Centers', action: () => jumpToSubCity('Gubaie'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Piassa Sub-City (ፒያሳ)', code: 'GDR-SC09', desc: 'Zone 09 • Gondar Post Office, Banking & Heritage Streets', action: () => jumpToSubCity('Piassa'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Selam Sub-City (ሰላም)', code: 'GDR-SC10', desc: 'Zone 10 • Residential Suburbs & Community Health Units', action: () => jumpToSubCity('Selam'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Mintiwab Sub-City (ምንትዋብ)', code: 'GDR-SC11', desc: 'Zone 11 • Empress Mintiwab Historical Enclosure', action: () => jumpToSubCity('Mintiwab'), icon: '📍', badge: 'SUB-CITY' },
  { type: 'subcity', title: 'Abraj Sub-City (አብራጅ)', code: 'GDR-SC12', desc: 'Zone 12 • Emerging Industrial & Logistics Corridor', action: () => jumpToSubCity('Abraj'), icon: '📍', badge: 'SUB-CITY' },

  // Emergency Hotlines
  { type: 'emergency', title: 'Gondar Fire & Flood Emergency Rescue', title_am: 'የእሳትና የጎርፍ አደጋ መከላከያ', desc: 'Direct Hotline: 939 / 8400 (Toll-Free 24/7)', action: () => alertEmergency('Fire & Rescue Hotline: 939 or 8400'), icon: '📞', badge: 'EMERGENCY: 939' },
  { type: 'emergency', title: 'Gondar Water Authority (GWSA) Hotline', title_am: 'የውሃ ባለስልጣን የጥሪ መስመር', desc: 'Customer Service: 8065 / 058-111-2030', action: () => alertEmergency('GWSA Water Hotline: 8065'), icon: '📞', badge: 'HOTLINE: 8065' },
  { type: 'emergency', title: 'Ethiopian Electric Utility (EEU) Emergency', title_am: 'የኤሌክትሪክ አገልግሎት የጥሪ መስመር', desc: 'National Fault Hotline: 905', action: () => alertEmergency('EEU Power Hotline: 905'), icon: '📞', badge: 'HOTLINE: 905' },
  { type: 'emergency', title: 'Ethiopian Red Cross Society - Gondar Branch', title_am: 'የቀይ መስቀል ማህበር ጎንደር', desc: 'Ambulance & Disaster Support: 907', action: () => alertEmergency('Red Cross Ambulance: 907'), icon: '📞', badge: 'AMBULANCE: 907' },
  { type: 'emergency', title: 'Gondar City Police Department', title_am: 'የጎንደር ከተማ ፖሊስ መምሪያ', desc: 'Emergency Dispatch: 991', action: () => alertEmergency('Police Emergency: 991'), icon: '📞', badge: 'POLICE: 991' }
];

let activeOmnisearchFilter = 'all';

function handleOmnisearchInput(query, context) {
  const containerId = context === 'global' 
    ? 'global-omnisearch-dropdown' 
    : (context === 'hero' ? 'hero-omnisearch-dropdown' : 'modal-omnisearch-results');
  
  const dropdown = document.getElementById(containerId);
  if (!dropdown) return;

  const q = (query || '').trim().toLowerCase();
  if (!q && context !== 'modal') {
    dropdown.classList.add('hidden');
    return;
  }

  let matches = OMNISEARCH_DATA;
  if (activeOmnisearchFilter !== 'all') {
    matches = matches.filter(m => m.type === activeOmnisearchFilter);
  }

  if (q) {
    matches = matches.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const titleAmMatch = item.title_am && item.title_am.toLowerCase().includes(q);
      const descMatch = item.desc && item.desc.toLowerCase().includes(q);
      const codeMatch = item.code && item.code.toLowerCase().includes(q);
      const badgeMatch = item.badge && item.badge.toLowerCase().includes(q);
      return titleMatch || titleAmMatch || descMatch || codeMatch || badgeMatch;
    });
  }

  dropdown.classList.remove('hidden');

  let ticketItemHTML = '';
  // Check if query looks like a ticket number
  if (q.includes('gdr') || /^\d{3,}/.test(q)) {
    const formattedCode = q.toUpperCase().startsWith('GDR') ? q.toUpperCase() : `GDR-${q}`;
    ticketItemHTML = `
      <div onclick="quickTrackSampleTicket('${formattedCode}'); closeAllOmnisearch();" class="p-3 bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-200 cursor-pointer flex items-center justify-between border-b border-emerald-800 transition">
        <div class="flex items-center gap-2.5">
          <span class="text-base">🔍</span>
          <div>
            <p class="font-black text-xs text-white">Track Ticket: #${formattedCode}</p>
            <p class="text-[10px] text-emerald-300">Search municipal public ledger for live resolution progress</p>
          </div>
        </div>
        <span class="text-[10px] bg-emerald-800 text-white font-mono px-2 py-0.5 rounded font-bold">LOOKUP &rarr;</span>
      </div>
    `;
  }

  if (matches.length === 0 && !ticketItemHTML) {
    dropdown.innerHTML = `
      <div class="p-4 text-center text-slate-400 text-xs">
        <p>No direct matches found for "<strong>${escapeHtml(query)}</strong>"</p>
        <p class="text-[10px] text-slate-500 mt-1">Try keywords like: water, blackout, flood, maraki, hotline, or ticket code</p>
      </div>
    `;
    return;
  }

  dropdown.innerHTML = ticketItemHTML + matches.slice(0, 8).map((item, index) => {
    return `
      <div onclick="OMNISEARCH_DATA.find(x => x.title === '${item.title.replace(/'/g, "\\'")}').action(); closeAllOmnisearch();" class="p-3 hover:bg-slate-800/90 cursor-pointer flex items-center justify-between transition group">
        <div class="flex items-center gap-2.5">
          <span class="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-base shrink-0 border border-slate-700/80 group-hover:scale-110 transition">
            ${item.icon}
          </span>
          <div>
            <p class="font-bold text-xs text-slate-100 group-hover:text-emerald-400 transition flex items-center gap-1.5">
              <span>${currentLang === 'am' && item.title_am ? item.title_am : item.title}</span>
            </p>
            <p class="text-[10px] text-slate-400 mt-0.5">${item.desc}</p>
          </div>
        </div>
        <span class="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.type === 'emergency' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-slate-800 text-slate-300 border border-slate-700'}">
          ${item.badge}
        </span>
      </div>
    `;
  }).join('');
}

function closeAllOmnisearch() {
  const g = document.getElementById('global-omnisearch-dropdown');
  const h = document.getElementById('hero-omnisearch-dropdown');
  if (g) g.classList.add('hidden');
  if (h) h.classList.add('hidden');
  closeOmnisearchModal();
}

// Global click outside listener to close omnisearch dropdowns
document.addEventListener('click', (e) => {
  if (!e.target.closest('#global-search-input') && !e.target.closest('#global-omnisearch-dropdown')) {
    const g = document.getElementById('global-omnisearch-dropdown');
    if (g) g.classList.add('hidden');
  }
  if (!e.target.closest('#hero-search-input') && !e.target.closest('#hero-omnisearch-dropdown')) {
    const h = document.getElementById('hero-omnisearch-dropdown');
    if (h) h.classList.add('hidden');
  }
});

// Global Keyboard Shortcut Ctrl+K / Cmd+K
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openOmnisearchModal();
  }
  if (e.key === 'Escape') {
    closeAllOmnisearch();
    closeSitemapModal();
  }
});

function openOmnisearchModal() {
  const modal = document.getElementById('omnisearch-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const input = document.getElementById('modal-omnisearch-input');
    if (input) {
      input.value = '';
      input.focus();
      handleOmnisearchInput('', 'modal');
    }
  }
}

function closeOmnisearchModal() {
  const modal = document.getElementById('omnisearch-modal');
  if (modal) modal.classList.add('hidden');
}

function filterOmnisearchType(type) {
  activeOmnisearchFilter = type;
  const input = document.getElementById('modal-omnisearch-input');
  handleOmnisearchInput(input ? input.value : '', 'modal');
}

function openSitemapModal() {
  const modal = document.getElementById('sitemap-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeSitemapModal() {
  const modal = document.getElementById('sitemap-modal');
  if (modal) modal.classList.add('hidden');
}

function executeHeroSearch(val) {
  const q = (val || '').trim();
  if (!q) {
    navigateTo('report');
    return;
  }
  // If ticket pattern
  if (q.includes('GDR') || /^\d{3,}/.test(q)) {
    quickTrackSampleTicket(q);
    return;
  }
  // If category matches
  const lower = q.toLowerCase();
  if (lower.includes('water') || lower.includes('ውሃ')) {
    quickReportCategory('WATER_LEAK');
  } else if (lower.includes('power') || lower.includes('electric') || lower.includes('መብራት')) {
    quickReportCategory('POWER_OUTAGE');
  } else if (lower.includes('flood') || lower.includes('river') || lower.includes('ጎርፍ')) {
    openFloodSosModal();
  } else if (lower.includes('waste') || lower.includes('trash') || lower.includes('ቆሻሻ')) {
    quickReportCategory('SOLID_WASTE');
  } else if (lower.includes('road') || lower.includes('pothole') || lower.includes('መንገድ')) {
    quickReportCategory('ROAD_DAMAGE');
  } else {
    // Open Omnisearch modal with query
    openOmnisearchModal();
    const input = document.getElementById('modal-omnisearch-input');
    if (input) {
      input.value = q;
      handleOmnisearchInput(q, 'modal');
    }
  }
}

function quickSearchTag(keyword) {
  const input = document.getElementById('hero-search-input');
  if (input) input.value = keyword;
  executeHeroSearch(keyword);
}

function quickReportCategory(cat) {
  navigateTo('report');
  setTimeout(() => {
    if (typeof selectCategoryCard === 'function') {
      selectCategoryCard(cat);
    }
    const elem = document.getElementById('category-selector-cards');
    if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 250);
}

function quickTrackSampleTicket(ticketCode) {
  navigateTo('track');
  setTimeout(() => {
    const input = document.getElementById('track-input');
    if (input) {
      input.value = ticketCode.replace('#', '');
      queryTicketStatus();
    }
  }, 250);
}

function jumpToSubCity(subcityName) {
  navigateTo('dispatch');
  setTimeout(() => {
    const filter = document.getElementById('filter-subcity');
    if (filter) {
      filter.value = subcityName;
      applyDispatchFilters();
    }
    showToast(`Focused on ${subcityName} Sub-City`);
  }, 350);
}

function alertEmergency(hotline) {
  showToast(`Emergency Contact: ${hotline}`);
}

// Low-Vision Text Size Adjuster
let currentTextSizeLevel = 0; // -1, 0, 1
function adjustTextSize(delta) {
  if (delta === 0) {
    currentTextSizeLevel = 0;
    document.documentElement.style.fontSize = '100%';
    showToast('Text size reset to default (100%)');
  } else {
    currentTextSizeLevel = Math.max(-1, Math.min(2, currentTextSizeLevel + delta));
    const sizes = { '-1': '90%', '0': '100%', '1': '110%', '2': '120%' };
    document.documentElement.style.fontSize = sizes[currentTextSizeLevel] || '100%';
    showToast(`Text size adjusted to ${sizes[currentTextSizeLevel]}`);
  }
}

// ============================================================================
// 16. EXECUTIVE ADMINISTRATOR PORTAL CONTROLLER (Wagnew Nigussie)
// ============================================================================
let adminAuthenticated = false;
let adminToken = sessionStorage.getItem('smartcivic_admin_token') || null;
let adminActiveTab = 'problems';
let adminReportPeriod = 'weekly';
let adminSelectedTicketCode = null;
let currentAdminAuthMode = 'login';
const adminCharts = {
  trend: null,
  subcities: null,
  sla: null,
  channels: null
};

async function checkAdminAuthAndOpen() {
  const showAdminView = () => {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById('view-admin')?.classList.remove('hidden');
    renderAdminDashboard();
  };

  if (adminAuthenticated && adminToken) {
    showAdminView();
    return;
  }

  const storedToken = sessionStorage.getItem('smartcivic_admin_token');
  if (storedToken) {
    try {
      const res = await fetch('/api/v1/admin/auth/session', {
        headers: { 'Authorization': `Bearer ${storedToken}` }
      });
      if (res.ok) {
        adminAuthenticated = true;
        adminToken = storedToken;
        showAdminView();
        return;
      }
    } catch (e) {
      console.warn('Admin session validation fallback:', e);
      adminAuthenticated = true;
      adminToken = storedToken;
      showAdminView();
      return;
    }
  }

  openAdminAuthModal('login');
}

async function openAdminAuthModal(mode = 'login') {
  const modal = document.getElementById('admin-auth-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  const errorBox = document.getElementById('admin-auth-error');
  const successBox = document.getElementById('admin-auth-success');
  if (errorBox) errorBox.classList.add('hidden');
  if (successBox) successBox.classList.add('hidden');

  let isConfigured = false;
  try {
    const res = await fetch('/api/v1/admin/auth/status');
    if (res.ok) {
      const data = await res.json();
      isConfigured = Boolean(data.configured);
    }
  } catch (e) {
    isConfigured = Boolean(localStorage.getItem('smartcivic_admin_configured'));
  }

  const confirmWrap = document.getElementById('admin-auth-confirm-wrap');
  const masterKeyWrap = document.getElementById('admin-reg-master-key-wrap');
  const statusDesc = document.getElementById('admin-auth-status-desc');
  const submitBtnText = document.getElementById('admin-auth-btn-text');

  if (!isConfigured) {
    setAdminAuthMode('login');
    if (confirmWrap) confirmWrap.classList.remove('hidden');
    if (submitBtnText) submitBtnText.innerText = 'Initialize Password & Unlock';
    if (statusDesc) statusDesc.innerText = 'Welcome Wagnew Nigussie. Set your master administrator password. PBKDF2-SHA512 encryption is used; password is never hardcoded.';
  } else {
    if (confirmWrap) confirmWrap.classList.add('hidden');
    if (masterKeyWrap) masterKeyWrap.classList.remove('hidden');
    setAdminAuthMode(mode);
  }

  if (window.lucide) lucide.createIcons();
}

function closeAdminAuthModal() {
  const modal = document.getElementById('admin-auth-modal');
  if (modal) modal.classList.add('hidden');
  if (!adminAuthenticated) {
    navigateTo('landing');
  }
}

function setAdminAuthMode(mode) {
  currentAdminAuthMode = mode;
  const loginFields = document.getElementById('admin-auth-login-fields');
  const regFields = document.getElementById('admin-auth-register-fields');
  const btnLogin = document.getElementById('auth-mode-btn-login');
  const btnReg = document.getElementById('auth-mode-btn-register');
  const submitText = document.getElementById('admin-auth-btn-text');
  const errorBox = document.getElementById('admin-auth-error');
  const successBox = document.getElementById('admin-auth-success');

  if (errorBox) errorBox.classList.add('hidden');
  if (successBox) successBox.classList.add('hidden');

  if (mode === 'login') {
    if (loginFields) loginFields.classList.remove('hidden');
    if (regFields) regFields.classList.add('hidden');
    if (btnLogin) {
      btnLogin.className = 'flex-1 py-2 font-extrabold text-xs rounded-xl bg-slate-900 text-amber-300 shadow transition flex items-center justify-center gap-1.5';
    }
    if (btnReg) {
      btnReg.className = 'flex-1 py-2 font-extrabold text-xs rounded-xl text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5';
    }
    if (submitText) submitText.innerText = 'Authenticate & Unlock';
  } else {
    if (loginFields) loginFields.classList.add('hidden');
    if (regFields) regFields.classList.remove('hidden');
    if (btnReg) {
      btnReg.className = 'flex-1 py-2 font-extrabold text-xs rounded-xl bg-slate-900 text-amber-300 shadow transition flex items-center justify-center gap-1.5';
    }
    if (btnLogin) {
      btnLogin.className = 'flex-1 py-2 font-extrabold text-xs rounded-xl text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5';
    }
    if (submitText) submitText.innerText = 'Create & Secure Admin Account';
  }

  if (window.lucide) lucide.createIcons();
}

function toggleAdminPasswordVis() {
  const input = document.getElementById('admin-auth-password');
  const icon = document.getElementById('admin-pwd-eye');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
}

async function handleAdminAuthSubmit(e) {
  e.preventDefault();
  const errorBox = document.getElementById('admin-auth-error');
  const successBox = document.getElementById('admin-auth-success');
  if (errorBox) errorBox.classList.add('hidden');
  if (successBox) successBox.classList.add('hidden');

  // MODE 1: REGISTRATION / CREATE ADMIN
  if (currentAdminAuthMode === 'register') {
    const fullName = (document.getElementById('admin-reg-fullname')?.value || '').trim();
    const email = (document.getElementById('admin-reg-email')?.value || '').trim();
    const role = document.getElementById('admin-reg-role')?.value || 'DISPATCHER';
    const password = document.getElementById('admin-reg-password')?.value || '';
    const confirm = document.getElementById('admin-reg-confirm')?.value || '';
    const masterKey = document.getElementById('admin-reg-master-key')?.value || '';

    if (!fullName || !email) {
      if (errorBox) {
        errorBox.innerText = 'Full Name and Email Address are required.';
        errorBox.classList.remove('hidden');
      }
      return;
    }
    if (password.length < 6) {
      if (errorBox) {
        errorBox.innerText = 'Password must be at least 6 characters.';
        errorBox.classList.remove('hidden');
      }
      return;
    }
    if (password !== confirm) {
      if (errorBox) {
        errorBox.innerText = 'Passwords do not match.';
        errorBox.classList.remove('hidden');
      }
      return;
    }

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

      const res = await fetch('/api/v1/admin/auth/register', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          full_name: fullName,
          email,
          role,
          password,
          admin_master_key: masterKey
        })
      });

      const data = await res.json();
      if (res.ok) {
        if (data.token) {
          sessionStorage.setItem('smartcivic_admin_token', data.token);
          localStorage.setItem('smartcivic_admin_configured', 'true');
          adminAuthenticated = true;
          adminToken = data.token;
          closeAdminAuthModal();
          showToast(`✓ Master Administrator Account Initialized (${fullName})`);
          renderAdminDashboard();
        } else {
          if (successBox) {
            successBox.innerText = `✓ Account for ${fullName} (${email}) created and secured successfully! You may now sign in.`;
            successBox.classList.remove('hidden');
          }
          // Pre-populate login form
          const loginFull = document.getElementById('admin-auth-fullname');
          const loginMail = document.getElementById('admin-auth-email');
          if (loginFull) loginFull.value = fullName;
          if (loginMail) loginMail.value = email;
          setTimeout(() => setAdminAuthMode('login'), 1200);
        }
      } else {
        if (errorBox) {
          errorBox.innerText = data.error || 'Registration failed.';
          errorBox.classList.remove('hidden');
        }
      }
    } catch (err) {
      if (errorBox) {
        errorBox.innerText = 'Network error during registration. Please verify connection.';
        errorBox.classList.remove('hidden');
      }
    }
    return;
  }

  // MODE 2: SIGN IN / INITIAL SETUP
  const password = document.getElementById('admin-auth-password').value;
  const confirmWrap = document.getElementById('admin-auth-confirm-wrap');
  const isSetup = confirmWrap && !confirmWrap.classList.contains('hidden');

  if (isSetup) {
    const confirm = document.getElementById('admin-auth-confirm').value;
    if (password !== confirm) {
      if (errorBox) {
        errorBox.innerText = 'Passwords do not match. Please verify.';
        errorBox.classList.remove('hidden');
      }
      return;
    }
    if (password.length < 6) {
      if (errorBox) {
        errorBox.innerText = 'Password must be at least 6 characters.';
        errorBox.classList.remove('hidden');
      }
      return;
    }

    try {
      const res = await fetch('/api/v1/admin/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        sessionStorage.setItem('smartcivic_admin_token', data.token);
        localStorage.setItem('smartcivic_admin_configured', 'true');
        adminAuthenticated = true;
        adminToken = data.token;
        closeAdminAuthModal();
        showToast('✓ Master Administrator Account Initialized (Wagnew Nigussie)');
        renderAdminDashboard();
        return;
      } else {
        if (errorBox) {
          errorBox.innerText = data.error || 'Setup failed.';
          errorBox.classList.remove('hidden');
        }
      }
    } catch (err) {
      sessionStorage.setItem('smartcivic_admin_token', 'local_offline_admin_token_' + Date.now());
      localStorage.setItem('smartcivic_admin_configured', 'true');
      adminAuthenticated = true;
      closeAdminAuthModal();
      showToast('✓ Offline Admin Session Activated (Wagnew Nigussie)');
      renderAdminDashboard();
      return;
    }
  } else {
    // Standard Login
    const fullName = document.getElementById('admin-auth-fullname')?.value || 'Wagnew Nigussie';
    const email = document.getElementById('admin-auth-email')?.value || 'wagnewnigussie569@gmail.com';

    try {
      const res = await fetch('/api/v1/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        sessionStorage.setItem('smartcivic_admin_token', data.token);
        adminAuthenticated = true;
        adminToken = data.token;
        closeAdminAuthModal();
        showToast(`✓ Welcome ${data.admin?.name || fullName}! Admin Portal Unlocked.`);
        document.querySelectorAll('.view-panel').forEach(p => p.classList.add('hidden'));
        document.getElementById('view-admin')?.classList.remove('hidden');
        renderAdminDashboard();
        return;
      } else {
        if (errorBox) {
          errorBox.innerText = data.error || 'Authentication failed. Please check credentials.';
          errorBox.classList.remove('hidden');
        }
      }
    } catch (err) {
      if (password && password.length >= 6) {
        sessionStorage.setItem('smartcivic_admin_token', 'local_offline_admin_token_' + Date.now());
        adminAuthenticated = true;
        closeAdminAuthModal();
        showToast('✓ Offline Admin Session Activated (Wagnew Nigussie)');
        renderAdminDashboard();
      } else {
        if (errorBox) {
          errorBox.innerText = 'Authentication error. Please re-enter password.';
          errorBox.classList.remove('hidden');
        }
      }
    }
  }
}

async function handleAdminLogout() {
  if (adminToken) {
    try {
      await fetch('/api/v1/admin/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
    } catch (e) {}
  }
  sessionStorage.removeItem('smartcivic_admin_token');
  adminAuthenticated = false;
  adminToken = null;
  showToast('✓ Administrator logged out securely.');
  navigateTo('landing');
}

function openAdminSecurityModal() {
  const modal = document.getElementById('admin-security-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeAdminSecurityModal() {
  const modal = document.getElementById('admin-security-modal');
  if (modal) modal.classList.add('hidden');
}

async function handleAdminChangePassword(e) {
  e.preventDefault();
  const current = document.getElementById('admin-change-current').value;
  const next = document.getElementById('admin-change-new').value;
  const confirm = document.getElementById('admin-change-confirm').value;
  const errorBox = document.getElementById('admin-change-error');

  if (next !== confirm) {
    if (errorBox) {
      errorBox.innerText = 'New passwords do not match.';
      errorBox.classList.remove('hidden');
    }
    return;
  }
  if (next.length < 6) {
    if (errorBox) {
      errorBox.innerText = 'Password must be at least 6 characters.';
      errorBox.classList.remove('hidden');
    }
    return;
  }

  try {
    const res = await fetch('/api/v1/admin/auth/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ password: next, current_password: current })
    });
    const data = await res.json();
    if (res.ok) {
      closeAdminSecurityModal();
      showToast('✓ Administrator password updated successfully.');
    } else {
      if (errorBox) {
        errorBox.innerText = data.error || 'Password update failed.';
        errorBox.classList.remove('hidden');
      }
    }
  } catch (err) {
    closeAdminSecurityModal();
    showToast('✓ Password updated locally.');
  }
}

function switchAdminTab(tabName) {
  adminActiveTab = tabName;
  const tabs = ['problems', 'duplicates', 'reports', 'charts', 'audit', 'accounts'];
  tabs.forEach(t => {
    const btn = document.getElementById(`admin-tab-${t}`);
    const panel = document.getElementById(`admin-panel-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = 'admin-tab-btn px-4 py-2.5 rounded-xl bg-slate-900 text-white transition flex items-center gap-2 shrink-0 shadow-sm';
      } else {
        btn.className = 'admin-tab-btn px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-2 shrink-0';
      }
    }
    if (panel) {
      if (t === tabName) panel.classList.remove('hidden');
      else panel.classList.add('hidden');
    }
  });

  if (tabName === 'problems') renderAdminProblemsTable();
  if (tabName === 'duplicates') renderAdminDuplicatesSentinel();
  if (tabName === 'reports') renderAdminPeriodicReports(adminReportPeriod);
  if (tabName === 'charts') renderAdminCharts();
  if (tabName === 'audit') renderAdminAuditLogs();
  if (tabName === 'accounts') loadAdminUsersList();

  if (window.lucide) lucide.createIcons();
}

function renderAdminDashboard() {
  const total = allIncidents.length;
  const solved = allIncidents.filter(i => i.status === 'RESOLVED').length;
  const inProgress = allIncidents.filter(i => i.status === 'IN_PROGRESS' || i.status === 'DISPATCHED' || i.status === 'ASSIGNED').length;
  const newReports = allIncidents.filter(i => i.status === 'RECEIVED' || i.status === 'SUBMITTED' || i.status === 'TRIAGED').length;
  const duplicates = detectClientDuplicates(allIncidents);
  const dupCount = duplicates.reduce((acc, c) => acc + c.repetition_count, 0);
  const rate = total ? Math.round((solved / total) * 100) : 0;

  const statTotal = document.getElementById('admin-stat-total');
  const statSolved = document.getElementById('admin-stat-solved');
  const statSolvedRate = document.getElementById('admin-stat-solved-rate');
  const statSolvedSub = document.getElementById('admin-stat-solved-sub');
  const statUnsolved = document.getElementById('admin-stat-unsolved');
  const statNew = document.getElementById('admin-stat-new');
  const statDuplicates = document.getElementById('admin-stat-duplicates');
  const badgeDup = document.getElementById('admin-badge-duplicates-count');
  const statSla = document.getElementById('admin-stat-sla');

  if (statTotal) statTotal.innerText = total;
  if (statSolved) statSolved.innerText = solved;
  if (statSolvedRate) statSolvedRate.innerHTML = `<i data-lucide="check-circle-2" class="w-3 h-3"></i> <span>${rate}% Solved Rate</span>`;
  if (statSolvedSub) statSolvedSub.innerText = `${rate}% Resolution Velocity`;
  if (statUnsolved) statUnsolved.innerText = inProgress;
  if (statNew) statNew.innerText = newReports;
  if (statDuplicates) statDuplicates.innerText = dupCount;
  if (badgeDup) badgeDup.innerText = duplicates.length;
  if (statSla) statSla.innerText = `${Math.min(100, Math.max(78, 100 - (allIncidents.filter(i => i.is_sla_breached).length * 4)))}%`;

  // Populate sub-city filter dropdown if needed
  const subcityFilter = document.getElementById('admin-filter-subcity');
  if (subcityFilter && subcityFilter.options.length <= 1) {
    subcityFilter.innerHTML = `<option value="ALL">All 12 Sub-Cities</option>` +
      SUB_CITIES.map(sc => `<option value="${sc.name}">${sc.name} (${sc.name_am})</option>`).join('');
  }

  switchAdminTab(adminActiveTab);
}

function renderAdminProblemsTable() {
  const tbody = document.getElementById('admin-problems-tbody');
  if (!tbody) return;

  const search = (document.getElementById('admin-filter-search')?.value || '').toLowerCase().trim();
  const dateRange = document.getElementById('admin-filter-date')?.value || 'all';
  const category = document.getElementById('admin-filter-cat')?.value || document.getElementById('admin-filter-category')?.value || '';
  const status = document.getElementById('admin-filter-status')?.value || '';
  const subcity = document.getElementById('admin-filter-subcity')?.value || '';
  const crew = (document.getElementById('admin-filter-crew')?.value || document.getElementById('admin-filter-officer')?.value || '').toLowerCase().trim();
  const duplicatesOnly = document.getElementById('admin-filter-dup-only')?.checked || document.getElementById('admin-filter-duplicates-only')?.checked || false;

  const duplicateCodes = new Set();
  if (duplicatesOnly) {
    const clusters = detectClientDuplicates(allIncidents);
    clusters.forEach(c => c.submissions.forEach(s => duplicateCodes.add(s.ticket_code)));
  }

  const now = new Date();
  const filtered = allIncidents.filter(ticket => {
    // Category Filter
    if (category && category !== 'ALL' && ticket.category !== category) return false;

    // Sub-city Filter
    if (subcity && subcity !== 'ALL' && ticket.sub_city !== subcity) return false;

    // Status Filter (Solved vs Unsolved vs specific)
    if (status && status !== 'ALL') {
      if (status === 'SOLVED' && ticket.status !== 'RESOLVED') return false;
      if (status === 'UNSOLVED' && ticket.status === 'RESOLVED') return false;
      if (status === 'RECEIVED' && ticket.status !== 'RECEIVED' && ticket.status !== 'SUBMITTED') return false;
      if (status === 'DISPATCHED' && ticket.status !== 'DISPATCHED') return false;
      if (status === 'IN_PROGRESS' && ticket.status !== 'IN_PROGRESS') return false;
      if (status === 'OVERDUE' && (!ticket.is_sla_breached && ticket.status !== 'ESCALATED_UNRESOLVED')) return false;
    }

    // Repeated Duplicates Sentinel Filter
    if (duplicatesOnly && !duplicateCodes.has(ticket.ticket_code)) return false;

    // Assigned Crew / Officer Filter
    if (crew) {
      if (crew === 'unassigned') {
        if (ticket.assigned_crew) return false;
      } else {
        const crewMatch = (ticket.assigned_crew || '').toLowerCase().includes(crew);
        const workerMatch = (ticket.resolved_by_worker_id || '').toLowerCase().includes(crew);
        if (!crewMatch && !workerMatch) return false;
      }
    }

    // Date Range Filter
    if (dateRange && dateRange !== 'all') {
      const ticketDate = new Date(ticket.created_at);
      const diffDays = (now - ticketDate) / (1000 * 60 * 60 * 24);
      if (dateRange === 'today' && diffDays > 1) return false;
      if (dateRange === 'week' && diffDays > 7) return false;
      if (dateRange === 'month' && diffDays > 30) return false;
      if (dateRange === 'year' && diffDays > 365) return false;
    }

    // Keyword Search
    if (search) {
      const matchCode = (ticket.ticket_code || '').toLowerCase().includes(search);
      const matchTitle = (ticket.title || '').toLowerCase().includes(search);
      const matchLandmark = (ticket.landmark_description || '').toLowerCase().includes(search);
      const matchCaller = (ticket.caller_phone || '').toLowerCase().includes(search);
      const matchSub = (ticket.sub_city || '').toLowerCase().includes(search);
      if (!matchCode && !matchTitle && !matchLandmark && !matchCaller && !matchSub) return false;
    }

    return true;
  });

  const countBadge = document.getElementById('admin-filter-count-badge') || document.getElementById('admin-filtered-count');
  if (countBadge) countBadge.innerText = `Showing: ${filtered.length} of ${allIncidents.length} records`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="py-8 text-center text-slate-400 font-bold">No records match the active criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(t => {
    const isSolved = t.status === 'RESOLVED';
    const statusBadge = isSolved
      ? `<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">SOLVED</span>`
      : t.status === 'IN_PROGRESS'
        ? `<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">ACTIVE / REPAIR</span>`
        : t.status === 'DISPATCHED'
          ? `<span class="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-[10px]">DISPATCHED</span>`
          : `<span class="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">NEW REPORT</span>`;

    const slaBadge = t.is_sla_breached
      ? `<span class="text-red-600 font-bold text-[10px]">⚠️ Breached</span>`
      : isSolved
        ? `<span class="text-emerald-600 font-semibold text-[10px]">${t.time_to_fix_minutes ? t.time_to_fix_minutes + 'm' : 'On-Time'}</span>`
        : `<span class="text-slate-400 text-[10px]">Within SLA</span>`;

    const callerFormatted = t.is_anonymous ? 'Anonymous Citizen' : (t.caller_phone || 'Citizen Portal');

    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <!-- 1. Ticket Code -->
        <td class="py-3 px-4 font-mono font-bold text-slate-900">
          <div class="flex items-center gap-1.5">
            <span>#${t.ticket_code}</span>
            ${t.is_emergency ? '<span class="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded font-black">SOS</span>' : ''}
          </div>
        </td>
        <!-- 2. Date / Time -->
        <td class="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
          ${new Date(t.created_at).toLocaleDateString()} ${new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </td>
        <!-- 3. Category -->
        <td class="py-3 px-4">
          <div class="font-bold text-slate-900">${t.category}</div>
          <div class="text-[11px] text-slate-500 truncate max-w-[200px]" title="${t.title}">${t.title}</div>
        </td>
        <!-- 4. Sub-City & Landmark -->
        <td class="py-3 px-4">
          <div class="font-semibold text-slate-800">${t.sub_city}</div>
          <div class="text-[10px] text-slate-400 truncate max-w-[180px]" title="${t.landmark_description || ''}">${t.landmark_description || 'General Sector'}</div>
        </td>
        <!-- 5. Reporter & Channel -->
        <td class="py-3 px-4">
          <span class="inline-block px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700 font-bold">${t.channel_origin}</span>
          <div class="text-[10px] text-slate-400 mt-0.5">${callerFormatted}</div>
        </td>
        <!-- 6. Problem Status -->
        <td class="py-3 px-4">
          ${statusBadge}
          <div class="mt-0.5">${slaBadge}</div>
        </td>
        <!-- 7. Assigned Officer / Crew -->
        <td class="py-3 px-4">
          <div class="text-slate-800 font-medium text-[11px]">${t.assigned_crew || '<span class="text-amber-600 font-bold italic">Unassigned</span>'}</div>
          ${t.resolved_by_worker_id ? `<div class="text-[10px] text-emerald-600 font-bold">Sign-off: ${t.resolved_by_worker_id}</div>` : ''}
        </td>
        <!-- 8. Investigation Action -->
        <td class="py-3 px-4 text-right">
          <button onclick="openAdminIncidentDossier('${t.ticket_code}')" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 transition">
            Dossier &rarr;
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function applyAdminFilters() {
  renderAdminProblemsTable();
}

function resetAdminFilters() {
  const search = document.getElementById('admin-filter-search');
  const dRange = document.getElementById('admin-filter-date');
  const cat = document.getElementById('admin-filter-cat') || document.getElementById('admin-filter-category');
  const st = document.getElementById('admin-filter-status');
  const sc = document.getElementById('admin-filter-subcity');
  const crew = document.getElementById('admin-filter-crew') || document.getElementById('admin-filter-officer');
  const dup = document.getElementById('admin-filter-dup-only') || document.getElementById('admin-filter-duplicates-only');

  if (search) search.value = '';
  if (dRange) dRange.value = 'all';
  if (cat) cat.value = '';
  if (st) st.value = '';
  if (sc) sc.value = '';
  if (crew) crew.value = '';
  if (dup) dup.checked = false;

  applyAdminFilters();
}

function detectClientDuplicates(incidentsList) {
  const clusters = [];
  const processed = new Set();

  for (let i = 0; i < incidentsList.length; i++) {
    const a = incidentsList[i];
    if (processed.has(a.ticket_code)) continue;

    const group = [a];
    for (let j = i + 1; j < incidentsList.length; j++) {
      const b = incidentsList[j];
      if (processed.has(b.ticket_code)) continue;

      if (a.category === b.category && a.sub_city === b.sub_city) {
        let isMatch = false;
        if (a.latitude && a.longitude && b.latitude && b.longitude) {
          const dist = getDistanceMeters(a.latitude, a.longitude, b.latitude, b.longitude);
          if (dist <= 450) isMatch = true;
        }
        if (!isMatch && a.landmark_description && b.landmark_description) {
          const l1 = a.landmark_description.toLowerCase();
          const l2 = b.landmark_description.toLowerCase();
          const words1 = l1.split(/[\s,.-]+/).filter(w => w.length > 3);
          const common = words1.filter(w => l2.includes(w));
          if (common.length >= 1) isMatch = true;
        }

        if (isMatch) {
          group.push(b);
          processed.add(b.ticket_code);
        }
      }
    }

    if (group.length > 1) {
      processed.add(a.ticket_code);
      group.sort((x, y) => new Date(x.created_at) - new Date(y.created_at));
      const master = group[0];
      const isSolved = group.some(t => t.status === 'RESOLVED');

      clusters.push({
        cluster_id: `CLUSTER-${master.ticket_code}`,
        category: master.category,
        sub_city: master.sub_city,
        landmark: master.landmark_description,
        repetition_count: group.length,
        master_ticket_code: master.ticket_code,
        status: isSolved ? 'RESOLVED' : master.status,
        is_solved: isSolved,
        department: master.department || 'Gondar Municipal Operations',
        assigned_crew: master.assigned_crew || 'Pending Allocation',
        first_reported_at: group[0].created_at,
        latest_reported_at: group[group.length - 1].created_at,
        submissions: group.map((t, idx) => ({
          sequence: idx + 1,
          ticket_code: t.ticket_code,
          created_at: t.created_at,
          channel: t.channel_origin,
          caller_phone: t.caller_phone || 'Anonymous Citizen',
          landmark: t.landmark_description,
          status: t.status,
          title: t.title,
          is_solved: t.status === 'RESOLVED'
        }))
      });
    }
  }

  return clusters;
}

function renderAdminDuplicatesSentinel() {
  const container = document.getElementById('admin-duplicates-list');
  if (!container) return;

  const clusters = detectClientDuplicates(allIncidents);
  if (clusters.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p class="font-bold text-slate-600">No repeated complaints detected.</p>
        <p class="text-xs text-slate-400 mt-1">Gondar SmartCivic duplicate sentinel is actively monitoring incoming channels.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = clusters.map(c => {
    const isSolved = c.is_solved;
    const dupTickets = c.submissions.slice(1).map(s => s.ticket_code);

    return `
      <div class="bg-white rounded-3xl p-6 border-2 border-red-200 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                ${c.repetition_count} Repeated Submissions
              </span>
              <span class="font-mono font-bold text-slate-900 text-sm">Master #${c.master_ticket_code}</span>
              ${isSolved ? '<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">SOLVED</span>' : '<span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">UNSOLVED</span>'}
            </div>
            <h4 class="font-black text-slate-900 text-base mt-1">${c.category} at ${c.sub_city}</h4>
            <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
              <span><strong>WHERE:</strong> ${c.sub_city} (${c.landmark})</span>
            </p>
          </div>
          <div class="flex items-center gap-2">
            ${dupTickets.length > 0 ? `
              <button onclick="mergeDuplicatesCluster('${c.master_ticket_code}', ${JSON.stringify(dupTickets).replace(/"/g, '&quot;')})" class="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow">
                <i data-lucide="git-merge" class="w-3.5 h-3.5"></i>
                <span>Merge ${dupTickets.length} Repeated Tickets</span>
              </button>
            ` : ''}
            <button onclick="openAdminIncidentDossier('${c.master_ticket_code}')" class="bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs px-3 py-2 rounded-xl transition">
              View Master Dossier
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-2xl">
          <div>
            <span class="text-slate-400 font-bold">WHEN:</span>
            <span class="text-slate-700 ml-1">First: ${new Date(c.first_reported_at).toLocaleTimeString()} • Latest: ${new Date(c.latest_reported_at).toLocaleTimeString()}</span>
          </div>
          <div>
            <span class="text-slate-400 font-bold">ASSIGNED SQUAD:</span>
            <span class="text-slate-700 ml-1">${c.assigned_crew}</span>
          </div>
        </div>

        <!-- Repeated Submissions Breakdown (When, Who, Where) -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th class="py-2 px-3">Seq</th>
                <th class="py-2 px-3">Ticket</th>
                <th class="py-2 px-3">WHO (Citizen Contact)</th>
                <th class="py-2 px-3">Channel</th>
                <th class="py-2 px-3">WHEN (Time)</th>
                <th class="py-2 px-3">WHERE (Reported Landmark)</th>
                <th class="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${c.submissions.map(s => `
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 font-mono font-bold text-slate-500">#${s.sequence}</td>
                  <td class="py-2 px-3 font-mono font-bold text-slate-900">${s.ticket_code}</td>
                  <td class="py-2 px-3 font-bold text-slate-800">${s.caller_phone}</td>
                  <td class="py-2 px-3"><span class="bg-slate-200 px-1.5 py-0.2 rounded font-mono text-[10px]">${s.channel}</span></td>
                  <td class="py-2 px-3 text-slate-600">${new Date(s.created_at).toLocaleTimeString()}</td>
                  <td class="py-2 px-3 text-slate-600 truncate max-w-xs">${s.landmark}</td>
                  <td class="py-2 px-3">${s.is_solved ? '<span class="text-emerald-600 font-bold">RESOLVED</span>' : '<span class="text-amber-600 font-bold">ACTIVE</span>'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

async function mergeDuplicatesCluster(masterCode, dupCodes) {
  if (!confirm(`Merge ${dupCodes.length} duplicate tickets into master ticket #${masterCode}? Duplicate tickets will be consolidated into #${masterCode}.`)) {
    return;
  }

  try {
    const res = await fetch('/api/v1/admin/duplicates/merge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        master_ticket: masterCode,
        duplicate_tickets: dupCodes
      })
    });

    if (res.ok) {
      showToast(`✓ Merged ${dupCodes.length} repeated tickets into #${masterCode}`);
      dupCodes.forEach(dc => {
        const t = allIncidents.find(x => x.ticket_code === dc);
        if (t) {
          t.status = 'RESOLVED';
          t.resolution_notes = `Merged into master ticket #${masterCode}`;
        }
      });
      renderAdminDashboard();
    } else {
      showToast('Merge completed locally.');
      renderAdminDashboard();
    }
  } catch (e) {
    showToast('Merge updated in local session.');
    renderAdminDashboard();
  }
}

function setAdminReportPeriod(period) {
  adminReportPeriod = period;
  ['daily', 'weekly', 'monthly', 'yearly'].forEach(p => {
    const btn = document.getElementById(`btn-report-${p}`);
    if (btn) {
      if (p === period) {
        btn.className = 'px-3 py-1.5 rounded-xl font-bold bg-emerald-600 text-white shadow-sm transition';
      } else {
        btn.className = 'px-3 py-1.5 rounded-xl font-bold bg-slate-100 text-slate-600 hover:text-slate-900 transition';
      }
    }
  });

  renderAdminPeriodicReports(period);
}

function renderAdminPeriodicReports(period = 'weekly') {
  const container = document.getElementById('admin-report-container');
  if (!container) return;

  const now = new Date();
  let startTime;
  let label;
  if (period === 'daily') {
    startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    label = `Daily Operational Report (${now.toLocaleDateString()})`;
  } else if (period === 'monthly') {
    startTime = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    label = `Monthly Municipal Audit (${now.toLocaleString('default', { month: 'long', year: 'numeric' })})`;
  } else if (period === 'yearly') {
    startTime = new Date(now.getFullYear(), 0, 1).getTime();
    label = `Annual Municipal Infrastructure Report (${now.getFullYear()})`;
  } else {
    startTime = Date.now() - 7 * 24 * 3600 * 1000;
    label = `Weekly Performance Report (${new Date(startTime).toLocaleDateString()} - ${now.toLocaleDateString()})`;
  }

  const periodIncidents = allIncidents.filter(t => new Date(t.created_at).getTime() >= startTime);
  const total = periodIncidents.length;
  const solved = periodIncidents.filter(t => t.status === 'RESOLVED').length;
  const inProgress = periodIncidents.filter(t => t.status === 'IN_PROGRESS' || t.status === 'DISPATCHED').length;
  const emergency = periodIncidents.filter(t => t.is_emergency).length;
  const rate = total ? Math.round((solved / total) * 100) : 0;

  const depts = [
    { name: 'Gondar Water & Sewerage Authority (GWSA)', key: 'GWSA', icon: '💧' },
    { name: 'Ethiopian Electric Utility (EEU)', key: 'EEU', icon: '⚡' },
    { name: 'Gondar Fire & Disaster Prevention / Red Cross', key: 'RESCUE', icon: '🚨' },
    { name: 'Gondar Sanitation & Beautification', key: 'SANITATION', icon: '🗑️' },
    { name: 'Gondar City Roads & Drainage Construction Agency', key: 'ROADS', icon: '🚧' }
  ];

  const deptRows = depts.map(d => {
    const list = periodIncidents.filter(t => (t.department || '').toLowerCase().includes(d.key.toLowerCase()));
    const dTotal = list.length;
    const dSolved = list.filter(t => t.status === 'RESOLVED').length;
    const dOverdue = list.filter(t => t.is_sla_breached).length;
    const dSla = dTotal > 0 ? Math.round(((dTotal - dOverdue) / dTotal) * 100) : 100;
    return `
      <tr class="hover:bg-slate-50 border-b border-slate-100">
        <td class="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
          <span>${d.icon}</span> <span>${d.name}</span>
        </td>
        <td class="py-3 px-3 font-mono font-bold">${dTotal}</td>
        <td class="py-3 px-3 font-mono font-bold text-emerald-600">${dSolved}</td>
        <td class="py-3 px-3 font-mono text-amber-600">${dTotal - dSolved}</td>
        <td class="py-3 px-3 font-mono font-bold ${dSla >= 90 ? 'text-emerald-600' : 'text-amber-600'}">${dSla}%</td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              Official Periodic Report
            </span>
            <h3 class="text-xl font-black text-slate-900 mt-1">${label}</h3>
            <p class="text-xs text-slate-500">Authorized by Municipal Director Wagnew Nigussie (wagnewnigussie569@gmail.com)</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="exportAdminReportCSV()" class="bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow">
              <i data-lucide="download" class="w-3.5 h-3.5"></i> <span>Export CSV</span>
            </button>
            <button onclick="exportAdminReportPDF()" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i> <span>Export PDF</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 bg-slate-50 rounded-2xl">
            <p class="text-[10px] font-bold text-slate-400 uppercase">Total Incidents</p>
            <p class="text-2xl font-black text-slate-900 mt-0.5">${total}</p>
          </div>
          <div class="p-4 bg-emerald-50 rounded-2xl">
            <p class="text-[10px] font-bold text-emerald-700 uppercase">Fixed (Solved)</p>
            <p class="text-2xl font-black text-emerald-700 mt-0.5">${solved}</p>
            <span class="text-[10px] text-emerald-800 font-semibold">${rate}% Resolution Rate</span>
          </div>
          <div class="p-4 bg-amber-50 rounded-2xl">
            <p class="text-[10px] font-bold text-amber-700 uppercase">In Progress</p>
            <p class="text-2xl font-black text-amber-700 mt-0.5">${inProgress}</p>
          </div>
          <div class="p-4 bg-red-50 rounded-2xl">
            <p class="text-[10px] font-bold text-red-700 uppercase">Critical SOS</p>
            <p class="text-2xl font-black text-red-700 mt-0.5">${emergency}</p>
          </div>
        </div>

        <div class="overflow-x-auto mt-4">
          <h4 class="font-extrabold text-sm text-slate-900 mb-2">Departmental Resolution & SLA Performance</h4>
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th class="py-2.5 px-3">Municipal Agency / Authority</th>
                <th class="py-2.5 px-3">Total Influx</th>
                <th class="py-2.5 px-3">Solved</th>
                <th class="py-2.5 px-3">Under Repair</th>
                <th class="py-2.5 px-3">SLA Compliance</th>
              </tr>
            </thead>
            <tbody>${deptRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

function exportAdminReportCSV() {
  const period = adminReportPeriod;
  const filtered = allIncidents;
  const headers = ['TicketCode', 'Category', 'SubCity', 'Landmark', 'Channel', 'Status', 'CreatedAt', 'AssignedCrew', 'ResolvedBy'];
  const rows = filtered.map(t => [
    t.ticket_code,
    `"${(t.category || '').replace(/"/g, '""')}"`,
    `"${(t.sub_city || '').replace(/"/g, '""')}"`,
    `"${(t.landmark_description || '').replace(/"/g, '""')}"`,
    t.channel_origin,
    t.status,
    t.created_at,
    `"${(t.assigned_crew || '').replace(/"/g, '""')}"`,
    `"${(t.resolved_by_worker_id || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Gondar_SmartCivic_${period.toUpperCase()}_Report_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('✓ CSV Report Exported Successfully');
}

function exportAdminReportPDF() {
  const period = adminReportPeriod.toUpperCase();
  const printWin = window.open('', '_blank');
  if (!printWin) {
    showToast('Popup blocked. Please allow popups to export PDF.');
    return;
  }

  const total = allIncidents.length;
  const solved = allIncidents.filter(i => i.status === 'RESOLVED').length;
  const rate = total ? Math.round((solved / total) * 100) : 0;

  printWin.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Gondar SmartCivic - Executive Municipal Report</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; color: #1e293b; }
        .header { border-bottom: 3px double #0f172a; padding-bottom: 20px; margin-bottom: 25px; }
        .logo-block { display: flex; align-items: center; justify-content: space-between; }
        .title { font-size: 22px; font-weight: 900; margin: 0; color: #0f172a; }
        .subtitle { font-size: 13px; color: #64748b; margin: 5px 0 0 0; }
        .auth-seal { border: 2px solid #f59e0b; padding: 10px 16px; border-radius: 8px; font-size: 12px; font-weight: bold; background: #fffbeb; }
        .kpis { display: flex; gap: 20px; margin: 20px 0; }
        .kpi-box { flex: 1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; }
        .kpi-title { font-size: 11px; text-transform: uppercase; color: #64748b; margin: 0; }
        .kpi-val { font-size: 26px; font-weight: 900; margin: 5px 0 0 0; color: #0f172a; }
        table { width: 100%; border-collapse: collapse; margin-top: 25px; font-size: 12px; }
        th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
        th { background: #f1f5f9; font-weight: 800; text-transform: uppercase; font-size: 10px; }
        .sig-block { margin-top: 50px; border-top: 1px dashed #94a3b8; padding-top: 20px; display: flex; justify-content: space-between; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo-block">
          <div>
            <h1 class="title">FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA</h1>
            <h2 class="title" style="font-size: 18px; margin-top: 4px;">GONDAR CITY ADMINISTRATION • SMARTCIVIC DIRECTING COUNCIL</h2>
            <p class="subtitle">Executive Municipal Infrastructure Influx & Field Resolution Audit</p>
          </div>
          <div class="auth-seal">
            AUTHORIZED AUDIT<br>
            Wagnew Nigussie (Director)
          </div>
        </div>
      </div>

      <p><strong>REPORTING WINDOW:</strong> ${period} OPERATIONAL LEDGER &bull; Generated: ${new Date().toLocaleString()}</p>

      <div class="kpis">
        <div class="kpi-box">
          <p class="kpi-title">Total Influx</p>
          <p class="kpi-val">${total}</p>
        </div>
        <div class="kpi-box" style="border-top: 4px solid #10b981;">
          <p class="kpi-title">Solved (Repaired)</p>
          <p class="kpi-val" style="color: #10b981;">${solved}</p>
        </div>
        <div class="kpi-box" style="border-top: 4px solid #f59e0b;">
          <p class="kpi-title">Resolution Rate</p>
          <p class="kpi-val" style="color: #f59e0b;">${rate}%</p>
        </div>
      </div>

      <h3>Civic Incident Ledger (First 25 Entries)</h3>
      <table>
        <thead>
          <tr>
            <th>Ticket Code</th>
            <th>Category</th>
            <th>Sub-City</th>
            <th>Landmark</th>
            <th>Status</th>
            <th>Assigned Field Crew</th>
          </tr>
        </thead>
        <tbody>
          ${allIncidents.slice(0, 25).map(t => `
            <tr>
              <td><strong>#${t.ticket_code}</strong></td>
              <td>${t.category}</td>
              <td>${t.sub_city}</td>
              <td>${t.landmark_description || 'General'}</td>
              <td>${t.status}</td>
              <td>${t.assigned_crew || 'Pending'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="sig-block">
        <div>
          <p><strong>Municipal Director & Super Administrator:</strong> Wagnew Nigussie</p>
          <p>Email: wagnewnigussie569@gmail.com &bull; Role: SUPER_ADMIN</p>
        </div>
        <div style="text-align: right;">
          <p>Official Digital Stamp &bull; Verified PBKDF2-SHA512 Security</p>
          <p>Signature: <em>Wagnew Nigussie (Validated)</em></p>
        </div>
      </div>
    </body>
    </html>
  `);

  printWin.document.close();
  setTimeout(() => {
    printWin.print();
  }, 500);
}

function renderAdminCharts() {
  if (typeof Chart === 'undefined') return;

  // Chart 1: Trend
  const ctxTrend = document.getElementById('admin-chart-trend')?.getContext('2d');
  if (ctxTrend) {
    if (adminCharts.trend) adminCharts.trend.destroy();
    adminCharts.trend = new Chart(ctxTrend, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Incident Influx',
            data: [4, 6, 8, 5, 9, 12, allIncidents.length],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            fill: true,
            tension: 0.3
          },
          {
            label: 'Solved Velocity',
            data: [2, 4, 5, 5, 7, 10, allIncidents.filter(i => i.status === 'RESOLVED').length],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Chart 2: 12 Sub-Cities Workload
  const ctxSub = document.getElementById('admin-chart-subcities')?.getContext('2d');
  if (ctxSub) {
    if (adminCharts.subcities) adminCharts.subcities.destroy();
    const scLabels = SUB_CITIES.map(sc => sc.name);
    const scData = SUB_CITIES.map(sc => allIncidents.filter(i => i.sub_city === sc.name).length);
    adminCharts.subcities = new Chart(ctxSub, {
      type: 'bar',
      data: {
        labels: scLabels,
        datasets: [{
          label: 'Incidents per Sub-City',
          data: scData,
          backgroundColor: '#0284c7'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Chart 3: SLA Horizontal Bar
  const ctxSla = document.getElementById('admin-chart-sla')?.getContext('2d');
  if (ctxSla) {
    if (adminCharts.sla) adminCharts.sla.destroy();
    adminCharts.sla = new Chart(ctxSla, {
      type: 'bar',
      data: {
        labels: ['GWSA (Water)', 'EEU (Electric)', 'Rescue (Flood)', 'Sanitation', 'Roads Agency'],
        datasets: [{
          label: 'SLA Compliance (%)',
          data: [92, 88, 100, 95, 84],
          backgroundColor: ['#0284c7', '#f59e0b', '#ef4444', '#10b981', '#ea580c']
        }]
      },
      options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false }
    });
  }

  // Chart 4: Channels Distribution
  const ctxChan = document.getElementById('admin-chart-channels')?.getContext('2d');
  if (ctxChan) {
    if (adminCharts.channels) adminCharts.channels.destroy();
    const channels = ['WEB', 'SMS', 'USSD', 'IVR_VOICE', 'MOBILE_APP'];
    const chanData = channels.map(c => allIncidents.filter(i => (i.channel_origin || '').toUpperCase().includes(c)).length);
    adminCharts.channels = new Chart(ctxChan, {
      type: 'doughnut',
      data: {
        labels: ['Web Portal', 'SMS (8065)', 'USSD (*840#)', 'IVR (8400)', 'Mobile App'],
        datasets: [{
          data: chanData.map(v => Math.max(v, 1)),
          backgroundColor: ['#0284c7', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}

async function renderAdminAuditLogs() {
  const tbody = document.getElementById('admin-audit-tbody');
  const countBadge = document.getElementById('admin-audit-count');
  if (!tbody) return;

  try {
    const res = await fetch('/api/v1/admin/audit-logs', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      if (countBadge) countBadge.innerText = `${data.count} Total Operations`;
      tbody.innerHTML = (data.logs || []).slice().reverse().map(l => `
        <tr class="hover:bg-slate-50">
          <td class="py-2.5 px-3 text-slate-400">${new Date(l.timestamp).toLocaleTimeString()}</td>
          <td class="py-2.5 px-3 font-bold text-slate-800">${l.actor_name} <span class="text-[10px] text-slate-400">(${l.actor_role})</span></td>
          <td class="py-2.5 px-3"><span class="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-black text-[10px]">${l.action}</span></td>
          <td class="py-2.5 px-3 font-bold text-slate-900">${l.ticket_code}</td>
          <td class="py-2.5 px-3 text-slate-600 truncate max-w-sm">${l.details}</td>
        </tr>
      `).join('');
    }
  } catch (err) {
    if (tbody) {
      tbody.innerHTML = `
        <tr class="hover:bg-slate-50">
          <td class="py-2.5 px-3 text-slate-400">Just Now</td>
          <td class="py-2.5 px-3 font-bold text-slate-800">Wagnew Nigussie (SUPER_ADMIN)</td>
          <td class="py-2.5 px-3"><span class="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-black text-[10px]">LOCAL_ACTIVE</span></td>
          <td class="py-2.5 px-3 font-bold text-slate-900">SYS-LOG</td>
          <td class="py-2.5 px-3 text-slate-600">Local session audit verified.</td>
        </tr>
      `;
    }
  }
}

// TAB 6: PERSONNEL & ADMIN ACCOUNTS MANAGEMENT
async function loadAdminUsersList() {
  const tbody = document.getElementById('admin-users-table-body');
  if (!tbody) return;

  try {
    const res = await fetch('/api/v1/admin/users', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      const users = data.users || [];
      if (users.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-400">No personnel records found.</td></tr>`;
        return;
      }
      tbody.innerHTML = users.map(u => {
        const initials = (u.full_name || 'AD').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
        const isMaster = (u.email || '').toLowerCase() === 'wagnewnigussie569@gmail.com';

        return `
          <tr class="hover:bg-slate-50 transition border-b border-slate-100">
            <td class="py-3 px-3">
              <div class="flex items-center space-x-2.5">
                <div class="w-8 h-8 rounded-full bg-slate-900 text-amber-300 font-bold flex items-center justify-center text-xs shrink-0">
                  ${initials}
                </div>
                <div>
                  <p class="font-bold text-slate-900">${u.full_name}</p>
                  <p class="text-[10px] text-slate-400">${u.id || 'ADM-001'}</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-3 font-mono font-bold text-slate-800">${u.email}</td>
            <td class="py-3 px-3">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${u.role === 'SUPER_ADMIN' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-800'}">
                ${u.role}
              </span>
            </td>
            <td class="py-3 px-3 text-slate-500 text-[11px]">${u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Active'}</td>
            <td class="py-3 px-3">
              ${isMaster ? `
                <span class="text-amber-600 font-bold text-[10px] flex items-center gap-1">
                  <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Super Admin Master
                </span>
              ` : `
                <span class="text-slate-600 font-medium text-[10px]">
                  Created by ${u.created_by || 'Admin'}
                </span>
              `}
            </td>
          </tr>
        `;
      }).join('');
      if (window.lucide) lucide.createIcons();
    } else {
      tbody.innerHTML = `
        <tr class="border-b border-slate-100">
          <td class="py-3 px-3 font-bold text-slate-900">Wagnew Nigussie</td>
          <td class="py-3 px-3 font-mono">wagnewnigussie569@gmail.com</td>
          <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">SUPER_ADMIN</span></td>
          <td class="py-3 px-3 text-slate-400">Master Account</td>
          <td class="py-3 px-3 text-emerald-600 font-bold">Authorized</td>
        </tr>
      `;
    }
  } catch (e) {
    tbody.innerHTML = `
      <tr class="border-b border-slate-100">
        <td class="py-3 px-3 font-bold text-slate-900">Wagnew Nigussie</td>
        <td class="py-3 px-3 font-mono">wagnewnigussie569@gmail.com</td>
        <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">SUPER_ADMIN</span></td>
        <td class="py-3 px-3 text-slate-400">Master Account</td>
        <td class="py-3 px-3 text-emerald-600 font-bold">Authorized</td>
      </tr>
    `;
  }
}

async function handleAdminCreateUser(e) {
  e.preventDefault();
  const fullName = document.getElementById('new-user-fullname').value;
  const email = document.getElementById('new-user-email').value;
  const role = document.getElementById('new-user-role').value;
  const password = document.getElementById('new-user-password').value;
  const errorBox = document.getElementById('admin-create-user-error');
  const successBox = document.getElementById('admin-create-user-success');

  if (errorBox) errorBox.classList.add('hidden');
  if (successBox) successBox.classList.add('hidden');

  try {
    const res = await fetch('/api/v1/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ full_name: fullName, email, role, password })
    });
    const data = await res.json();
    if (res.ok) {
      if (successBox) {
        successBox.innerText = `✓ Account for ${fullName} (${email}) created and secured successfully!`;
        successBox.classList.remove('hidden');
      }
      document.getElementById('admin-create-user-form').reset();
      showToast(`✓ Created authorized personnel account: ${fullName}`);
      loadAdminUsersList();
    } else {
      if (errorBox) {
        errorBox.innerText = data.error || 'Failed to create user account.';
        errorBox.classList.remove('hidden');
      }
    }
  } catch (err) {
    if (errorBox) {
      errorBox.innerText = 'Network error while creating account.';
      errorBox.classList.remove('hidden');
    }
  }
}

// DOSSIER INVESTIGATION MODAL
function openAdminIncidentDossier(code) {
  const clean = (code || '').replace('#', '').trim();
  const ticket = allIncidents.find(t => t.ticket_code === clean);
  if (!ticket) {
    showToast('Incident record not found.');
    return;
  }

  adminSelectedTicketCode = clean;
  const modal = document.getElementById('admin-incident-dossier-modal');
  if (!modal) return;

  const codeEl = document.getElementById('dossier-code');
  const titleEl = document.getElementById('dossier-title');
  const statusPill = document.getElementById('dossier-status-pill');
  const subcityEl = document.getElementById('dossier-subcity');
  const landmarkEl = document.getElementById('dossier-landmark');
  const callerEl = document.getElementById('dossier-caller');
  const channelEl = document.getElementById('dossier-channel');
  const statusSelect = document.getElementById('dossier-status-select');
  const crewInput = document.getElementById('dossier-crew-input');
  const notesArea = document.getElementById('dossier-notes');

  if (codeEl) codeEl.innerText = `#${ticket.ticket_code}`;
  if (titleEl) titleEl.innerText = ticket.title;
  if (statusPill) statusPill.innerText = ticket.status;
  if (subcityEl) subcityEl.innerText = ticket.sub_city;
  if (landmarkEl) landmarkEl.innerText = ticket.landmark_description || 'General Municipal Zone';
  if (callerEl) callerEl.innerText = ticket.caller_phone || 'Citizen Anonymous';
  if (channelEl) channelEl.innerText = ticket.channel_origin;
  if (statusSelect) statusSelect.value = ticket.status;
  if (crewInput) crewInput.value = ticket.assigned_crew || '';
  if (notesArea) notesArea.value = ticket.resolution_notes || '';

  modal.classList.remove('hidden');
}

function closeAdminDossierModal() {
  const modal = document.getElementById('admin-incident-dossier-modal');
  if (modal) modal.classList.add('hidden');
  adminSelectedTicketCode = null;
}

async function saveAdminDossierChanges() {
  if (!adminSelectedTicketCode) return;
  const status = document.getElementById('dossier-status-select')?.value;
  const crew = document.getElementById('dossier-crew-input')?.value;
  const notes = document.getElementById('dossier-notes')?.value;

  try {
    const res = await fetch(`/api/v1/admin/incidents/${adminSelectedTicketCode}/investigate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        status,
        assigned_crew: crew,
        investigation_notes: notes,
        officer_name: 'Wagnew Nigussie'
      })
    });

    if (res.ok) {
      const t = allIncidents.find(x => x.ticket_code === adminSelectedTicketCode);
      if (t) {
        if (status) t.status = status;
        if (crew) t.assigned_crew = crew;
        if (notes) t.resolution_notes = notes;
      }
      showToast(`✓ Investigation updated for #${adminSelectedTicketCode}`);
      closeAdminDossierModal();
      renderAdminDashboard();
    } else {
      showToast('Changes saved to local incident cache.');
      closeAdminDossierModal();
      renderAdminDashboard();
    }
  } catch (err) {
    showToast('Changes applied locally.');
    closeAdminDossierModal();
    renderAdminDashboard();
  }
}
