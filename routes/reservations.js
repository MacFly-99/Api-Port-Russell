/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /reservations/all:
 *   get:
 *     summary: Lister toutes les réservations (admin only)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des réservations
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /reservations/users/{name}/reservations:
 *   get:
 *     summary: Lister les réservations d'un utilisateur
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des réservations de l'utilisateur
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /reservations/catways/{number}/reservations:
 *   get:
 *     summary: Lister les réservations d'un catway
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des réservations du catway
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /reservations/catways/{number}/reservations:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Réservation créée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /reservations/catways/{number}/reservations:
 *   patch:
 *     summary: Modifier une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Réservation modifiée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /reservations/catways/{number}/reservations:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur
 */


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