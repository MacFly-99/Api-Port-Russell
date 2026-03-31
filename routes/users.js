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