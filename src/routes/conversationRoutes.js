const express = require('express');
const router = express.Router();
const { getAllConversations } = require('../controllers/conversationController');

// Ruta para listar conversaciones
router.get('/', getAllConversations);

module.exports = router;
