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