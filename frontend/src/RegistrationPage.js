import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    specialite: "",
    phone: "",
    gender: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérification des données
    if (!formData.nom || !formData.prenom || !formData.email || !formData.password || !formData.specialite || !formData.phone || !formData.gender) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
  
    console.log(formData); // Debugging: Affiche les données envoyées
  
    // Envoi des données au backend
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Utilisateur enregistré avec succès") {
          alert("Inscription réussie !");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        alert("Une erreur est survenue. Essayez encore.");
      });
  };
  

  return (
    <div className="registration-container">
      <div className="form-content">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Nom"
              name="nom"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              placeholder="Adresse Email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="form-row">
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Spécialité"
              name="specialite"
              value={formData.specialite}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Téléphone"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <div className="form-label">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Homme"
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                  required
                />{" "}
                Homme
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Femme"
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                  required
                />{" "}
                Femme
              </label>
            </div>
          </div>
          <button type="submit" className="submit-button">
            S'inscrire
          </button>
        </form>
        <p>
          Vous avez déjà un compte ? <a href="/login">Se connecter</a>
        </p>
      </div>
      <div className="form-image">
        <img src="/images/doct.jpg" alt="Medical illustration" />
      </div>
    </div>
  );
}

export default App;
