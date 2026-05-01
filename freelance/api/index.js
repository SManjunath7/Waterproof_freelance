const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');

// Note: better-sqlite3 is not recommended for Vercel Serverless.
// We are keeping it for local compatibility, but for Vercel, 
// you should switch to Turso or Supabase.
let Database;
try {
  Database = require('better-sqlite3');
} catch (e) {
  console.warn('better-sqlite3 not found, using mock database');
}

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// SQLITE SETUP (Local only)
let db;
if (Database) {
  try {
    const dataDir = '/tmp'; // Vercel allows writing to /tmp, but it's ephemeral
    const dbPath = path.join(dataDir, 'mwp.db');
    db = new Database(dbPath);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT DEFAULT '',
        phone TEXT DEFAULT '',
        service TEXT DEFAULT 'Other',
        location TEXT DEFAULT '',
        message TEXT NOT NULL,
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
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT (datetime('now'))
      );
    `);
  } catch (err) {
    console.error('DB Initialization failed:', err);
  }
}

// EMAIL HELPER
const sendContactEmail = async ({ name, email, phone, service, location, message }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP credentials missing');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"MWP Website" <${process.env.SMTP_USER}>`,
    to: ownerEmail,
    subject: `📩 New Enquiry from ${name}`,
    html: `<h2>New Enquiry</h2><p>Name: ${name}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`,
  });
};

// ROUTES
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, service, location, message } = req.body;

    if (db) {
      const stmt = db.prepare('INSERT INTO contacts (name, email, phone, service, location, message) VALUES (?, ?, ?, ?, ?, ?)');
      stmt.run(name, email, phone, service, location, message);
    }

    await sendContactEmail({ name, email, phone, service, location, message }).catch(console.error);

    res.status(201).json({ success: true, message: 'Enquiry submitted!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/appointments/slots', (req, res) => {
  const { date } = req.query;
  const ALL_SLOTS = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
  
  if (db && date) {
    const booked = db.prepare('SELECT time_slot FROM appointments WHERE date = ?').all(date).map(r => r.time_slot);
    const available = ALL_SLOTS.filter(s => !booked.includes(s));
    return res.json({ success: true, available });
  }
  
  res.json({ success: true, available: ALL_SLOTS });
});

app.post('/api/appointments/book', (req, res) => {
  try {
    const { name, phone, email, service, location, date, time_slot } = req.body;
    if (db) {
      const stmt = db.prepare('INSERT INTO appointments (name, phone, email, service, location, date, time_slot) VALUES (?, ?, ?, ?, ?, ?, ?)');
      stmt.run(name, phone, email, service, location, date, time_slot);
    }
    res.status(201).json({ success: true, message: 'Booked!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

module.exports = app;
