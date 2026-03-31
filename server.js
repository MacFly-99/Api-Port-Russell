require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté avec succès'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/catways', require('./routes/catways'));
app.use('/api/users', require('./routes/users'));

// Page d'accueil par défaut
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Routes pour les réservations (sous-ressource)
const reservationRoutes = require('./routes/reservations');
app.use('/api/catways/:id/reservations', reservationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`🌐 Accède à l'interface ici → http://localhost:${PORT}/login.html`);
});