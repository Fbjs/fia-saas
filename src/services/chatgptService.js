const openai = require('../config/openai');

/**
 * Envía un mensaje al modelo de ChatGPT y devuelve la respuesta.
 * @param {string} prompt - El texto del mensaje enviado por el cliente.
 * @returns {Promise<string>} - La respuesta generada por la IA.
 */
async function getChatGptResponse(prompt) {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo', // o "gpt-4" si quieres usar el modelo superior
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
            temperature: 0.6, // Controla la creatividad de las respuestas
            max_tokens: 500    // Límite de longitud de respuesta
        });

        const reply = response.data.choices[0].message.content.trim();
        return reply;
    } catch (error) {
        console.error('❌ Error al consultar ChatGPT:', error.response ? error.response.data : error.message);
        return 'Lo siento, en este momento no puedo responder. Intenta más tarde.';
    }
}

module.exports = { getChatGptResponse };
