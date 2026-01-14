const express = require('express');
const router = express.Router();

const fichier = require('../fichiers/users');

// Route pour lire les infos d'un utilisateur
router.get('/:id', fichier.getById);

// Route pour ajouter un nouvel utilisateur
router.put('/add', fichier.add);

// Route pour mettre à jour,modifier un utilisateur existant
router.patch('/:id', fichier.update);

// Route pour supprimer un utilisateur
router.delete('/:id', fichier.delete);

module.exports = router;