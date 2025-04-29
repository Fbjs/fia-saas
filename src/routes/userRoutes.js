const express = require('express');
const router = express.Router();
const { getUserById, updateUser } = require('../controllers/userController');

// Ruta para obtener un usuario por ID
router.get('/:id', getUserById);

// Ruta para actualizar datos de un usuario
router.patch('/:id', updateUser);

module.exports = router;
