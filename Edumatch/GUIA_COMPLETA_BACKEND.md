# 🚀 Guía Completa: Backend Node.js con Express - EduMatch

## ✅ Actividades Completadas

### 1. ✅ Inicializar proyecto backend con Node.js y npm
- Carpeta `backend/` creada con estructura organizada
- `package.json` configurado con scripts y dependencias
- Variables de entorno en `.env`

### 2. ✅ Instalar y configurar Express
- Express instalado y configurado
- Servidor escuchando en puerto 5000 (configurable)
- CORS habilitado para el frontend

### 3. ✅ Implementar servidor Express con puerto configurable
- Puerto definido en `.env` (PORT=5000)
- Servidor iniciado con `app.listen()`
- Logs informativos al iniciar

### 4. ✅ Definir estructura básica de API REST con endpoints

#### **GET /api/items** - Listar elementos
```javascript
// Respuesta HTTP 200
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

#### **POST /api/items** - Registrar nuevo elemento
```javascript
// Body requerido
{
  "name": "Curso de React",
  "description": "Aprende React desde cero",
  "price": 60
}

// Respuesta HTTP 201
{
  "success": true,
  "message": "Item creado exitosamente",
  "data": { id: 4, name: "...", ... }
}
```

#### **DELETE /api/items/:id** - Eliminar elemento por ID
```javascript
// Respuesta HTTP 200 (éxito)
{
  "success": true,
  "message": "Item eliminado exitosamente",
  "data": { id: 1, name: "...", ... }
}

// Respuesta HTTP 404 (no encontrado)
{
  "success": false,
  "error": "Item con ID 99 no encontrado"
}
```

### 5. ✅ Utilizar arreglo en memoria como fuente de datos simulada
- Variable `items` con datos iniciales
- IDs autoincrementales con `nextId`
- Operaciones CRUD en memoria

### 6. ✅ Procesamiento de solicitudes con express.json()
- Middleware `express.json()` configurado en `app.js`
- Permite procesar cuerpos JSON en POST

### 7. ✅ Retornar respuestas HTTP con códigos de estado adecuados
- **200 OK**: Operaciones exitosas
- **201 Created**: Recurso creado
- **400 Bad Request**: Datos inválidos
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Errores del servidor

### 8. ✅ Probar endpoints con Postman, Thunder Client o navegador
- Documentación completa en README.md
- Ejemplos de cURL incluidos
- Componente de prueba React creado

---

## 📁 Estructura del Proyecto

```
Edumatch/
├── backend/
│   ├── src/
│   │   ├── server.js              # Punto de entrada
│   │   ├── app.js                 # Configuración Express
│   │   ├── controllers/
│   │   │   └── itemsController.js # Lógica de negocio
│   │   ├── routes/
│   │   │   └── itemsRoutes.js     # Rutas API
│   │   └── middlewares/
│   ├── .env                       # Variables de entorno
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── QUICKSTART.md
├── src/
│   ├── services/
│   │   └── api.js                 # Servicios para consumir API
│   └── pages/
│       └── TestAPI/
│           ├── TestAPI.jsx        # Componente de prueba
│           └── TestAPI.css
└── vite.config.js                 # Proxy configurado
```

---

## 🎯 Paso a Paso para Ejecutar

### **Paso 1: Verificar Node.js instalado**

```bash
node --version
npm --version
```

Si no está instalado, descargar desde: https://nodejs.org/

---

### **Paso 2: Abrir DOS terminales en VS Code**

**Terminal 1 (Backend):**
```bash
cd Edumatch\backend
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd Edumatch
npm install
npm run dev
```

---

### **Paso 3: Verificar que el backend esté funcionando**

Abrir en el navegador:
- http://localhost:5000 (API principal)
- http://localhost:5000/api/items (Lista de items)
- http://localhost:5000/api/health (Estado del servidor)

---

### **Paso 4: Probar los endpoints**

#### **Opción A: Navegador**
Simplemente abre las URLs mencionadas arriba para probar GET

#### **Opción B: Thunder Client (Recomendado)**
1. Instalar extensión Thunder Client en VS Code
2. Crear nueva request
3. Probar cada endpoint:

**GET /api/items**
```
Method: GET
URL: http://localhost:5000/api/items
```

**POST /api/items**
```
Method: POST
URL: http://localhost:5000/api/items
Headers: Content-Type: application/json
Body:
{
  "name": "Curso de Node.js",
  "description": "Backend con Express",
  "price": 75
}
```

**DELETE /api/items/1**
```
Method: DELETE
URL: http://localhost:5000/api/items/1
```

#### **Opción C: cURL (Terminal)**
```bash
# GET - Listar items
curl http://localhost:5000/api/items

