require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('.'));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const VISITS_FILE = './visitors.json';

// Initialize visitors file if it doesn't exist
if (!fs.existsSync(VISITS_FILE)) {
  fs.writeFileSync(VISITS_FILE, '[]');
  console.log('✅ Created visitors.json');
}

// MongoDB connection (only if MONGO_URI is provided)
if (MONGO_URI) {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

  const EntrySchema = new mongoose.Schema({
    text: String,
    date: { type: Date, default: Date.now }
  });
  const Entry = mongoose.model('Entry', EntrySchema);

  // Save text endpoint
  app.post('/save-text', async (req, res) => {
    try {
      const { text } = req.body;

      if (!text || text.trim() === '') {
        return res.status(400).json({ message: 'Le champ est vide ❌' });
      }

      await Entry.create({ text });
      res.json({ message: '☺️ Merci pour votre message HOUDA !' });
    } catch (error) {
      console.error('Error saving text:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
} else {
  console.log('⚠️ MONGO_URI not provided, MongoDB features disabled');
}

// Tracking endpoint
app.post('/track', (req, res) => {
  console.log('📩 Received tracking request');

  let ip;
  if (req.body && req.body.ip) {
    ip = req.body.ip;
  } else if (req.body && req.body.useServerIp) {
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();
  } else {
    ip = req.ip;
  }

  console.log('Tracking IP:', ip);

  const visit = {
    time: new Date().toISOString(),
    ip,
    geo: {},
    userAgent: req.get('User-Agent')
  };

  let arr = [];
  try {
    arr = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8'));
  } catch(e) { 
    arr = []; 
  }

  arr.push(visit);
  fs.writeFileSync(VISITS_FILE, JSON.stringify(arr, null, 2));
  console.log('✅ New visitor saved:', ip);

  res.json({ ok: true, ip });
});

// Route handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/index.html'));
});

app.get('/navbar', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/navbar.html'));
});

app.get('/birthday1', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/birthday1.html'));
});

app.get('/birthday2', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/birthday2.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/gallery.html'));
});

app.get('/wishes', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/wishes.html'));
});

app.get('/welcome', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/welcome.html'));
});

app.get('/3dGallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/3dGallery.html'));
});

app.get('/typing', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/typing.html'));
});

app.get('/opinion', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/opinion.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server only once
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Export for Vercel serverless functions
module.exports = app;