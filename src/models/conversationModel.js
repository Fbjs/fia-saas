const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Relacionamos con el modelo de Usuario
        required: true
    },
    fromUser: {
        type: String,
        required: true
    },
    userMessage: {
        type: String,
        required: true
    },
    aiResponse: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Guarda createdAt y updatedAt automáticamente
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
