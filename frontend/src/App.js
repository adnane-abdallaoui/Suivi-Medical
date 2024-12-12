import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]); // État pour stocker les utilisateurs
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  useEffect(() => {
    // Appel à l'API pour récupérer les utilisateurs
    fetch('http://localhost:5000/api/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur de chargement des utilisateurs');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data); // Stocke les utilisateurs dans l'état
        setLoading(false); // Fin du chargement
      })
      .catch((err) => {
        setError(err.message); // Gère l'erreur
        setLoading(false); // Fin du chargement
      });
  }, []); // Effet secondaire qui se lance une seule fois au chargement du composant

  // Affichage conditionnel selon le chargement et les erreurs
  if (loading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))
        ) : (
          <li>Aucun utilisateur trouvé.</li>
        )}
      </ul>
    </div>
  );
}

export default App;

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "patient", // Par défaut "patient", peut être changé en "doctor"
//   });
//   const [users, setUsers] = useState([]);

//   
  // Charger les utilisateurs
  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erreur lors du chargement :", error));
  }, []);
//   // Gérer la soumission du formulaire
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post("http://localhost:5000/users", formData)
//       .then((response) => {
//         alert("Inscription réussie !");
//         setUsers([...users, response.data]); // Ajouter l'utilisateur à la liste
//         setFormData({ name: "", email: "", password: "", role: "patient" });
//       })
//       .catch((error) => {
//         if (error.response && error.response.data.error) {
//           alert(error.response.data.error);
//         } else {
//           console.error("Erreur lors de l'inscription :", error);
//         }
//       });
//   };
   // <div className="App">
    //   <h1>Inscription</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="Nom"
    //       value={formData.name}
    //       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    //       required
    //     />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={formData.email}
    //       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Mot de passe"
    //       value={formData.password}
    //       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    //       required
    //     />
    //     <select
    //       value={formData.role}
    //       onChange={(e) => setFormData({ ...formData, role: e.target.value })}
    //     >
    //       <option value="patient">Patient</option>
    //       <option value="doctor">Médecin</option>
    //     </select>
    //     <button type="submit">S'inscrire</button>
    //   </form>
    //   <h2>Liste des utilisateurs :</h2>
    //   <ul>
    //     {users.map((user, index) => (
    //       <li key={index}>{user.name} - {user.email} ({user.role})</li>
    //     ))}
    //   </ul>
    // </div>