const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Aquí agregamos las rutas
const conversationRoutes = require('./routes/conversationRoutes');
app.use('/api/conversations', conversationRoutes);

module.exports = app;
