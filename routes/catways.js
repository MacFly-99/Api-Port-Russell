/**
 * @swagger
 * /api/catways:
 *   get:
 *     summary: Récupérer tous les catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catway'
 *       401:
 *         description: Non autorisé
 *
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
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       201:
 *         description: Catway créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /api/catways/{catwayNumber}:
 *   get:
 *     summary: Récupérer un catway par son numéro
 *     tags: [Catways]
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
 *         description: Catway trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       404:
 *         description: Catway non trouvé
/**
 * @swagger
 * /api/catways/{catwayNumber}:
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numéro du catway à supprimer
 *     responses:
 *       200:
 *         description: Catway supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: 'string', example: 'Catway supprimé avec succès' }
 *       404:
 *         description: Catway non trouvé
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/catways/{catwayNumber}:
 *   put:
 *     summary: Modifier l'état d'un catway
 *     tags: [Catways]
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
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: 'string'
 *                 example: 'bon état'
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       404:
 *         description: Catway non trouvé
 */

const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const auth = require('../middleware/auth');

router.get('/', auth, catwayController.getAll);
router.get('/:id', auth, catwayController.getOne);
router.post('/', auth, catwayController.create);
router.put('/:id', auth, catwayController.updateState);
router.delete('/:id', auth, catwayController.delete);

module.exports = router;