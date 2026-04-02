/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *
 * /api/users/me:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**

/**
 * @swagger
 * /api/users/{email}:
 *   put:
 *     summary: Modifier un utilisateur (y compris le mot de passe)
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email de l'utilisateur à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "nouveau_capitaine"
 *               oldPassword:
 *                 type: string
 *                 description: Ancien mot de passe (obligatoire si password est fourni)
 *                 example: "ancienMotDePasse123"
 *               password:
 *                 type: string
 *                 description: Nouveau mot de passe (doit être accompagné de oldPassword)
 *                 example: "nouveauMotDePasse456"
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Données invalides ou ancien mot de passe manquant
 *       401:
 *         description: Ancien mot de passe incorrect
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /api/users/{email}:
 *   delete:
 *     summary: Supprimer un utilisateur par email
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: 'string', example: 'Utilisateur supprimé avec succès' }
 *       404:
 *         description: Utilisateur non trouvé
 *       401:
 *         description: Non autorisé
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// CRUD Utilisateurs
router.get('/', auth, userController.getAll);
router.get('/:email', auth, userController.getOne);
router.put('/:email', auth, userController.update);
router.delete('/:email', auth, userController.delete);

module.exports = router;