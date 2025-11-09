require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // fichiers CSS/JS/images
app.use(express.static(path.join(__dirname, 'pages')));  // pages HTML

// Visitors JSON
const VISITS_FILE = './visitors.json';
if (!fs.existsSync(VISITS_FILE)) fs.writeFileSync(VISITS_FILE, '[]');

// Tracking route
app.post('/track', (req, res) => {
  let ip = req.body.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
  if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();

  const visit = { time: new Date().toISOString(), ip, userAgent: req.get('User-Agent') };
  const arr = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8'));
  arr.push(visit);
  fs.writeFileSync(VISITS_FILE, JSON.stringify(arr, null, 2));
  res.json({ ok: true, ip });
});

// MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.log('❌ Connection error:', err));

// Save text route
const EntrySchema = new mongoose.Schema({ text: String, date: { type: Date, default: Date.now } });
const Entry = mongoose.model('Entry', EntrySchema);

app.post('/save-text', async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') return res.status(400).json({ message: 'Le champ est vide ❌' });
  await Entry.create({ text });
  res.json({ message: '☺️ Merci pour votre message !' });
});

// Fallback for HTML pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/index.html'));
});

app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));
