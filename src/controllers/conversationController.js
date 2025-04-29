const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');

/**
 * Listar conversaciones, con filtros opcionales de fechas y número de WhatsApp.
 */
async function getAllConversations(req, res) {
    try {
        const { desde, hasta, whatsapp } = req.query;

        const filter = {};

        // Filtrar por fechas si existen
        if (desde || hasta) {
            filter.createdAt = {};

            if (desde) {
                filter.createdAt.$gte = new Date(desde + 'T00:00:00Z');
            }

            if (hasta) {
                filter.createdAt.$lte = new Date(hasta + 'T23:59:59Z');
            }
        }

        // Filtrar por número de WhatsApp si existe
        if (whatsapp) {
            // Buscar el usuario que tenga ese número
            const user = await User.findOne({ whatsapp });

            if (user) {
                filter.user = user._id;
            } else {
                // Si no existe ese usuario, devolvemos lista vacía
                return res.status(200).json([]);
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
