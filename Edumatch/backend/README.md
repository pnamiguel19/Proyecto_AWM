# Backend EduMatch - API REST con Node.js y Express

Backend del proyecto EduMatch implementado con Node.js, Express y métodos HTTP (GET, POST, DELETE).

## 📋 Características

- ✅ Servidor Express en puerto configurable (por defecto: 5000)
- ✅ API REST con endpoints básicos
- ✅ Datos simulados en memoria
- ✅ Procesamiento de solicitudes JSON con `express.json()`
- ✅ Respuestas HTTP con códigos de estado apropiados (200, 201, 404, 500)
- ✅ CORS configurado para el frontend
- ✅ Variables de entorno con dotenv
- ✅ Modo desarrollo con nodemon (recarga automática)

## 🚀 Instalación

### Prerequisitos

- Node.js v16+ instalado
- npm o yarn

### Pasos

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install
```

## 📦 Dependencias

### Producción
- **express**: Framework web para Node.js
- **cors**: Middleware para habilitar CORS
- **dotenv**: Gestión de variables de entorno

### Desarrollo
- **nodemon**: Recarga automática del servidor en desarrollo

## ⚙️ Configuración

El archivo `.env` contiene las variables de entorno:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🎯 Uso

### Iniciar el servidor en modo desarrollo

```bash
npm run dev
```

### Iniciar el servidor en modo producción

```bash
npm start
```

El servidor se iniciará en: `http://localhost:5000`

## 📡 Endpoints API

### Base URL
```
http://localhost:5000/api
```

### Endpoints Disponibles

#### 1. **GET /api/items**
Obtener todos los items

**Respuesta:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Curso de Matemáticas",
      "description": "Álgebra y Cálculo",
      "price": 50
    }
  ]
}
```

**Código de estado:** `200 OK`

---

#### 2. **GET /api/items/:id**
Obtener un item por ID

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Curso de Matemáticas",
    "description": "Álgebra y Cálculo",
    "price": 50
  }
}
```

**Código de estado:** `200 OK`

**Respuesta error:**
```json
{
  "success": false,
  "error": "Item con ID 99 no encontrado"
}
```

**Código de estado:** `404 Not Found`

---

#### 3. **POST /api/items**
Crear un nuevo item

**Body (JSON):**
```json
{
  "name": "Curso de Programación",
  "description": "JavaScript y React",
  "price": 60
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Item creado exitosamente",
  "data": {
    "id": 4,
    "name": "Curso de Programación",
    "description": "JavaScript y React",
    "price": 60
  }
}
```

**Código de estado:** `201 Created`

**Validación:** Los campos `name` y `description` son obligatorios.

---

#### 4. **DELETE /api/items/:id**
Eliminar un item por ID

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Item eliminado exitosamente",
  "data": {
    "id": 1,
    "name": "Curso de Matemáticas",
    "description": "Álgebra y Cálculo",
    "price": 50
  }
}
```

**Código de estado:** `200 OK`

**Respuesta error:**
```json
{
  "success": false,
  "error": "Item con ID 99 no encontrado"
}
```

**Código de estado:** `404 Not Found`

---

#### 5. **GET /api/health**
Verificar estado del servidor

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-14T12:00:00.000Z",
  "uptime": 123.456
}
```

**Código de estado:** `200 OK`

---

## 🧪 Probar los Endpoints

### Opción 1: Postman

1. Descargar Postman: https://www.postman.com/downloads/
2. Crear una nueva colección
3. Añadir requests para cada endpoint
4. Configurar método HTTP, URL y body según documentación

### Opción 2: Thunder Client (VS Code)

1. Instalar extensión Thunder Client en VS Code
2. Abrir el panel de Thunder Client
3. Crear nuevas requests con los endpoints

### Opción 3: Navegador

Para los métodos GET, simplemente accede a:
- `http://localhost:5000/api/items`
- `http://localhost:5000/api/health`

### Opción 4: cURL (Terminal)

```bash
# GET - Obtener todos los items
curl http://localhost:5000/api/items

# GET - Obtener item por ID
curl http://localhost:5000/api/items/1

# POST - Crear nuevo item
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Nuevo Curso\",\"description\":\"Descripción\",\"price\":100}"

# DELETE - Eliminar item
curl -X DELETE http://localhost:5000/api/items/1
```

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── server.js              # Punto de entrada del servidor
│   ├── app.js                 # Configuración de Express
│   ├── controllers/
│   │   └── itemsController.js # Lógica de negocio de items
│   ├── routes/
│   │   └── itemsRoutes.js     # Definición de rutas
│   └── middlewares/           # Middlewares personalizados
├── .env                       # Variables de entorno
├── .gitignore                 # Archivos ignorados por Git
├── package.json               # Dependencias y scripts
└── README.md                  # Documentación
```

## 🔧 Códigos de Estado HTTP

- **200 OK**: Solicitud exitosa
- **201 Created**: Recurso creado exitosamente
- **400 Bad Request**: Datos inválidos o faltantes
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

## 📝 Notas Técnicas

- Los datos se almacenan en memoria (se pierden al reiniciar el servidor)
- Los IDs son autoincrementales comenzando desde 1
- El middleware `express.json()` procesa automáticamente el body JSON
- CORS está configurado para permitir solicitudes desde el frontend

## 🔗 Integración con Frontend

El frontend en React puede consumir esta API usando el archivo de servicios:

```javascript
import api from './services/api';

// Obtener items
const items = await api.items.getAll();

// Crear item
const newItem = await api.items.create({
  name: 'Nuevo Curso',
  description: 'Descripción',
  price: 50
});

// Eliminar item
await api.items.delete(1);
```

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Verificar que el puerto 5000 no esté en uso
netstat -ano | findstr :5000

# Cambiar el puerto en .env si es necesario
PORT=3000
```

### Error de módulos no encontrados

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error de CORS

Verificar que `FRONTEND_URL` en `.env` coincida con la URL del frontend.

## 📚 Recursos Adicionales

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)

## 👨‍💻 Desarrollo

Para contribuir o extender la funcionalidad:

1. Crear nuevos controladores en `src/controllers/`
2. Definir rutas en `src/routes/`
3. Registrar rutas en `src/app.js`
4. Actualizar esta documentación

---

**¡El backend está listo para funcionar! 🎉**
