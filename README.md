# Gondar SmartCivic (EthioCivic-Hub)
### Localized Omnichannel Municipal Civic Incident Reporting & Spatial Dispatching System
**Target Municipality:** Gondar City Administration, Amhara Regional State, Ethiopia  
**Urban Sub-Cities Covered (12 Zones):** Fasil (ፋሲል), Maraki (ማራኪ), Arada (አራዳ), Azezo-Teda (አዘዞ ቴዳ), Zobel (ዞብል), Jantekel (ጃንተከል), Bilajig (ብላጅግ), Gubaie (ጉባኤ), Adebabay-Piassa (አደባባይ ፒያሳ), Selam (ሰላም), Mintiwab (ምንትዋብ), Abraj (አብራጅ)  
**Spatial Coverage:** All-Ethiopia Extensible GIS Map (`EPSG:4326`) with Gondar Urban Core Focus (`12.6075° N, 37.4625° E`)  
**Bilingual Localization:** 100% Dynamic English (en) & Amharic (አማርኛ) Translation Engine

---

## 1. Project Overview & Problem Context
Gondar City experiences recurring municipal infrastructure challenges—broken water distribution mains (*GWSA*), power grid faults (*EEU*), uncollected solid waste, and road damage—across its 12 urban sub-cities.

A major barrier to civic engagement in Ethiopia is the **digital divide**: while some citizens use 4G smartphones, millions rely on basic 2G feature phones (*የእጅ ባትሪ ስልክ* / button phones) without mobile internet, and illiterate or elderly residents rely exclusively on voice telephone calls.

**Gondar SmartCivic** provides **universal public accessibility** by consolidating four unified ingestion channels into a centralized PostGIS spatial dispatch command dashboard:
- **Channel A: USSD (`*840#`)** - Multi-step interactive session for 2G button phones covering all 12 sub-cities.
- **Channel B: Two-Way SMS (`8065`)** - Bilingual text parser extracting `REPORT [CATEGORY] [SUBCITY] [LANDMARK]`.
- **Channel C: IVR Voice Hotline (`8400`)** - Amharic DTMF menu with 30-second caller voice note recordings for illiterate residents.
- **Channel D: Smartphone & Web App (PWA)** - Client-side image compression, All-Ethiopia Leaflet GPS capture, and offline-first IndexedDB queueing.
- **Visual & Heritage Identity:** Historic **Fasilides Castle (Fasil Ghebbi / የፋሲል ግቢ ካስል)** featured prominently on the landing page, with contextual imagery across every portal view.

---

## 2. Omnichannel Ingestion Technical Specifications

```
+---------------------------------------------------------------------------------------------------------+
|                                    GONDAR SMARTCIVIC INPUT CHANNELS                                     |
+-------------------+--------------------+---------------------------------------+------------------------+
| 2G Feature Phones | 2G Feature Phones  | Voice Callers (Elderly/Illiterate)    | Smartphone & Web Users |
| USSD (*840#)      | SMS (Shortcode 8065)| IVR Voice Hotline (8400)              | Offline-First PWA/App  |
+---------+---------+---------+----------+-------------------+-------------------+-----------+------------+
          |                   |                              |                               |
          v                   v                              v                               v
+---------+---------+---------+----------+-------------------+-------------------+-----------+------------+
| Ethio Telecom /   | SMS Gateway / SMPP | Asterisk PBX / Audio Storage          | Client-side GPS +      |
| USSD Gateway      | Webhook Endpoint   | (30s Voice Recording to S3/MinIO)     | WebP Compression       |
+---------+---------+---------+----------+-------------------+-------------------+-----------+------------+
          |                   |                              |                               |
          +-------------------+--------------+---------------+-------------------------------+
                                             |
                                             v
                      +---------------------------------------------+
                      |         UNIFIED REST API GATEWAY            |
                      |   (Node.js / Express or Python / FastAPI)   |
                      +----------------------+----------------------+
                                             |
                                             v
                      +---------------------------------------------+
                      |          POSTGRESQL 16 + POSTGIS            |
                      | Spatial Geometries (Point, Polygon EPSG:4326)|
                      +----------------------+----------------------+
                                             |
                        +--------------------+--------------------+
                        |                                         |
                        v                                         v
+---------------------------------------+ +---------------------------------------+
|  CENTRAL DISPATCH COMMAND DASHBOARD   | |      FIELD CREW MOBILE WEB VIEW       |
|  (/admin/dashboard & /admin/analytics)| |      (/crew/tasks - Low Bandwidth)    |
+---------------------------------------+ +---------------------------------------+
```

