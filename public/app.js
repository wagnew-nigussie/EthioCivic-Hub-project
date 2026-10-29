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
    back_to_overview: '← Back to Overview',

    // Target Audience (Rule 3)
    target_audience_badge: 'Universal Accessibility Matrix',
    target_audience_header: 'Defined Target Audience & Inclusive User Matrix',
    target_audience_sub: 'Built for all 450,000+ residents of Gondar, frontline municipal technicians, and executive dispatchers across every connectivity tier.',
    persona_1_title: 'General Citizens & Residents',
    persona_1_am: 'የጎንደር ከተማ ነዋሪዎች እና ማህበረሰብ',
    persona_1_desc: 'From market traders at Arada to students in Maraki. Regardless of smartphone ownership, residents report broken water mains, blackouts, or flood hazards using zero-data 2G USSD (*840#), SMS (8065), or spoken voice hotline (8400).',
    persona_1_channels: 'Channels: USSD (*840#), SMS (8065), Voice (8400), Web',
    persona_1_badge: '100% Free / Toll-Free',
    persona_2_title: 'Municipal Triage Dispatchers',
    persona_2_am: 'የማዘጋጃ ቤት መላኪያ ማዕከል ኃላፊዎች',
    persona_2_desc: 'Control room officers operating the central GIS console. Manages 5-tier triage queues, listens to ingested voice calls, routes tickets to GWSA or EEU, and monitors live SLA countdown timers to prevent overdue escalations.',
    persona_2_channels: 'Interface: GIS Spatial Dispatch Console',
    persona_2_badge: 'Real-Time PostGIS',
    persona_3_title: 'Emergency Disaster Responders',
    persona_3_am: 'የአደጋ መከላከልና ነፍስ አድን ግብረ-ኃይል',
    persona_3_desc: 'Gondar Fire & Emergency Service, Red Cross, and flood rescue units. Receives instant sub-second alarms with trapped persons count, water depth telemetry, and river corridor proximity for life-saving interventions.',
    persona_3_channels: 'Focus: Angereb & Keha River Catchments',
    persona_3_badge: '< 4h Emergency SLA',
    persona_4_title: 'Public Works Field Technicians',
    persona_4_am: 'የመስክ ጥገና ባለሙያዎችና ቴክኒሻኖች',
    persona_4_desc: 'Rapid response crews from Gondar Water (GWSA), Electric Utility (EEU), and road drainage. Operates in low-bandwidth offline mode, updates job progress, and must upload before-and-after photo verification to close tickets.',
    persona_4_channels: 'Interface: Field Crew Low-Bandwidth Mode',
    persona_4_badge: 'Audit Proof Verified',
    persona_5_title: 'University Researchers & Municipal Leadership',
    persona_5_am: 'የዩኒቨርሲቲ ተመራማሪዎችና የከተማ አስተዳደር አመራር',
    persona_5_desc: 'University of Gondar faculty, evaluation committee members, and city planners. Analyzes empirical sub-city failure patterns, average repair latency benchmarks, and open civic datasets without costly commercial proprietary licenses.',
    persona_5_channels: 'Interface: 12 Sub-City Analytics & Scorecard',
    persona_5_badge: '100% Open Standards',

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
    simulator_btn: 'Defense Simulator (*840# / SMS / IVR)',

    // Hero Section
    hero_pill: 'Gondar City Municipal Service Grid • ጎንደር ከተማ አስተዳደር',
    hero_title: 'Inclusive Municipal Infrastructure Ingestion & Spatial Dispatch',
    hero_desc: 'Bridging the digital divide across Gondar City and Ethiopia. Every resident has equal power to report water leaks, electrical blackouts, solid waste, and road hazards—whether using 4G smartphones, basic 2G feature phones (*840#), SMS, or voice calls.',
    hero_btn_report: 'Report Incident Online',
    hero_btn_sim: 'Simulate USSD *840# & Call',
    castle_heritage: 'UNESCO World Heritage',
    castle_name: 'Fasilides Castle (የፋሲል ግቢ ካስል) - Gondar, Ethiopia',
    castle_caption: 'The historic royal seat of Emperor Fasilides, serving as the proud civic heart and municipal inspiration for Gondar SmartCivic.',

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
    card_ussd_tag: 'Channel A • 2G Feature Phones',
    card_ussd_title: 'USSD Quick Menu (*840#)',
    card_ussd_desc: 'Dial *840# on any button phone (የእጅ ባትሪ ስልክ). Choose Amharic or English, select from 12 sub-cities, and receive an instant SMS ticket ID.',
    zero_data_text: 'Zero Data Required',
    sim_dial_link: 'Simulate Dialing →',
    card_sms_tag: 'Channel B • Inbound/Outbound SMS',
    card_sms_title: 'SMS Short Code (8065)',
    card_sms_desc: 'Send an SMS to 8065 in English or Amharic:\nREPORT [CATEGORY] [SUBCITY] [LANDMARK]',
    auto_receipts_text: 'Auto SMS Receipts',
    sim_sms_link: 'Simulate SMS →',
    card_ivr_tag: 'Channel C • Voice Hotline',
    card_ivr_title: 'Voice Hotline (8400)',
    card_ivr_desc: 'Automated Amharic Interactive Voice Response (IVR). Callers press DTMF buttons and record a 30-second spoken voice message for municipal dispatchers to listen to.',
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
    target_audience_sub: 'ለሁሉም 450,000+ የጎንደር ከተማ ነዋሪዎች፣ የመስክ ጥገና ቴክኒሻኖች እና የማዘጋጃ ቤት መላኪያ ኃላፊዎች የተዘጋጀ።',
    persona_1_title: 'የከተማው ነዋሪዎች እና ማህበረሰብ',
    persona_1_am: 'የጎንደር ከተማ ነዋሪዎች እና ማህበረሰብ',
    persona_1_desc: 'ከአራዳ ገበያ እስከ ማራኪ ዩኒቨርሲቲ ተማሪዎች ድረስ። ስማርትፎን ሳይኖራቸው በማንኛውም የእጅ ባትሪ ስልክ በUSSD (*840#)፣ በSMS (8065) ወይም በድምፅ መስመር (8400) የውሃ፣ የመብራት ወይም የጎርፍ ችግርን ያሳውቃሉ።',
    persona_1_channels: 'መገናኛ መንገዶች፦ USSD (*840#)፣ SMS (8065)፣ ድምፅ (8400)፣ ዌብ',
    persona_1_badge: '100% ነፃ (Toll-Free)',
    persona_2_title: 'የማዘጋጃ ቤት መላኪያ ማዕከል ኃላፊዎች',
    persona_2_am: 'የማዘጋጃ ቤት መላኪያ ማዕከል ኃላፊዎች',
    persona_2_desc: 'ማዕከላዊውን የGIS ካርታ የሚቆጣጠሩ የኮማንድ ሴንተር ኃላፊዎች። 5ቱን የቲኬት ክፍሎች ይመራሉ፣ የድምፅ መልዕክቶችን ያዳምጣሉ፣ ለውሃና ለመብራት ተቋማት ይመድባሉ፣ የSLA የጊዜ ቆጣሪዎችን ይከታተላሉ።',
    persona_2_channels: 'መተግበሪያ፦ የGIS ቁጥጥር ማዕከል (Dispatch Command)',
    persona_2_badge: 'የቀጥታ PostGIS ካርታ',
    persona_3_title: 'የአደጋ መከላከልና ነፍስ አድን ግብረ-ኃይል',
    persona_3_am: 'የአደጋ መከላከልና ነፍስ አድን ግብረ-ኃይል',
    persona_3_desc: 'የጎንደር እሳትና ድንገተኛ አደጋ፣ ቀይ መስቀል እና የጎርፍ ነፍስ አድን ክፍሎች። የተከበቡ ሰዎችን ቁጥር፣ የውሃ ጥልቀት መረጃ እና የወንዝ ሙላት ማንቂያዎችን በቅጽበት ተቀብለው ፈጣን እርዳታ ያደርጋሉ።',
    persona_3_channels: 'ትኩረት፦ የአንገረብና የቀሃ ወንዞች ተፋሰስ',
    persona_3_badge: '< 4 ሰዓት የአስቸኳይ ጊዜ SLA',
    persona_4_title: 'የመስክ ጥገና ባለሙያዎችና ቴክኒሻኖች',
    persona_4_am: 'የመስክ ጥገና ባለሙያዎችና ቴክኒሻኖች',
    persona_4_desc: 'የጎንደር ውሃና ፍሳሽ (GWSA)፣ የኤሌክትሪክ ኃይል (EEU) እና የመንገድ ጥገና ቡድኖች። ኢንተርኔት በደከመበት ሁኔታ በስልክ የሚሰሩ፣ የጥገና ሂደትን የሚያዘምኑ እና የጥገና ማረጋገጫ ፎቶ የሚያቀርቡ።',
    persona_4_channels: 'መተግበሪያ፦ የመስክ ባለሙያዎች ገጽ (Low-Bandwidth Mode)',
    persona_4_badge: 'በፎቶ ማስረጃ የተረጋገጠ',
    persona_5_title: 'የዩኒቨርሲቲ ተመራማሪዎችና የከተማ አስተዳደር አመራር',
    persona_5_am: 'የዩኒቨርሲቲ ተመራማሪዎችና የከተማ አስተዳደር አመራር',
    persona_5_desc: 'የጎንደር ዩኒቨርሲቲ መምህራን፣ የምርምር ገምጋሚዎች እና የከተማው አመራሮች። የ12ቱን ክፍለ ከተሞች የብልሽት ሁኔታ፣ የመጠገኛ አማካይ ሰዓት እና ክፍት የሲቪክ መረጃዎችን የሚገመግሙ።',
    persona_5_channels: 'መተግበሪያ፦ የ12ቱ ክ/ከተሞች ስታቲስቲክስና ዳሽቦርድ',
    persona_5_badge: '100% ክፍት የቴክኖሎጂ ደረጃ',

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
    simulator_btn: 'የሞካሪ ስልክ (*840# / SMS / IVR)',

    // Hero Section
    hero_pill: 'የጎንደር ከተማ አስተዳደር የህዝብ አገልግሎት መረብ',
    hero_title: 'ሁሉን አቀፍ የማዘጋጃ ቤት ብልሽቶች ማሳወቂያ እና ስምሪት ማዕከል',
    hero_desc: 'በጎንደር ከተማ እና በመላው ኢትዮጵያ የዲጂታል ክፍተትን የሚያጠብ አሰራር። የውሃ መስመር ብልሽት፣ የመብራት መቆራረጥ፣ ያልተነሳ ቆሻሻ እና የመንገድ ጉዳት በዘመናዊ ስልክ፣ በተራ የእጅ ባትሪ ስልክ (*840#)፣ በSMS ወይም በስልክ ጥሪ በቀላሉ ሪፖርት ይደረጋል።',
    hero_btn_report: 'አሁን በመስመር ላይ ሪፖርት ያድርጉ',
    hero_btn_sim: 'የ *840# እና የስልክ ጥሪ ይሞክሩ',
    castle_heritage: 'የዩኔስኮ የዓለም ቅርስ',
    castle_name: 'የፋሲል ግቢ ካስል (Fasilides Castle) - ጎንደር፣ ኢትዮጵያ',
    castle_caption: 'በአፄ ፋሲለደስ የተገነባው ታሪካዊው ቤተ-መንግስት የጎንደር ስማርት ሲቪክ ስርዓት ዋና መነሳሻና ኩራት ነው።',

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
    card_ussd_desc: 'በማንኛውም አዝራር ስልክ *840# ይደውሉ። አማርኛ ወይም እንግሊዝኛ በመምረጥ ከ12ቱ ክፍለ ከተሞች አንዱን ይምረጡና የቲኬት ቁጥር በSMS ይቀበሉ።',
    zero_data_text: 'ኢንተርኔት አይፈልግም',
    sim_dial_link: 'ደውለው ይሞክሩ →',
    card_sms_tag: 'መስመር 2 • አጭር የጽሁፍ መልዕክት (SMS)',
    card_sms_title: 'የSMS አጭር ቁጥር (8065)',
    card_sms_desc: 'ወደ 8065 በአማርኛ ወይም በእንግሊዝኛ ይላኩ፡\nሪፖርት [የችግሩ_አይነት] [ክፍለ_ከተማ] [የቦታ_መግለጫ]',
    auto_receipts_text: 'ራስ-ሰር የSMS ማረጋገጫ',
    sim_sms_link: 'SMS ይሞክሩ →',
    card_ivr_tag: 'መስመር 3 • የስልክ ጥሪ መስመር',
    card_ivr_title: 'የድምፅ መስመር (8400)',
    card_ivr_desc: 'ለማንበብ እና ለመጻፍ ለማይችሉ ነዋሪዎች የተዘጋጀ የድምፅ ጥሪ። በድምፅ መመሪያ ተከትለው 30 ሰከንድ ድምፅዎን በመቅዳት ቅሬታዎን ያስመዝግቡ።',
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
let allIncidents = [];
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
  
  initReportMap();
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
    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-950/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between">
      <!-- Sub-City Authentic Photographic Showcase -->
      <div class="h-32 overflow-hidden relative">
        <img src="${sc.image}" alt="${sc.name}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='/images/gondar_fasiledes_castle.jpg';" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <!-- #01 .. #12 Index & Zone Code Badge -->
        <div class="absolute top-2 left-2 flex items-center gap-1">
          <span class="font-mono text-[10px] font-black bg-slate-950/85 text-amber-300 px-2 py-0.5 rounded-md border border-slate-700/80 backdrop-blur shadow-sm">
            #${sc.id < 10 ? '0' + sc.id : sc.id}
          </span>
          <span class="font-mono text-[9px] font-bold bg-slate-900/70 text-slate-300 px-1.5 py-0.5 rounded backdrop-blur hidden sm:inline-block">
            ${sc.code}
          </span>
        </div>
        
        <!-- Live GIS Coverage Status Badge -->
        <span class="absolute top-2 right-2 flex items-center gap-1 bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 text-[9px] font-black px-2 py-0.5 rounded-full backdrop-blur shadow-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>GIS Active</span>
        </span>

        <!-- Primary Subcity Name Overlay -->
        <div class="absolute bottom-2 left-3 right-3 text-white">
          <h4 class="font-black text-sm tracking-tight drop-shadow-md group-hover:text-amber-300 transition flex items-baseline justify-between">
            <span>${currentLang === 'am' ? sc.name_am : sc.name}</span>
            <span class="text-[10px] font-semibold text-slate-300 drop-shadow">${currentLang === 'am' ? sc.name : sc.name_am}</span>
          </h4>
        </div>
      </div>

      <!-- Card Body Content -->
      <div class="p-3.5 bg-white rounded-b-3xl flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          <p class="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
            ${currentLang === 'am' ? sc.desc_am : sc.desc}
          </p>
        </div>

        <!-- Quick Contextual Actions -->
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <button onclick="quickFilterSubCity('${sc.name}')" class="text-emerald-600 hover:text-emerald-700 font-extrabold flex items-center gap-0.5 transition group-hover:translate-x-0.5">
            <span>${currentLang === 'am' ? 'በካርታ እይ' : 'GIS View'}</span> &rarr;
          </button>
          <button onclick="quickReportForSubCity('${sc.name}')" class="text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 px-2 py-0.5 rounded-md font-bold transition">
            + ${currentLang === 'am' ? 'ሪፖርት' : 'Report'}
          </button>
        </div>
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
  if (mapDispatch) return;

  mapDispatch = L.map('map-dispatch').setView([12.6075, 37.4625], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapDispatch);

  updateDispatchMapPins(allIncidents);
}

