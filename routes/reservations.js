const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const private = require('../middlewares/private');
const authorizeRoles = require('../middlewares/roles');

// Route pour lire la réservation d'un utilisateur par son numéro de catway ou son nom
router.get('/catways/:number/reservations', private.checkJWT, service.getReservationByNumber);
router.get('/users/:name/reservations', private.checkJWT, service.getReservationByName);

// Routes en dessous réservées aux admin
router.use(authorizeRoles('admin'));

// Route pour lister toutes les réservations
router.get('/all', private.checkJWT, service.getAllReservations);

// Route pour créer, ajouter une réservation pour un utilisateur par son numéro de catway ou son nom
router.put('/catways/:number/reservations', private.checkJWT, service.createReservation);
router.put('/users/:name/reservations', private.checkJWT, service.createReservation);

// Route pour mettre à jour une réservation par le numéro de catway ou le nom de l'utilisateur
router.post('/catways/:number/reservations', private.checkJWT, service.updateReservation);
router.post('/users/:name/reservations', private.checkJWT, service.updateReservation);

// Route pour supprimer une réservation par le numéro de catway ou le nom de l'utilisateur
router.delete('/catways/:number/reservations', private.checkJWT, service.deleteReservation);
router.delete('/users/:name/reservations', private.checkJWT, service.deleteReservation);

module.exports = router;