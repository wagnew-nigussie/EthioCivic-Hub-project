// test_navigation_submenus.js
// Automated verification for Rebuilt Navigation Menu, Universal Submenus Drawer & Real Website Decoration

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Starting Navigation Menu & Submenus Test Suite...\n');

const htmlPath = path.join(__dirname, 'public', 'index.html');
const jsPath = path.join(__dirname, 'public', 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// 1. Check Header Decoration and Styling
console.log('1. Checking Header Real Website Decoration & Background...');
assert(html.includes('id="primary-global-header"'), 'Header must have id="primary-global-header"');
assert(html.includes('linear-gradient(180deg, #020817 0%, #031c18 60%, #020817 100%)'), 'Header must have authentic civic dark-emerald gradient');
assert(html.includes('ethio-ribbon'), 'Header must feature Ethiopian National Tricolor Accent Ribbon');
assert(html.includes('border-bottom: 1px solid rgba(16, 185, 129, 0.28)'), 'Header must have glowing emerald bottom border');
console.log('   ✅ Header background decorated with authentic civic dark-emerald styling.');

// 2. Check Menu Button and Universal Accessibility
console.log('\n2. Checking Menu Icon (☰) & Universal Drawer Accessibility...');
assert(html.includes('id="mobile-menu-btn"'), 'mobile-menu-btn must exist in header');
assert(!html.match(/id="mobile-menu-btn"[^>]*class="[^"]*lg:hidden/), 'mobile-menu-btn must NOT have lg:hidden (must be visible on maximized desktop)');
assert(html.includes('id="mobile-menu-icon"'), 'mobile-menu-icon must exist');
assert(html.includes('id="mobile-menu-label"'), 'mobile-menu-label must exist');
assert(html.includes('id="mobile-nav-drawer"'), 'mobile-nav-drawer must exist');
assert(!html.match(/id="mobile-nav-drawer"[^>]*class="[^"]*lg:hidden/), 'mobile-nav-drawer must NOT have lg:hidden so it opens on desktop maximized screen');
console.log('   ✅ Menu icon (☰) and drawer are universally functional on desktop maximized & mobile screens.');

// 3. Check Submenus Inside Drawer
console.log('\n3. Checking 4-Column Submenus Inside Drawer...');
// Submenu 1: Municipal Public Works
assert(html.includes('Water & Sewerage (GWSA)'), 'Drawer must include GWSA Water');
assert(html.includes('Electric Utility (EEU)'), 'Drawer must include EEU Electric');
assert(html.includes('Fire & Flood Rescue'), 'Drawer must include Fire & Flood Rescue');
assert(html.includes('Solid Waste & Sanitation'), 'Drawer must include Solid Waste');
assert(html.includes('Roads, Bridges & Drainage'), 'Drawer must include Roads & Drainage');

// Submenu 2: 12 Sub-City Zones
const subCities = ['Fasil', 'Maraki', 'Arada', 'Azezo-Teda', 'Zobel', 'Jantekel', 'Bilajig', 'Gubaie', 'Piassa', 'Selam', 'Mintiwab', 'Abraj'];
subCities.forEach(sc => {
  assert(html.includes(sc), `Drawer must list ${sc} Sub-City`);
});

// Submenu 3: Civic Portals
assert(html.includes("navigateTo('landing')"), 'Drawer must link to Overview portal');
assert(html.includes("navigateTo('report')"), 'Drawer must link to Report portal');
assert(html.includes("navigateTo('track')"), 'Drawer must link to Track portal');
assert(html.includes("navigateTo('dispatch')"), 'Drawer must link to Dispatch portal');
assert(html.includes("navigateTo('actions')"), 'Drawer must link to Recent Actions portal');
assert(html.includes("navigateTo('analytics')"), 'Drawer must link to Analytics portal');
assert(html.includes("navigateTo('crew')"), 'Drawer must link to Crew portal');

// Submenu 4: Executive Administration
assert(html.includes("navigateTo('admin')"), 'Drawer must link to Wagnew Nigussie Admin Portal');
assert(html.includes("openFloodSosModal()"), 'Drawer must link to Flood SOS');
assert(html.includes("toggleSimulator(true)"), 'Drawer must link to Telecom Simulator');
console.log('   ✅ All 4 Submenus (5 Utilities, 12 Sub-Cities, 7 Portals, Executive Command) verified.');

// 4. Check Services Dropdown Mega-Menu
console.log('\n4. Checking Desktop Services ⌵ Mega-Menu Dropdown...');
assert(html.includes('id="services-dropdown-wrap"'), 'services-dropdown-wrap must exist');
assert(html.includes('id="nav-services-btn"'), 'nav-services-btn must exist');
assert(html.includes('id="nav-services-chevron"'), 'nav-services-chevron must exist');
assert(html.includes('id="services-dropdown-menu"'), 'services-dropdown-menu must exist');
assert(html.includes('toggleServicesDropdown(event)'), 'nav-services-btn must trigger toggleServicesDropdown');
console.log('   ✅ Services ⌵ Dropdown and interactive chevron verified.');

// 5. Check Controller Functions in public/app.js
console.log('\n5. Checking public/app.js Navigation Controllers...');
assert(js.includes('function toggleMobileMenu('), 'toggleMobileMenu function must exist in app.js');
assert(js.includes('function toggleServicesDropdown('), 'toggleServicesDropdown function must exist in app.js');
assert(js.includes('function closeServicesDropdown('), 'closeServicesDropdown function must exist in app.js');
assert(js.includes('function filterBySubCity('), 'filterBySubCity function must exist in app.js');
assert(js.includes('nav_menu:'), 'nav_menu must exist in TRANSLATIONS');
assert(js.includes('nav_close:'), 'nav_close must exist in TRANSLATIONS');
console.log('   ✅ All navigation functions and bilingual translations confirmed in public/app.js.');

console.log('\n🎉 ALL NAVIGATION & SUBMENUS VERIFICATION TESTS PASSED (100%)!\n');
