/**
 * Gondar SmartCivic (EthioCivic-Hub) Backend Server
 * Omnichannel Municipal Ingestion, Spatial Dispatching, and Analytics API
 * Gondar City Administration, Amhara Region, Ethiopia
 * 
 * ZERO EXTERNAL DEPENDENCY ARCHITECTURE:
 * Built with Node.js Standard Library (http, fs, path, url) for 100% offline portability.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');
const crypto = require('crypto');

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const AUDIO_DIR = path.join(UPLOADS_DIR, 'audio');
const PHOTO_DIR = path.join(UPLOADS_DIR, 'photos');
const AUTH_FILE = path.join(__dirname, '.admin_auth.json');

// Session storage: token -> { id, email, name, role, expiresAt }
const adminSessions = new Map();

function getAdminAuth() {
  let authData = null;
  if (fs.existsSync(AUTH_FILE)) {
    try {
      authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
    } catch (e) {
      console.error('Error reading admin auth file:', e);
    }
  }
  if (!authData && process.env.ADMIN_PASSWORD) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(process.env.ADMIN_PASSWORD, salt, 100000, 64, 'sha512').toString('hex');
    authData = {
      name: 'Wagnew Nigussie',
      email: 'wagnewnigussie569@gmail.com',
      salt,
      hash,
      configured: true,
      updated_at: new Date().toISOString()
    };
    try {
      fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2), { mode: 0o600 });
    } catch (e) {}
  }
  if (!authData) {
    authData = {
      name: 'Wagnew Nigussie',
      email: 'wagnewnigussie569@gmail.com',
      salt: null,
      hash: null,
      configured: false
    };
  }

  // Ensure users collection exists
  if (!Array.isArray(authData.users)) {
    authData.users = [];
  }
  // Ensure master administrator Wagnew Nigussie is present in users array if configured
  if (authData.configured && authData.hash && !authData.users.some(u => u.email.toLowerCase() === 'wagnewnigussie569@gmail.com')) {
    authData.users.unshift({
      id: 'ADM-001',
      full_name: authData.name || 'Wagnew Nigussie',
      email: 'wagnewnigussie569@gmail.com',
      role: 'SUPER_ADMIN',
      salt: authData.salt,
      hash: authData.hash,
      created_at: authData.updated_at || new Date().toISOString(),
      created_by: 'MASTER_SETUP'
    });
  }

  return authData;
}

function saveAdminPassword(password, fullName = 'Wagnew Nigussie', email = 'wagnewnigussie569@gmail.com') {
  const current = getAdminAuth();
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  
  const users = current.users || [];
  const normalizedEmail = email.toLowerCase().trim();
  const idx = users.findIndex(u => u.email.toLowerCase() === normalizedEmail);
  const userEntry = {
    id: idx >= 0 ? users[idx].id : `ADM-00${users.length + 1}`,
    full_name: fullName,
    email: normalizedEmail,
    role: 'SUPER_ADMIN',
    salt,
    hash,
    created_at: idx >= 0 ? users[idx].created_at : new Date().toISOString(),
    created_by: 'SUPER_ADMIN'
  };

  if (idx >= 0) {
    users[idx] = userEntry;
  } else {
    users.unshift(userEntry);
  }

  const authData = {
    name: fullName,
    email: normalizedEmail,
    salt,
    hash,
    configured: true,
    users,
    updated_at: new Date().toISOString()
  };
  fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2), { mode: 0o600 });
  return authData;
}

function findUserByEmail(email) {
  const auth = getAdminAuth();
  const normalized = (email || '').toLowerCase().trim();
  return (auth.users || []).find(u => u.email.toLowerCase() === normalized);
}

function verifyUserPassword(email, password) {
  const auth = getAdminAuth();
  const user = findUserByEmail(email);
  if (user && user.salt && user.hash) {
    const hashAttempt = crypto.pbkdf2Sync(password, user.salt, 100000, 64, 'sha512').toString('hex');
    if (crypto.timingSafeEqual(Buffer.from(hashAttempt, 'hex'), Buffer.from(user.hash, 'hex'))) {
      return user;
    }
  }
  // Fallback to master auth if email is Wagnew Nigussie
  if (auth.configured && auth.salt && auth.hash && (email || '').toLowerCase().trim() === 'wagnewnigussie569@gmail.com') {
    const hashAttempt = crypto.pbkdf2Sync(password, auth.salt, 100000, 64, 'sha512').toString('hex');
    if (crypto.timingSafeEqual(Buffer.from(hashAttempt, 'hex'), Buffer.from(auth.hash, 'hex'))) {
      return {
        id: 'ADM-001',
        full_name: auth.name || 'Wagnew Nigussie',
        email: auth.email,
        role: 'SUPER_ADMIN'
      };
    }
  }
  return null;
}

function verifyAdminPassword(password) {
  const verified = verifyUserPassword('wagnewnigussie569@gmail.com', password);
  return verified !== null;
}

function createAdminUser({ full_name, email, password, role = 'DISPATCHER', created_by = 'Wagnew Nigussie' }) {
  const auth = getAdminAuth();
  const normalizedEmail = (email || '').toLowerCase().trim();

  if (auth.users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    throw new Error(`An administrator or officer account with email "${normalizedEmail}" already exists.`);
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

  const newUser = {
    id: `ADM-00${auth.users.length + 1}`,
    full_name: (full_name || 'Municipal Officer').trim(),
    email: normalizedEmail,
    role: role || 'DISPATCHER',
    salt,
    hash,
    created_at: new Date().toISOString(),
    created_by
  };

  auth.users.push(newUser);
  auth.updated_at = new Date().toISOString();
  fs.writeFileSync(AUTH_FILE, JSON.stringify(auth, null, 2), { mode: 0o600 });

  return {
    id: newUser.id,
    full_name: newUser.full_name,
    email: newUser.email,
    role: newUser.role,
    created_at: newUser.created_at,
    created_by: newUser.created_by
  };
}

function authenticateAdminReq(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;
  const session = adminSessions.get(token);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    adminSessions.delete(token);
    return null;
  }
  return session;
}

// Immutable System Audit Trail Ledger
const auditLogs = [
  {
    id: 'AUD-001',
    timestamp: new Date(Date.now() - 4.5 * 3600 * 1000).toISOString(),
    actor_name: 'Wagnew Nigussie',
    actor_email: 'wagnewnigussie569@gmail.com',
    actor_role: 'SUPER_ADMIN',
    action: 'SYSTEM_INITIALIZATION',
    ticket_code: 'SYS-INIT',
    category: 'SYSTEM',
    sub_city: 'Adebabay-Piassa',
    details: 'Gondar SmartCivic Executive Administration portal initialized with high-security PBKDF2 cryptography.',
    ip: '127.0.0.1'
  },
  {
    id: 'AUD-002',
    timestamp: new Date(Date.now() - 3.8 * 3600 * 1000).toISOString(),
    actor_name: 'Dispatcher Unit #1',
    actor_email: 'dispatch@gondar.gov.et',
    actor_role: 'DISPATCHER',
    action: 'TICKET_DISPATCHED',
    ticket_code: 'GDR-4821',
    category: 'WATER_LEAK',
    sub_city: 'Maraki',
    details: 'Dispatched to GWSA Maraki Unit #2 for immediate water main valve isolation.',
    ip: '192.168.1.102'
  },
  {
    id: 'AUD-003',
    timestamp: new Date(Date.now() - 2.8 * 3600 * 1000).toISOString(),
    actor_name: 'Wagnew Nigussie',
    actor_email: 'wagnewnigussie569@gmail.com',
    actor_role: 'SUPER_ADMIN',
    action: 'DUPLICATE_INCIDENTS_AUDIT',
    ticket_code: 'GDR-4821',
    category: 'WATER_LEAK',
    sub_city: 'Maraki',
    details: 'Audited 3 repeatedly submitted water main burst reports near Maraki University Gate.',
    ip: '127.0.0.1'
  },
  {
    id: 'AUD-004',
    timestamp: new Date(Date.now() - 1.2 * 3600 * 1000).toISOString(),
    actor_name: 'Fire & Rescue Lead',
    actor_email: 'rescue@gondar.gov.et',
    actor_role: 'EMERGENCY_LEAD',
    action: 'SOS_RAPID_DISPATCH',
    ticket_code: 'GDR-SOS-911',
    category: 'FLOOD_EMERGENCY',
    sub_city: 'Maraki',
    details: 'Rapid Rescue Squad #1 deployed to Angereb River catchment zone with evacuation boats.',
    ip: '192.168.1.115'
  },
  {
    id: 'AUD-005',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    actor_name: 'Wagnew Nigussie',
    actor_email: 'wagnewnigussie569@gmail.com',
    actor_role: 'SUPER_ADMIN',
    action: 'EXECUTIVE_REPORT_GENERATED',
    ticket_code: 'REP-WEEKLY',
    category: 'ANALYTICS',
    sub_city: 'All 12 Sub-Cities',
    details: 'Generated weekly municipal resolution audit report across all 5 municipal departments.',
    ip: '127.0.0.1'
  }
];

function logAuditAction(actorName, actorEmail, actorRole, action, ticketCode, category, subCity, details, ip = '127.0.0.1') {
  const entry = {
    id: `AUD-${String(auditLogs.length + 1).padStart(3, '0')}`,
    timestamp: new Date().toISOString(),
    actor_name: actorName || 'Wagnew Nigussie',
    actor_email: actorEmail || 'wagnewnigussie569@gmail.com',
    actor_role: actorRole || 'SUPER_ADMIN',
    action,
    ticket_code: ticketCode || 'N/A',
    category: category || 'GENERAL',
    sub_city: subCity || 'Gondar',
    details: details || '',
    ip
  };
  auditLogs.unshift(entry);
  if (auditLogs.length > 500) auditLogs.pop();
  return entry;
}

// Duplicate / Repeatedly Submitted Incidents Detection Engine
function detectDuplicateIncidents(incidentsList) {
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
        sub_city_am: master.sub_city_am || master.sub_city,
        landmark: master.landmark_description,
        repetition_count: group.length,
        master_ticket_code: master.ticket_code,
        status: isSolved ? 'RESOLVED' : master.status,
        is_solved: isSolved,
        department: master.department,
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

// Periodic Executive Reports Engine (Daily, Weekly, Monthly, Yearly)
function generatePeriodicReport(period, incidentsList) {
  const now = new Date();
  let startTime;
  let periodLabel;

  if (period === 'daily') {
    startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    periodLabel = `Daily Operational Report (${now.toLocaleDateString()})`;
  } else if (period === 'monthly') {
    startTime = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    periodLabel = `Monthly Municipal Audit (${now.toLocaleString('default', { month: 'long', year: 'numeric' })})`;
  } else if (period === 'yearly') {
    startTime = new Date(now.getFullYear(), 0, 1).getTime();
    periodLabel = `Annual Municipal Infrastructure Report (${now.getFullYear()})`;
  } else {
    // Default: weekly (last 7 days)
    startTime = Date.now() - 7 * 24 * 3600 * 1000;
    periodLabel = `Weekly Municipal Performance Report (${new Date(startTime).toLocaleDateString()} - ${now.toLocaleDateString()})`;
  }

  const periodIncidents = incidentsList.filter(t => new Date(t.created_at).getTime() >= startTime);
  const total = periodIncidents.length;
  const solved = periodIncidents.filter(t => t.status === 'RESOLVED').length;
  const inProgress = periodIncidents.filter(t => t.status === 'IN_PROGRESS' || t.status === 'DISPATCHED').length;
  const newPending = periodIncidents.filter(t => t.status === 'RECEIVED' || t.status === 'SUBMITTED' || t.status === 'TRIAGED').length;
  const emergency = periodIncidents.filter(t => t.is_emergency || t.urgency === 'CRITICAL' || t.category === 'FLOOD_EMERGENCY').length;
  const overdue = periodIncidents.filter(t => t.is_sla_breached || t.status === 'ESCALATED_UNRESOLVED').length;
  
  const resolutionRate = total > 0 ? Math.round((solved / total) * 100) : 0;
  
  const solvedWithTime = periodIncidents.filter(t => t.status === 'RESOLVED' && t.time_to_fix_minutes);
  const avgFixMinutes = solvedWithTime.length > 0 
    ? Math.round(solvedWithTime.reduce((acc, t) => acc + t.time_to_fix_minutes, 0) / solvedWithTime.length) 
    : 120;

  const departments = [
    { name: 'Gondar Water & Sewerage Authority', short: 'GWSA', icon: '💧' },
    { name: 'Ethiopian Electric Utility (EEU)', short: 'EEU', icon: '⚡' },
    { name: 'Gondar Fire & Disaster Prevention Agency / Red Cross', short: 'RESCUE', icon: '🚨' },
    { name: 'Gondar Sanitation & Beautification', short: 'SANITATION', icon: '🗑️' },
    { name: 'Gondar City Roads & Drainage Construction Agency', short: 'ROADS', icon: '🚧' }
  ];

  const departmentStats = departments.map(dept => {
    const list = periodIncidents.filter(t => (t.department || '').toLowerCase().includes(dept.short.toLowerCase()) || (t.department || '').toLowerCase().includes(dept.name.toLowerCase()));
    const depTotal = list.length;
    const depSolved = list.filter(t => t.status === 'RESOLVED').length;
    const depOverdue = list.filter(t => t.is_sla_breached).length;
    return {
      department: dept.name,
      short: dept.short,
      icon: dept.icon,
      total: depTotal,
      solved: depSolved,
      in_progress: depTotal - depSolved,
      overdue: depOverdue,
      sla_rate: depTotal > 0 ? Math.round(((depTotal - depOverdue) / depTotal) * 100) : 100
    };
  });

  const subCityStats = SUB_CITIES.map(sc => {
    const list = periodIncidents.filter(t => t.sub_city === sc.name);
    const scTotal = list.length;
    const scSolved = list.filter(t => t.status === 'RESOLVED').length;
    return {
      name: sc.name,
      name_am: sc.name_am,
      total: scTotal,
      solved: scSolved,
      pending: scTotal - scSolved
    };
  });

  const duplicateClusters = detectDuplicateIncidents(periodIncidents);

  return {
    period,
    period_label: periodLabel,
    start_time: new Date(startTime).toISOString(),
    end_time: now.toISOString(),
    generated_at: now.toISOString(),
    generated_by: {
      name: 'Wagnew Nigussie',
      email: 'wagnewnigussie569@gmail.com',
      role: 'SUPER_ADMIN'
    },
    metrics: {
      total,
      solved,
      in_progress: inProgress,
      new_pending: newPending,
      emergency,
      overdue,
      resolution_rate: resolutionRate,
      avg_fix_minutes: avgFixMinutes,
      duplicate_clusters_count: duplicateClusters.length
    },
    department_stats: departmentStats,
    sub_city_stats: subCityStats,
    duplicate_clusters: duplicateClusters,
    incidents: periodIncidents
  };
}

[UPLOADS_DIR, AUDIO_DIR, PHOTO_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper: Generate valid 8-bit PCM WAV audio for local offline verification
function ensureSampleWav(filepath) {
  if (fs.existsSync(filepath)) return;
  const sampleRate = 8000;
  const durationSec = 3;
  const numSamples = sampleRate * durationSec;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + numSamples, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(1, 22); // Mono
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate, 28);
  header.writeUInt16LE(1, 32);
  header.writeUInt16LE(8, 34); // 8-bit
  header.write('data', 36);
  header.writeUInt32LE(numSamples, 40);

  const data = Buffer.alloc(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    data[i] = 128 + Math.round(55 * Math.sin(2 * Math.PI * 440 * t));
  }
  fs.writeFileSync(filepath, Buffer.concat([header, data]));
}

ensureSampleWav(path.join(AUDIO_DIR, 'sample_ivr.wav'));
ensureSampleWav(path.join(AUDIO_DIR, 'sample_ivr.mp3'));


// ============================================================================
// DATA STORE (Gondar Municipal Baseline Data)
// ============================================================================
const SUB_CITIES = [
  { id: 1, name: 'Fasil', name_am: 'ፋሲል', code: 'SC-FASIL', lat: 12.6075, lon: 37.4625, desc: 'Historic Castle & Central Core', image: '/images/subcities/sc_01_fasil.jpg' },
  { id: 2, name: 'Maraki', name_am: 'ማራኪ', code: 'SC-MARAKI', lat: 12.6250, lon: 37.4750, desc: 'University Campus & Northern Residential', image: '/images/subcities/sc_02_maraki.jpg' },
  { id: 3, name: 'Arada', name_am: 'አራዳ', code: 'SC-ARADA', lat: 12.6025, lon: 37.4525, desc: 'Commercial Market District', image: '/images/subcities/sc_03_arada.jpg' },
  { id: 4, name: 'Azezo-Teda', name_am: 'አዘዞ ቴዳ', code: 'SC-AZEZO', lat: 12.5550, lon: 37.4300, desc: 'Airport & Southern Industrial Gateway', image: '/images/subcities/sc_04_azezo.jpg' },
  { id: 5, name: 'Zobel', name_am: 'ዞብል', code: 'SC-ZOBEL', lat: 12.6000, lon: 37.4800, desc: 'Eastern Hill Ridge', image: '/images/subcities/sc_05_zobel.jpg' },
  { id: 6, name: 'Jantekel', name_am: 'ጃንተከል', code: 'SC-JANTEKEL', lat: 12.6200, lon: 37.4425, desc: 'Western Church Valley & Kebele 06', image: '/images/subcities/sc_06_jantekel.jpg' },
  { id: 7, name: 'Bilajig', name_am: 'ብላጅግ', code: 'SC-BILAJIG', lat: 12.6320, lon: 37.4850, desc: 'North-Eastern Expansion Sector', image: '/images/subcities/sc_07_bilajig.jpg' },
  { id: 8, name: 'Gubaie', name_am: 'ጉባኤ', code: 'SC-GUBAIE', lat: 12.6150, lon: 37.4550, desc: 'Civic Cultural Sector', image: '/images/subcities/sc_08_gubaie.jpg' },
  { id: 9, name: 'Adebabay-Piassa', name_am: 'አደባባይ ፒያሳ', code: 'SC-PIASSA', lat: 12.6085, lon: 37.4680, desc: 'Central City Square & Municipality', image: '/images/subcities/sc_09_piassa.jpg' },
  { id: 10, name: 'Selam', name_am: 'ሰላም', code: 'SC-SELAM', lat: 12.5950, lon: 37.4400, desc: 'West-Central Residential Zone', image: '/images/subcities/sc_10_selam.jpg' },
  { id: 11, name: 'Mintiwab', name_am: 'ምንትዋብ', code: 'SC-MINTIWAB', lat: 12.6280, lon: 37.4320, desc: 'Kuskuam Palace Historic Corridor', image: '/images/subcities/sc_11_mintiwab.jpg' },
  { id: 12, name: 'Abraj', name_am: 'አብራጅ', code: 'SC-ABRAJ', lat: 12.5800, lon: 37.4500, desc: 'South-Central Emerging District', image: '/images/subcities/sc_12_abraj.jpg' }
];

const ETHIOPIAN_CITIES = [
  { name: 'Gondar', name_am: 'ጎንደር', lat: 12.6075, lon: 37.4625 },
  { name: 'Addis Ababa', name_am: 'አዲስ አበባ', lat: 9.0320, lon: 38.7480 },
  { name: 'Bahir Dar', name_am: 'ባህር ዳር', lat: 11.5936, lon: 37.3908 },
  { name: 'Hawassa', name_am: 'ሀዋሳ', lat: 7.0504, lon: 38.4955 },
  { name: 'Mekelle', name_am: 'መቐለ', lat: 13.4967, lon: 39.4753 },
  { name: 'Dire Dawa', name_am: 'ድሬዳዋ', lat: 9.5931, lon: 41.8661 },
  { name: 'Jimma', name_am: 'ጅማ', lat: 7.6734, lon: 36.8344 }
];

const RIVER_BASINS = [
  {
    id: 'angereb',
    name: 'Angereb River Catchment',
    name_am: 'የአንገረብ ወንዝ ተፋሰስ',
    risk_level: 'HIGH_FLOOD_RISK',
    coordinates: [
      [12.6450, 37.4850],
      [12.6350, 37.4780],
      [12.6220, 37.4700],
      [12.6100, 37.4640],
      [12.5980, 37.4580],
      [12.5800, 37.4500]
    ]
  },
  {
    id: 'keha',
    name: 'Keha River Corridor',
    name_am: 'የቀሃ ወንዝ ኮሪደር',
    risk_level: 'CRITICAL_INUNDATION_ZONE',
    coordinates: [
      [12.6300, 37.4350],
      [12.6150, 37.4420],
      [12.6000, 37.4480],
      [12.5850, 37.4400],
      [12.5600, 37.4320],
      [12.5400, 37.4250]
    ]
  }
];

const CREWS = [
  { id: 1, department_id: 1, crew_name: 'GWSA Rapid Pipe Unit #1', lead: 'Bekele Alemu', phone: '+251918012345', sub_city: 'Fasil', lat: 12.605, lon: 37.462, available: true },
  { id: 2, department_id: 1, crew_name: 'GWSA Maraki Unit #2', lead: 'Kassahun Worku', phone: '+251918023456', sub_city: 'Maraki', lat: 12.625, lon: 37.475, available: true },
  { id: 3, department_id: 2, crew_name: 'EEU Arada Transformer Crew', lead: 'Mulugeta Tadesse', phone: '+251918034567', sub_city: 'Arada', lat: 12.602, lon: 37.452, available: true },
  { id: 4, department_id: 3, crew_name: 'Sanitation Azezo Truck Crew', lead: 'Yohannes Getachew', phone: '+251918045678', sub_city: 'Azezo-Teda', lat: 12.555, lon: 37.430, available: true },
  { id: 5, department_id: 4, crew_name: 'Roads Adebabay Paving Crew #5', lead: 'Daniel Mesfin', phone: '+251918056789', sub_city: 'Adebabay-Piassa', lat: 12.608, lon: 37.468, available: true },
  { id: 6, department_id: 5, crew_name: 'Gondar Fire & Disaster Rapid Rescue Squad #1', lead: 'Capt. Girma Tadesse', phone: '+251918991100', sub_city: 'Fasil', lat: 12.607, lon: 37.464, available: true },
  { id: 7, department_id: 6, crew_name: 'Ethiopian Red Cross Disaster Volunteer Unit', lead: 'Sr. Almaz Kebede', phone: '+251918334400', sub_city: 'Maraki', lat: 12.615, lon: 37.460, available: true }
];

let emergencyBroadcasts = [
  {
    id: 1,
    title: 'Flash Flood Early Warning - Angereb River Basin',
    message_am: 'አስቸኳይ የጎርፍ ማስጠንቀቂያ፡ የአንገረብ ወንዝ ሙላት በመጨመሩ በማራኪ እና ፋሲል ዝቅተኛ ቦታዎች የምትገኙ ነዋሪዎች ወደ ደረቅ ስፍራ ተጠጉ።',
    message_en: 'URGENT FLASH FLOOD WARNING: Angereb River is swelling rapidly. Residents in Maraki and Fasil lowland areas must move to higher ground immediately.',
    sub_city: 'Maraki',
    river_basin: 'Angereb River Catchment',
    recipient_count: 1420,
    severity: 'CRITICAL',
    broadcast_time: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  }
];

function calculateSlaDeadline(isEmergency, severity) {
  const now = Date.now();
  if (isEmergency || severity === 'CRITICAL') return new Date(now + 1 * 3600 * 1000).toISOString();
  if (severity === 'HIGH') return new Date(now + 4 * 3600 * 1000).toISOString();
  if (severity === 'MEDIUM') return new Date(now + 24 * 3600 * 1000).toISOString();
  return new Date(now + 48 * 3600 * 1000).toISOString();
}

function updateTicketSlaState(ticket) {
  if (ticket.status === 'RESOLVED' || ticket.status === 'REJECTED') return;
  const deadline = new Date(ticket.sla_deadline || ticket.created_at).getTime();
  if (Date.now() > deadline) {
    ticket.is_sla_breached = true;
    if (ticket.status === 'RECEIVED' || ticket.status === 'SUBMITTED' || ticket.status === 'TRIAGED') {
      ticket.status = 'ESCALATED_UNRESOLVED';
    }
  } else {
    ticket.is_sla_breached = false;
  }
}

let incidents = [
  // 1. EMERGENCY & DISASTER QUEUE (Tab 1)
  {
    id: '0',
    ticket_code: 'GDR-SOS-911',
    title: '🚨 CRITICAL FLOOD: Angereb River Inundation - 4 Residents Trapped',
    description: 'Catastrophic river surge entered living quarters (ጎርፍ ወደ ቤት ገብቷል). Waist-deep water. Elderly woman and child trapped inside.',
    category: 'FLOOD_EMERGENCY',
    urgency: 'CRITICAL',
    is_emergency: true,
    emergency_severity: 'CRITICAL',
    status: 'DISPATCHED',
    channel_origin: 'MOBILE_APP',
    caller_phone: '+251918556677',
    is_anonymous: false,
    is_life_threatening: true,
    water_depth_level: 'WAIST_DEEP_OR_HIGHER',
    inundation_type: 'INSIDE_LIVING_QUARTERS',
    trapped_persons_count: 4,
    latitude: 12.6215,
    longitude: 37.4690,
    gps_accuracy_meters: 3.2,
    landmark_description: 'Maraki Kebele 08, 50m from Angereb River bank bridge',
    sub_city: 'Maraki',
    sub_city_am: 'ማራኪ',
    department: 'Gondar Fire & Disaster Prevention Agency / Red Cross',
    department_id: 5,
    assigned_crew: 'Gondar Fire & Disaster Rapid Rescue Squad #1',
    photo_before: '/images/categories/flash_flood.svg',
    photo_after: null,
    resolution_proof_url: null,
    resolution_notes: null,
    resolved_by_worker_id: null,
    time_to_fix_minutes: null,
    audio_path: null,
    voice_transcript: null,
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    assigned_at: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    sla_deadline: new Date(Date.now() + 35 * 60 * 1000).toISOString(),
    is_sla_breached: false,
    resolved_at: null
  },
  {
    id: '1',
    ticket_code: 'GDR-EMG-702',
    title: '⚡ HAZARD: Fallen High-Voltage Transformer Cable Sparking',
    description: 'Live electrical cable snapped and sparked across wet cobblestone walkway during storm.',
    category: 'POWER_OUTAGE',
    urgency: 'CRITICAL',
    is_emergency: true,
    emergency_severity: 'CRITICAL',
    status: 'RECEIVED',
    channel_origin: 'SMS',
    caller_phone: '+251918223344',
    is_anonymous: false,
    is_life_threatening: true,
    water_depth_level: null,
    inundation_type: null,
    trapped_persons_count: 0,
    latitude: 12.6030,
    longitude: 37.4580,
    gps_accuracy_meters: 8.0,
    landmark_description: 'Arada Market Main Gate pedestrian walkway',
    sub_city: 'Arada',
    sub_city_am: 'አራዳ',
    department: 'Ethiopian Electric Utility (EEU)',
    department_id: 2,
    assigned_crew: 'EEU Arada Transformer Crew',
    photo_before: '/images/categories/power_outage.svg',
    photo_after: null,
    resolution_proof_url: null,
    resolution_notes: null,
    resolved_by_worker_id: null,
    time_to_fix_minutes: null,
    audio_path: null,
    voice_transcript: null,
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    assigned_at: null,
    sla_deadline: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    is_sla_breached: false,
    resolved_at: null
  },

  // 2. GENERAL INFRASTRUCTURE QUEUE (Tab 2)
  {
    id: '2',
    ticket_code: 'GDR-4821',
    title: 'High-Pressure Water Main Burst',
    description: 'Clean water flooding roadway near Maraki University main entrance.',
    category: 'WATER_LEAK',
    urgency: 'HIGH',
    is_emergency: false,
    emergency_severity: 'MEDIUM',
    status: 'IN_PROGRESS',
    channel_origin: 'WEB',
    caller_phone: '+251918112233',
    is_anonymous: false,
    is_life_threatening: false,
    latitude: 12.6240,
    longitude: 37.4725,
    gps_accuracy_meters: 4.5,
    landmark_description: 'Maraki Campus Main Gate, 20m from traffic junction',
    sub_city: 'Maraki',
    sub_city_am: 'ማራኪ',
    department: 'Gondar Water & Sewerage Authority',
    department_id: 1,
    assigned_crew: 'GWSA Maraki Unit #2',
    photo_before: '/images/categories/water_leak.svg',
    photo_after: null,
    resolution_proof_url: null,
    resolution_notes: null,
    resolved_by_worker_id: null,
    time_to_fix_minutes: null,
    audio_path: null,
    voice_transcript: null,
    created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    assigned_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    sla_deadline: new Date(Date.now() + 20 * 3600 * 1000).toISOString(),
    is_sla_breached: false,
    resolved_at: null
  },
  {
    id: '2b',
    ticket_code: 'GDR-SMS-4822',
    title: 'Water Main Flooding Maraki University Gate (Duplicate)',
    description: 'Second citizen report: clean tap water gushing across university asphalt entrance.',
    category: 'WATER_LEAK',
    urgency: 'HIGH',
    is_emergency: false,
    emergency_severity: 'MEDIUM',
    status: 'IN_PROGRESS',
    channel_origin: 'SMS',
    caller_phone: '+251918990011',
    is_anonymous: false,
    is_life_threatening: false,
    latitude: 12.6241,
    longitude: 37.4726,
    gps_accuracy_meters: 6.0,
    landmark_description: 'Maraki Campus Main Gate, gushing onto asphalt',
    sub_city: 'Maraki',
    sub_city_am: 'ማራኪ',
    department: 'Gondar Water & Sewerage Authority',
    department_id: 1,
    assigned_crew: 'GWSA Maraki Unit #2',
    photo_before: '/images/categories/water_leak.svg',
    photo_after: null,
    resolution_proof_url: null,
    resolution_notes: 'Linked to primary incident GDR-4821.',
    resolved_by_worker_id: null,
    time_to_fix_minutes: null,
    audio_path: null,
    voice_transcript: null,
    created_at: new Date(Date.now() - 2.5 * 3600 * 1000).toISOString(),
    assigned_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    sla_deadline: new Date(Date.now() + 21 * 3600 * 1000).toISOString(),
    is_sla_breached: false,
    resolved_at: null
  },
  {
    id: '2c',
    ticket_code: 'GDR-USD-4823',
    title: 'Gushing Main Water Leak at University Junction (Duplicate)',
    description: 'Third citizen report via USSD: tap water flooding street.',
    category: 'WATER_LEAK',
    urgency: 'HIGH',
    is_emergency: false,
    emergency_severity: 'MEDIUM',
    status: 'IN_PROGRESS',
    channel_origin: 'USSD',
    caller_phone: '+251922334455',
    is_anonymous: false,
    is_life_threatening: false,
    latitude: 12.6239,
    longitude: 37.4724,
    gps_accuracy_meters: 10.0,
    landmark_description: 'Maraki University Gate taxi stop',
    sub_city: 'Maraki',
    sub_city_am: 'ማራኪ',
    department: 'Gondar Water & Sewerage Authority',
    department_id: 1,
    assigned_crew: 'GWSA Maraki Unit #2',
    photo_before: '/images/categories/water_leak.svg',
    photo_after: null,
    resolution_proof_url: null,
    resolution_notes: null,
    resolved_by_worker_id: null,
    time_to_fix_minutes: null,
    audio_path: null,
    voice_transcript: null,
    created_at: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    assigned_at: null,
    sla_deadline: new Date(Date.now() + 23 * 3600 * 1000).toISOString(),
    is_sla_breached: false,
    resolved_at: null
  },
  {
    id: '3',
    ticket_code: 'GDR-7742',
    title: 'Uncollected Solid Waste Canal Overflow',
    description: 'Large pile of market garbage overflowing into drainage canal.',
    category: 'SOLID_WASTE',
    urgency: 'MEDIUM',
    is_emergency: false,
    emergency_severity: 'LOW',
    status: 'RECEIVED',
    channel_origin: 'SMS',
    caller_phone: '+251930556677',
    is_anonymous: false,
    is_life_threatening: false,
    latitude: 12.5520,
    longitude: 37.4250,
    gps_accuracy_meters: null,
    landmark_description: 'Azezo Market South Junction',
    sub_city: 'Azezo-Teda',
    sub_city_am: 'አዘዞ ቴዳ',
    department: 'Gondar Sanitation & Beautification',
    department_id: 3,
    assigned_crew: null,
    photo_before: '/images/categories/solid_waste.svg',
    photo_after: null,
    resolution_proof_url: null,
    resolution_notes: null,
    resolved_by_worker_id: null,
    time_to_fix_minutes: null,
    audio_path: null,
    voice_transcript: null,
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    assigned_at: null,
    sla_deadline: new Date(Date.now() + 22 * 3600 * 1000).toISOString(),
    is_sla_breached: false,
    resolved_at: null
  },
  {
    id: '4',
    ticket_code: 'GDR-3310',
    title: 'Road Damage & Cobblestone Trench',
    description: 'Severe erosion created deep trench hazardous for local transport.',
    category: 'ROAD_DAMAGE',
    urgency: 'MEDIUM',
    is_emergency: false,
    emergency_severity: 'LOW',
    status: 'TRIAGED',
    channel_origin: 'USSD',
    caller_phone: '+251918334455',
    is_anonymous: false,
    is_life_threatening: false,
    latitude: 12.6320,
    longitude: 37.4850,
    gps_accuracy_meters: null,
    landmark_description: 'Bilajig Health Center access road',
    sub_city: 'Bilajig',
    sub_city_am: 'ብላጅግ',
    department: 'Gondar Municipal Roads Authority',
    department_id: 4,
    assigned_crew: null,
    photo_before: '/images/categories/road_damage.svg',
    photo_after: null,
    resolution_proof_url: null,
    resolution_notes: null,
    resolved_by_worker_id: null,
    time_to_fix_minutes: null,
    audio_path: null,
    voice_transcript: null,
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    assigned_at: null,
    sla_deadline: new Date(Date.now() + 19 * 3600 * 1000).toISOString(),
    is_sla_breached: false,
    resolved_at: null
  },

  // 3. VOICE & AUDIO INGESTION QUEUE (Tab 3)
  {
    id: '5',
    ticket_code: 'GDR-IVR-8401',
    title: '🎙️ Spoken Hotline Voice Memo: Major Pipeline Leak',
    description: '30-second caller voice note received via automated Gondar IVR Hotline (8400). Caller reports water overflowing into roadway.',
    category: 'WATER_LEAK',
    urgency: 'HIGH',
    is_emergency: false,
    emergency_severity: 'MEDIUM',
    status: 'TRIAGED',
    channel_origin: 'IVR_VOICE',
    caller_phone: '+251918444555',
    is_anonymous: false,
    is_life_threatening: false,
    latitude: 12.5550,
    longitude: 37.4300,
    gps_accuracy_meters: null,
    landmark_description: 'Azezo Shell Fuel Station junction',
    sub_city: 'Azezo-Teda',
    sub_city_am: 'አዘዞ ቴዳ',
    department: 'Gondar Water & Sewerage Authority',
    department_id: 1,
    assigned_crew: 'GWSA Rapid Pipe Unit #1',
    photo_before: '/images/categories/water_leak.svg',
    photo_after: null,
    resolution_proof_url: null,
    resolution_notes: null,
    resolved_by_worker_id: null,
    time_to_fix_minutes: null,
    audio_path: '/uploads/audio/sample_ivr.wav',
    voice_transcript: 'የውሃ ቱቦ ተሰብሮ መንገድ ላይ እየፈሰሰ ነው እባካችሁ በፍጥነት ጥገና ይደረግልን (Broken water pipe flooding street, urgent fix requested)',
    created_at: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    assigned_at: null,
    sla_deadline: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    is_sla_breached: false,
    resolved_at: null
  },
  {
    id: '6',
    ticket_code: 'GDR-PHN-8402',
    title: '📞 Direct Emergency Call: Keha River Culvert Failure',
    description: 'Direct telephone call received by Municipal Dispatcher desk. Caller reported river surge eroding bridge footings.',
    category: 'FLOOD_EMERGENCY',
    urgency: 'HIGH',
    is_emergency: true,
    emergency_severity: 'HIGH',
    status: 'DISPATCHED',
    channel_origin: 'PHONE_CALL',
    caller_phone: '+251918778899',
    is_anonymous: false,
    is_life_threatening: true,
    water_depth_level: 'KNEE_DEEP',
    inundation_type: 'ROAD_OVERFLOW',
    trapped_persons_count: 0,
    latitude: 12.6000,
    longitude: 37.4480,
    gps_accuracy_meters: 5.0,
    landmark_description: 'Keha River Crossing near Western Gate',
    sub_city: 'Jantekel',
    sub_city_am: 'ጃንተከል',
    department: 'Gondar Fire & Disaster Prevention Agency',
    department_id: 5,
    assigned_crew: 'Gondar Fire & Disaster Rapid Rescue Squad #1',
    photo_before: '/images/categories/flash_flood.svg',
    photo_after: null,
    resolution_proof_url: null,
    resolution_notes: null,
    resolved_by_worker_id: null,
    time_to_fix_minutes: null,
    audio_path: '/uploads/audio/sample_ivr.wav',
    voice_transcript: 'የቀሃ ወንዝ ሞልቶ ድልድዩ እየተሸረሸረ ነው ተሽከርካሪ እንዳያልፍ ተከልክሏል (Keha river overflowing, bridge culvert eroding)',
    created_at: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    assigned_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    sla_deadline: new Date(Date.now() + 65 * 60 * 1000).toISOString(),
    is_sla_breached: false,
    resolved_at: null
  },

  // 4. OVERDUE / STALLED INCIDENTS (Tab 4)
  {
    id: '7',
    ticket_code: 'GDR-OVD-2090',
    title: '⚠️ SLA BREACHED: Collapsed Sidewalk Culvert',
    description: 'Deep hole on sidewalk next to church gate left unassigned past municipal SLA threshold (36 hours pending).',
    category: 'ROAD_DAMAGE',
    urgency: 'HIGH',
    is_emergency: false,
    emergency_severity: 'HIGH',
    status: 'ESCALATED_UNRESOLVED',
    channel_origin: 'IVR_VOICE',
    caller_phone: '+251944778899',
    is_anonymous: false,
    is_life_threatening: false,
    latitude: 12.6080,
    longitude: 37.4510,
    gps_accuracy_meters: null,
    landmark_description: 'Jantekel Medhanialem Church Gate',
    sub_city: 'Jantekel',
    sub_city_am: 'ጃንተከል',
    department: 'Gondar Municipal Roads Authority',
    department_id: 4,
    assigned_crew: null,
    photo_before: '/images/categories/road_damage.svg',
    photo_after: null,
    resolution_proof_url: null,
    resolution_notes: null,
    resolved_by_worker_id: null,
    time_to_fix_minutes: null,
    audio_path: '/uploads/audio/sample_ivr.wav',
    voice_transcript: 'የመንገዱ ቦይ ተሰብሮ ሰው እየወደቀበት ነው (Broken pedestrian culvert posing safety risk)',
    created_at: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    assigned_at: null,
    sla_deadline: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    is_sla_breached: true,
    resolved_at: null
  },

  // 5. RESOLVED ARCHIVE (Tab 5)
  {
    id: '8',
    ticket_code: 'GDR-1052',
    title: 'Sanitation Commercial Cleanup Complete',
    description: 'Commercial waste piles cleared and transported to Azezo landfill.',
    category: 'SOLID_WASTE',
    urgency: 'LOW',
    is_emergency: false,
    emergency_severity: 'LOW',
    status: 'RESOLVED',
    channel_origin: 'WEB',
    caller_phone: '+251918889900',
    is_anonymous: true,
    is_life_threatening: false,
    latitude: 12.5990,
    longitude: 37.4790,
    gps_accuracy_meters: 6.0,
    landmark_description: 'Zobel Commercial Center',
    sub_city: 'Zobel',
    sub_city_am: 'ዞብል',
    department: 'Gondar Sanitation & Beautification',
    department_id: 3,
    assigned_crew: 'Sanitation Azezo Truck Crew',
    photo_before: '/images/categories/solid_waste.svg',
    photo_after: '/images/gondar_fasiledes_castle.jpg',
    resolution_proof_url: '/images/gondar_fasiledes_castle.jpg',
    resolution_notes: 'All waste loaded on truck #04 and transported to Azezo dump site. Disinfected area.',
    resolved_by_worker_id: 'TECH-SAN-04',
    time_to_fix_minutes: 180,
    audio_path: null,
    voice_transcript: null,
    created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    assigned_at: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
    resolved_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    sla_deadline: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    is_sla_breached: false
  },
  {
    id: '9',
    ticket_code: 'GDR-5510',
    title: 'Pipeline Joint Welding & Restoration',
    description: 'Water leak repaired and normal pressure restored to Kebele 04 residents.',
    category: 'WATER_LEAK',
    urgency: 'MEDIUM',
    is_emergency: false,
    emergency_severity: 'MEDIUM',
    status: 'RESOLVED',
    channel_origin: 'USSD',
    caller_phone: '+251918332211',
    is_anonymous: false,
    is_life_threatening: false,
    latitude: 12.5580,
    longitude: 37.4320,
    gps_accuracy_meters: null,
    landmark_description: 'Azezo Square Main Pipe line',
    sub_city: 'Azezo-Teda',
    sub_city_am: 'አዘዞ ቴዳ',
    department: 'Gondar Water & Sewerage Authority',
    department_id: 1,
    assigned_crew: 'GWSA Rapid Pipe Unit #1',
    photo_before: '/images/categories/water_leak.svg',
    photo_after: '/images/gondar_fasil_ghebbi_aerial.jpg',
    resolution_proof_url: '/images/gondar_fasil_ghebbi_aerial.jpg',
    resolution_notes: 'Replaced fractured galvanized valve collar. System pressure-tested to 4.2 bars.',
    resolved_by_worker_id: 'LEAD-PIPE-01',
    time_to_fix_minutes: 110,
    audio_path: null,
    voice_transcript: null,
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    assigned_at: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
    resolved_at: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    sla_deadline: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    is_sla_breached: false
  }
];

let smsOutbox = [];

function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Helper: Parse request body (JSON, urlencoded, or multipart boundary)
function parseRequestBody(req) {
  return new Promise((resolve) => {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(body);
      const str = buffer.toString();
      const contentType = req.headers['content-type'] || '';

      if (contentType.includes('application/json')) {
        try {
          resolve(JSON.parse(str));
        } catch (e) {
          resolve({});
        }
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const parsed = {};
        str.split('&').forEach(pair => {
          const [k, v] = pair.split('=');
          if (k) parsed[decodeURIComponent(k)] = decodeURIComponent(v || '');
        });
        resolve(parsed);
      } else if (contentType.includes('multipart/form-data')) {
        // Simple multipart field extractor
        const parsed = {};
        const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
        const boundary = boundaryMatch ? (boundaryMatch[1] || boundaryMatch[2]) : null;
        if (boundary) {
          const parts = str.split(`--${boundary}`);
          parts.forEach(part => {
            const nameMatch = part.match(/name="([^"]+)"/);
            if (nameMatch) {
              const name = nameMatch[1];
              const valueMatch = part.split('\r\n\r\n')[1];
              if (valueMatch) {
                parsed[name] = valueMatch.replace(/\r\n$/, '');
              }
            }
          });
        }
        resolve(parsed);
      } else {
        try {
          resolve(JSON.parse(str));
        } catch (e) {
          resolve({ raw: str });
        }
      }
    });
  });
}

// Helper: Send JSON response with CORS headers
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Helper: Send Text response
function sendText(res, statusCode, text) {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(text);
}

// MIME Types Map
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

async function handleRequest(req, res) {
  const host = req.headers.host || 'localhost:5000';
  let parsedUrl;
  try {
    const fullUrl = new URL(req.url, `http://${host}`);
    parsedUrl = {
      pathname: fullUrl.pathname,
      search: fullUrl.search,
      query: Object.fromEntries(fullUrl.searchParams.entries())
    };
  } catch (e) {
    parsedUrl = url.parse(req.url, true);
  }
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // ==========================================================================
  // API ROUTING
  // ==========================================================================

  // 1. USSD (*840#)
  if (pathname === '/api/v1/ussd' && method === 'POST') {
    const body = await parseRequestBody(req);
    const { text = '', phoneNumber = '+251918000000' } = body;
    let cleanText = text.replace(/#/g, '').replace(/^\*+/, '').replace(/^840\*/, '');
    if (cleanText.startsWith('*')) cleanText = cleanText.substring(1);
    if (cleanText === '840') cleanText = '';

    const inputs = cleanText ? cleanText.split('*').filter(Boolean) : [];
    let response = '';

    // Fast-track Emergency Flood SOS dial: *840*911# or 911*<subcity>
    if (cleanText === '911' || cleanText.startsWith('911*')) {
      const sosInputs = cleanText.split('*');
      if (sosInputs.length === 1) {
        response = `CON 🚨 GONDAR FLASH FLOOD SOS (የጎርፍ አደጋ አስቸኳይ ጥሪ)
Select Sub-City (ክፍለ ከተማ ይምረጡ 1-12):
1. Fasil (ፋሲል)
2. Maraki (ማራኪ)
3. Arada (አራዳ)
4. Azezo-Teda (አዘዞ)
5. Zobel (ዞብል)
6. Jantekel (ጃንተከል)`;
        return sendText(res, 200, response);
      }
      const scIdx = sosInputs[1] || '1';
      const subCityObj = SUB_CITIES[parseInt(scIdx, 10) - 1] || SUB_CITIES[0];
      const ticketCode = `GDR-SOS-${Math.floor(100 + Math.random() * 900)}`;

      const newTicket = {
        id: String(incidents.length + 1),
        ticket_code: ticketCode,
        title: `🚨 USSD SOS: Flash Flood & Residential Inundation - ${subCityObj.name}`,
        description: `Direct fast-track emergency SOS via USSD *840*911#. Life threat reported in ${subCityObj.name}.`,
        category: 'FLOOD_EMERGENCY',
        urgency: 'CRITICAL',
        is_emergency: true,
        emergency_severity: 'CRITICAL',
        status: 'RECEIVED',
        channel_origin: 'USSD',
        caller_phone: phoneNumber,
        is_anonymous: false,
        is_life_threatening: true,
        water_depth_level: 'WAIST_DEEP_OR_HIGHER',
        inundation_type: 'INSIDE_LIVING_QUARTERS',
        trapped_persons_count: 2,
        latitude: subCityObj.lat + (Math.random() - 0.5) * 0.004,
        longitude: subCityObj.lon + (Math.random() - 0.5) * 0.004,
        gps_accuracy_meters: null,
        landmark_description: `Sub-City Centroid: ${subCityObj.name} (Direct USSD SOS)`,
        sub_city: subCityObj.name,
        sub_city_am: subCityObj.name_am,
        department: 'Gondar Fire & Disaster Prevention Agency / Red Cross',
        department_id: 5,
        assigned_crew: 'Gondar Fire & Disaster Rapid Rescue Squad #1',
        photo_before: '/images/categories/flash_flood.svg',
        photo_after: null,
        resolution_proof_url: null,
        resolution_notes: null,
        resolved_by_worker_id: null,
        time_to_fix_minutes: null,
        audio_path: null,
        voice_transcript: null,
        created_at: new Date().toISOString(),
        assigned_at: null,
        resolved_at: null,
        sla_deadline: calculateSlaDeadline(true, 'CRITICAL'),
        is_sla_breached: false
      };
      incidents.unshift(newTicket);

      smsOutbox.push({
        to: phoneNumber,
        message: `🚨 GONDAR DISASTER ALERT: SOS #${ticketCode} registered for ${subCityObj.name}. Gondar Fire & Disaster Taskforce and Red Cross Rescue dispatched! Move to high ground immediately.`,
        timestamp: new Date().toISOString()
      });

      response = `END 🚨 የአደጋ ጥሪዎ #${ticketCode} በሚል ተመዝግቧል!
የእሳትና አደጋ መከላከያ ቡድን እና ቀይ መስቀል ወደ ስፍራው ተልከዋል።
እባክዎ የመብራት ማስተላለፊያዎችን አጥፍተው ወደ ከፍታ ቦታ ይውጡ!`;
      return sendText(res, 200, response);
    }

    if (text === '') {
      response = `CON Welcome to Gondar SmartCivic
እንኳን ወደ ጎንደር ስማርት ሲቪክ በደህና መጡ
1. አማርኛ (Amharic)
2. English`;
      return sendText(res, 200, response);
    }

    const lang = inputs[0] === '1' ? 'am' : 'en';

    if (inputs.length === 1) {
      response = lang === 'am'
        ? `CON አገልግሎት ይምረጡ:
0. 🚨 የጎርፍ አደጋ አስቸኳይ ጥሪ (Flash Flood SOS)
1. አዲስ የህዝብ ችግር ሪፖርት ለማድረግ
2. የሪፖርት ሁኔታን ለመከታተል`
        : `CON Choose Service:
0. 🚨 Flash Flood Emergency SOS
1. Report New Municipal Issue
2. Track Existing Ticket`;
      return sendText(res, 200, response);
    }

    const action = inputs[1];

    // ACTION 0: FLASH FLOOD EMERGENCY SOS
    if (action === '0') {
      if (inputs.length === 2) {
        response = lang === 'am'
          ? `CON 🚨 የጎርፍ አደጋ የደረሰበትን ክፍለ ከተማ ይምረጡ (1-12):\n1. ፋሲል\n2. ማራኪ\n3. አራዳ\n4. አዘዞ ቴዳ\n5. ዞብል\n6. ጃንተከል\n(ወይም ከ 7-12 ቁጥር ያስገቡ)`
          : `CON 🚨 Select Sub-City for Flood SOS (1-12):\n1. Fasil\n2. Maraki\n3. Arada\n4. Azezo-Teda\n5. Zobel\n6. Jantekel\n(or enter 7-12)`;
        return sendText(res, 200, response);
      }
      if (inputs.length === 3) {
        const scIdx = inputs[2];
        const subCityObj = SUB_CITIES[parseInt(scIdx, 10) - 1] || SUB_CITIES[0];
        const ticketCode = `GDR-SOS-${Math.floor(100 + Math.random() * 900)}`;

        const newTicket = {
          id: String(incidents.length + 1),
          ticket_code: ticketCode,
          title: `🚨 EMERGENCY FLASH FLOOD: ${subCityObj.name}`,
          description: `Dispatched via USSD SOS Option 0. Immediate evacuation and water pumping required.`,
          category: 'FLOOD_EMERGENCY',
          urgency: 'CRITICAL',
          is_emergency: true,
          emergency_severity: 'CRITICAL',
          status: 'RECEIVED',
          channel_origin: 'USSD',
          caller_phone: phoneNumber,
          is_anonymous: false,
          is_life_threatening: true,
          water_depth_level: 'WAIST_DEEP_OR_HIGHER',
          inundation_type: 'INSIDE_LIVING_QUARTERS',
          trapped_persons_count: 1,
          latitude: subCityObj.lat + (Math.random() - 0.5) * 0.005,
          longitude: subCityObj.lon + (Math.random() - 0.5) * 0.005,
          gps_accuracy_meters: null,
          landmark_description: `Sub-City: ${subCityObj.name}`,
          sub_city: subCityObj.name,
          sub_city_am: subCityObj.name_am,
          department: 'Gondar Fire & Disaster Prevention Agency / Red Cross',
          department_id: 5,
          assigned_crew: 'Gondar Fire & Disaster Rapid Rescue Squad #1',
          photo_before: '/images/categories/flash_flood.svg',
          photo_after: null,
          resolution_proof_url: null,
          resolution_notes: null,
          resolved_by_worker_id: null,
          time_to_fix_minutes: null,
          audio_path: null,
          voice_transcript: null,
          created_at: new Date().toISOString(),
          assigned_at: null,
          resolved_at: null,
          sla_deadline: calculateSlaDeadline(true, 'CRITICAL'),
          is_sla_breached: false
        };
        incidents.unshift(newTicket);

        smsOutbox.push({
          to: phoneNumber,
          message: `🚨 GONDAR DISASTER ALERT: SOS #${ticketCode} registered for ${subCityObj.name}. Fire & Rescue dispatched. Move to high ground immediately!`,
          timestamp: new Date().toISOString()
        });

        response = lang === 'am'
          ? `END 🚨 የአደጋ ጥሪዎ #${ticketCode} በሚል ተመዝግቧል!\nየእሳትና ድንገተኛ አደጋ ቡድን ተልኳል።\nእባክዎ ወደ ከፍታ ስፍራ ይውጡ!`
          : `END 🚨 Flood SOS #${ticketCode} registered!\nFire & Rescue dispatched.\nPlease move to higher ground immediately!`;
        return sendText(res, 200, response);
      }
    }

    if (action === '2') {
      if (inputs.length === 2) {
        response = lang === 'am'
          ? `CON እባክዎ ባለ 6-አሃዝ የቲኬት ቁጥር ያስገቡ (ምሳሌ: GDR-4821):`
          : `CON Please enter your 6-digit Ticket ID (e.g. GDR-4821):`;
        return sendText(res, 200, response);
      }
      if (inputs.length === 3) {
        const queryCode = inputs[2].trim().toUpperCase();
        const ticket = incidents.find(t => t.ticket_code === queryCode || t.ticket_code.replace('-', '') === queryCode);
        response = ticket
          ? (lang === 'am'
              ? `END ቲኬት #${ticket.ticket_code}\nሁኔታ: ${ticket.status}\nተቋም: ${ticket.department}\nክፍለ ከተማ: ${ticket.sub_city_am}`
              : `END Ticket #${ticket.ticket_code}\nStatus: ${ticket.status}\nDept: ${ticket.department}\nSub-City: ${ticket.sub_city}`)
          : (lang === 'am' ? `END ይቅርታ! ቁጥር #${queryCode} አልተገኘም።` : `END Ticket #${queryCode} not found.`);
        return sendText(res, 200, response);
      }
    }

    // Action 1: Report
    if (inputs.length === 2) {
      response = lang === 'am'
        ? `CON ክፍለ ከተማ ይምረጡ (1-12):
1. ፋሲል (Fasil)
2. ማራኪ (Maraki)
3. አራዳ (Arada)
4. አዘዞ ቴዳ (Azezo)
5. ዞብል (Zobel)
6. ጃንተከል (Jantekel)
7. ብላጅግ (Bilajig)
8. ጉባኤ (Gubaie)
9. አደባባይ ፒያሳ (Piassa)
10. ሰላም (Selam)
11. ምንትዋብ (Mintiwab)
12. አብራጅ (Abraj)`
        : `CON Select Sub-City (1-12):
1. Fasil
2. Maraki
3. Arada
4. Azezo-Teda
5. Zobel
6. Jantekel
7. Bilajig
8. Gubaie
9. Adebabay-Piassa
10. Selam
11. Mintiwab
12. Abraj`;
      return sendText(res, 200, response);
    }

    const subCityMap = {
      '1': 'Fasil', '2': 'Maraki', '3': 'Arada', '4': 'Azezo-Teda',
      '5': 'Zobel', '6': 'Jantekel', '7': 'Bilajig', '8': 'Gubaie',
      '9': 'Adebabay-Piassa', '10': 'Selam', '11': 'Mintiwab', '12': 'Abraj'
    };
    const subCityName = subCityMap[inputs[2]] || 'Fasil';
    const subCityObj = SUB_CITIES.find(s => s.name === subCityName) || SUB_CITIES[0];

    if (inputs.length === 3) {
      response = lang === 'am'
        ? `CON የችግሩን አይነት ይምረጡ:\n1. የመጠጥ ውሃ መስመር ብልሽት\n2. የመብራት መቆራረጥ\n3. ያልተነሳ የደረቅ ቆሻሻ\n4. የመንገድና የፍሳሽ ቦይ ጉዳት`
        : `CON Select Category:\n1. Water Pipe Burst\n2. Electrical Fault\n3. Solid Waste\n4. Road Damage`;
      return sendText(res, 200, response);
    }

    const catMap = { '1': 'WATER_LEAK', '2': 'POWER_OUTAGE', '3': 'SOLID_WASTE', '4': 'ROAD_DAMAGE' };
    const category = catMap[inputs[3]] || 'OTHER';

    if (inputs.length === 4) {
      response = lang === 'am'
        ? `CON የቦታውን መለያ (Landmark) ጽፈው ይላኩ:\n(ምሳሌ: ፒያሳ ፖስታ ቤት አጠገብ)`
        : `CON Type nearest landmark and send:\n(e.g., Near Piazza Post Office)`;
      return sendText(res, 200, response);
    }

    if (inputs.length >= 5) {
      const landmarkText = inputs.slice(4).join(' ').trim();
      const ticketCode = `GDR-${Math.floor(1000 + Math.random() * 9000)}`;

      const newTicket = {
        id: String(incidents.length + 1),
        ticket_code: ticketCode,
        title: `USSD Report: ${category} in ${subCityObj.name}`,
        description: `Reported via USSD (*840#). Landmark: ${landmarkText}`,
        category,
        urgency: 'MEDIUM',
        is_emergency: false,
        emergency_severity: 'MEDIUM',
        status: 'RECEIVED',
        channel_origin: 'USSD',
        caller_phone: phoneNumber,
        is_anonymous: false,
        is_life_threatening: false,
        latitude: subCityObj.lat + (Math.random() - 0.5) * 0.005,
        longitude: subCityObj.lon + (Math.random() - 0.5) * 0.005,
        gps_accuracy_meters: null,
        landmark_description: landmarkText,
        sub_city: subCityObj.name,
        sub_city_am: subCityObj.name_am,
        department: category === 'WATER_LEAK' ? 'Gondar Water & Sewerage' : 'Central Municipality',
        department_id: 1,
        assigned_crew: null,
        photo_before: null,
        photo_after: null,
        resolution_proof_url: null,
        resolution_notes: null,
        resolved_by_worker_id: null,
        time_to_fix_minutes: null,
        audio_path: null,
        voice_transcript: null,
        created_at: new Date().toISOString(),
        assigned_at: null,
        resolved_at: null,
        sla_deadline: calculateSlaDeadline(false, 'MEDIUM'),
        is_sla_breached: false
      };

      incidents.unshift(newTicket);
      smsOutbox.push({
        to: phoneNumber,
        message: `Gondar SmartCivic: Incident #${ticketCode} registered. Track via *840#.`,
        timestamp: new Date().toISOString()
      });

      response = lang === 'am'
        ? `END ሪፖርትዎ በተሳካ ሁኔታ ተመዝግቧል!\nየቲኬት መለያ: #${ticketCode}\nማረጋገጫ SMS ይደርስዎታል።`
        : `END Report submitted!\nTicket ID: #${ticketCode}\nConfirmation SMS sent.`;
      return sendText(res, 200, response);
    }
  }

  // 2. TWO-WAY SMS (8065)
  if (pathname === '/api/v1/sms/inbound' && method === 'POST') {
    const body = await parseRequestBody(req);
    const { from = '+251918000000', text = '' } = body;
    const clean = text.trim();

    const trackMatch = clean.match(/^(?:TRACK|ተከታተል|STATUS)\s+([A-Za-z0-9\-]+)/i);
    if (trackMatch) {
      const code = trackMatch[1].toUpperCase();
      const ticket = incidents.find(t => t.ticket_code === code || t.ticket_code.replace('-', '') === code);
      const reply = ticket
        ? `SmartCivic Ticket #${ticket.ticket_code}: Status is [${ticket.status}] for [${ticket.category}] in ${ticket.sub_city}.`
        : `SmartCivic: Ticket #${code} not found.`;
      smsOutbox.push({ to: from, message: reply, timestamp: new Date().toISOString() });
      return sendJSON(res, 200, { status: 'PROCESSED', reply });
    }

    // EMERGENCY & SOS KEYWORD PARSER: "EMERGENCY ...", "FLOOD SOS ...", "አስቸኳይ ...", "አደጋ ..."
    const isEmergKeyword = /^(?:EMERGENCY|FLOOD\s+SOS|SOS\s+FLOOD|SOS|አስቸኳይ|የጎርፍ\s+አደጋ|የአደጋ\s+ጥሪ|አደጋ|HAZARD|DANGER)\b/i.test(clean);
    if (isEmergKeyword) {
      let category = 'FLOOD_EMERGENCY';
      if (/flood|ጎርፍ|inundation|rescue|ወንዝ/i.test(clean)) category = 'FLOOD_EMERGENCY';
      else if (/power|electric|መብራት|ትራንስፎርመር|wire/i.test(clean)) category = 'POWER_OUTAGE';
      else if (/water|ውሃ|ዉሃ|ቧንቧ/i.test(clean)) category = 'WATER_LEAK';
      else if (/road|ድልድይ|መንገድ|culvert/i.test(clean)) category = 'ROAD_DAMAGE';
      else if (/waste|ቆሻሻ/i.test(clean)) category = 'SOLID_WASTE';

      let subCityObj = SUB_CITIES[1]; // default Maraki
      for (const sc of SUB_CITIES) {
        const pattern = new RegExp(sc.name.replace('-', '|'), 'i');
        const patternAm = new RegExp(sc.name_am, 'i');
        if (pattern.test(clean) || patternAm.test(clean)) {
          subCityObj = sc;
          break;
        }
      }

      const isFlood = category === 'FLOOD_EMERGENCY';
      const ticketCode = isFlood ? `GDR-SOS-${Math.floor(100 + Math.random() * 900)}` : `GDR-EMG-${Math.floor(100 + Math.random() * 900)}`;
      const newTicket = {
        id: String(incidents.length + 1),
        ticket_code: ticketCode,
        title: `🚨 EMERGENCY SMS: ${category.replace(/_/g, ' ')} (${subCityObj.name})`,
        description: `Dispatched via Emergency SMS 8065: "${clean}"`,
        category,
        urgency: 'CRITICAL',
        is_emergency: true,
        emergency_severity: 'CRITICAL',
        status: 'RECEIVED',
        channel_origin: 'SMS',
        caller_phone: from,
        is_anonymous: false,
        is_life_threatening: true,
        water_depth_level: isFlood ? 'WAIST_DEEP_OR_HIGHER' : null,
        inundation_type: isFlood ? 'INSIDE_LIVING_QUARTERS' : null,
        trapped_persons_count: isFlood ? 1 : 0,
        latitude: subCityObj.lat + (Math.random() - 0.5) * 0.005,
        longitude: subCityObj.lon + (Math.random() - 0.5) * 0.005,
        gps_accuracy_meters: null,
        landmark_description: clean,
        sub_city: subCityObj.name,
        sub_city_am: subCityObj.name_am,
        department: isFlood ? 'Gondar Fire & Disaster Prevention Agency / Red Cross' : (category === 'POWER_OUTAGE' ? 'Ethiopian Electric Utility (EEU)' : 'Central Municipal Dispatch'),
        department_id: isFlood ? 5 : (category === 'POWER_OUTAGE' ? 2 : 1),
        assigned_crew: isFlood ? 'Gondar Fire & Disaster Rapid Rescue Squad #1' : null,
        photo_before: isFlood ? '/images/categories/flash_flood.svg' : (category === 'POWER_OUTAGE' ? '/images/categories/power_outage.svg' : '/images/categories/water_leak.svg'),
        photo_after: null,
        resolution_proof_url: null,
        resolution_notes: null,
        resolved_by_worker_id: null,
        time_to_fix_minutes: null,
        audio_path: null,
        voice_transcript: null,
        created_at: new Date().toISOString(),
        assigned_at: null,
        resolved_at: null,
        sla_deadline: calculateSlaDeadline(true, 'CRITICAL'),
        is_sla_breached: false
      };
      incidents.unshift(newTicket);

      const confirmMsg = isFlood
        ? `🚨 GONDAR DISASTER RESCUE #${ticketCode}: Flood Emergency received for ${subCityObj.name}. Taskforce notified. Shut off electricity and move to high ground!`
        : `🚨 GONDAR EMERGENCY ALERT #${ticketCode}: Urgent ${category} hazard registered for ${subCityObj.name}. Emergency crew alerted for immediate response.`;
      
      smsOutbox.push({ to: from, message: confirmMsg, timestamp: new Date().toISOString() });
      return sendJSON(res, 200, { status: 'SUCCESS', ticketCode, confirmMsg, priority: 'CRITICAL_DISASTER' });
    }

    const reportMatch = clean.match(/^(?:REPORT|ሪፖርት)\s+([^\s]+)\s+([^\s]+)\s+(.+)$/i);
    if (!reportMatch) {
      const helpMsg = `SmartCivic Format: REPORT [CATEGORY] [SUBCITY] [LANDMARK]\nExample: REPORT WATER MARAKI Near University Gate\nEmergency Format: EMERGENCY [HAZARD] [SUBCITY] [DETAILS]`;
      return sendJSON(res, 400, { error: 'INVALID_FORMAT', guide: helpMsg });
    }

    const rawCat = reportMatch[1].toLowerCase();
    const rawSub = reportMatch[2].toLowerCase();
    const landmark = reportMatch[3].trim();

    let category = 'OTHER';
    if (/water|ውሃ|ዉሃ|ቧንቧ/.test(rawCat)) category = 'WATER_LEAK';
    else if (/power|electric|መብራት/.test(rawCat)) category = 'POWER_OUTAGE';
    else if (/waste|garbage|ቆሻሻ/.test(rawCat)) category = 'SOLID_WASTE';
    else if (/road|መንገድ/.test(rawCat)) category = 'ROAD_DAMAGE';

    let subCityObj = SUB_CITIES[0];
    if (/maraki|ማራኪ/.test(rawSub)) subCityObj = SUB_CITIES[1];
    else if (/arada|አራዳ/.test(rawSub)) subCityObj = SUB_CITIES[2];
    else if (/azezo|teda|አዘዞ|ቴዳ/.test(rawSub)) subCityObj = SUB_CITIES[3];
    else if (/zobel|ዞብል/.test(rawSub)) subCityObj = SUB_CITIES[4];
    else if (/jantekel|ጃንተከል/.test(rawSub)) subCityObj = SUB_CITIES[5];
    else if (/bilajig|ብላጅግ/.test(rawSub)) subCityObj = SUB_CITIES[6];
    else if (/gubaie|ጉባኤ/.test(rawSub)) subCityObj = SUB_CITIES[7];
    else if (/adebabay|piassa|ፒያሳ|አደባባይ/.test(rawSub)) subCityObj = SUB_CITIES[8];
    else if (/selam|ሰላም/.test(rawSub)) subCityObj = SUB_CITIES[9];
    else if (/mintiwab|ምንትዋብ/.test(rawSub)) subCityObj = SUB_CITIES[10];
    else if (/abraj|አብራጅ/.test(rawSub)) subCityObj = SUB_CITIES[11];

    const ticketCode = `GDR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = {
      id: String(incidents.length + 1),
      ticket_code: ticketCode,
      title: `SMS Report: ${category} at ${subCityObj.name}`,
      description: `Reported via SMS 8065: "${clean}"`,
      category,
      urgency: 'MEDIUM',
      is_emergency: false,
      emergency_severity: 'MEDIUM',
      status: 'RECEIVED',
      channel_origin: 'SMS',
      caller_phone: from,
      is_anonymous: false,
      is_life_threatening: false,
      latitude: subCityObj.lat + (Math.random() - 0.5) * 0.005,
      longitude: subCityObj.lon + (Math.random() - 0.5) * 0.005,
      gps_accuracy_meters: null,
      landmark_description: landmark,
      sub_city: subCityObj.name,
      sub_city_am: subCityObj.name_am,
      department: 'Central Municipal Dispatch',
      department_id: 1,
      assigned_crew: null,
      photo_before: null,
      photo_after: null,
      resolution_proof_url: null,
      resolution_notes: null,
      resolved_by_worker_id: null,
      time_to_fix_minutes: null,
      audio_path: null,
      voice_transcript: null,
      created_at: new Date().toISOString(),
      assigned_at: null,
      resolved_at: null,
      sla_deadline: calculateSlaDeadline(false, 'MEDIUM'),
      is_sla_breached: false
    };
    incidents.unshift(newTicket);

    const confirmMsg = `Gondar SmartCivic: Incident #${ticketCode} registered for ${subCityObj.name}. Track via: TRACK ${ticketCode} to 8065.`;
    smsOutbox.push({ to: from, message: confirmMsg, timestamp: new Date().toISOString() });
    return sendJSON(res, 200, { status: 'SUCCESS', ticketCode, confirmMsg });
  }

  // 3. IVR VOICE HOTLINE (8400)
  if (pathname === '/api/v1/ingest/ivr' && method === 'POST') {
    const body = await parseRequestBody(req);
    const { caller = '+251918444555', category = 'WATER_LEAK', subCity = 'Azezo-Teda', audio_path, voice_transcript } = body;
    const subCityObj = SUB_CITIES.find(s => s.name.toLowerCase() === subCity.toLowerCase()) || SUB_CITIES[3];
    const ticketCode = `GDR-IVR-${Math.floor(1000 + Math.random() * 9000)}`;
    const isEmerg = category === 'FLOOD_EMERGENCY';
    const severity = isEmerg ? 'CRITICAL' : 'HIGH';

    const newTicket = {
      id: String(incidents.length + 1),
      ticket_code: ticketCode,
      title: `🎙️ IVR Voice Hotline: ${category.replace(/_/g, ' ')} (${subCityObj.name})`,
      description: `30-second Amharic DTMF voice recording received via automated municipal hotline 8400.`,
      category,
      urgency: severity,
      is_emergency: isEmerg,
      emergency_severity: severity,
      status: 'RECEIVED',
      channel_origin: 'IVR_VOICE',
      caller_phone: caller,
      is_anonymous: false,
      is_life_threatening: isEmerg,
      latitude: subCityObj.lat + (Math.random() - 0.5) * 0.005,
      longitude: subCityObj.lon + (Math.random() - 0.5) * 0.005,
      gps_accuracy_meters: null,
      landmark_description: `Spoken in 30s IVR audio recording. Sub-city: ${subCityObj.name}`,
      sub_city: subCityObj.name,
      sub_city_am: subCityObj.name_am,
      department: category === 'WATER_LEAK' ? 'Gondar Water & Sewerage Authority' : 'Central Municipal Dispatch',
      department_id: 1,
      assigned_crew: null,
      photo_before: category === 'WATER_LEAK' ? '/images/categories/water_leak.svg' : '/images/categories/flash_flood.svg',
      photo_after: null,
      resolution_proof_url: null,
      resolution_notes: null,
      resolved_by_worker_id: null,
      time_to_fix_minutes: null,
      audio_path: audio_path || '/uploads/audio/sample_ivr.wav',
      voice_transcript: voice_transcript || 'የውሃ ቱቦ ተሰብሮ መንገድ ላይ እየፈሰሰ ነው እባካችሁ በፍጥነት ጥገና ይደረግልን (Broken water pipe flooding street, urgent fix requested)',
      created_at: new Date().toISOString(),
      assigned_at: null,
      resolved_at: null,
      sla_deadline: calculateSlaDeadline(isEmerg, severity),
      is_sla_breached: false
    };

    incidents.unshift(newTicket);
    return sendJSON(res, 201, { status: 'SUCCESS', ticketCode, ticket: newTicket });
  }

  // 3B. DIRECT EMERGENCY TELEPHONE CALL INTAKE (DESK DISPATCH)
  if (pathname === '/api/v1/ingest/phone-call' && method === 'POST') {
    const body = await parseRequestBody(req);
    const {
      caller_phone = '+251918778899',
      caller_name = 'Resident Caller',
      category = 'FLOOD_EMERGENCY',
      sub_city = 'Jantekel',
      landmark = 'Keha River Crossing near Western Gate',
      notes = 'Spoken report of culvert collapse and river surge.',
      severity = 'HIGH',
      is_emergency = true
    } = body;

    const subCityObj = SUB_CITIES.find(s => s.name.toLowerCase() === sub_city.toLowerCase()) || SUB_CITIES[5];
    const ticketCode = `GDR-PHN-${Math.floor(1000 + Math.random() * 9000)}`;
    const isEmerg = is_emergency === true || is_emergency === 'true' || severity === 'CRITICAL' || category === 'FLOOD_EMERGENCY';

    const newTicket = {
      id: String(incidents.length + 1),
      ticket_code: ticketCode,
      title: `📞 Emergency Phone Call: ${category.replace(/_/g, ' ')} (${subCityObj.name})`,
      description: notes || `Direct operator phone call from ${caller_name} (${caller_phone})`,
      category,
      urgency: isEmerg ? (severity || 'HIGH') : 'MEDIUM',
      is_emergency: isEmerg,
      emergency_severity: isEmerg ? (severity || 'HIGH') : 'LOW',
      status: 'RECEIVED',
      channel_origin: 'PHONE_CALL',
      caller_phone,
      is_anonymous: false,
      is_life_threatening: isEmerg,
      latitude: subCityObj.lat + (Math.random() - 0.5) * 0.005,
      longitude: subCityObj.lon + (Math.random() - 0.5) * 0.005,
      gps_accuracy_meters: 5.0,
      landmark_description: landmark,
      sub_city: subCityObj.name,
      sub_city_am: subCityObj.name_am,
      department: category === 'FLOOD_EMERGENCY' ? 'Gondar Fire & Disaster Prevention Agency' : 'Central Municipal Dispatch',
      department_id: category === 'FLOOD_EMERGENCY' ? 5 : 1,
      assigned_crew: null,
      photo_before: category === 'FLOOD_EMERGENCY' ? '/images/categories/flash_flood.svg' : '/images/categories/water_leak.svg',
      photo_after: null,
      resolution_proof_url: null,
      resolution_notes: null,
      resolved_by_worker_id: null,
      time_to_fix_minutes: null,
      audio_path: '/uploads/audio/sample_ivr.wav',
      voice_transcript: notes || 'Operator voice call notes logged from resident direct call.',
      created_at: new Date().toISOString(),
      assigned_at: null,
      resolved_at: null,
      sla_deadline: calculateSlaDeadline(isEmerg, severity),
      is_sla_breached: false
    };

    incidents.unshift(newTicket);
    return sendJSON(res, 201, { status: 'SUCCESS', ticketCode, ticket: newTicket });
  }

  // 4. REST INCIDENTS API WITH 5-QUEUE FILTERING & SLA ESCALATION
  if (pathname === '/api/v1/incidents' && method === 'GET') {
    incidents.forEach(updateTicketSlaState);

    const { sub_city, category, status, channel, filter } = parsedUrl.query;
    
    // Calculate 5 queue counts across all incidents
    const countEmergency = incidents.filter(i => i.is_emergency || i.urgency === 'CRITICAL' || i.category === 'FLOOD_EMERGENCY').length;
    const countGeneral = incidents.filter(i => !i.is_emergency && i.urgency !== 'CRITICAL' && i.status !== 'RESOLVED' && !i.is_sla_breached).length;
    const countVoice = incidents.filter(i => i.channel_origin === 'IVR' || i.channel_origin === 'IVR_VOICE' || i.channel_origin === 'PHONE_CALL' || Boolean(i.audio_path)).length;
    const countOverdue = incidents.filter(i => i.is_sla_breached || i.status === 'ESCALATED_UNRESOLVED' || (i.status !== 'RESOLVED' && new Date(i.sla_deadline).getTime() < Date.now())).length;
    const countResolved = incidents.filter(i => i.status === 'RESOLVED').length;

    let list = [...incidents];
    if (filter === 'emergency') {
      list = list.filter(i => i.is_emergency || i.urgency === 'CRITICAL' || i.category === 'FLOOD_EMERGENCY');
    } else if (filter === 'general') {
      list = list.filter(i => !i.is_emergency && i.urgency !== 'CRITICAL' && i.status !== 'RESOLVED' && !i.is_sla_breached);
    } else if (filter === 'voice') {
      list = list.filter(i => i.channel_origin === 'IVR' || i.channel_origin === 'IVR_VOICE' || i.channel_origin === 'PHONE_CALL' || Boolean(i.audio_path));
    } else if (filter === 'overdue') {
      list = list.filter(i => i.is_sla_breached || i.status === 'ESCALATED_UNRESOLVED' || (i.status !== 'RESOLVED' && new Date(i.sla_deadline).getTime() < Date.now()));
    } else if (filter === 'resolved') {
      list = list.filter(i => i.status === 'RESOLVED');
    }

    if (sub_city) list = list.filter(i => i.sub_city.toLowerCase() === sub_city.toLowerCase());
    if (category) list = list.filter(i => i.category === category);
    if (status) list = list.filter(i => i.status === status);
    if (channel) list = list.filter(i => i.channel_origin === channel);

    return sendJSON(res, 200, {
      total: incidents.length,
      count: list.length,
      counts: {
        all: incidents.length,
        emergency: countEmergency,
        general: countGeneral,
        voice: countVoice,
        overdue: countOverdue,
        resolved: countResolved
      },
      incidents: list
    });
  }

  if (pathname.startsWith('/api/v1/incidents/') && method === 'GET') {
    const code = pathname.split('/').pop().toUpperCase();
    const ticket = incidents.find(t => t.ticket_code === code || t.ticket_code.replace('-', '') === code);
    if (!ticket) return sendJSON(res, 404, { error: 'Ticket not found' });
    updateTicketSlaState(ticket);
    return sendJSON(res, 200, ticket);
  }

  if (pathname === '/api/v1/incidents' && method === 'POST') {
    const body = await parseRequestBody(req);
    const {
      title, description, category = 'OTHER', urgency = 'MEDIUM',
      latitude, longitude, accuracy = 5, phone, isAnonymous = 'false', landmark = '', photo_before
    } = body;

    const lat = parseFloat(latitude) || 12.6000;
    const lon = parseFloat(longitude) || 37.4667;

    let closestSubCity = SUB_CITIES[0];
    let minDistance = Infinity;
    SUB_CITIES.forEach(sc => {
      const d = getDistanceMeters(lat, lon, sc.lat, sc.lon);
      if (d < minDistance) {
        minDistance = d;
        closestSubCity = sc;
      }
    });

    const isEmerg = urgency.toUpperCase() === 'CRITICAL' || category === 'FLOOD_EMERGENCY';
    const ticketCode = isEmerg ? `GDR-EMG-${Math.floor(100 + Math.random() * 900)}` : `GDR-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket = {
      id: String(incidents.length + 1),
      ticket_code: ticketCode,
      title: title || `${category} reported at ${closestSubCity.name}`,
      description: description || 'Reported via Gondar SmartCivic Web Portal',
      category,
      urgency: urgency.toUpperCase(),
      is_emergency: isEmerg,
      emergency_severity: isEmerg ? 'CRITICAL' : (urgency.toUpperCase() === 'HIGH' ? 'HIGH' : 'MEDIUM'),
      status: 'RECEIVED',
      channel_origin: 'WEB',
      caller_phone: isAnonymous === 'true' ? null : phone,
      is_anonymous: isAnonymous === 'true',
      is_life_threatening: isEmerg,
      latitude: lat,
      longitude: lon,
      gps_accuracy_meters: parseFloat(accuracy),
      landmark_description: landmark || `Coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
      sub_city: closestSubCity.name,
      sub_city_am: closestSubCity.name_am,
      department: isEmerg ? 'Gondar Fire & Disaster Prevention Agency' : 'Gondar City Municipal Administration',
      department_id: isEmerg ? 5 : 1,
      assigned_crew: null,
      photo_before: photo_before || (isEmerg ? '/images/categories/flash_flood.svg' : '/images/categories/water_leak.svg'),
      photo_after: null,
      resolution_proof_url: null,
      resolution_notes: null,
      resolved_by_worker_id: null,
      time_to_fix_minutes: null,
      audio_path: null,
      voice_transcript: null,
      created_at: new Date().toISOString(),
      assigned_at: null,
      resolved_at: null,
      sla_deadline: calculateSlaDeadline(isEmerg, urgency.toUpperCase()),
      is_sla_breached: false
    };

    incidents.unshift(newTicket);
    return sendJSON(res, 201, { status: 'SUCCESS', ticket: newTicket });
  }

  // 4A. INCIDENT STATUS & RESOLUTION WORKFLOW
  if (pathname.includes('/status') && method === 'PATCH') {
    const parts = pathname.split('/');
    const code = parts[parts.indexOf('incidents') + 1].toUpperCase();
    const ticket = incidents.find(t => t.ticket_code === code);
    if (!ticket) return sendJSON(res, 404, { error: 'Ticket not found' });

    const body = await parseRequestBody(req);
    const { status, crew_id, resolution_notes, resolution_proof_url, photo_after, resolved_by_worker_id } = body;
    
    if (status) ticket.status = status;
    if (crew_id) {
      const crew = CREWS.find(c => c.id === parseInt(crew_id, 10));
      if (crew) {
        ticket.assigned_crew = crew.crew_name;
        ticket.assigned_at = new Date().toISOString();
        if (ticket.status === 'RECEIVED' || ticket.status === 'SUBMITTED' || ticket.status === 'TRIAGED') {
          ticket.status = 'DISPATCHED';
        }
      }
    }
    if (resolution_notes) ticket.resolution_notes = resolution_notes;
    if (resolution_proof_url) ticket.resolution_proof_url = resolution_proof_url;
    if (photo_after) ticket.photo_after = photo_after;
    if (resolved_by_worker_id) ticket.resolved_by_worker_id = resolved_by_worker_id;

    if (status === 'RESOLVED') {
      ticket.resolved_at = new Date().toISOString();
      if (!ticket.resolved_by_worker_id) ticket.resolved_by_worker_id = 'LEAD-TECH-01';
      if (!ticket.resolution_notes) ticket.resolution_notes = 'Issue inspected, repaired, and verified on-site by municipal crew.';
      if (!ticket.resolution_proof_url && !ticket.photo_after) {
        ticket.resolution_proof_url = '/images/gondar_fasiledes_castle.jpg';
        ticket.photo_after = ticket.resolution_proof_url;
      }
      const createdTime = new Date(ticket.created_at).getTime();
      const resolvedTime = new Date(ticket.resolved_at).getTime();
      ticket.time_to_fix_minutes = Math.max(1, Math.round((resolvedTime - createdTime) / 60000));
      ticket.is_sla_breached = false;
    }

    return sendJSON(res, 200, { status: 'SUCCESS', ticket });
  }

  // 4B. SINGLE-TAP FLOOD & DISASTER SOS ENDPOINT
  if ((pathname === '/api/v1/incidents/emergency-sos' || pathname === '/api/v1/incidents/flood-sos') && method === 'POST') {
    const body = await parseRequestBody(req);
    const {
      latitude, longitude, phone = '+251918556677', sub_city = 'Maraki', landmark = 'River bank lowland',
      water_depth_level = 'WAIST_DEEP_OR_HIGHER',
      inundation_type = 'INSIDE_LIVING_QUARTERS',
      trapped_persons_count = 1,
      photo_before
    } = body;

    const lat = parseFloat(latitude) || 12.6215;
    const lon = parseFloat(longitude) || 37.4690;
    const subCityObj = SUB_CITIES.find(s => s.name.toLowerCase() === sub_city.toLowerCase()) || SUB_CITIES[1];
    const ticketCode = `GDR-SOS-${Math.floor(100 + Math.random() * 900)}`;

    const newTicket = {
      id: String(incidents.length + 1),
      ticket_code: ticketCode,
      title: `🚨 FLASH FLOOD EMERGENCY: ${subCityObj.name} (${inundation_type.replace(/_/g, ' ')})`,
      description: `CRITICAL RESCUE DISPATCH: Water depth is ${water_depth_level}. Trapped individuals: ${trapped_persons_count}. Immediate evacuation & inflatable boats required!`,
      category: 'FLOOD_EMERGENCY',
      urgency: 'CRITICAL',
      is_emergency: true,
      emergency_severity: 'CRITICAL',
      status: 'RECEIVED',
      channel_origin: 'MOBILE_APP',
      caller_phone: phone,
      is_anonymous: false,
      is_life_threatening: true,
      water_depth_level,
      inundation_type,
      trapped_persons_count: parseInt(trapped_persons_count, 10) || 1,
      latitude: lat,
      longitude: lon,
      gps_accuracy_meters: 3.5,
      landmark_description: landmark,
      sub_city: subCityObj.name,
      sub_city_am: subCityObj.name_am,
      department: 'Gondar Fire & Disaster Prevention Agency / Red Cross',
      department_id: 5,
      assigned_crew: 'Gondar Fire & Disaster Rapid Rescue Squad #1',
      photo_before: photo_before || '/images/categories/flash_flood.svg',
      photo_after: null,
      resolution_proof_url: null,
      resolution_notes: null,
      resolved_by_worker_id: null,
      time_to_fix_minutes: null,
      audio_path: null,
      voice_transcript: null,
      created_at: new Date().toISOString(),
      assigned_at: new Date().toISOString(),
      resolved_at: null,
      sla_deadline: calculateSlaDeadline(true, 'CRITICAL'),
      is_sla_breached: false
    };

    incidents.unshift(newTicket);

    const outSms = {
      to: phone,
      message: `🚨 GONDAR DISASTER RESCUE #${ticketCode}: Your SOS is registered with TOP PRIORITY! Gondar Fire & Disaster Taskforce and Red Cross Rescue Unit are en route. Disconnect electric main breakers and move to high ground immediately!`,
      timestamp: new Date().toISOString()
    };
    smsOutbox.push(outSms);

    return sendJSON(res, 201, {
      status: 'SUCCESS',
      ticket: newTicket,
      ticketCode,
      priority: 'TIER_1_CRITICAL_ALARM',
      sound_alarm: true,
      message: 'Rescue crews dispatched via SMS'
    });
  }

  // 4C. GEOFENCED EARLY WARNING BROADCAST (MASS SMS ENGINE)
  if (pathname === '/api/v1/broadcasts/flood-warning' && method === 'POST') {
    const body = await parseRequestBody(req);
    const {
      sub_city = 'Maraki',
      river_basin = 'Angereb River Catchment',
      message_am,
      message_en,
      severity = 'CRITICAL'
    } = body;

    const defaultAm = `አስቸኳይ የጎርፍ ማስጠንቀቂያ፡ በ${sub_city} የ${river_basin} ወንዝ ሙላት እያሻቀበ በመሆኑ በዝቅተኛ ስፍራዎች የምትገኙ ነዋሪዎች ወደ ደረቅ ስፍራ ተጠጉ።`;
    const defaultEn = `URGENT FLASH FLOOD WARNING: ${river_basin} in ${sub_city} is overflowing rapidly. Move to higher ground immediately!`;

    const subCityIncidents = incidents.filter(i => i.sub_city === sub_city && i.caller_phone);
    const recipientCount = Math.max(subCityIncidents.length * 150 + 240, 480);

    const newBroadcast = {
      id: emergencyBroadcasts.length + 1,
      title: `Emergency Flood Warning: ${sub_city} (${river_basin})`,
      message_am: message_am || defaultAm,
      message_en: message_en || defaultEn,
      sub_city,
      river_basin,
      recipient_count: recipientCount,
      severity,
      broadcast_time: new Date().toISOString()
    };

    emergencyBroadcasts.unshift(newBroadcast);

    // Mock SMS broadcast dispatch
    smsOutbox.push({
      to: `BROADCAST_GROUP_${sub_city.toUpperCase()}`,
      message: `[MASS DISASTER ALERT] ${newBroadcast.message_en} | ${newBroadcast.message_am}`,
      timestamp: new Date().toISOString()
    });

    return sendJSON(res, 201, {
      status: 'SUCCESS',
      broadcast: newBroadcast,
      recipient_count: recipientCount,
      message: `Mass SMS early warning broadcast sent to ${recipientCount} registered mobile subscribers in ${sub_city}.`
    });
  }

  if (pathname === '/api/v1/broadcasts' && method === 'GET') {
    return sendJSON(res, 200, { broadcasts: emergencyBroadcasts });
  }

  if (pathname === '/api/v1/flood/risk-layers' && method === 'GET') {
    return sendJSON(res, 200, { river_basins: RIVER_BASINS });
  }

  // 5. CREWS & ANALYTICS
  if (pathname === '/api/v1/crews' && method === 'GET') {
    const { lat, lon } = parsedUrl.query;
    const list = CREWS.map(crew => {
      let distance = null;
      let etaMinutes = null;
      if (lat && lon) {
        distance = getDistanceMeters(parseFloat(lat), parseFloat(lon), crew.lat, crew.lon);
        etaMinutes = Math.round((distance / 1000) / 25 * 60);
      }
      return { ...crew, distance_meters: distance, eta_minutes: etaMinutes };
    });
    if (lat && lon) list.sort((a, b) => (a.distance_meters || 0) - (b.distance_meters || 0));
    return sendJSON(res, 200, { crews: list });
  }

  if (pathname === '/api/v1/analytics' && method === 'GET') {
    const total = incidents.length;
    const resolved = incidents.filter(i => i.status === 'RESOLVED').length;
    const inProgress = incidents.filter(i => i.status === 'IN_PROGRESS' || i.status === 'ASSIGNED').length;
    const pending = incidents.filter(i => i.status === 'SUBMITTED').length;

    const subCityStats = SUB_CITIES.map(sc => {
      const list = incidents.filter(i => i.sub_city === sc.name);
      return {
        sub_city: sc.name,
        sub_city_am: sc.name_am,
        total: list.length,
        resolved: list.filter(i => i.status === 'RESOLVED').length,
        active: list.filter(i => i.status !== 'RESOLVED').length,
        avg_hours: (3.8 + (sc.id * 0.4)).toFixed(1)
      };
    });

    return sendJSON(res, 200, {
      metrics: { total, resolved, inProgress, pending, resolutionRate: total ? Math.round((resolved / total) * 100) : 0 },
      subCityStats
    });
  }

  // 6. SUBCITIES & ETHIOPIAN CITIES METADATA
  if (pathname === '/api/v1/subcities' && method === 'GET') {
    return sendJSON(res, 200, { count: SUB_CITIES.length, subcities: SUB_CITIES });
  }

  if (pathname === '/api/v1/ethiopian-cities' && method === 'GET') {
    return sendJSON(res, 200, { count: ETHIOPIAN_CITIES.length, cities: ETHIOPIAN_CITIES });
  }

  // ==========================================================================
  // 7. ADMIN EXECUTIVE PORTAL APIS (Wagnew Nigussie - Super Administrator)
  // ==========================================================================

  // 7A. Admin Auth Status / Setup Check
  if (pathname === '/api/v1/admin/auth/status' && method === 'GET') {
    const auth = getAdminAuth();
    return sendJSON(res, 200, {
      configured: auth.configured,
      admin_name: 'Wagnew Nigussie',
      email: 'wagnewnigussie569@gmail.com',
      role: 'SUPER_ADMIN'
    });
  }

  // 7B. Admin Secure Setup / Initialize Password
  if (pathname === '/api/v1/admin/auth/setup' && method === 'POST') {
    const body = await parseRequestBody(req);
    const { password, current_password } = body;
    const auth = getAdminAuth();
    
    if (auth.configured && auth.hash) {
      if (!current_password || !verifyAdminPassword(current_password)) {
        return sendJSON(res, 401, { error: 'Current password verification failed' });
      }
    }
    
    if (!password || password.length < 6) {
      return sendJSON(res, 400, { error: 'Password must be at least 6 characters' });
    }

    saveAdminPassword(password);
    logAuditAction('Wagnew Nigussie', 'wagnewnigussie569@gmail.com', 'SUPER_ADMIN', 'ADMIN_PASSWORD_UPDATED', 'SYS-AUTH', 'SECURITY', 'Gondar', 'Administrator master password securely initialized/updated using PBKDF2-SHA512.');
    
    const token = crypto.randomBytes(32).toString('hex');
    adminSessions.set(token, {
      email: 'wagnewnigussie569@gmail.com',
      name: 'Wagnew Nigussie',
      role: 'SUPER_ADMIN',
      expiresAt: Date.now() + 24 * 3600 * 1000
    });

    return sendJSON(res, 200, {
      status: 'SUCCESS',
      message: 'Administrator password securely saved.',
      token,
      admin: { name: 'Wagnew Nigussie', email: 'wagnewnigussie569@gmail.com', role: 'SUPER_ADMIN' }
    });
  }

  // 7C. Admin Login (Accepts Full Name, Email, Password)
  if (pathname === '/api/v1/admin/auth/login' && method === 'POST') {
    const body = await parseRequestBody(req);
    const { full_name, fullname, email, password } = body;
    const auth = getAdminAuth();

    if (!auth.configured) {
      return sendJSON(res, 400, { error: 'Admin account password not yet initialized. Please complete initial setup.', needsSetup: true });
    }

    const verifiedUser = verifyUserPassword(email, password);
    if (!verifiedUser) {
      logAuditAction(full_name || fullname || 'Security Sentinel', email || 'Unknown', 'UNKNOWN', 'LOGIN_FAILED', 'SYS-AUTH', 'SECURITY', 'Gondar', `Unauthorized login attempt for email: ${email}`);
      return sendJSON(res, 401, { error: 'Invalid administrator credentials. Access restricted to authorized personnel.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const adminUser = {
      id: verifiedUser.id || 'ADM-001',
      email: verifiedUser.email,
      name: verifiedUser.full_name || verifiedUser.name || 'Wagnew Nigussie',
      role: verifiedUser.role || 'SUPER_ADMIN'
    };

    adminSessions.set(token, {
      ...adminUser,
      expiresAt: Date.now() + 24 * 3600 * 1000
    });

    logAuditAction(adminUser.name, adminUser.email, adminUser.role, 'LOGIN_SUCCESS', 'SYS-AUTH', 'SECURITY', 'Gondar', `Administrator ${adminUser.name} authenticated successfully.`);

    return sendJSON(res, 200, {
      status: 'SUCCESS',
      token,
      admin: adminUser
    });
  }

  // 7C-2. Admin Registration / Account Creation (Secured by Admin Only)
  if (pathname === '/api/v1/admin/auth/register' && method === 'POST') {
    const body = await parseRequestBody(req);
    const { full_name, fullname, email, password, role, admin_master_key } = body;
    const name = (full_name || fullname || '').trim();
    const mail = (email || '').trim().toLowerCase();
    const auth = getAdminAuth();

    if (!password || password.length < 6) {
      return sendJSON(res, 400, { error: 'Password must be at least 6 characters' });
    }

    // CASE 1: Initial Master Setup if not configured yet
    if (!auth.configured) {
      if (mail !== 'wagnewnigussie569@gmail.com') {
        return sendJSON(res, 403, {
          error: 'Registration Restricted: Initial master administrator must be Wagnew Nigussie (wagnewnigussie569@gmail.com).'
        });
      }
      saveAdminPassword(password, name || 'Wagnew Nigussie', mail);
      logAuditAction('Wagnew Nigussie', 'wagnewnigussie569@gmail.com', 'SUPER_ADMIN', 'ADMIN_PASSWORD_UPDATED', 'SYS-AUTH', 'SECURITY', 'Gondar', 'Master Administrator Wagnew Nigussie registered master account.');

      const token = crypto.randomBytes(32).toString('hex');
      adminSessions.set(token, {
        email: 'wagnewnigussie569@gmail.com',
        name: name || 'Wagnew Nigussie',
        role: 'SUPER_ADMIN',
        expiresAt: Date.now() + 24 * 3600 * 1000
      });

      return sendJSON(res, 200, {
        status: 'SUCCESS',
        message: 'Master administrator registered and secured successfully.',
        token,
        admin: { name: name || 'Wagnew Nigussie', email: mail, role: 'SUPER_ADMIN' }
      });
    }

    // CASE 2: System already configured. ONLY authenticated Admin can register / create accounts!
    const session = authenticateAdminReq(req);
    const isMasterKeyValid = admin_master_key && verifyUserPassword('wagnewnigussie569@gmail.com', admin_master_key);

    if (!session && !isMasterKeyValid) {
      logAuditAction(name || 'Unknown', mail, 'GUEST', 'UNAUTHORIZED_REGISTRATION_ATTEMPT', 'SYS-AUTH', 'SECURITY', 'Gondar', `Blocked unauthorized registration attempt for "${mail}". Accounts can ONLY be created and secured by Admin.`);
      return sendJSON(res, 403, {
        error: 'Registration Restricted: Administrative and officer accounts can ONLY be created and secured by the Super Administrator (Wagnew Nigussie). Please authenticate as Admin first or provide the Master Key.'
      });
    }

    const creatorName = session ? session.name : 'Wagnew Nigussie (Master Key)';
    try {
      const newUser = createAdminUser({
        full_name: name || 'Municipal Officer',
        email: mail,
        password,
        role: role || 'DISPATCHER',
        created_by: creatorName
      });

      logAuditAction(creatorName, session ? session.email : 'wagnewnigussie569@gmail.com', 'SUPER_ADMIN', 'ADMIN_USER_CREATED', 'SYS-AUTH', 'SECURITY', 'Gondar', `Created and secured new ${newUser.role} account for ${newUser.full_name} (${newUser.email}).`);

      return sendJSON(res, 201, {
        status: 'SUCCESS',
        message: 'Administrator account successfully created and secured by Admin.',
        user: newUser
      });
    } catch (err) {
      return sendJSON(res, 400, { error: err.message });
    }
  }

  // 7C-3. Admin Users Roster (Protected: Only Authenticated Admin)
  if (pathname === '/api/v1/admin/users' && method === 'GET') {
    const session = authenticateAdminReq(req);
    if (!session) return sendJSON(res, 401, { error: 'Unauthorized: Admin session required' });
    const auth = getAdminAuth();
    const safeUsers = (auth.users || []).map(u => ({
      id: u.id,
      full_name: u.full_name || u.name,
      email: u.email,
      role: u.role,
      created_at: u.created_at,
      created_by: u.created_by
    }));
    return sendJSON(res, 200, { count: safeUsers.length, users: safeUsers });
  }

  // 7C-4. Admin Direct User Creation (Protected: Only Authenticated Admin)
  if (pathname === '/api/v1/admin/users' && method === 'POST') {
    const session = authenticateAdminReq(req);
    if (!session) return sendJSON(res, 401, { error: 'Unauthorized: Admin session required' });
    const body = await parseRequestBody(req);
    const { full_name, fullname, email, password, role } = body;
    if (!password || password.length < 6) {
      return sendJSON(res, 400, { error: 'Password must be at least 6 characters' });
    }
    try {
      const newUser = createAdminUser({
        full_name: (full_name || fullname || 'Municipal Officer').trim(),
        email: (email || '').trim().toLowerCase(),
        password,
        role: role || 'DISPATCHER',
        created_by: session.name
      });
      logAuditAction(session.name, session.email, session.role, 'ADMIN_USER_CREATED', 'SYS-AUTH', 'SECURITY', 'Gondar', `Created authorized account for ${newUser.full_name} (${newUser.email}).`);
      return sendJSON(res, 201, { status: 'SUCCESS', message: 'Account created and secured by Admin.', user: newUser });
    } catch (err) {
      return sendJSON(res, 400, { error: err.message });
    }
  }

  // 7D. Admin Session Check
  if (pathname === '/api/v1/admin/auth/session' && method === 'GET') {
    const session = authenticateAdminReq(req);
    if (!session) {
      return sendJSON(res, 401, { error: 'Session expired or invalid' });
    }
    return sendJSON(res, 200, {
      status: 'AUTHENTICATED',
      admin: { name: session.name, email: session.email, role: session.role }
    });
  }

  // 7E. Admin Logout
  if (pathname === '/api/v1/admin/auth/logout' && method === 'POST') {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (token) adminSessions.delete(token);
    logAuditAction('Wagnew Nigussie', 'wagnewnigussie569@gmail.com', 'SUPER_ADMIN', 'LOGOUT', 'SYS-AUTH', 'SECURITY', 'Gondar', 'Administrator logged out.');
    return sendJSON(res, 200, { status: 'SUCCESS' });
  }

  // 7F. Admin Audit Logs
  if (pathname === '/api/v1/admin/audit-logs' && method === 'GET') {
    const { action, actor, ticket } = parsedUrl.query;
    let list = [...auditLogs];
    if (action) list = list.filter(l => l.action.toLowerCase().includes(action.toLowerCase()));
    if (actor) list = list.filter(l => l.actor_name.toLowerCase().includes(actor.toLowerCase()));
    if (ticket) list = list.filter(l => l.ticket_code.toLowerCase().includes(ticket.toLowerCase()));
    return sendJSON(res, 200, { count: list.length, logs: list });
  }

  // 7G. Admin Duplicate / Repeated Incidents
  if (pathname === '/api/v1/admin/duplicates' && method === 'GET') {
    const clusters = detectDuplicateIncidents(incidents);
    return sendJSON(res, 200, { count: clusters.length, clusters });
  }

  // 7H. Admin Merge Duplicates
  if (pathname === '/api/v1/admin/duplicates/merge' && method === 'POST') {
    const body = await parseRequestBody(req);
    const { master_ticket, duplicate_tickets } = body;
    (duplicate_tickets || []).forEach(dt => {
      const t = incidents.find(x => x.ticket_code === dt);
      if (t) {
        t.status = 'RESOLVED';
        t.resolution_notes = `Merged into primary ticket #${master_ticket}`;
        t.resolved_at = new Date().toISOString();
        t.resolved_by_worker_id = 'SUPER-ADMIN-WAGNEW';
      }
    });
    logAuditAction('Wagnew Nigussie', 'wagnewnigussie569@gmail.com', 'SUPER_ADMIN', 'DUPLICATES_MERGED', master_ticket, 'CONSOLIDATION', 'Maraki', `Merged ${(duplicate_tickets || []).length} duplicate tickets into #${master_ticket}.`);
    return sendJSON(res, 200, { status: 'SUCCESS', message: 'Duplicates merged successfully.' });
  }

  // 7I. Admin Periodic Reports
  if (pathname === '/api/v1/admin/reports' && method === 'GET') {
    const period = parsedUrl.query.period || 'weekly';
    const reportData = generatePeriodicReport(period, incidents);
    return sendJSON(res, 200, reportData);
  }

  // 7J. Admin Investigation Progress Update
  if (pathname.startsWith('/api/v1/admin/incidents/') && pathname.endsWith('/investigate') && method === 'PATCH') {
    const parts = pathname.split('/');
    const code = parts[parts.indexOf('incidents') + 1].toUpperCase();
    const ticket = incidents.find(t => t.ticket_code === code);
    if (!ticket) return sendJSON(res, 404, { error: 'Ticket not found' });

    const body = await parseRequestBody(req);
    const { investigation_notes, status, assigned_crew, officer_name } = body;

    if (investigation_notes) {
      ticket.resolution_notes = investigation_notes;
    }
    if (status) {
      ticket.status = status;
      if (status === 'RESOLVED') {
        ticket.resolved_at = new Date().toISOString();
        ticket.resolved_by_worker_id = officer_name || 'Wagnew Nigussie';
        ticket.is_sla_breached = false;
      }
    }
    if (assigned_crew) {
      ticket.assigned_crew = assigned_crew;
      ticket.assigned_at = new Date().toISOString();
    }

    logAuditAction(
      officer_name || 'Wagnew Nigussie',
      'wagnewnigussie569@gmail.com',
      'SUPER_ADMIN',
      'INVESTIGATION_NOTE_ADDED',
      ticket.ticket_code,
      ticket.category,
      ticket.sub_city,
      `Investigation update: ${investigation_notes || 'Crew assigned/Status updated: ' + ticket.status}`
    );

    return sendJSON(res, 200, { status: 'SUCCESS', ticket });
  }

  // ==========================================================================
  // STATIC FILE SERVING
  // ==========================================================================
  let filePath;
  if (pathname.startsWith('/uploads/')) {
    filePath = path.join(__dirname, pathname);
  } else {
    filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  }

  // If request is for /track/... or any route, fallback to index.html
  if (!fs.existsSync(filePath) && !pathname.startsWith('/api') && !pathname.startsWith('/uploads/')) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // High performance Cache-Control headers (no-cache for code so updates are always fresh)
    let cacheControl = 'public, max-age=3600';
    if (ext === '.html' || ext === '.js' || ext === '.css') {
      cacheControl = 'no-cache, no-store, must-revalidate';
    } else if (['.jpg', '.jpeg', '.png', '.svg', '.wav', '.mp3'].includes(ext)) {
      cacheControl = 'public, max-age=86400, stale-while-revalidate=604800';
    }

    const acceptEncoding = req.headers['accept-encoding'] || '';
    const shouldGzip = ['.html', '.css', '.js', '.json', '.svg'].includes(ext) && acceptEncoding.includes('gzip');

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'Access-Control-Allow-Origin': '*'
    };

    if (shouldGzip) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
    } else {
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    sendJSON(res, 404, { error: 'Not Found' });
  }
}

function startServer(portToTry) {
  const srv = http.createServer(handleRequest);

  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = Number(portToTry) === 5000 ? 5050 : (Number(portToTry) + 1);
      console.warn(`[WARN] Port ${portToTry} already in use. Retrying on port ${nextPort}...`);
      startServer(nextPort);
    } else {
      console.error('Server error:', err);
    }
  });

  srv.listen(portToTry, '0.0.0.0', () => {
    console.log(`================================================================`);
    console.log(` Gondar SmartCivic (EthioCivic-Hub) Server Running on Port ${portToTry}`);
    console.log(` Local URL: http://localhost:${portToTry}`);
    console.log(` Omnichannel Ingestion Endpoints (Ready for Defense):`);
    console.log(`   - USSD (*840#):       POST http://localhost:${portToTry}/api/v1/ussd`);
    console.log(`   - SMS (8065):         POST http://localhost:${portToTry}/api/v1/sms/inbound`);
    console.log(`   - IVR Hotline (8400): POST http://localhost:${portToTry}/api/v1/ingest/ivr`);
    console.log(`   - Incidents REST:     GET/POST http://localhost:${portToTry}/api/v1/incidents`);
    console.log(`================================================================`);
  });
}

startServer(PORT);

