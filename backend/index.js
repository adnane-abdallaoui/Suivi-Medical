const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Ajout du middleware CORS

const app = express();
const port = 5000;

app.use(cors()); // Autoriser les requêtes CORS
app.use(express.json()); // Pour analyser les requêtes JSON

// Route pour la racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Express!');
});

// Route pour récupérer les utilisateurs
app.get('/api/users', (req, res) => {
  fs.readFile(path.join(__dirname, 'database.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(JSON.parse(data)); // Retourner les utilisateurs
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur Express à l'écoute sur http://localhost:${port}`);
});
