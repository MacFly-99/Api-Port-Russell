/**
 * @swagger
 * /api/catways/{catwayNumber}/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations d'un catway
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des réservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *
 *   post:
 *     summary: Créer une nouvelle réservation pour un catway
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Réservation créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 */

/**
 * @swagger
 * /api/catways/{catwayNumber}/reservations/{reservationId}:
 *   put:
 *     summary: Modifier une réservation existante
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: "Jean Martin"
 *               boatName:
 *                 type: string
 *                 example: "Le Phoenix"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Réservation non trouvée
 */

/**
 * @swagger
 * /api/catways/{catwayNumber}/reservations/{reservationId}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Réservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: 'string', example: 'Réservation supprimée avec succès' }
 *       404:
 *         description: Réservation non trouvée
 *       401:
 *         description: Non autorisé
 */

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