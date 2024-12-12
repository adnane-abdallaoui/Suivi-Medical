const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importation de CORS

const app = express();
const port = 5000;

// Activer CORS
app.use(cors()); // Permet les requêtes depuis le frontend React

// Middleware pour parser les données JSON
app.use(bodyParser.json());

// Chemin vers le fichier database.json
const databasePath = path.join(__dirname, "database.json");

// Route POST pour gérer l'inscription
app.post("/register", (req, res) => {
  const { nom, prenom, email, password, specialite, phone, gender } = req.body;

  // Vérifier que toutes les informations sont présentes
  if (!nom || !prenom || !email || !password || !specialite || !phone || !gender) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }

  // Créer un objet utilisateur
  const newUser = {
    nom,
    prenom,
    email,
    password,
    specialite,
    phone,
    gender,
  };

  // Lire le fichier database.json pour obtenir les utilisateurs existants
  fs.readFile(databasePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Erreur de lecture du fichier" });
    }

    let users = [];
    if (data) {
      // Si le fichier n'est pas vide, le parser en JSON
      users = JSON.parse(data);
    }

    // Ajouter le nouvel utilisateur
    users.push(newUser);

    // Sauvegarder les utilisateurs dans database.json
    fs.writeFile(databasePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Erreur d'écriture dans le fichier" });
      }
      res.status(201).json({ message: "Utilisateur enregistré avec succès" });
    });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
