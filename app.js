const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/authentication');
const indexRouter = require('./routes/index');

const mongodb = require('./db/mongo');

mongodb.initClientDbConnection();

const path = require('path');

const app = express();

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/authentication', authRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,      // garde le token quand on recharge
  },
}));

// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur :', err);

  // Si les headers sont déjà envoyés, on passe à la suivante
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  let message = err.message || 'Erreur interne du serveur';

  // Messages personnalisés
  if (status === 400) message = 'Requête invalide';
  if (status === 401) message = 'Non authentifié – veuillez vous connecter';
  if (status === 403) message = 'Accès refusé – droits insuffisants';
  if (status === 404) message = 'Ressource non trouvée';
  if (status === 409) message = 'Conflit – ressource déjà existante';
  if (status === 500) message = 'Une erreur est survenue, veuillez réessayer plus tard';

  res.status(status).json({
    error: true,
    status,
    message
  });
});

// 404 pour les routes non trouvées (catch-all)
app.use(function(req, res, next) {
  res.status(404).json({
    name: 'API-Port-Russell',
    version: '1.0',
    status: 404,
    message: 'Not Found'
  });
});

module.exports = app;