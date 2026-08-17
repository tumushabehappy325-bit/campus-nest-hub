import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
const DB_PATH = join(__dirname, 'db.json');

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Allow cross-origin requests from the main app (port 5000)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── DB helpers ────────────────────────────────────────────────────────────────
function readDb() {
  return JSON.parse(readFileSync(DB_PATH, 'utf8'));
}

function writeDb(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// ── Auth ──────────────────────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@must.ac.ug' && password === 'admin123') {
    return res.json({ success: true, name: 'Admin User', email });
  }
  res.status(401).json({ success: false, error: 'Invalid credentials. Admin access only.' });
});

// ── Users ─────────────────────────────────────────────────────────────────────
app.get('/api/users', (req, res) => {
  const db = readDb();
  const { role } = req.query;
  let users = db.users;
  if (role) users = users.filter((u) => u.role === role);
  res.json(users);
});

// ── Landlord Applications ─────────────────────────────────────────────────────
app.get('/api/landlord-applications', (req, res) => {
  const db = readDb();
  res.json(db.landlordApplications);
});

app.patch('/api/landlord-applications/:id', (req, res) => {
  const db = readDb();
  const idx = db.landlordApplications.findIndex((l) => l.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  const { status, notes } = req.body;
  db.landlordApplications[idx] = {
    ...db.landlordApplications[idx],
    status,
    notes: notes ?? db.landlordApplications[idx].notes,
  };

  // Mirror status to users list
  const userId = db.landlordApplications[idx].userId;
  const userIdx = db.users.findIndex((u) => u.id === userId);
  if (userIdx !== -1) db.users[userIdx].verificationStatus = status;

  writeDb(db);
  res.json(db.landlordApplications[idx]);
});

// ── Reports ───────────────────────────────────────────────────────────────────
app.get('/api/reports', (req, res) => {
  const db = readDb();
  res.json(db.reports);
});

app.patch('/api/reports/:id', (req, res) => {
  const db = readDb();
  const idx = db.reports.findIndex((r) => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.reports[idx] = { ...db.reports[idx], ...req.body };
  writeDb(db);
  res.json(db.reports[idx]);
});

// ── Welfare ───────────────────────────────────────────────────────────────────
app.get('/api/welfare', (req, res) => {
  const db = readDb();
  res.json(db.welfare);
});

app.patch('/api/welfare/:id', (req, res) => {
  const db = readDb();
  const idx = db.welfare.findIndex((w) => w.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.welfare[idx] = { ...db.welfare[idx], ...req.body };
  writeDb(db);
  res.json(db.welfare[idx]);
});

// ── Analytics ─────────────────────────────────────────────────────────────────
app.get('/api/analytics', (req, res) => {
  const db = readDb();
  const students = db.users.filter((u) => u.role === 'student').length;
  const landlords = db.users.filter((u) => u.role === 'landlord').length;
  const verified = db.users.filter((u) => u.role === 'landlord' && u.verificationStatus === 'verified').length;
  const pending = db.users.filter((u) => u.role === 'landlord' && u.verificationStatus === 'pending').length;
  const openReports = db.reports.filter((r) => r.status !== 'resolved').length;
  const openWelfare = db.welfare.filter((w) => w.status !== 'resolved').length;

  res.json({
    summary: { students, landlords, verified, pending, openReports, openWelfare },
    listingsByMonth: db.analytics.listingsByMonth,
    listingsByType: db.analytics.listingsByType,
    bookingsByMonth: db.analytics.bookingsByMonth,
  });
});

// ── Catch-all → SPA ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MUST Student Housing — Admin Console running at http://0.0.0.0:${PORT}`);
});
