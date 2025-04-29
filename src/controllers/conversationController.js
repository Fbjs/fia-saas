const Conversation = require('../models/conversationModel');

/**
 * Listar todas las conversaciones.
 */
async function getAllConversations(req, res) {
    try {
        const conversations = await Conversation.find()
            .populate('user', 'whatsapp plan') // Trae también información básica del usuario
            .sort({ createdAt: -1 }); // Ordenar por fecha descendente (últimas primero)

        res.status(200).json(conversations);
    } catch (error) {
        console.error('❌ Error al obtener conversaciones:', error.message);
        res.status(500).json({ message: 'Error al obtener las conversaciones' });
    }
}

module.exports = { getAllConversations };
