const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/userController');

// Ruta para obtener un usuario por ID
router.get('/:id', getUserById);

module.exports = router;
