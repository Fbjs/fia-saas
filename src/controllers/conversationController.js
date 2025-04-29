const Conversation = require('../models/conversationModel');

/**
 * Listar conversaciones, con opción de filtrar por fechas.
 */
async function getAllConversations(req, res) {
    try {
        const { desde, hasta } = req.query;

        const filter = {};

        if (desde || hasta) {
            filter.createdAt = {};

            if (desde) {
                filter.createdAt.$gte = new Date(desde + 'T00:00:00Z'); // Desde las 00:00 UTC
            }

            if (hasta) {
                filter.createdAt.$lte = new Date(hasta + 'T23:59:59Z'); // Hasta el final del día UTC
            }
        }

        const conversations = await Conversation.find(filter)
            .populate('user', 'whatsapp plan')
            .sort({ createdAt: -1 });

        res.status(200).json(conversations);
    } catch (error) {
        console.error('❌ Error al obtener conversaciones:', error.message);
        res.status(500).json({ message: 'Error al obtener las conversaciones' });
    }
}

module.exports = { getAllConversations };
