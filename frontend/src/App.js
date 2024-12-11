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

