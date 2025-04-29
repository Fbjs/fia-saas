const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { getChatGptResponse } = require('./chatgptService');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: process.env.WHATSAPP_SESSION_NAME }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Genera el QR para vincular WhatsApp
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('🔗 Escanea el QR para conectar tu WhatsApp');
});

// Aviso cuando está conectado
client.on('ready', () => {
    console.log('✅ FIA conectado a WhatsApp');
});

// Escuchar mensajes entrantes
client.on('message', async message => {
    console.log(`📩 Mensaje recibido de ${message.from}: ${message.body}`);

    if (!message.from.includes('@g.us')) { // Ignorar grupos por ahora
        const userMessage = message.body;
        const aiResponse = await getChatGptResponse(userMessage);

        await message.reply(aiResponse);
    }
});

// Inicializar cliente
function initializeWhatsapp() {
    client.initialize();
}

module.exports = { initializeWhatsapp };
