// ═══════════════════════════════════════════════════════════════
//  server.js — Manjunatha Water Proofing Backend
//  Stack: Express · better-sqlite3 · Nodemailer · CORS · dotenv
//
//  npm install express better-sqlite3 cors dotenv nodemailer helmet
//  node server.js
// ═══════════════════════════════════════════════════════════════

const express  = require('express');
const Database = require('better-sqlite3');
const cors     = require('cors');
const dotenv   = require('dotenv');
const nodemailer = require('nodemailer');
const helmet   = require('helmet');
const path     = require('path');
const fs       = require('fs');

dotenv.config();

const app = express();

// ─────────────────────────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────────────────────
// SQLITE SETUP
// ─────────────────────────────────────────────────────────────
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'mwp.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    service TEXT DEFAULT 'Other',
    location TEXT DEFAULT '',
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK(status IN ('new','read','replied','archived')),
    ip_address TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT DEFAULT '',
    service TEXT DEFAULT 'General Inspection',
    location TEXT DEFAULT '',
    date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    notes TEXT DEFAULT '',
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending','confirmed','completed','cancelled')),
    ip_address TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// Prepared statements
const insertContact = db.prepare(`
  INSERT INTO contacts (name, email, phone, service, location, message, ip_address)
  VALUES (@name, @email, @phone, @service, @location, @message, @ip_address)
`);

const insertAppointment = db.prepare(`
  INSERT INTO appointments (name, phone, email, service, location, date, time_slot, notes, ip_address)
  VALUES (@name, @phone, @email, @service, @location, @date, @time_slot, @notes, @ip_address)
`);

const getBookedSlots = db.prepare(`
  SELECT time_slot FROM appointments
  WHERE date = ? AND status != 'cancelled'
`);

// ─────────────────────────────────────────────────────────────
// EMAIL HELPER
// ─────────────────────────────────────────────────────────────
const sendContactEmail = async ({ name, email, phone, service, location, message }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER;

  // Admin notification
  await transporter.sendMail({
    from: `"MWP Website" <${process.env.SMTP_USER}>`,
    to: ownerEmail,
    subject: `📩 New Enquiry from ${name}`,
    html: `
      <h2 style="color:#1a3a6e">New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
        <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:10px;border:1px solid #ddd">${name}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:10px;border:1px solid #ddd">${phone || 'N/A'}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:10px;border:1px solid #ddd">${email || 'N/A'}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold">Service</td><td style="padding:10px;border:1px solid #ddd">${service || 'Other'}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold">Location</td><td style="padding:10px;border:1px solid #ddd">${location || 'N/A'}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:10px;border:1px solid #ddd">${message}</td></tr>
      </table>
    `,
  });

  // Auto-reply to customer (only if they gave an email)
  if (email) {
    await transporter.sendMail({
      from: `"Manjunatha Water Proofing" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `✅ We received your enquiry — Manjunatha Water Proofing`,
      html: `
        <div style="font-family:sans-serif;max-width:560px">
          <h2 style="color:#1a3a6e">Hi ${name},</h2>
          <p>Thank you for contacting Manjunatha Water Proofing! We've received your enquiry and will get back to you within <strong>24 hours</strong>.</p>
          <p>If it's urgent, call us directly: <strong>9900497309</strong></p>
          <p>Best regards,<br/><strong>Manjunatha Water Proofing Team</strong></p>
        </div>
      `,
    });
  }
};

// ─────────────────────────────────────────────────────────────
// ROUTES — Contact
// ─────────────────────────────────────────────────────────────
app.post('/api/contact', (req, res) => {
  try {
    const { name, phone, email, service, location, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name and message are required.',
      });
    }

    const result = insertContact.run({
      name:       name.trim(),
      email:      (email || '').trim(),
      phone:      (phone || '').trim(),
      service:    (service || 'Other').trim(),
      location:   (location || '').trim(),
      message:    message.trim(),
      ip_address: req.ip || req.headers['x-forwarded-for'] || '',
    });

    // Send emails (non-blocking)
    sendContactEmail({ name, email, phone, service, location, message }).catch((err) => {
      console.warn('⚠️  Email sending failed (non-critical):', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted! We will contact you soon.',
      data: { id: result.lastInsertRowid },
    });
  } catch (err) {
    console.error('Contact submit error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// ─────────────────────────────────────────────────────────────
// ROUTES — Appointments
// ─────────────────────────────────────────────────────────────
const ALL_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM',
];

app.get('/api/appointments/slots', (req, res) => {
  try {
    const { date } = req.query;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ success: false, message: 'Please provide date in YYYY-MM-DD format.' });
    }

    const booked = getBookedSlots.all(date).map(r => r.time_slot);
    const available = ALL_SLOTS.filter(s => !booked.includes(s));

    return res.json({ success: true, date, available, booked });
  } catch (err) {
    console.error('Slots fetch error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.post('/api/appointments/book', (req, res) => {
  try {
    const { name, phone, email, service, location, date, time_slot, notes } = req.body;

    if (!name || !phone || !date || !time_slot) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, date, and time slot are required.',
      });
    }

    // Check if slot is already booked
    const booked = getBookedSlots.all(date).map(r => r.time_slot);
    if (booked.includes(time_slot)) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked. Please choose a different time.',
      });
    }

    const result = insertAppointment.run({
      name:       name.trim(),
      phone:      phone.trim(),
      email:      (email || '').trim(),
      service:    (service || 'General Inspection').trim(),
      location:   (location || '').trim(),
      date,
      time_slot,
      notes:      (notes || '').trim(),
      ip_address: req.ip || req.headers['x-forwarded-for'] || '',
    });

    return res.status(201).json({
      success: true,
      message: `Inspection booked for ${date} at ${time_slot}. We will call you to confirm.`,
      data: { id: result.lastInsertRowid, date, time_slot },
    });
  } catch (err) {
    console.error('Appointment booking error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─────────────────────────────────────────────────────────────
// UTILITY ROUTES
// ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Manjunatha WP Server is running', timestamp: new Date() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─────────────────────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 MWP Server running on http://localhost:${PORT}`);
  console.log(`   POST /api/contact            — Submit enquiry`);
  console.log(`   GET  /api/appointments/slots  — Get available slots`);
  console.log(`   POST /api/appointments/book   — Book inspection`);
  console.log(`   GET  /api/health              — Health check`);
});