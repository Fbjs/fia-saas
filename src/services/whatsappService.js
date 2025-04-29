const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { getChatGptResponse } = require('./chatgptService');
const User = require('../models/userModel');
const Conversation = require('../models/conversationModel'); // 👈 Importamos Conversation


client.on('message', async message => {
    console.log(`📩 Mensaje recibido de ${message.from}: ${message.body}`);

    if (!message.from.includes('@g.us')) { // Ignorar grupos
        const cleanNumber = message.from.replace('@c.us', '');

        let user = await User.findOne({ whatsapp: cleanNumber });
        
        if (!user) {
            console.log('➕ Usuario nuevo detectado, creando registro...');
            user = new User({ whatsapp: cleanNumber });
            await user.save();
        }

        if (user.tokens <= 0) {
            await message.reply('⚠️ Has agotado tus tokens. Por favor suscríbete para seguir utilizando FIA.');
            return;
        }

        const userMessage = message.body;
        const aiResponse = await getChatGptResponse(userMessage);

        await message.reply(aiResponse);

        user.tokens -= 1;
        await user.save();

        console.log(`✅ Token descontado. Tokens restantes: ${user.tokens}`);

       // Guardar la conversación en MongoDB
       const conversation = new Conversation({
           user: user._id,
           fromUser: cleanNumber,
           userMessage: userMessage,
           aiResponse: aiResponse
       });
       await conversation.save();
       console.log('🗂️ Conversación guardada en la base de datos.');
    }
});
