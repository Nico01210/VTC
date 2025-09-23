const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const FILE = 'availability.json';

app.use(cors());
app.use(bodyParser.json());

// Récupérer les disponibilités
app.get('/availability', (req, res) => {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, JSON.stringify({}));
    }
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

// Mettre à jour les disponibilités
app.post('/availability', (req, res) => {
    const newAvailability = req.body;
    fs.writeFileSync(FILE, JSON.stringify(newAvailability, null, 2));
    res.json({ message: 'Disponibilités mises à jour' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
