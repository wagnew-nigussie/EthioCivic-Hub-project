// test_images_and_positions.js
const http = require('http');
const { spawn } = require('child_process');

const PORT = 5050;
process.env.PORT = PORT;

console.log('--- Starting Server on Port ' + PORT + ' for Image & Position Verification ---');
const serverProc = spawn('node', ['server/server.js'], {
  env: { ...process.env, PORT: String(PORT) },
  cwd: __dirname
});

serverProc.stdout.on('data', data => console.log('[Server stdout]:', data.toString().trim()));
serverProc.stderr.on('data', data => console.error('[Server stderr]:', data.toString().trim()));

function request(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(data)
        });
      });
    }).on('error', reject);
  });
}

setTimeout(async () => {
  try {
    console.log('\n[TEST 1] Verifying Primary Gondar Hero Image (Fasilides Castle Facade)...');
    const heroRes = await request('/images/gondar_fasiledes_castle.jpg');
    console.log(`Status: ${heroRes.statusCode}, Content-Type: ${heroRes.headers['content-type']}, Size: ${heroRes.body.length} bytes`);
    if (heroRes.statusCode !== 200 || heroRes.headers['content-type'] !== 'image/jpeg' || heroRes.body.length < 50000) {
      throw new Error('Hero image failed verification');
    }
    console.log('✓ TEST 1 PASSED: Hero image served correctly.');

    console.log('\n[TEST 2] Verifying Panoramic Aerial Image (Fasil Ghebbi Royal Enclosure)...');
    const aerialRes = await request('/images/gondar_fasil_ghebbi_aerial.jpg');
    console.log(`Status: ${aerialRes.statusCode}, Content-Type: ${aerialRes.headers['content-type']}, Size: ${aerialRes.body.length} bytes`);
    if (aerialRes.statusCode !== 200 || aerialRes.headers['content-type'] !== 'image/jpeg' || aerialRes.body.length < 50000) {
      throw new Error('Aerial image failed verification');
    }
    console.log('✓ TEST 2 PASSED: Aerial image served correctly.');

    console.log('\n[TEST 3] Verifying all 12 Sub-City Photographic Assets...');
    for (let i = 1; i <= 12; i++) {
      const idx = i < 10 ? '0' + i : i;
      const subRes = await request(`/images/subcities/sc_${idx}_fasil.jpg`.replace('_fasil.jpg', '') + (
        i === 1 ? '_fasil.jpg' :
        i === 2 ? '_maraki.jpg' :
        i === 3 ? '_arada.jpg' :
        i === 4 ? '_azezo.jpg' :
        i === 5 ? '_zobel.jpg' :
        i === 6 ? '_jantekel.jpg' :
        i === 7 ? '_bilajig.jpg' :
        i === 8 ? '_gubaie.jpg' :
        i === 9 ? '_piassa.jpg' :
        i === 10 ? '_selam.jpg' :
        i === 11 ? '_mintiwab.jpg' : '_abraj.jpg'
      ));
      if (subRes.statusCode !== 200 || subRes.headers['content-type'] !== 'image/jpeg') {
        throw new Error(`Subcity image ${i} failed`);
      }
      process.stdout.write(`✓ Subcity #${idx} OK (${subRes.body.length} bytes) `);
    }
    console.log('\n✓ TEST 3 PASSED: All 12 sub-city photos verified.');

    console.log('\n[TEST 4] Verifying Category Vector SVGs...');
    const categories = ['water_leak.svg', 'power_outage.svg', 'solid_waste.svg', 'road_damage.svg', 'flash_flood.svg'];
    for (const cat of categories) {
      const catRes = await request(`/images/categories/${cat}`);
      if (catRes.statusCode !== 200 || catRes.headers['content-type'] !== 'image/svg+xml') {
        throw new Error(`Category ${cat} failed`);
      }
      process.stdout.write(`✓ ${cat} OK `);
    }
    console.log('\n✓ TEST 4 PASSED: All 5 category SVGs verified.');

    console.log('\n[TEST 5] Verifying API Subcities endpoint returns local image paths...');
    const apiSc = await request('/api/v1/subcities');
    const scData = JSON.parse(apiSc.body.toString());
    console.log(`Subcities returned: ${scData.count}`);
    scData.subcities.forEach(sc => {
      if (!sc.image.startsWith('/images/subcities/')) {
        throw new Error(`Subcity ${sc.name} does not have local image path: ${sc.image}`);
      }
    });
    console.log('✓ TEST 5 PASSED: All subcities have local image paths.');

    console.log('\n[TEST 6] Verifying Index.html HTML contains authentic image positions...');
    const indexRes = await request('/');
    const html = indexRes.body.toString();
    if (!html.includes('/images/gondar_fasiledes_castle.jpg')) throw new Error('index.html missing gondar_fasiledes_castle.jpg');
    if (!html.includes('/images/gondar_fasil_ghebbi_aerial.jpg')) throw new Error('index.html missing gondar_fasil_ghebbi_aerial.jpg');
    if (!html.includes('/images/categories/flash_flood.svg')) throw new Error('index.html missing flash_flood.svg');
    console.log('✓ TEST 6 PASSED: index.html correctly positions all local images.');

    console.log('\n======================================================');
    console.log('🎉 ALL TESTS PASSED! 100% LOCAL & OFFLINE READY');
    console.log('======================================================');
  } catch (err) {
    console.error('\n❌ TEST FAILED:', err.message);
    process.exitCode = 1;
  } finally {
    serverProc.kill();
    process.exit(process.exitCode || 0);
  }
}, 1500);
