const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

// Configurar OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// Crear instancia de OpenAI
const openai = new OpenAIApi(configuration);

module.exports = openai;
