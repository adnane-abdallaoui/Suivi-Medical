const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Permet de gérer les requêtes provenant du frontend
app.use(express.json()); // Parse les requêtes JSON

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
