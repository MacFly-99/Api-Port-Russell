const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

// Route pour lire le nom d'un utilisateur
router.get('users/:name', private.checkJWT, service.getByName);

// Route pour lire l'email d'un utilisateur
router.get('users/:email', private.checkJWT, service.getByEmail);

// Route pour créer, ajouter un nouvel utilisateur avec son nom
router.put('/create/:name', service.createUser);

// Route pour créer, ajouter un nouvel utilisateur avec son email
router.put('/create/:email', service.createUser);

// Route pour mettre à jour, modifier un utilisateur existant
router.patch('/users/:name', private.checkJWT, service.updateUser);

// Route pour supprimer un utilisateur
router.delete('/users/:name', private.checkJWT, service.deleteUser);

// Route pour lister tous les utilisateurs
router.get('/all', private.checkJWT, service.getAllUsers);

// Route pour authentifier un utilisateur
router.post('/authenticate', service.authenticate);

// Route pour la connexion d'un utilisateur
router.post('/login', service.login);

// Route pour la déconnexion d'un utilisateur
router.get('/logout', service.logout);

module.exports = router;