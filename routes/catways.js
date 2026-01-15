const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');

// Route pour lire le numéro d'un catway ou son état
router.get('/catways/:number', private.checkJWT, service.getCatwayByNumber);
router.get('/catways/:state', private.checkJWT, service.getCatwayByState);

// Route pour créer, ajouter un nouveau catway avec son numéro ou son état
router.put('/create/:number', private.checkJWT, service.createCatway);
router.put('/create/:state', private.checkJWT, service.createCatway);

// Route pour supprimer un catway par son numéro
router.delete('/catways/:number', private.checkJWT, service.deleteCatway);

// Route pour lister tous les catways
router.get('/all', private.checkJWT, service.getAllCatways);

module.exports = router;