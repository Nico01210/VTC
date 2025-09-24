const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const FILE = 'availability.json';

// Configuration CORS
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'https://vtcpremium.netlify.app', 'https://vtc-l3c5.onrender.com'],
  credentials: true
}));

// Body parser pour JSON
app.use(express.json());
// Endpoint d'authentification
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ADMIN_HASH = process.env.ADMIN_HASH || '$2b$10$exampleHash'; // Remplace par ton vrai hash bcrypt
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  // Vérifie l'utilisateur (ici, username fixe 'admin')
  if (username !== 'admin') {
    return res.status(401).json({ error: 'Utilisateur invalide' });
  }
  // Vérifie le mot de passe
  const valid = await bcrypt.compare(password, ADMIN_HASH);
  if (!valid) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }
  // Génère le token JWT
  const token = jwt.sign({ username: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// Endpoint GET
app.get('/availability', (req, res) => {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify({}));
  }
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

// Endpoint POST
app.post('/availability', (req, res) => {
  fs.writeFileSync(FILE, JSON.stringify(req.body, null, 2));
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// ...existing code...