### Channel A: USSD (`*840#`)
- State machine exchanging HTTP `CON`/`END` payloads with Ethio Telecom / Africa's Talking.
- **Flow:** Language (Amharic/English) &rarr; Action (Report/Track) &rarr; Sub-city (Fasil, Maraki, Arada, Azezo, Zobel, Jantekel) &rarr; Category (Water, Power, Waste, Road) &rarr; Landmark text &rarr; 6-digit ticket ID generation (`#GDR-XXXX`) + automated confirmation SMS.

### Channel B: Two-Way SMS (`8065`)
- Regex and NLP parser extracting intent and parameters:
  - English: `REPORT [CATEGORY] [SUBCITY] [LANDMARK]`
  - Amharic: `ሪፖርት [ውሃ/መብራት/ቆሻሻ/መንገድ] [ክፍለ_ከተማ] [የቦታ_መግለጫ]`
- Instant SMS dispatch acknowledging receipt and providing tracking links.

### Channel C: Voice Hotline (`8400`)
- Interactive Voice Response (IVR) with spoken Amharic menu.
- Captures caller DTMF tones (1 for Water, 2 for Power, 3 for Waste, 4 for Roads).
- 30-second caller voice message recorder stored on disk/MinIO/S3 and linked to `incident_media` for dispatcher review.

### Channel D: Web & Mobile PWA
- HTML5 Canvas client-side compression (reduces 8MB camera photos to ~300KB WebP/JPEG).
- Automatic GPS coordinate capture with accuracy filtering.
- Offline-first IndexedDB queue that auto-syncs when 3G/4G connectivity is restored.

---

## 3. Platform Views & Portals

1. **Public Landing Page (`/`):** Live municipal metric counters, omnichannel dialer guide, and verified community resolution bulletin.
2. **Web Incident Reporting Form (`/report`):** Interactive Leaflet map centered on Gondar (12.60° N, 37.46° E) with auto-reverse geocoding, drag-and-drop photo upload, category selector with urgency tags, and anonymous reporting toggle.
3. **Live Ticket Tracking Page (`/track/:ticket_id`):** 4-stage visual timeline (*Received &rarr; Assigned &rarr; In Progress &rarr; Resolved*), assigned department details (GWSA, EEU, Sanitation), and Before-and-After photo comparison.
4. **Central Dispatcher Command Center (`/admin/dashboard`):** Full-screen GIS Leaflet map with color-coded status pins, omnichannel triage queue with playable IVR audio recordings, and one-click maintenance crew dispatch with distance calculations.
5. **Sub-City Analytics Dashboard (`/admin/analytics`):** Resolution latency comparison bar charts, categorical failure distributions, and PDF/Excel export.
6. **Field Crew Mobile View (`/crew/tasks`):** Low-bandwidth task deck, turn-by-turn GPS directions, and mandatory photographic proof upload for ticket resolution.

---

## 4. PostGIS Spatial Database Schema

The database schema is defined in `database/schema.sql` and includes:
- Administrative polygon boundaries for Gondar's 6 sub-cities (`sub_cities` table with `GEOMETRY(Polygon, 4326)`).
- Incident point geometries (`incidents` table with `location GEOMETRY(Point, 4326)`).
- Automated boundary detection trigger (`trg_auto_tag_incident_boundaries`).
- Spatial GiST indices for sub-second spatial queries.

### Essential Spatial Queries (`database/queries.sql`)
1. **Sub-City Boundary Query:** Finds all pending incidents within a sub-city polygon using `ST_Contains`.
2. **Proximity Query:** Finds all active water leaks within a 3 km radius of a coordinate using `ST_DWithin` on geography.
3. **Nearest Crew Dispatch:** Calculates distance and estimated travel ETA to recommend the closest repair unit.

---

## 5. Local Defense Simulation Strategy

This repository includes a **built-in interactive telecommunications simulator**:
- **USSD Phone Simulator:** Evaluators can dial `*840#` on a virtual feature phone screen, navigate Amharic/English menus, and submit reports.
- **Two-Way SMS Simulator:** Evaluators can send English or Amharic text messages to shortcode `8065` and view automated reply receipts.
- **IVR Voice Hotline Simulator:** Simulates calling `8400`, selecting DTMF tones, and uploading voice complaints.

### Quick Start (Run Locally)

```bash
# 1. Navigate to server directory
cd server

# 2. Install dependencies
npm install

# 3. Start the backend and frontend server
npm start
```

Open your browser at:
```
http://localhost:5000
```

Click **"Defense Simulator (*840# / SMS / IVR)"** in the top navigation bar to demonstrate all 4 channels live to your evaluation committee!

---

## 6. Flood Hazard, Residential Inundation & Disaster Module (የጎርፍ አደጋና መኖሪያ ቤት መጥለቅለቅ)

