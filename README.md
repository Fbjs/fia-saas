# FIA - Fast Intelligent Assistant 🚀

**FIA** es un SaaS que automatiza la atención de clientes en WhatsApp utilizando inteligencia artificial (ChatGPT).  
Gestiona la conexión de WhatsApp Web, responde automáticamente a los mensajes recibidos, administra el consumo de tokens por respuesta, y ofrece planes de suscripción mensual.

---

## 📚 ¿Qué hace FIA?

- Conecta una cuenta de WhatsApp Business.
- Lee y responde automáticamente a los mensajes entrantes usando ChatGPT.
- Descuenta tokens por cada respuesta enviada.
- Gestiona usuarios, tokens y planes de suscripción.
- Proporciona un dashboard para controlar toda la actividad.

---

## 🛠️ Roadmap de Tareas

### 1. Configuración Inicial
- [ ] Crear repositorio en GitHub: `fia-saas`
- [ ] Crear estructura de carpetas `/src`
- [ ] Configurar `package.json` e instalar dependencias básicas
- [ ] Crear archivo `.env` para credenciales sensibles

### 2. Integración WhatsApp Web
- [ ] Configurar `whatsapp-web.js` y conexión mediante QR
- [ ] Crear listener para mensajes entrantes

### 3. Integración ChatGPT
- [ ] Configurar comunicación con OpenAI API
- [ ] Crear función de respuesta automática

### 4. Sistema de Tokens
- [ ] Definir consumo de tokens por respuesta
- [ ] Implementar control de saldo de tokens
- [ ] Bloqueo y alertas por bajo saldo

### 5. Base de Datos
- [ ] Modelos: Usuarios, Conversaciones, Suscripciones
- [ ] Integrar MongoDB Atlas

### 6. Dashboard de Usuario
- [ ] Crear panel para ver actividad, tokens y plan actual
- [ ] Mostrar historial de conversaciones

### 7. Sistema de Pagos
- [ ] Integrar Stripe o MercadoPago
- [ ] Configurar planes y renovación automática

### 8. Seguridad
- [ ] Implementar autenticación con JWT
- [ ] Asegurar el backend con HTTPS

### 9. Extras Futuras
- [ ] Prompts personalizados
- [ ] Multi-agente (varios WhatsApp por cuenta)
- [ ] Reportes descargables
- [ ] Sistema de referidos

---

## 🧐 Stack Tecnológico

- **Backend:** Node.js (Express)
- **Integración WhatsApp:** whatsapp-web.js
- **IA:** OpenAI (ChatGPT API)
- **Base de datos:** MongoDB Atlas
- **Frontend:** Vue.js o Next.js
- **Sistema de pagos:** Stripe o MercadoPago
- **Hosting:** VPS para backend / Vercel para frontend

---

## 🚀 Instalación rápida

```bash
git clone https://github.com/tu_usuario/fia-saas.git
cd fia-saas
npm install
npm run dev
```

---

## ⚙️ Configuración del Entorno y Estructura del Proyecto

### 📄 Archivo `.env` (Variables de entorno necesarias)

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```dotenv
# Puerto del servidor
PORT=3000

# MongoDB
MONGO_URI=mongodb+srv://usuario:contraseña@tucluster.mongodb.net/fia?retryWrites=true&w=majority

# OpenAI
OPENAI_API_KEY=sk-xxxxxx

# JWT
SESSION_SECRET=clave_secreta_para_firmar_tokens

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxx

# WhatsApp
WHATSAPP_SESSION_NAME=fia-session
```

- `PORT`: puerto donde corre el backend Express.
- `MONGO_URI`: conexión a la base de datos MongoDB Atlas.
- `OPENAI_API_KEY`: API key para utilizar ChatGPT.
- `SESSION_SECRET`: clave secreta para firmar y verificar tokens JWT.
- `STRIPE_SECRET_KEY`: clave privada para integrar pagos (Stripe).
- `WHATSAPP_SESSION_NAME`: nombre para guardar la sesión de WhatsApp.

---

### 📂 Estructura del Proyecto

```plaintext

fia-saas/
|
├── src/
│   ├── config/
│   │   ├── db.js                    # Conexión a MongoDB
│   │   └── openai.js                 # Conexión a la API de OpenAI
│   ├── controllers/
│   │   ├── whatsappController.js     # Manejo de mensajes de WhatsApp
│   │   ├── userController.js         # Manejo de usuarios (listar, ver detalle)
│   │   └── conversationController.js # Manejo de conversaciones
│   ├── services/
│   │   ├── whatsappService.js        # Integración con whatsapp-web.js
│   │   └── chatgptService.js         # Servicio de conexión a ChatGPT
│   ├── models/
│   │   ├── userModel.js               # Modelo de usuario (tokens, whatsapp, plan)
│   │   └── conversationModel.js       # Modelo de conversaciones
│   ├── routes/
│   │   ├── whatsappRoutes.js          # Rutas para WhatsApp
│   │   ├── userRoutes.js              # Rutas para usuarios
│   │   └── conversationRoutes.js      # Rutas para conversaciones
│   ├── utils/
│   │   └── tokenManager.js            # (Pendiente) Utilidades para control de tokens
│   └── app.js                         # Montaje principal de Express
│
├── .env                                # Variables de entorno (NO subir a GitHub)
├── .gitignore                          # Ignorar node_modules, .env, sesiones de WhatsApp
├── index.js                            # Entrada principal del servidor
├── package.json                        # Scripts y dependencias de npm
└── README.md                           # Documentación del proyecto

```


