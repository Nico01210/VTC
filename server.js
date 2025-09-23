// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const FILE = path.join(__dirname, 'availability.json');

// Middleware
app.use(cors()); // Autoriser toutes les origines, tu peux restreindre si besoin
app.use(bodyParser.json());

// Charger les disponibilités depuis le fichier au démarrage
let availability = {};
if (fs.existsSync(FILE)) {
  try {
    const data = fs.readFileSync(FILE, 'utf8');
    availability = JSON.parse(data);
    console.log('Disponibilités chargées depuis le fichier.');
  } catch (err) {
    console.error('Erreur lecture fichier availability.json :', err);
  }
}

// Endpoint pour récupérer les disponibilités
app.get('/availability', (req, res) => {
  res.json(availability);
});

// Endpoint pour mettre à jour les disponibilités
app.post('/availability', (req, res) => {
  availability = req.body;
  try {
    fs.writeFileSync(FILE, JSON.stringify(availability, null, 2));
    res.json({ message: 'Disponibilités mises à jour !' });
  } catch (err) {
    console.error('Erreur écriture fichier availability.json :', err);
    res.status(500).json({ message: 'Erreur lors de la sauvegarde' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
