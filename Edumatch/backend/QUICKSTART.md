# 🚀 Guía de Inicio Rápido - Backend EduMatch

## Paso 1: Instalar Dependencias

```bash
cd backend
npm install
```

## Paso 2: Iniciar el Servidor

```bash
npm run dev
```

## Paso 3: Probar los Endpoints

Abrir en el navegador:
- http://localhost:5000
- http://localhost:5000/api/items
- http://localhost:5000/api/health

## Paso 4: Ejecutar Frontend (en otra terminal)

```bash
cd ..
npm run dev
```

El frontend se conectará automáticamente al backend a través del proxy configurado.

---

## 📌 Comandos Rápidos

```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)  
npm run dev
```

## 🧪 Probar con cURL

```bash
# Listar items
curl http://localhost:5000/api/items

# Crear item
curl -X POST http://localhost:5000/api/items -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"description\":\"Prueba\",\"price\":100}"

# Eliminar item
curl -X DELETE http://localhost:5000/api/items/1
```
