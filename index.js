const app = require('./src/app');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { initializeWhatsapp } = require('./src/services/whatsappService'); // 👈 Importamos el servicio de WhatsApp

dotenv.config();

// Conectar a la base de datos
connectDB();

// Inicializar cliente de WhatsApp
initializeWhatsapp(); // 👈 Se conecta automáticamente al iniciar el backend

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 FIA backend corriendo en el puerto ${PORT}`);
});
