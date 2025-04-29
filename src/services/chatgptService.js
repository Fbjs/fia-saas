const openai = require('../config/openai');

async function getChatGptResponse(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'Eres un asistente virtual para ventas, amable y directo en ofrecer información clara.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.6,
            max_tokens: 500
        });

        const reply = response.choices[0].message.content.trim();
        return reply;
    } catch (error) {
        console.error('❌ Error al consultar ChatGPT:', error.message || error);
        return 'Lo siento, en este momento no puedo responder. Intenta más tarde.';
    }
}

module.exports = { getChatGptResponse };
