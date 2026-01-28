/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des emplacements catways
 */

/**
 * @swagger
 * /catways/all:
 *   get:
 *     summary: Lister tous les catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catways
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /catways/{number}:
 *   get:
 *     summary: Récupérer un catway par son numéro
 *     tags: [Catways]
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
 *         description: Détails du catway
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /catways/create:
 *   post:
 *     summary: Créer un nouveau catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *             properties:
 *               number:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catway créé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /catways/{number}:
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
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
 *         description: Catway supprimé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */


const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');
const authorizeRoles = require('../middlewares/roles');

// Route pour lire le numéro d'un catway ou son état
router.get('/catways/:number', private.checkJWT, service.getCatwayByNumber);
router.get('/catways/:state', private.checkJWT, service.getCatwayByState);

// Route pour lister tous les catways
router.get('/all', private.checkJWT, service.getAllCatways);

// Routes en dessous réservées aux admin
router.use(authorizeRoles('admin'));

// Route pour créer, ajouter un nouveau catway avec son numéro ou son état
router.put('/create/:number', private.checkJWT, service.createCatway);
router.put('/create/:state', private.checkJWT, service.createCatway);

// Route pour supprimer un catway par son numéro
router.delete('/catways/:number', private.checkJWT, service.deleteCatway);

module.exports = router;