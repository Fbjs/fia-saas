const { initializeWhatsapp } = require('../services/whatsappService');

/**
 * Inicializa la conexión de WhatsApp.
 */
function startWhatsappConnection(req, res) {
    try {
        initializeWhatsapp();
        res.status(200).json({ message: 'Conexión a WhatsApp iniciada correctamente.' });
    } catch (error) {
        console.error('❌ Error iniciando WhatsApp:', error.message);
        res.status(500).json({ message: 'Error iniciando WhatsApp' });
    }
}

module.exports = { startWhatsappConnection };
