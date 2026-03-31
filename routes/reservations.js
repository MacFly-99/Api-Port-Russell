const express = require('express');
const router = express.Router({ mergeParams: true });
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');

// CRUD Réservations (sous-ressource de catway)
router.post('/', auth, reservationController.create);
router.get('/', auth, reservationController.getAllByCatway);
router.get('/:idReservation', auth, reservationController.getOne);
router.put('/:idReservation', auth, reservationController.update);
router.delete('/:idReservation', auth, reservationController.delete);

module.exports = router;