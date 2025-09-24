// backend-auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware pour parser JSON
app.use(express.json());

// Variables d'environnement
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt-super-securise';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const STEPH_PASSWORD_HASH = process.env.STEPH_PASSWORD_HASH;

// Base de données des utilisateurs (mots de passe hashés en variables d’env)
const users = {
  admin: {
    passwordHash: ADMIN_PASSWORD_HASH,
    role: 'admin'
  },
  steph: {
    passwordHash: STEPH_PASSWORD_HASH,
    role: 'admin'
  }
};

// Route de connexion
app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérif user existe
    const user = users[username];
    if (!user) {
      return res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }

    // Vérif mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ success: true, token, message: 'Connexion réussie' });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Middleware de vérif token
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalide' });
  }
}

// Exemple de routes protégées
app.get('/availability', verifyToken, (req, res) => {
  res.json({ message: 'Données de disponibilité (protégées)' });
});

app.post('/availability', verifyToken, (req, res) => {
  res.json({ message: 'Mise à jour des disponibilités réussie' });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
