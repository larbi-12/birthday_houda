require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fichier visiteurs
const VISITS_FILE = './visitors.json';
if (!fs.existsSync(VISITS_FILE)) fs.writeFileSync(VISITS_FILE, '[]');

// Tracker IP
app.post('/track', (req, res) => {
  let ip = req.body.ip || req.headers['x-forwarded-for'] || req.ip;
  if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();

  const visit = { time: new Date().toISOString(), ip, userAgent: req.get('User-Agent') };
  let arr = [];
  try { arr = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8')); } catch(e) {}
  arr.push(visit);
  fs.writeFileSync(VISITS_FILE, JSON.stringify(arr, null, 2));

  res.json({ ok: true, ip });
});

// Routes HTML
const pages = ['index','navbar','birthday1','birthday2','gallery','wishes','welcome','3dGallery','typing','opinion'];
pages.forEach(page => {
  app.get(`/${page === 'index' ? '' : page}`, (req,res) => {
    res.sendFile(path.join(__dirname,'pages',`${page}.html`));
  });
});

// MongoDB + Entry schema
const EntrySchema = new mongoose.Schema({ text: String, date: { type: Date, default: Date.now } });
const Entry = mongoose.model('Entry', EntrySchema);

app.post('/save-text', async (req,res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') return res.status(400).json({ message: 'Le champ est vide ❌' });
  await Entry.create({ text });
  res.json({ message: '☺️ Merci pour votre message HOUDA !' });
});

// Connect MongoDB avant de start server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });