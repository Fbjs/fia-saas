const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    whatsapp: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false
    },
    tokens: {
        type: Number,
        default: 100  // Empieza con 100 tokens gratis
    },
    plan: {
        type: String,
        enum: ['FREE', 'STARTER', 'BUSINESS', 'ENTERPRISE'],
        default: 'FREE'
    },
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true // Guarda createdAt y updatedAt automático
});

const User = mongoose.model('User', userSchema);

module.exports = User;
