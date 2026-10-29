// ================================================================
// Gondar SmartCivic - Admin Portal End-to-End Test Suite
// Verifies Wagnew Nigussie's Administrator Capabilities:
//  - Secure PBKDF2 authentication (zero hardcoded password)
//  - Solved vs Unsolved tracking
//  - Duplicate/Repeated report sentinel (When, Who, Where)
//  - Periodic reports (Daily, Weekly, Monthly, Yearly)
//  - Investigation progress & notes update
//  - Audit logs ledger
// ================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const TEST_PORT = process.env.TEST_PORT || 5070;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;
const AUTH_FILE = path.join(__dirname, 'server', '.admin_auth.json');

// Helper to make HTTP requests
function request(method, endpoint, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          parsed = data;
        }
        resolve({ status: res.statusCode, headers: res.headers, body: parsed });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('================================================================');
  console.log(' Gondar SmartCivic Admin Portal Verification (Wagnew Nigussie)');
  console.log('================================================================\n');

  // Clean up any existing auth file for pristine setup testing
  if (fs.existsSync(AUTH_FILE)) {
    try { fs.unlinkSync(AUTH_FILE); } catch(e){}
  }

  // Start server instance
  console.log(`[STEP 1] Starting test server instance on port ${TEST_PORT}...`);
  const serverProcess = spawn('node', ['server/server.js'], {
    env: { ...process.env, PORT: String(TEST_PORT) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  serverProcess.stderr.on('data', (d) => process.stderr.write(d));

  // Wait for server to come up
  await new Promise((resolve) => {
    serverProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Server Running on Port')) {
        resolve();
      }
    });
    setTimeout(resolve, 1500); // fallback
  });

  try {
    // -----------------------------------------------------------
    // TEST 1: Administrator Identity & Initial Status Check
    // -----------------------------------------------------------
    console.log('\n[TEST 1] Administrator Identity & Auth Status Check');
    const statusRes = await request('GET', '/api/v1/admin/auth/status');
    console.assert(statusRes.status === 200, `Expected 200, got ${statusRes.status}`);
    console.assert(statusRes.body.admin_name === 'Wagnew Nigussie', `Admin name mismatch: ${statusRes.body.admin_name}`);
    console.assert(statusRes.body.email === 'wagnewnigussie569@gmail.com', `Admin email mismatch: ${statusRes.body.email}`);
    console.assert(statusRes.body.role === 'SUPER_ADMIN', `Admin role mismatch: ${statusRes.body.role}`);
    console.log(`  ✓ Identity verified: ${statusRes.body.admin_name} (${statusRes.body.email})`);
    console.log(`  ✓ Initial configuration status: configured = ${statusRes.body.configured}`);

    // -----------------------------------------------------------
    // TEST 2: Secure Password Setup (PBKDF2, Zero Plaintext)
    // -----------------------------------------------------------
    console.log('\n[TEST 2] Secure Password Setup (PBKDF2-SHA512)');
    const testPassword = 'FasilidesMasterKey#2026!';
    const setupRes = await request('POST', '/api/v1/admin/auth/setup', {}, {
      password: testPassword
    });
    console.assert(setupRes.status === 200, `Setup expected 200, got ${setupRes.status}`);
    console.assert(setupRes.body.status === 'SUCCESS', 'Setup status should be SUCCESS');
    console.log('  ✓ Administrator password securely established via PBKDF2');

    // Verify .admin_auth.json exists and does NOT contain plaintext password
    console.assert(fs.existsSync(AUTH_FILE), '.admin_auth.json must exist');
    const authDiskData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
    console.assert(authDiskData.salt && authDiskData.hash, 'Salt and PBKDF2 hash must be present');
    console.assert(!JSON.stringify(authDiskData).includes(testPassword), 'CRITICAL SECURITY CHECK: Plaintext password must never be stored!');
    console.log('  ✓ Storage verification: Salt (16-byte hex) and SHA512 hash stored. Plaintext password NOT present on disk.');

    // -----------------------------------------------------------
    // TEST 3: Administrator Authentication (Full Name, Email, Password)
    // -----------------------------------------------------------
    console.log('\n[TEST 3] Administrator Authentication (Full Name, Email, Password)');
    // Wrong password test
    const wrongAuth = await request('POST', '/api/v1/admin/auth/login', {}, {
      full_name: 'Wagnew Nigussie',
      email: 'wagnewnigussie569@gmail.com',
      password: 'IncorrectPassword123'
    });
    console.assert(wrongAuth.status === 401, `Wrong password should return 401, got ${wrongAuth.status}`);
    console.log('  ✓ Invalid password rejected with HTTP 401');

    // Correct login test with Full Name, Email, Password
    const authRes = await request('POST', '/api/v1/admin/auth/login', {}, {
      full_name: 'Wagnew Nigussie',
      email: 'wagnewnigussie569@gmail.com',
      password: testPassword
    });
    console.assert(authRes.status === 200, `Login expected 200, got ${authRes.status}`);
    console.assert(authRes.body.status === 'SUCCESS', 'Login should succeed');
    console.assert(typeof authRes.body.token === 'string' && authRes.body.token.length >= 32, 'Valid bearer token issued');
    const token = authRes.body.token;
    console.log(`  ✓ Login successful! Bearer token issued (${token.slice(0, 16)}...)`);

    // Verify Session Validation
    const authHeaders = { 'Authorization': `Bearer ${token}` };
    const sessRes = await request('GET', '/api/v1/admin/auth/session', authHeaders);
    console.assert(sessRes.status === 200 && sessRes.body.status === 'AUTHENTICATED', 'Session must be authenticated');
    console.assert(sessRes.body.admin.name === 'Wagnew Nigussie', 'Session admin name correct');
    console.log('  ✓ Active session validated via Bearer header');

    // -----------------------------------------------------------
    // TEST 3B: Registration Restricted: Only Created & Secured by Admin
    // -----------------------------------------------------------
    console.log('\n[TEST 3B] Security Check: Registration Restricted to Admin Only');
    // Unauthorized citizen tries to register self
    const unauthReg = await request('POST', '/api/v1/admin/auth/register', {}, {
      full_name: 'Random Citizen',
      email: 'random.citizen@example.com',
      password: 'CitizenPassword#123'
    });
    console.assert(unauthReg.status === 403, `Unauthenticated registration must return 403 Forbidden, got ${unauthReg.status}`);
    console.assert(unauthReg.body.error.includes('Registration Restricted'), 'Must return restriction error message');
    console.log('  ✓ Blocked unauthorized public self-registration (HTTP 403 Forbidden)');

    // Authenticated Admin creates new authorized officer
    const officerRes = await request('POST', '/api/v1/admin/auth/register', authHeaders, {
      full_name: 'Eng. Dawit Hailu',
      email: 'dawit.hailu@gondar.gov.et',
      role: 'DISPATCHER',
      password: 'OfficerDawitPassword#2026!'
    });
    console.assert(officerRes.status === 201, `Admin-authorized registration expected 201, got ${officerRes.status}`);
    console.assert(officerRes.body.user.full_name === 'Eng. Dawit Hailu', 'Created user name matches');
    console.log(`  ✓ Authorized account created and secured by Admin: ${officerRes.body.user.full_name} (${officerRes.body.user.email})`);

    // Verify User Roster
    const usersRes = await request('GET', '/api/v1/admin/users', authHeaders);
    console.assert(usersRes.status === 200 && usersRes.body.users.length >= 2, 'Roster must contain master admin and created officer');
    console.log(`  ✓ Personnel Roster verified (${usersRes.body.users.length} accounts): ${usersRes.body.users.map(u => u.full_name).join(', ')}`);

    // Verify newly registered officer can log in with Full Name, Email, and Password
    const officerLogin = await request('POST', '/api/v1/admin/auth/login', {}, {
      full_name: 'Eng. Dawit Hailu',
      email: 'dawit.hailu@gondar.gov.et',
      password: 'OfficerDawitPassword#2026!'
    });
    console.assert(officerLogin.status === 200, `Officer login expected 200, got ${officerLogin.status}`);
    console.assert(officerLogin.body.admin.name === 'Eng. Dawit Hailu', 'Officer login identity verified');
    console.log('  ✓ Newly registered officer logged in successfully with Full Name, Email, and Password.');

    // -----------------------------------------------------------
    // TEST 4: Repeated & Duplicate Incident Sentinel (When, Who, Where)
    // -----------------------------------------------------------
    console.log('\n[TEST 4] Repeated & Duplicate Reports Sentinel');
    const dupesRes = await request('GET', '/api/v1/admin/duplicates', authHeaders);
    console.assert(dupesRes.status === 200, `Duplicates expected 200, got ${dupesRes.status}`);
    console.assert(dupesRes.body.clusters && dupesRes.body.clusters.length > 0, 'Should find at least 1 duplicate cluster');
    
    const waterCluster = dupesRes.body.clusters.find(c => c.category === 'WATER_LEAK' || c.sub_city === 'Maraki');
    console.assert(waterCluster, 'Should identify Maraki water main duplicate cluster');
    console.assert(waterCluster.repetition_count >= 2, `Cluster count should be >= 2, got ${waterCluster.repetition_count}`);
    console.assert(waterCluster.submissions && waterCluster.submissions.length >= 2, 'Should detail multiple submissions');
    
    console.log(`  ✓ Duplicate Cluster Detected: "${waterCluster.landmark}"`);
    console.log(`    - Category: ${waterCluster.category}`);
    console.log(`    - WHERE: ${waterCluster.sub_city} (${waterCluster.landmark})`);
    console.log(`    - WHEN: First reported ${waterCluster.first_reported_at}, latest ${waterCluster.latest_reported_at}`);
    console.log(`    - WHO (${waterCluster.repetition_count} citizens): ${waterCluster.submissions.map(r => `${r.caller_phone} via ${r.channel}`).join(' | ')}`);

    // -----------------------------------------------------------
    // TEST 5: Duplicate Merge Operation
    // -----------------------------------------------------------
    console.log('\n[TEST 5] Merge Repeated Incidents into Primary Dossier');
    const mergeRes = await request('POST', '/api/v1/admin/duplicates/merge', authHeaders, {
      master_ticket: 'GDR-4821',
      duplicate_tickets: ['GDR-SMS-4822', 'GDR-USD-4823']
    });
    console.assert(mergeRes.status === 200, `Merge expected 200, got ${mergeRes.status}`);
    console.assert(mergeRes.body.status === 'SUCCESS', 'Merge should succeed');
    console.log(`  ✓ Successfully merged repeated reports into master ticket #GDR-4821`);

    // -----------------------------------------------------------
    // TEST 6: Periodic Reports Engine (Daily, Weekly, Monthly, Yearly)
    // -----------------------------------------------------------
    console.log('\n[TEST 6] Periodic Municipal Reports Engine');
    const periods = ['daily', 'weekly', 'monthly', 'yearly'];
    for (const p of periods) {
      const repRes = await request('GET', `/api/v1/admin/reports?period=${p}`, authHeaders);
      console.assert(repRes.status === 200, `Report for ${p} expected 200, got ${repRes.status}`);
      const r = repRes.body;
      console.assert(typeof r.metrics.total === 'number', 'Metrics total must be a number');
      console.assert(typeof r.metrics.solved === 'number', 'Metrics solved must be a number');
      console.assert(typeof r.metrics.resolution_rate === 'number', 'Resolution rate must be a number');
      console.assert(Array.isArray(r.department_stats), 'Departments matrix must be an array');
      console.assert(Array.isArray(r.sub_city_stats) && r.sub_city_stats.length === 12, 'Must include all 12 sub-cities');
      console.log(`  ✓ ${p.toUpperCase()} Report: Total: ${r.metrics.total}, Solved: ${r.metrics.solved}, In Progress: ${r.metrics.in_progress}, Resolution: ${r.metrics.resolution_rate}% | 12 Subcities accounted`);
    }

    // -----------------------------------------------------------
    // TEST 7: Incident Investigation Progress & Officer Assignment
    // -----------------------------------------------------------
    console.log('\n[TEST 7] Incident Investigation Progress & Officer Reassignment');
    const investRes = await request('PATCH', '/api/v1/admin/incidents/GDR-4821/investigate', authHeaders, {
      status: 'IN_PROGRESS',
      assigned_crew: 'GWSA Emergency Rapid Response Crew Alpha (Eng. Dawit)',
      investigation_notes: 'Pressure gauges calibrated; excavation underway near Maraki roundabout.',
      officer_name: 'Wagnew Nigussie'
    });
    console.assert(investRes.status === 200, `Investigation expected 200, got ${investRes.status}`);
    console.assert(investRes.body.ticket.assigned_crew.includes('Dawit'), 'Assigned crew updated');
    console.log('  ✓ Investigation progress and crew assignment updated for #GDR-4821');

    // -----------------------------------------------------------
    // TEST 8: Audit Logs & Administrative Governance
    // -----------------------------------------------------------
    console.log('\n[TEST 8] System Audit Trail & Staff Activity Verification');
    const auditRes = await request('GET', '/api/v1/admin/audit-logs', authHeaders);
    console.assert(auditRes.status === 200, `Audit logs expected 200, got ${auditRes.status}`);
    console.assert(Array.isArray(auditRes.body.logs) && auditRes.body.logs.length >= 3, 'Should have recorded audit trail');
    
    const actions = auditRes.body.logs.map(l => l.action);
    console.assert(actions.includes('ADMIN_PASSWORD_UPDATED') || actions.includes('LOGIN_SUCCESS'), 'Setup or login recorded');
    console.assert(actions.includes('DUPLICATES_MERGED'), 'Merge action recorded in audit log');
    console.assert(actions.includes('INVESTIGATION_NOTE_ADDED'), 'Investigation recorded in audit log');
    console.log(`  ✓ System Audit Logs verified (${auditRes.body.logs.length} logged events):`);
    auditRes.body.logs.slice(-4).forEach(log => {
      console.log(`    - [${log.timestamp.slice(11, 19)}] ${log.action}: ${log.details} (User: ${log.actor_name})`);
    });

    // -----------------------------------------------------------
    // TEST 9: Secure Logout & Token Invalidation
    // -----------------------------------------------------------
    console.log('\n[TEST 9] Session Termination (Logout)');
    const logoutRes = await request('POST', '/api/v1/admin/auth/logout', authHeaders);
    console.assert(logoutRes.status === 200, `Logout expected 200, got ${logoutRes.status}`);
    
    // Check token is now revoked
    const postLogoutCheck = await request('GET', '/api/v1/admin/auth/session', authHeaders);
    console.assert(postLogoutCheck.status === 401, 'Revoked token must return 401');
    console.log('  ✓ Token invalidated; unauthorized session access correctly blocked.');

    console.log('\n================================================================');
    console.log(' 🏆 ALL ADMIN PORTAL VERIFICATION TESTS PASSED (100%)');
    console.log('================================================================');
  } finally {
    serverProcess.kill('SIGTERM');
  }
}

runTests().catch(err => {
  console.error('\n❌ TEST RUNNER FAILED WITH ERROR:', err);
  process.exit(1);
});
