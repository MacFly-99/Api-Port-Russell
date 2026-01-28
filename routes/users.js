/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs (réservée aux administrateurs)
 */

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Lister tous les utilisateurs
 *     tags: [Users]
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
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé aux administrateurs
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /users/{name}:
 *   get:
 *     summary: Récupérer un utilisateur par son nom
 *     tags: [Users]
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
 *         description: Détails de l'utilisateur
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 default: user
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Champs manquants
 *       409:
 *         description: Email déjà utilisé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /users/{name}:
 *   patch:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /users/{name}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
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
 *         description: Utilisateur supprimé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès réservé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */


const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');
const authorizeRoles = require('../middlewares/roles');

// Toutes les routes pour admin uniquement
router.use(authorizeRoles('admin'));

// Route pour lire le nom d'un utilisateur
router.get('/users/:name', private.checkJWT, service.getByName);

// Route pour lire l'email d'un utilisateur
router.get('/users/:email', private.checkJWT, service.getByEmail);

// Route pour créer, ajouter un nouvel utilisateur
router.post('/create', private.checkJWT, service.createUser);

// Route pour mettre à jour, modifier un utilisateur existant
router.patch('/users/:name', private.checkJWT, service.updateUser);

// Route pour supprimer un utilisateur
router.delete('/users/:name', private.checkJWT, service.deleteUser);

// Route pour lister tous les utilisateurs
router.get('/all', private.checkJWT, service.getAllUsers);

module.exports = router;