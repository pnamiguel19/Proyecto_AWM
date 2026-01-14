# EduMatch - Plataforma de Educación 📚

Plataforma web para conectar estudiantes con profesores. Proyecto desarrollado con React (frontend) y Node.js + Express (backend).

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Windows)
```bash
# Ejecutar el script de inicio
.\start.ps1
```

### Opción 2: Manual (2 Terminales)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
```

## 📋 Requisitos Previos

- **Node.js** v16 o superior
- **npm** v8 o superior

Verificar instalación:
```bash
node --version
npm --version
```

## 🛠️ Tecnologías

### Frontend
- **React** 19.2.0
- **Vite** 7.2.4
- **React Router DOM** 7.9.6

### Backend
- **Node.js** + **Express** 4.18.2
- **CORS** 2.8.5
- **dotenv** 16.3.1
- **nodemon** (desarrollo)

## 📡 API REST Endpoints

### Base URL: `http://localhost:5000/api`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/items` | Listar todos los items |
| GET | `/items/:id` | Obtener item por ID |
| POST | `/items` | Crear nuevo item |
| DELETE | `/items/:id` | Eliminar item |
| GET | `/health` | Estado del servidor |

## 📖 Documentación

- **[GUIA_COMPLETA_BACKEND.md](GUIA_COMPLETA_BACKEND.md)** - Guía completa del backend con ejemplos
- **[backend/README.md](backend/README.md)** - Documentación detallada del backend
- **[backend/QUICKSTART.md](backend/QUICKSTART.md)** - Inicio rápido del backend

## 🎯 Características Implementadas

✅ Backend API REST con Node.js y Express  
✅ Métodos HTTP: GET, POST, DELETE  
✅ Base de datos simulada en memoria  
✅ Procesamiento de JSON con express.json()  
✅ Respuestas HTTP con códigos de estado apropiados  
✅ CORS configurado  
✅ Proxy configurado en Vite  
✅ Servicio API para consumir desde React  
✅ Componente de prueba de API incluido  

## 🌐 URLs del Proyecto

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Items**: http://localhost:5000/api/items
- **Health Check**: http://localhost:5000/api/health

## 🧪 Probar la API

### Con cURL:
```bash
# GET - Listar items
curl http://localhost:5000/api/items

# POST - Crear item
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Curso de React","description":"Aprende React","price":60}'

# DELETE - Eliminar item
curl -X DELETE http://localhost:5000/api/items/1
```

### Con Thunder Client (VS Code):
1. Instalar extensión Thunder Client
2. Crear nueva request
3. Configurar método, URL y body según endpoints documentados

## 📁 Estructura del Proyecto

```
Edumatch/
├── backend/                    # Backend Node.js + Express
│   ├── src/
│   │   ├── server.js          # Servidor principal
│   │   ├── app.js             # Configuración Express
│   │   ├── controllers/       # Lógica de negocio
│   │   └── routes/            # Definición de rutas
│   ├── .env                   # Variables de entorno
│   └── package.json
├── src/                        # Frontend React
│   ├── components/            # Componentes reutilizables
│   ├── pages/                 # Páginas de la aplicación
│   ├── services/
│   │   └── api.js            # Servicios para consumir API
│   └── routes/               # Rutas del frontend
├── public/                    # Archivos estáticos
├── vite.config.js            # Configuración Vite + Proxy
├── start.ps1                 # Script de inicio automático
└── README.md
```

## 🔧 Configuración

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (vite.config.js)
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

## 🐛 Solución de Problemas

### Puerto en uso
```bash
# Windows - Verificar puerto 5000
netstat -ano | findstr :5000

# Cambiar puerto en backend/.env
PORT=3000
```

### Reinstalar dependencias
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ..
rm -rf node_modules package-lock.json
npm install
```

## 📚 Recursos

- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [HTTP Status Codes](https://httpstatuses.com/)

## 👥 Contribuir

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto es parte de un proyecto académico.

---

**Desarrollado con ❤️ para EduMatch**

