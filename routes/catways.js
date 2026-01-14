const express = require('express');
const router = express.Router();

const service = require('../services/catways');

// Route pour lire le numéro d'un catway ou son état
router.get('/catways/:number', service.getCatwayByNumber);
router.get('/catways/:state', service.getCatwayByState);

// Route pour créer, ajouter un nouveau catway avec son numéro ou son état
router.put('/create/:number', service.createCatway);
router.put('/create/:state', service.createCatway);

// Route pour supprimer un catway par son numéro
router.delete('/catways/:number', service.deleteCatway);

// Route pour lister tous les catways
router.get('/all', service.getAllCatways);

module.exports = router;