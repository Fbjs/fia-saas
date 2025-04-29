const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const conversationRoutes = require('./routes/conversationRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/conversations', conversationRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
