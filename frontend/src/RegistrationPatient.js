import React, { useState } from "react";
import "./App.css";
import Swal from "sweetalert2";

function RegistrationPatient() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification que tous les champs sont remplis
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.gender
    ) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez remplir tous les champs obligatoires.",
      });
      return;
    }

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
          Swal.fire({
            icon: "success",
            title: "Succès",
            text: "Inscription réussie !",
          });
          setFormData({
            nom: "",
            prenom: "",
            email: "",
            password: "",
            phone: "",
            gender: "",
          });
        } else if (data.message === "Cet email est déjà enregistré.") {
          Swal.fire({
            icon: "warning",
            title: "Attention",
            text: "Cet email est déjà utilisé. Essayez un autre.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Une erreur est survenue. Essayez encore.",
        });
        console.error("Erreur:", error);
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
              <label>Gender</label>
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
        <img src="/images/patient.jpg" alt="Medical illustration" />
      </div>
    </div>
  );
}

export default RegistrationPatient;