### Local Problem & Kiremt Threat Context
During the torrential Ethiopian rainy season (*Kiremt* / ክረምት), heavy rainfall causes rapid river swells along the **Angereb River Catchment** (*የአንገረብ ወንዝ ተፋሰስ*) and **Keha River Corridor** (*የቀሃ ወንዝ ኮሪደር*), combined with blocked urban storm drainage canals across Gondar's 12 sub-cities. This causes catastrophic flash floods and destructive residential inundation (**ጎርፍ ወደ ቤት መግባት**), leaving residents trapped and compounds flooded.

### Module Capabilities
1. **High-Priority Inundation & Rescue Reporting:**
   - Dedicated `FLOOD_EMERGENCY` category across Web, Mobile PWA, USSD, SMS, and IVR.
   - Residential water entry ("Inside Living Quarters" / "Trapped Residents") is auto-triaged as **Tier-1 CRITICAL Emergency**, triggering live visual flashing banners and Web Audio API emergency sirens on the Central Dispatch Command Dashboard.
2. **Omnichannel Emergency SOS:**
   - **Web / Mobile PWA:** Rapid 1-Tap "🚨 Flood Emergency SOS" modal capturing live GPS coordinates, water depth (`SURFACE_RUNOFF`, `ANKLE_DEEP`, `KNEE_DEEP`, `WAIST_DEEP_OR_HIGHER`), inundation location (`INSIDE_LIVING_QUARTERS`, `COMPOUND_FLOODED`, `DRAINAGE_BLOCKAGE`, `ROAD_OVERFLOW`), and trapped individual counters.
   - **USSD (*840#):** Fast-track dial `*840*911#` or Main Menu Option `0` (*የጎርፍ አደጋ አስቸኳይ ጥሪ*) with automated rescue dispatch SMS.
   - **Two-Way SMS:** Keyword parser for `FLOOD SOS [SUBCITY] [LANDMARK]` or `ጎርፍ SOS [ክፍለ_ከተማ] [የቦታ_መለያ]` with instant life-safety guidance receipts.
   - **IVR Voice Hotline (8400):** High-priority emergency voice note ingestion.
3. **GIS Spatial River Catchments & Early Warning Engine:**
   - Interactive Leaflet layers mapping the **Angereb River** and **Keha River** trajectories and active buffer flood risk polygons.
   - **Geofenced Mass Warning SMS Broadcast:** Municipal administrators can target vulnerable sub-city zones and broadcast bilingual alerts in Amharic and English to all registered mobile subscribers in that geographic polygon.
4. **Inter-Agency Rescue Dispatching:**
   - Instant routing of rescue tickets to the **Gondar Fire and Disaster Prevention Agency** (*የእሳትና አደጋ ስጋት አመራር*) and the **Ethiopian Red Cross Society - Gondar Branch** (*የኢትዮጵያ ቀይ መስቀል*).

---

## 7. Academic Capstone Sprint Roadmap

- **Weeks 1–2:** PostGIS database setup and Gondar sub-city GeoJSON polygon seeding.
- **Week 3:** USSD HTTP CON/END state machine and Two-Way SMS regex parser.
- **Week 4:** IVR voice hotline integration and audio file linking.
- **Week 5:** Public PWA reporting form with Leaflet map and client-side photo compression.
- **Week 6:** Central Dispatcher GIS dashboard with crew triage, flood siren, and IVR audio player.
- **Week 7:** Sub-city analytics charts, PDF export, and Field Crew mobile view.
- **Week 8:** Local defense sandbox rehearsals, committee slide deck, and thesis write-up.

---

## 8. Local Photographic Asset Placement & Offline Architecture

To ensure 100% offline portability and zero dependence on external CDNs or network connections during university evaluations and defense demonstrations, all photographic assets and vector graphics are stored locally in `public/images/`:

| Asset File | Target Portal Position | Description & Local Context |
|:---|:---|:---|
| `/images/gondar_fasiledes_castle.jpg` | **Landing Page Hero Section (`/`)** & **Navbar Logo Badge** | Iconic ground-level facade of Emperor Fasilides Castle (*የአፄ ፋሲል ቤተመንግስት*) with domed watchtowers, battlements, and Ethiopian flag. |
| `/images/gondar_fasil_ghebbi_aerial.jpg` | **Report Form Banner (`/report`)** & **Analytics Banner (`/admin/analytics`)** | High-resolution panoramic drone aerial overview of the UNESCO Fasil Ghebbi royal enclosure and surrounding central Gondar cityscape. |
| `/images/subcities/sc_01_fasil.jpg` to `sc_12_abraj.jpg` | **12 Sub-Cities Showcase Carousel** | Dedicated authentic photographic views for each of Gondar's 12 urban sub-cities, highlighting historic monuments, university campuses, commercial markets, and residential ridges. |
| `/images/categories/*.svg` | **Category Selector Cards & Ticket Feeds** | 5 high-contrast vector illustrations for Water Leak, Electrical Fault, Solid Waste, Road Damage, and Flash Flood Emergency SOS. |

