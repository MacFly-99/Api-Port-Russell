const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Port-Russell',
      version: '1.0.0',
      description: 'API de gestion du port de plaisance : authentification, utilisateurs, catways, réservations',
      contact: {
        name: 'Vasilys',
        email: 'vasilys@port-russell.fr',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Serveur de développement',
      },
      // URL de prod plus tard si besoin
      // { url: 'https://api-port-russell.onrender.com', description: 'Production' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Entrez votre token JWT (Bearer <token>)',
        },
      },
    },
  },
  apis: [
    './routes/*.js',
    './services/*.js',
    './middlewares/*.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;