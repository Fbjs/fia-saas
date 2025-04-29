const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { getChatGptResponse } = require('./chatgptService');
const User = require('../models/userModel'); // 👈 Importamos el modelo de usuario

const client = new Client({
    authStrategy: new LocalAuth({ clientId: process.env.WHATSAPP_SESSION_NAME }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Mostrar QR
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('🔗 Escanea el QR para conectar tu WhatsApp');
});

// Conexión lista
client.on('ready', () => {
    console.log('✅ FIA conectado a WhatsApp');
});

// Procesar mensajes
client.on('message', async message => {
    console.log(`📩 Mensaje recibido de ${message.from}: ${message.body}`);

    if (!message.from.includes('@g.us')) { // Ignorar mensajes de grupo
        const cleanNumber = message.from.replace('@c.us', '');

        // 1. Buscar o crear el usuario
        let user = await User.findOne({ whatsapp: cleanNumber });
        
        if (!user) {
            console.log('➕ Usuario nuevo detectado, creando registro...');
            user = new User({ whatsapp: cleanNumber });
            await user.save();
        }

        // 2. Verificar tokens
        if (user.tokens <= 0) {
            await message.reply('⚠️ Has agotado tus tokens. Por favor suscríbete para seguir utilizando FIA.');
            return;
        }

        // 3. Obtener respuesta de ChatGPT
        const userMessage = message.body;
        const aiResponse = await getChatGptResponse(userMessage);

        // 4. Enviar respuesta
        await message.reply(aiResponse);

        // 5. Descontar 1 token
        user.tokens -= 1;
        await user.save();

        console.log(`✅ Token descontado. Tokens restantes: ${user.tokens}`);
    }
});

// Inicializar WhatsApp
function initializeWhatsapp() {
    client.initialize();
}

module.exports = { initializeWhatsapp };
