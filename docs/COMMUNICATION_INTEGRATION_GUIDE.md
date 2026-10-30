# 📡 Gondar SmartCivic (EthioCivic-Hub) Omnichannel Communication Integration Guide

**Author:** Wagnew Nigussie  
**Project:** EthioCivic-Hub / Gondar SmartCivic Municipal Dispatch  
**Version:** 2.6.0  
**Specification:** OpenAPI 3.0 / GSM 02.90 / DTMF Voice XML  

---

## 🏛️ 1. Architecture Overview

```
                      ┌──────────────────────────────────────────────┐
                      │    CITIZENS & EMERGENCY FIRST RESPONDERS    │
                      └──────────────────────┬───────────────────────┘
                                             │
             ┌───────────────────────────────┼──────────────────────────────┐
             │ 2G Feature Phones             │ Basic / Feature Phones       │ Voice Callers
             ▼                               ▼                              ▼
      [ USSD (*840#) ]               [ Two-Way SMS (8065) ]          [ IVR Hotline (8400) ]
             │                               │                              │
             └───────────────────────┬───────┴──────────────────────────────┘
                                     │ Ethio Telecom & Safaricom Ethiopia Core Signaling
                                     ▼
                      ┌──────────────────────────────────────────────┐
                      │         COMMUNICATION GATEWAY PROVIDERS      │
                      │  • AfroMessage (Ethiopian Direct Gateway)    │
                      │  • Africa's Talking (USSD, Voice, SMS Sim)   │
                      │  • eSMS Africa (Pan-African Fallback)        │
                      └──────────────────────┬───────────────────────┘
                                             │ HTTPS Webhooks & REST APIs (JSON/Form-Encoded)
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │    GONDAR SMARTCIVIC INGESTION & DISPATCH    │
                      │ ──────────────────────────────────────────── │
                      │  1. Inbound Webhook Rate Limiter & HMAC      │
                      │  2. USSD Dynamic Session Tree (CON/END)      │
                      │  3. Two-Way SMS Keyword & Entity Tokenizer   │
                      │  4. Voice XML Engine & DTMF Call Router      │
                      │  5. Multi-Gateway Failover Circuit Breaker   │
                      └───────┬──────────────────────────────┬───────┘
                              │                              │
            Real-time SSE     │                              │ Incident Ledger & GIS
            (/events/stream)  ▼                              ▼
          ┌──────────────────────────────────┐   ┌──────────────────────────────┐
          │   DISPATCHER GIS WEB DASHBOARD   │   │  MUNICIPAL AUDIT & LEDGER    │
          │ • Live Spatial Incident Markers  │   │ • 5-Queue SLA Deadlines      │
          │ • Audio Voice Note Player        │   │ • Duplicate Cluster Sentinel │
          │ • Real-Time SMS Outbox Monitor   │   │ • Citizen Resolution Tracker │
          └──────────────────────────────────┘   └──────────────────────────────┘
```

---

## 🚀 2. The 7 Core Objectives Implementation Reference

### Objective 1: Provider Setup (AfroMessage, Africa's Talking, eSMS Africa)
- **AfroMessage (Ethiopia Primary):**
  - Web portal: `https://afromessage.com/`
  - Base URL: `https://api.afromessage.com/api`
  - Authentication: `Bearer <AFROMESSAGE_API_KEY>`
  - Approved Sender ID / Shortcode: `8065`
- **Africa's Talking (USSD & Voice Primary):**
  - Web portal: `https://africastalking.com/`
  - Sandbox: `https://simulator.africastalking.com:1517/`
  - USSD Service Code: `*840#`
  - Voice Hotline: `8400` / `+254711082000`
- **eSMS Africa (Pan-African Fallback):**
  - Web portal: `https://esmsafrica.com/`
  - Header Auth: `X-API-KEY: <ESMS_API_KEY>`
- **Live Health Endpoint:** `GET /api/v1/gateways/status`

---

### Objective 2: Two-Way SMS Engine (8065)
- **Inbound Webhook:** `POST /api/v1/sms/inbound`
- **Supported Payload formats:**
  - AfroMessage: `{ "sender": "+251918...", "message": "REPORT WATER MARAKI Gate" }`
  - Africa's Talking: `{ "from": "+251918...", "text": "REPORT WATER MARAKI Gate" }`
- **Commands Recognized:**
  1. `REPORT [CATEGORY] [SUBCITY] [LANDMARK]` (English) / `ሪፖርት [አይነት] [ክፍለከተማ] [ቦታ]` (Amharic)
  2. `TRACK [TICKET_ID]` (English) / `ተከታተል [ቲኬት]` (Amharic)
  3. `EMERGENCY [DETAILS]` or `FLOOD SOS` (triggers immediate Tier-1 Critical alarm)
- **Outbound Multi-Gateway Dispatch:** `POST /api/v1/sms/send`
  - Automatic Circuit-Breaker Failover: AfroMessage -> Africa's Talking -> eSMS Africa -> Local Outbox.
