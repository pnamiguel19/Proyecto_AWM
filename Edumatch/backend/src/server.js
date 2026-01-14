import app from './app.js';

// Obtener puerto de las variables de entorno o usar 5000 por defecto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║         🚀 SERVIDOR EDUMATCH INICIADO                 ║');
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log(`║  📡 Puerto: ${PORT}                                    ║`);
  console.log(`║  🌐 URL: http://localhost:${PORT}                      ║`);
  console.log(`║  📚 API Base: http://localhost:${PORT}/api             ║`);
  console.log(`║  ⚙️  Entorno: ${process.env.NODE_ENV || 'development'} ║`);
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log('║  Endpoints disponibles:                                ║');
  console.log(`║  GET    /api/items         - Listar items             ║`);
  console.log(`║  POST   /api/items         - Crear item               ║`);
  console.log(`║  DELETE /api/items/:id     - Eliminar item            ║`);
  console.log(`║  GET    /api/health        - Estado del servidor      ║`);
  console.log('╚════════════════════════════════════════════════════════╝');
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Excepción no capturada:', err);
  process.exit(1);
});
