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