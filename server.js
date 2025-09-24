const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const FILE = 'availability.json';

// Configuration CORS
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'https://vtcpremium.netlify.app'],
  credentials: true
}));

// Body parser pour JSON
app.use(express.json());
app.use(bodyParser.json());

// Endpoint GET
app.get('/availability', (req, res) => {
  try {
    if (!fs.existsSync(FILE)) {
      fs.writeFileSync(FILE, JSON.stringify({}));
    }
    const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lecture fichier', details: err.message });
  }
});

// Endpoint POST
app.post('/availability', (req, res) => {
  try {
    fs.writeFileSync(FILE, JSON.stringify(req.body, null, 2));
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur écriture fichier', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});