- **Delivery Receipts (DLR):** `POST /api/v1/sms/delivery-report`
- **Outbox Inspection:** `GET /api/v1/sms/outbox`

---

### Objective 3: Dynamic USSD Workflow (*840#)
- **Inbound Endpoint:** `POST /api/v1/ussd`
- **Protocol:** GSM 02.90 standard with `CON ` (Continue) and `END ` (Terminate) prefixes.
- **Session State Tree:**
  ```
  Level 0 (Dial *840#): Welcome -> 1. Amharic, 2. English
  Level 1 (Action): 0. Flood SOS, 1. Report Issue, 2. Track Ticket
  Level 2 (Sub-City): 1 to 12 (Fasil, Maraki, Arada, Azezo, Zobel, Jantekel, Bilajig, Gubaie, Piassa, Selam, Mintiwab, Abraj)
  Level 3 (Category): 1. Water (GWSA), 2. Power (EEU), 3. Waste, 4. Road Damage
  Level 4 (Landmark): Free-text input
  Level 5 (Submission): END confirmation + GDR ticket code + confirmation SMS
  ```
- **Fast-Track Emergency Shortcut:** Dial `*840*911#` -> Select zone -> Instant Rescue Squad deployment.

---

### Objective 4: IVR / Voice System (Hotline 8400)
- **Africa's Talking Voice XML Endpoints:**
  1. `POST /api/v1/voice/call`: Inbound call greeting with bilingual `<GetDigits>` language choice.
  2. `POST /api/v1/voice/language`: DTMF handler routing to Amharic or English menu.
  3. `POST /api/v1/voice/category`: DTMF category selection (1: Water, 2: Power, 0: SOS) prompting `<Record>`.
  4. `POST /api/v1/voice/recording-callback`: Webhook called when recording completes, links audio proof, creates `IVR_VOICE` ticket, and notifies dispatchers.
- **Voice XML Schema Example:**
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <Response>
      <GetDigits timeout="10" numDigits="1" finishOnKey="#" callbackUrl="/api/v1/voice/language">
          <Say voice="woman">Welcome to Gondar Municipal Service Hotline. For English press 1. ለአማርኛ 2 ይጫኑ።</Say>
      </GetDigits>
      <Say>No input received. Goodbye.</Say>
      <Hangup/>
  </Response>
  ```

---

### Objective 5: Dashboard & Web Integration
- **Server-Sent Events (SSE):** `GET /api/v1/events/stream`
  - Real-time event notifications delivered directly into the web browser:
    - `ticket:created`: Triggers toast notification and reloads incident queue.
    - `ticket:emergency`: Flashes critical red banner, plays audio alert, focuses GIS map.
    - `sms:outbound`: Updates real-time outbox counter.
- **In-App Interactive Simulator:**
  - Open simulator via `*840# Sim` button in the top navigation bar.
  - Tab 1: **USSD Keypad** (`*840#` and `*840*911#`)
  - Tab 2: **Two-Way SMS Terminal** (`8065` simulation)
  - Tab 3: **IVR Voice Hotline Console** (DTMF tone simulation)
  - Tab 4: **SMS OTP Auth Tester** (Live code generation & verification)
  - Tab 5: **Telco Gateways Health Dashboard** (Live circuit-breaker status)

---

### Objective 6: Security, Rate Limiting & OTP Authentication
- **Phone OTP Request:** `POST /api/v1/auth/otp/request`
  - Generates a cryptographically random 6-digit numeric token (`crypto.randomInt(100000, 999999)`).
  - Valid for 5 minutes (`expiresInSeconds: 300`).
  - Transmits token via SMS.
- **Phone OTP Verification:** `POST /api/v1/auth/otp/verify`
  - Enforces one-time consumption (token is burned on first successful verification).
  - Rejects expired or brute-forced attempts.
- **Sliding-Window Rate Limiting:**
  - Inbound webhooks: max 60 requests per minute per remote IP.
  - OTP requests: max 5 requests per 10 minutes per phone number.
- **HMAC Signature Check:** Optional `X-Provider-Signature` validation using `WEBHOOK_HMAC_SECRET`.

---

### Objective 7: Deployment & Documentation
- **Healthcheck Endpoint:** `GET /api/v1/health`
- **OpenAPI 3.0 Documentation:** `GET /api/v1/docs`
- **Production Stack (`docker-compose.yml`):**
  - Node.js application server (clustering via PM2 or Docker).
  - Nginx reverse proxy with TLS 1.3 / Let's Encrypt SSL.
  - PostgreSQL 15 with PostGIS extension for spatial queries.
  - Redis 7 for distributed token bucket rate limiting.
- **Automated Verification:**
  ```bash
  npm test
  # or directly:
  node test_communication_integration.js
  ```

---

*Gondar SmartCivic (EthioCivic-Hub) • City Administration of Gondar, Ethiopia*
