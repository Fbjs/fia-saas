const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');

/**
 * Listar conversaciones, con filtros opcionales de fechas, WhatsApp y paginación.
 */
async function getAllConversations(req, res) {
    try {
        const { desde, hasta, whatsapp, page = 1, limit = 20 } = req.query;

        const filter = {};

        // Filtro por fechas
        if (desde || hasta) {
            filter.createdAt = {};

            if (desde) {
                filter.createdAt.$gte = new Date(desde + 'T00:00:00Z');
            }

            if (hasta) {
                filter.createdAt.$lte = new Date(hasta + 'T23:59:59Z');
            }
        }

        // Filtro por número de WhatsApp
        if (whatsapp) {
            const user = await User.findOne({ whatsapp });
            if (user) {
                filter.user = user._id;
            } else {
                return res.status(200).json({
                    conversations: [],
                    total: 0,
                    currentPage: parseInt(page),
                    totalPages: 0
                });
            }
        }

        // Conteo total antes de aplicar paginación
        const total = await Conversation.countDocuments(filter);

        // Buscar con paginación
        const conversations = await Conversation.find(filter)
            .populate('user', 'whatsapp plan')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            conversations,
            total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('❌ Error al obtener conversaciones:', error.message);
        res.status(500).json({ message: 'Error al obtener las conversaciones' });
    }
}

module.exports = { getAllConversations };
