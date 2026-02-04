// ============================================
// 🔴 IMPORTANTE: Cargar dotenv PRIMERO
// ============================================
require('dotenv').config();

// Verificar variables de entorno críticas
console.log('🔍 Verificando variables de entorno...');
console.log('   - NODE_ENV:', process.env.NODE_ENV || 'no configurado');
console.log('   - PORT:', process.env.PORT || 'no configurado');
console.log('   - MONGO_URI:', process.env.MONGO_URI ? '✅ configurado' : '❌ no configurado');
console.log('   - JWT_SECRET:', process.env.JWT_SECRET ? '✅ configurado' : '❌ no configurado');

if (!process.env.JWT_SECRET) {
  console.error('\n❌ ERROR CRÍTICO: JWT_SECRET no está configurado en .env');
  console.error('📝 Crea un archivo .env en la raíz del proyecto con:');
  console.error('   JWT_SECRET=tu_super_secreto_jwt_key_2024');
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error('\n❌ ERROR CRÍTICO: MONGO_URI no está configurado en .env');
  console.error('📝 Agrega en .env:');
  console.error('   MONGO_URI=mongodb://localhost:27017/edumatch');
  process.exit(1);
}

// Ahora sí, cargar el resto de módulos
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // 👈 AGREGAR ESTA LÍNEA
require('./config/mongoose.config');

const { authRoutes, studentRoutes, professorRoutes, adminRoutes } = require('./routes');
const { errorHandler, notFound } = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 8000;

// ============================================
// MIDDLEWARES GLOBALES
// ============================================

// CORS - Permitir solicitudes desde el cliente móvil
app.use(cors({
  origin: '*', // Permitir todos los orígenes en desarrollo
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parsers
app.use(express.json({ limit: '50mb' })); // Aumentar límite para JSON
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Para form-data

// Logging de todas las peticiones
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  console.log('📝 Content-Type:', req.headers['content-type']);
  next();
});

// Servir archivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log de solicitudes en desarrollo
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.path} - ${new Date().toLocaleTimeString()}`);
    next();
  });
}

// ============================================
// RUTAS
// ============================================

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de EduMatch funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      students: '/api/students',
      professors: '/api/professors',
      admin: '/api/admin'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/admin', adminRoutes);

// ============================================
// MANEJO DE ERRORES
// ============================================

// Ruta no encontrada (404)
app.use(notFound);

// Manejador global de errores
app.use(errorHandler);

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n╔═══════════════════════════════════════╗');
  console.log('║     🎓 EDUMATCH API SERVER 🎓        ║');
  console.log('╠═══════════════════════════════════════╣');
  console.log(`║  🚀 Server running on port: ${PORT}     ║`);
  console.log(`║  🌍 Environment: ${process.env.NODE_ENV || 'development'}       ║`);
  console.log(`║  📡 Local: http://localhost:${PORT}      ║`);
  console.log(`║  📱 Network: http://0.0.0.0:${PORT}      ║`);
  console.log('╠═══════════════════════════════════════╣');
  console.log('║  📚 Available Routes:                 ║');
  console.log(`║     - Auth: /api/auth                 ║`);
  console.log(`║     - Students: /api/students         ║`);
  console.log(`║     - Professors: /api/professors     ║`);
  console.log(`║     - Admin: /api/admin               ║`);
  console.log('╚═══════════════════════════════════════╝\n');
});

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(error.name, error.message);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error(error);
  process.exit(1);
});

module.exports = app;