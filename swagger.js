const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Port de Russell API',
      version: '1.0.0',
      description: 'API complète de gestion du port de plaisance de Russell : Catways, Réservations et Utilisateurs avec authentification JWT.',
      contact: {
        name: 'Capitainerie Port Russell',
        email: 'contact@port-russell.fr',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtenu après login (Bearer <token>)',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: { type: 'string', example: 'capitaine' },
            email: { type: 'string', format: 'email', example: 'capitaine@port-russell.fr' },
            password: { type: 'string', example: 'motdepasse123' },
            role: { type: 'string', enum: ['admin', 'user'], default: 'user' },
          },
        },
        Catway: {
          type: 'object',
          required: ['catwayNumber', 'catwayType'],
          properties: {
            catwayNumber: { type: 'integer', example: 26 },
            catwayType: { type: 'string', enum: ['long', 'short'], example: 'long' },
            catwayState: { type: 'string', example: 'bon état' },
          },
        },
        Reservation: {
          type: 'object',
          required: ['clientName', 'boatName', 'startDate', 'endDate'],
          properties: {
            clientName: { type: 'string', example: 'Jean Dupont' },
            boatName: { type: 'string', example: 'Le Vagabond' },
            startDate: { type: 'string', format: 'date-time', example: '2026-04-15T10:00:00Z' },
            endDate: { type: 'string', format: 'date-time', example: '2026-04-20T18:00:00Z' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            error: { type: 'string' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }], // Auth par défaut sur toutes les routes protégées
  },
  apis: [
    './routes/*.js',
    './controllers/*.js',
    './server.js',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;