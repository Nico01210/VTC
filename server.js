const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const FILE = 'availability.json';

app.use(cors({
  origin: "*",  // tu peux mettre ton domaine Netlify à la place pour plus de sécurité
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(bodyParser.json());

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
