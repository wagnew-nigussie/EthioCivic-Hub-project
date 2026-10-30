/**
 * Gondar SmartCivic (EthioCivic-Hub)
 * Comprehensive End-to-End Omnichannel & Incident Lifecycle Verification
 * 
 * Verifies:
 * 1. Multi-channel ingestion (USSD, Two-Way SMS, IVR Voice Hotline, Direct Phone Call, Mobile SOS)
 * 2. 5-Tier Dispatcher Incident Queues (Emergency, General, Voice, Overdue SLA, Resolved Archive)
 * 3. Lifecycle State Machine Transitions (RECEIVED -> DISPATCHED -> RESOLVED with proof)
 * 4. Dynamic SLA breach calculation & automated escalation to ESCALATED_UNRESOLVED
 * 5. Audio static serving (/uploads/audio/sample_ivr.wav)
 */

const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const TEST_PORT = 5085;
let serverProc = null;
let activePort = TEST_PORT;

function request(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const reqOptions = {
      hostname: '127.0.0.1',
      port: activePort,
      path,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOptions, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        const text = buffer.toString('utf-8');
        let json = null;
        try { json = JSON.parse(text); } catch (e) {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          text,
          json,
          buffer
        });
      });
    });

    req.on('error', reject);

    if (body) {
      if (typeof body === 'string') {
        req.write(body);
      } else {
        req.setHeader('Content-Type', 'application/json');
        req.write(JSON.stringify(body));
      }
    }
    req.end();
  });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ ${message}`);
}

async function runTests() {
  console.log(`================================================================`);
  console.log(` Gondar SmartCivic End-to-End Omnichannel Lifecycle Test Suite`);
  console.log(`================================================================`);

  // Start Server on TEST_PORT
  console.log(`\n[STEP 1] Starting isolated server instance on port ${TEST_PORT}...`);
  serverProc = spawn('node', ['server/server.js'], {
    env: { ...process.env, PORT: String(TEST_PORT) },
    cwd: path.join(__dirname)
  });

  serverProc.stdout.on('data', d => {
    const s = d.toString();
    const match = s.match(/Running on Port (\d+)/);
    if (match) {
      activePort = Number(match[1]);
    }
  });

  serverProc.stderr.on('data', d => {
    console.error(`[Server stderr]`, d.toString());
  });

  // Wait 1.5s for server boot
  await new Promise(r => setTimeout(r, 1500));

  try {
    // ------------------------------------------------------------------------
    // TEST 1: USSD Omnichannel Ingestion (*840#)
    // ------------------------------------------------------------------------
    console.log(`\n[TEST 1] Omnichannel Ingestion: USSD (*840#)`);
    
    // 1A. Fast-track Flood SOS via *840*911#
    const resUssdSos = await request('/api/v1/ussd', { method: 'POST' }, {
      phoneNumber: '+251918112233',
      text: '*840*911*2#' // Sub-city 2: Maraki
    });
    assert(resUssdSos.statusCode === 200, 'USSD Fast Flood SOS returns HTTP 200');
    assert(resUssdSos.text.includes('END') && resUssdSos.text.includes('#GDR-SOS-'), 'USSD SOS returns confirmation with #GDR-SOS ticket code');

    // 1B. Standard USSD Reporting Menu Flow
    const resUssdStd = await request('/api/v1/ussd', { method: 'POST' }, {
      phoneNumber: '+251918112233',
      text: '*840*1*1*1*1*Piazza Old Post Office#'
    });
    assert(resUssdStd.statusCode === 200, 'Standard USSD report returns HTTP 200');
    assert(resUssdStd.text.includes('#GDR-'), 'Standard USSD returns ticket ID');

    // ------------------------------------------------------------------------
    // TEST 2: Two-Way SMS Ingestion (8065)
    // ------------------------------------------------------------------------
    console.log(`\n[TEST 2] Omnichannel Ingestion: Two-Way SMS Shortcode (8065)`);
    
    // 2A. Emergency SMS
    const resSmsEmerg = await request('/api/v1/sms/inbound', { method: 'POST' }, {
      from: '+251918334455',
      text: 'EMERGENCY FLOOD MARAKI Water entering living compound elderly trapped'
    });
    assert(resSmsEmerg.statusCode === 200, 'Emergency SMS returns HTTP 200');
    assert(resSmsEmerg.json.status === 'SUCCESS', 'Emergency SMS status is SUCCESS');
    assert(resSmsEmerg.json.ticketCode.startsWith('GDR-SOS-'), 'Emergency SMS assigned GDR-SOS ticket prefix');
    assert(resSmsEmerg.json.priority === 'CRITICAL_DISASTER', 'Emergency SMS flagged CRITICAL_DISASTER');

    // 2B. Regular Civic Issue SMS
    const resSmsReg = await request('/api/v1/sms/inbound', { method: 'POST' }, {
      from: '+251918334455',
      text: 'REPORT WATER FASIL Broken distribution valve leaking on street'
    });
    assert(resSmsReg.statusCode === 200, 'Standard civic SMS returns HTTP 200');
    assert(resSmsReg.json.ticketCode.startsWith('GDR-'), 'Standard civic SMS assigned GDR ticket code');

    // ------------------------------------------------------------------------
    // TEST 3: IVR Voice Hotline (8400) & Operator Direct Phone Call
    // ------------------------------------------------------------------------
    console.log(`\n[TEST 3] Omnichannel Ingestion: Voice Hotline (8400) & Phone Calls`);
    
    // 3A. Automated IVR Voice Recording
    const resIvr = await request('/api/v1/ingest/ivr', { method: 'POST' }, {
      caller: '+251918990011',
      category: 'WATER_LEAK',
      subCity: 'Azezo-Teda',
      voice_transcript: 'የውሃ ቱቦ ተሰብሮ መንገድ ላይ እየፈሰሰ ነው (Broken pipeline leaking on main road)'
    });
    assert(resIvr.statusCode === 201, 'IVR voice ingestion returns HTTP 201');
    assert(resIvr.json.ticket.channel_origin === 'IVR_VOICE', 'Channel origin correctly set to IVR_VOICE');
    assert(resIvr.json.ticket.audio_path === '/uploads/audio/sample_ivr.wav', 'Linked to sample WAV audio file');

    // 3B. Direct Emergency Telephone Call (Desk Intake)
    const resPhone = await request('/api/v1/ingest/phone-call', { method: 'POST' }, {
      caller_phone: '+251922334455',
      caller_name: 'Ato Abebe',
      category: 'ROAD_DAMAGE',
      sub_city: 'Jantekel',
      landmark: 'Near Western Gate Culvert',
      notes: 'Road collapsed after heavy rain; vehicle bridge blocked.',
      severity: 'HIGH'
    });
    assert(resPhone.statusCode === 201, 'Direct phone call ingestion returns HTTP 201');
    assert(resPhone.json.ticket.channel_origin === 'PHONE_CALL', 'Channel origin correctly set to PHONE_CALL');
    assert(resPhone.json.ticket.is_emergency === true, 'Phone call correctly triaged as emergency');

    // ------------------------------------------------------------------------
    // TEST 4: Single-Tap Smartphone Web / Mobile App SOS
    // ------------------------------------------------------------------------
    console.log(`\n[TEST 4] Omnichannel Ingestion: Mobile/Web Single-Tap SOS`);
    const resSos = await request('/api/v1/incidents/emergency-sos', { method: 'POST' }, {
      phone: '+251918556677',
      sub_city: 'Maraki',
      landmark: 'Angereb River Valley near bridge',
      water_depth_level: 'WAIST_DEEP_OR_HIGHER',
      inundation_type: 'INSIDE_LIVING_QUARTERS',
      trapped_persons_count: 3
    });
    assert(resSos.statusCode === 201, 'Mobile SOS ingestion returns HTTP 201');
    assert(resSos.json.priority === 'TIER_1_CRITICAL_ALARM', 'Triggered TIER_1_CRITICAL_ALARM priority');
    assert(resSos.json.ticket.is_life_threatening === true, 'Flagged is_life_threatening: true');

    // ------------------------------------------------------------------------
    // TEST 5: 5-Tier Municipal Dispatcher Queues & Metadata Counts
    // ------------------------------------------------------------------------
    console.log(`\n[TEST 5] 5-Tier Municipal Dispatcher Incident Queues`);
    const resAll = await request('/api/v1/incidents');
    assert(resAll.statusCode === 200, 'GET /api/v1/incidents returns HTTP 200');
    assert(resAll.json.counts !== undefined, 'Response includes queue counts metadata object');
    console.log(`  Counts Snapshot:`, resAll.json.counts);
    assert(resAll.json.counts.emergency > 0, `Emergency queue count > 0 (${resAll.json.counts.emergency})`);
    assert(resAll.json.counts.general > 0, `General queue count > 0 (${resAll.json.counts.general})`);
    assert(resAll.json.counts.voice > 0, `Voice queue count > 0 (${resAll.json.counts.voice})`);
    assert(resAll.json.counts.overdue > 0, `Overdue queue count > 0 (${resAll.json.counts.overdue})`);
    assert(resAll.json.counts.resolved > 0, `Resolved queue count > 0 (${resAll.json.counts.resolved})`);

    // 5A. Tab 1: Emergency & Disaster Queue
    const resQueueEmerg = await request('/api/v1/incidents?filter=emergency');
    assert(resQueueEmerg.statusCode === 200, 'GET /api/v1/incidents?filter=emergency returns HTTP 200');
    assert(resQueueEmerg.json.incidents.every(i => i.is_emergency || i.urgency === 'CRITICAL' || i.category === 'FLOOD_EMERGENCY'), 'All items in emergency filter meet emergency criteria');

    // 5B. Tab 2: General Infrastructure Queue
    const resQueueGen = await request('/api/v1/incidents?filter=general');
    assert(resQueueGen.statusCode === 200, 'GET /api/v1/incidents?filter=general returns HTTP 200');
    assert(resQueueGen.json.incidents.every(i => !i.is_emergency && i.urgency !== 'CRITICAL' && i.status !== 'RESOLVED'), 'General queue excludes emergencies and resolved tickets');

    // 5C. Tab 3: Voice Call & Audio Ingestion Queue
    const resQueueVoice = await request('/api/v1/incidents?filter=voice');
    assert(resQueueVoice.statusCode === 200, 'GET /api/v1/incidents?filter=voice returns HTTP 200');
    assert(resQueueVoice.json.incidents.every(i => i.channel_origin === 'IVR' || i.channel_origin === 'IVR_VOICE' || i.channel_origin === 'PHONE_CALL' || i.audio_path), 'All voice queue items have voice/audio origin');

    // 5D. Tab 4: Stalled / Overdue SLA Queue
    const resQueueOvd = await request('/api/v1/incidents?filter=overdue');
    assert(resQueueOvd.statusCode === 200, 'GET /api/v1/incidents?filter=overdue returns HTTP 200');
    assert(resQueueOvd.json.incidents.every(i => i.is_sla_breached || i.status === 'ESCALATED_UNRESOLVED'), 'Overdue queue items have SLA breach or escalated status');

    // 5E. Tab 5: Resolved Archive Queue
    const resQueueRes = await request('/api/v1/incidents?filter=resolved');
    assert(resQueueRes.statusCode === 200, 'GET /api/v1/incidents?filter=resolved returns HTTP 200');
    assert(resQueueRes.json.incidents.every(i => i.status === 'RESOLVED'), 'Resolved queue items have status: RESOLVED');

    // ------------------------------------------------------------------------
    // TEST 6: Incident Lifecycle State Machine & Proof of Resolution
    // ------------------------------------------------------------------------
    console.log(`\n[TEST 6] Incident Lifecycle State Machine & Proof Verification`);
    const targetTicket = resSmsReg.json.ticketCode; // From Test 2B
    console.log(`  Target Ticket Code for Lifecycle Transition: #${targetTicket}`);

    // Step A: RECEIVED -> DISPATCHED (Crew Assigned)
    const resDispatch = await request(`/api/v1/incidents/${targetTicket}/status`, { method: 'PATCH' }, {
      status: 'DISPATCHED',
      crew_id: 1
    });
    assert(resDispatch.statusCode === 200, 'Transition to DISPATCHED returns HTTP 200');
    assert(resDispatch.json.ticket.status === 'DISPATCHED', 'Ticket status updated to DISPATCHED');
    assert(resDispatch.json.ticket.assigned_crew !== null, 'Assigned crew field populated');

    // Step B: DISPATCHED -> RESOLVED (with proof of resolution, worker ID, notes)
    const resResolve = await request(`/api/v1/incidents/${targetTicket}/status`, { method: 'PATCH' }, {
      status: 'RESOLVED',
      resolved_by_worker_id: 'TECH-GWSA-04',
      resolution_notes: 'Excavated 1.5m section, replaced ruptured PVC coupling with cast iron collar, backfilled and paved.',
      resolution_proof_url: '/images/gondar_fasiledes_castle.jpg'
    });
    assert(resResolve.statusCode === 200, 'Transition to RESOLVED returns HTTP 200');
    assert(resResolve.json.ticket.status === 'RESOLVED', 'Ticket status updated to RESOLVED');
    assert(resResolve.json.ticket.resolved_at !== null, 'resolved_at timestamp recorded');
    assert(resResolve.json.ticket.resolved_by_worker_id === 'TECH-GWSA-04', 'resolved_by_worker_id recorded');
    assert(resResolve.json.ticket.resolution_proof_url === '/images/gondar_fasiledes_castle.jpg', 'resolution_proof_url recorded');
    assert(typeof resResolve.json.ticket.time_to_fix_minutes === 'number', 'time_to_fix_minutes calculated');
    assert(resResolve.json.ticket.is_sla_breached === false, 'is_sla_breached is false for resolved ticket');

    // ------------------------------------------------------------------------
    // TEST 7: Audio Recording File Serving (/uploads/audio/sample_ivr.wav)
    // ------------------------------------------------------------------------
    console.log(`\n[TEST 7] Static Audio File Serving & Playback`);
    const resAudio = await request('/uploads/audio/sample_ivr.wav');
    assert(resAudio.statusCode === 200, 'GET /uploads/audio/sample_ivr.wav returns HTTP 200');
    assert(resAudio.headers['content-type'] === 'audio/wav', 'Content-Type is audio/wav');
    assert(resAudio.buffer.length > 44, 'Audio file has valid byte length (>44 bytes)');
    const riffHeader = resAudio.buffer.slice(0, 4).toString('ascii');
    assert(riffHeader === 'RIFF', 'File starts with valid RIFF header');

    console.log(`\n================================================================`);
    console.log(` 🏆 ALL 7 OMNICHANNEL & LIFECYCLE TEST SUITES PASSED (100%)`);
    console.log(`================================================================`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ UNHANDLED TEST EXCEPTION:`, err);
    process.exit(1);
  } finally {
    if (serverProc) serverProc.kill();
  }
}

runTests();
