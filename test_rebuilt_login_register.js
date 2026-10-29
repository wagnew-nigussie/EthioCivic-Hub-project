/**
 * Automated Verification Suite for Rebuilt Executive Admin Login & Register Portal
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const http = require('http');

console.log('🧪 Starting Rebuilt Admin Login & Registration Suite...\n');

// 1. Verify HTML DOM Structure
console.log('1. Checking Modal Architecture & Responsive Scrolling in public/index.html...');
const html = fs.readFileSync(path.join(__dirname, 'public/index.html'), 'utf-8');

assert(html.includes('id="admin-auth-modal"'), 'admin-auth-modal missing');
assert(html.includes('max-h-[92vh]'), 'Modal container must have max-h-[92vh] to prevent off-screen cutoff');
assert(html.includes('overflow-y-auto custom-scroll'), 'Form body must have overflow-y-auto custom-scroll');

// Verify 3 mode switcher tabs
assert(html.includes('id="auth-mode-btn-login"'), 'Sign In tab missing');
assert(html.includes('id="auth-mode-btn-register"'), 'Register tab missing');
assert(html.includes('id="auth-mode-btn-setup"'), 'Set Password tab missing');

// Verify 1-Click Quick Fill buttons exist
assert(html.includes('quickFillAdminCredentials()'), '1-Click Fill button for login missing');
assert(html.includes('quickFillRegisterSuperAdmin()'), '1-Click Fill for Super Admin registration missing');
assert(html.includes('quickFillRegisterDispatcher()'), '1-Click Fill for Dispatcher registration missing');

// Verify all 3 field containers exist
assert(html.includes('id="admin-auth-login-fields"'), 'admin-auth-login-fields missing');
assert(html.includes('id="admin-auth-register-fields"'), 'admin-auth-register-fields missing');
assert(html.includes('id="admin-auth-setup-fields"'), 'admin-auth-setup-fields missing');

console.log('   ✅ HTML Architecture: 3 distinct tabs, responsive scroll container, and 1-click helper buttons verified.\n');

// 2. Verify Client-side Controller functions in public/app.js
console.log('2. Checking Controller Functions in public/app.js...');
const appJs = fs.readFileSync(path.join(__dirname, 'public/app.js'), 'utf-8');

assert(appJs.includes('function quickFillAdminCredentials()'), 'quickFillAdminCredentials missing');
assert(appJs.includes('function quickFillRegisterSuperAdmin()'), 'quickFillRegisterSuperAdmin missing');
assert(appJs.includes('function quickFillRegisterDispatcher()'), 'quickFillRegisterDispatcher missing');
assert(appJs.includes('function setAdminAuthMode(mode)'), 'setAdminAuthMode missing');
assert(appJs.includes('function handleAdminAuthSubmit(e)'), 'handleAdminAuthSubmit missing');

console.log('   ✅ Controller Functions: quickFillAdminCredentials, quickFillRegister, and auth handlers verified.\n');

// 3. Functional End-to-End API Tests against Server
console.log('3. Running Live Server Auth & Registration Workflow Tests...');
const { fork } = require('child_process');

const serverProcess = fork(path.join(__dirname, 'server/server.js'), [], {
  env: { ...process.env, PORT: 5080 },
  silent: true
});

function request(method, path, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 5080,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(raw) });
        } catch (e) {
          resolve({ status: res.statusCode, body: raw });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

setTimeout(async () => {
  try {
    // Test 3A: Direct Login with Master Credentials
    console.log('   [API TEST A] Super Administrator Sign In with Master Key...');
    const loginRes = await request('POST', '/api/v1/admin/auth/login', {}, {
      full_name: 'Wagnew Nigussie',
      email: 'wagnewnigussie569@gmail.com',
      password: 'FasilidesMasterKey#2026!'
    });
    assert.strictEqual(loginRes.status, 200, `Expected 200, got ${loginRes.status}`);
    assert(loginRes.body.token, 'Must return bearer token');
    assert.strictEqual(loginRes.body.admin.email, 'wagnewnigussie569@gmail.com');
    console.log('     ✓ Wagnew Nigussie successfully authenticated via Master Key.');

    const adminToken = loginRes.body.token;

    // Test 3B: Super Admin Registration / Password Initialization
    console.log('   [API TEST B] Super Administrator Direct Registration / Password Setup...');
    const regAdminRes = await request('POST', '/api/v1/admin/auth/register', {}, {
      full_name: 'Wagnew Nigussie',
      email: 'wagnewnigussie569@gmail.com',
      role: 'SUPER_ADMIN',
      password: 'FasilidesMasterKey#2026!'
    });
    assert.strictEqual(regAdminRes.status, 200, `Expected 200, got ${regAdminRes.status}`);
    assert(regAdminRes.body.token, 'Super admin registration must return active session token');
    console.log('     ✓ Wagnew Nigussie can register or update master password without restriction.');

    // Test 3C: Registering Officer as Authenticated Admin
    console.log('   [API TEST C] Provisioning New Municipal Officer (Dispatcher)...');
    const officerEmail = `officer_${Date.now()}@gondar.gov.et`;
    const officerRes = await request('POST', '/api/v1/admin/auth/register', {
      'Authorization': `Bearer ${adminToken}`
    }, {
      full_name: 'Abebe Bikila',
      email: officerEmail,
      role: 'DISPATCHER',
      password: 'OfficerAbebe2026!'
    });
    assert.strictEqual(officerRes.status, 201, `Expected 201, got ${officerRes.status}`);
    assert.strictEqual(officerRes.body.user.full_name, 'Abebe Bikila');
    console.log('     ✓ Admin successfully created and secured officer account.');

    // Test 3D: Verify Officer can log in
    console.log('   [API TEST D] Authenticating newly created Officer...');
    const officerLogin = await request('POST', '/api/v1/admin/auth/login', {}, {
      full_name: 'Abebe Bikila',
      email: officerEmail,
      password: 'OfficerAbebe2026!'
    });
    assert.strictEqual(officerLogin.status, 200);
    assert.strictEqual(officerLogin.body.admin.role, 'DISPATCHER');
    console.log('     ✓ Newly created officer logged in successfully.');

    // Test 3E: Block Unauthorized Self-Registration
    console.log('   [API TEST E] Blocking Unauthorized Public Registration...');
    const unauthRes = await request('POST', '/api/v1/admin/auth/register', {}, {
      full_name: 'Unauthorized User',
      email: 'unauth@gmail.com',
      password: 'SomePassword123'
    });
    assert.strictEqual(unauthRes.status, 403);
    assert(unauthRes.body.error.includes('Registration Restricted'));
    console.log('     ✓ Blocked unauthorized public self-registration (403 Forbidden).');

    // Test 3F: Master Password Reset / Setup endpoint
    console.log('   [API TEST F] Set / Update Master Password (/setup)...');
    const setupRes = await request('POST', '/api/v1/admin/auth/setup', {}, {
      password: 'FasilidesMasterKey#2026!'
    });
    assert.strictEqual(setupRes.status, 200);
    assert(setupRes.body.token);
    console.log('     ✓ Master Password endpoint verified and active.');

    console.log('\n🎉 ALL REBUILT LOGIN & REGISTRATION WORKFLOWS PASSED (100%)!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    serverProcess.kill();
    process.exit(0);
  }
}, 1200);
