const express = require('express');
const router = express.Router();

const service = require('../services/reservations');

// Route pour lire la réservation d'un utilisateur par son numéro de catway ou son nom
router.get('/catways/:number/reservations', service.getReservationByNumber);
router.get('/users/:name/reservations', service.getReservationByName);

// Route pour créer, ajouter une réservation pour un utilisateur par son numéro de catway ou son nom
router.put('/catways/:number/reservations', service.createReservation);
router.put('/users/:name/reservations', service.createReservation);

// Route pour mettre à jour une réservation par le numéro de catway ou le nom de l'utilisateur
router.post('/catways/:number/reservations', service.updateReservation);
router.post('/users/:name/reservations', service.updateReservation);

// Route pour supprimer une réservation par le numéro de catway ou le nom de l'utilisateur
router.delete('/catways/:number/reservations', service.deleteReservation);
router.delete('/users/:name/reservations', service.deleteReservation);

// Route pour lister toutes les réservations
router.get('/all', service.getAllReservations);

module.exports = router;