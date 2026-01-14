const express = require('express');
const router = express.Router();

const service = require('../services/users');

// Route pour lire le nom d'un utilisateur
router.get('users/:name', service.getByName);

// Route pour lire l'email d'un utilisateur
router.get('users/:email', service.getByEmail);

// Route pour créer, ajouter un nouvel utilisateur avec son nom
router.put('/create/:name', service.createUser);

// Route pour créer, ajouter un nouvel utilisateur avec son email
router.put('/create/:email', service.createUser);

// Route pour mettre à jour, modifier un utilisateur existant
router.patch('/users/:name', service.updateUser);

// Route pour supprimer un utilisateur
router.delete('/users/:name', service.deleteUser);

// Route pour lister tous les utilisateurs
router.get('/all', service.getAllUsers);

module.exports = router;