# POST - Crear item
curl -X POST http://localhost:5000/api/items -H "Content-Type: application/json" -d "{\"name\":\"Nuevo Curso\",\"description\":\"Descripción\",\"price\":100}"

# DELETE - Eliminar item
curl -X DELETE http://localhost:5000/api/items/1
```

#### **Opción D: Componente React de Prueba**
1. El frontend en React incluye un componente de prueba
2. Acceder desde tu aplicación React
3. Usar la interfaz visual para probar GET, POST y DELETE

---

## 🔧 Configuración Importante

### **Backend (.env)**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### **Frontend (vite.config.js)**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

---

## 📊 Códigos de Estado HTTP Implementados

| Código | Descripción | Cuándo se usa |
|--------|-------------|---------------|
| 200 | OK | GET exitoso, DELETE exitoso |
| 201 | Created | POST exitoso |
| 400 | Bad Request | Datos inválidos o faltantes |
| 404 | Not Found | Item no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

## 🧪 Ejemplos de Uso desde React

```javascript
import api from './services/api';

// GET - Obtener items
const getItems = async () => {
  const response = await api.items.getAll();
  console.log(response.data);
};

// POST - Crear item
const createItem = async () => {
  const newItem = {
    name: "Curso de TypeScript",
    description: "TypeScript avanzado",
    price: 80
  };
  const response = await api.items.create(newItem);
  console.log(response.message);
};

// DELETE - Eliminar item
const deleteItem = async (id) => {
  const response = await api.items.delete(id);
  console.log(response.message);
};
```

---

## 📝 Validaciones Implementadas

### POST /api/items
- ✅ Campo `name` es obligatorio
- ✅ Campo `description` es obligatorio
- ✅ Campo `price` es opcional (default: 0)
- ✅ Retorna 400 Bad Request si faltan campos

### DELETE /api/items/:id
- ✅ Verifica que el ID exista
- ✅ Retorna 404 Not Found si no existe

---

## 🐛 Solución de Problemas

### El backend no inicia
```bash
# Verificar puerto disponible
netstat -ano | findstr :5000

# Cambiar puerto en .env
PORT=3000
```

### Error "Cannot GET /api/items"
- Verificar que el backend esté ejecutándose
- Revisar la consola del backend por errores
- Verificar que el proxy en vite.config.js esté configurado

### Error de CORS
- Verificar `FRONTEND_URL` en `.env`
- Reiniciar el servidor backend
- Verificar configuración CORS en `app.js`

---

## 📚 Recursos Adicionales

- [Express.js Documentation](https://expressjs.com/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [REST API Tutorial](https://restfulapi.net/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## ✨ Características Implementadas

- ✅ Servidor Express en puerto configurable
- ✅ CORS habilitado
- ✅ Middleware express.json()
- ✅ Endpoints REST (GET, POST, DELETE)
- ✅ Base de datos simulada en memoria
- ✅ Validación de datos
- ✅ Códigos de estado HTTP apropiados
- ✅ Manejo de errores
- ✅ Logs de desarrollo
- ✅ Documentación completa
- ✅ Integración con React
- ✅ Servicio API para frontend
- ✅ Componente de prueba React

---

## 🎉 ¡Proyecto Completo y Funcionando!

El backend está listo para:
1. Recibir peticiones HTTP
2. Procesar datos JSON
3. Retornar respuestas apropiadas
4. Integrarse con el frontend React

Para probar, ejecuta ambos servidores y comienza a hacer peticiones a los endpoints documentados.
