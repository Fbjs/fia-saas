const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
// (Las rutas se importarán más adelante)
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

module.exports = app;
