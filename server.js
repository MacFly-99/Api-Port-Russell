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

// Connexion MongoDB avec nom de base explicite
mongoose.connect(process.env.MONGO_URL, {
  dbName: 'Port-Russell'   // ← Force l'utilisation de la bonne base
})
.then(() => {
  console.log('✅ MongoDB connecté avec succès');
  console.log('📍 Base de données utilisée :', mongoose.connection.db.databaseName);
})
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

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Documentation Swagger (accessible par tout le monde)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log('📄 Documentation Swagger disponible sur → http://localhost:3000/api-docs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`🌐 Accède à l'interface ici → http://localhost:${PORT}/login.html`);
});