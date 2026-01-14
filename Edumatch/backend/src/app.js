import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itemsRoutes from './routes/itemsRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares globales
app.use(cors(corsOptions));
app.use(express.json()); // Para procesar el cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: true }));

// Middleware de logs para desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Rutas principales
app.use('/api/items', itemsRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de EduMatch',
    version: '1.0.0',
    endpoints: {
      items: {
        getAll: 'GET /api/items',
        create: 'POST /api/items',
        delete: 'DELETE /api/items/:id'
      }
    }
  });
});

// Ruta para verificar estado del servidor
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    path: req.path,
    method: req.method
  });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;
