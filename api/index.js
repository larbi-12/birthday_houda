require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Fichier visiteurs
const VISITS_FILE = '/tmp/visitors.json'; // Use /tmp for serverless

// Tracker IP
app.post('/track', (req, res) => {
  let ip = req.body.ip || req.headers['x-forwarded-for'] || req.ip;
  if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();

  const visit = { 
    time: new Date().toISOString(), 
    ip, 
    userAgent: req.get('User-Agent') 
  };
  
  let arr = [];
  try { 
    if (fs.existsSync(VISITS_FILE)) {
      arr = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8')); 
    }
  } catch(e) {
    console.error('Error reading visits file:', e);
  }
  
  arr.push(visit);
  fs.writeFileSync(VISITS_FILE, JSON.stringify(arr, null, 2));

  res.json({ ok: true, ip });
});

// Routes HTML
const pages = ['index','navbar','birthday1','birthday2','gallery','wishes','welcome','3dGallery','typing','opinion'];

pages.forEach(page => {
  const route = page === 'index' ? '/' : `/${page}`;
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, '../pages', `${page}.html`));
  });
});

// MongoDB + Entry schema
const EntrySchema = new mongoose.Schema({ 
  text: String, 
  date: { type: Date, default: Date.now } 
});
const Entry = mongoose.model('Entry', EntrySchema);

app.post('/save-text', async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Le champ est vide ❌' });
  }
  
  try {
    await Entry.create({ text });
    res.json({ message: '☺️ Merci pour votre message HOUDA !' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

connectDB();

module.exports = app;