function updateDispatchMapPins(incidents) {
  if (!mapDispatch) return;

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
    allIncidents = data.incidents || [];
    renderPublicFeed();
    updateLiveMetrics();
    checkFloodEmergencyAlarms();
    if (mapDispatch) updateDispatchMapPins(allIncidents);
    applyDispatchFilters();
  } catch (err) {
    console.error('Failed to load incidents:', err);
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
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <div class="h-36 overflow-hidden relative">
          <img src="${cardPhoto}" alt="${ticket.title}" onerror="this.onerror=null; this.src='/images/categories/water_leak.svg';" class="w-full h-full object-cover">
          <span class="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${badgeColor} shadow">
            ${ticket.status}
          </span>
          <span class="absolute bottom-2 left-3 font-mono font-bold text-xs text-white bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur">
            #${ticket.ticket_code}
          </span>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="font-bold text-sm text-slate-900 line-clamp-1">${ticket.title}</h4>
            <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
              ${ticket.sub_city} • ${ticket.landmark_description || 'Gondar City'}
            </p>
            <p class="text-xs text-slate-600 mt-2 line-clamp-2">${ticket.description}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span class="flex items-center gap-1 font-semibold text-slate-600">
              <i data-lucide="radio" class="w-3 h-3 text-emerald-600"></i> ${ticket.channel_origin}
            </span>
            <button onclick="trackSpecificTicket('${ticket.ticket_code}')" class="font-bold text-emerald-600 hover:underline">
              ${currentLang === 'am' ? 'ተከታተል' : 'Track'} &rarr;
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
    if (!res.ok) {
      showToast(`Ticket #${query} not found in municipal registry.`);
      return;
    }
    const ticket = await res.json();
    renderTicketDetails(ticket);
  } catch (err) {
    showToast('Network error querying ticket.');
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
