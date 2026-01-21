# 🎓 Nombre de la aplicación: 
- EduMatch

## 📘 Descripción de la Práctica 08

## Descripción breve del objetivo de la práctica
La presente práctica tiene como objetivo implementar un servidor backend utilizando **Node.js** y el framework **Express** para crear una API REST funcional que permita realizar operaciones CRUD (Crear, Leer, Eliminar) sobre recursos de datos.

Se busca comprender el flujo completo de comunicación cliente-servidor mediante el protocolo HTTP, implementando endpoints que respondan a los métodos estándar GET, POST y DELETE. La práctica permite familiarizarse con:

- La arquitectura de servicios REST
- El manejo de solicitudes y respuestas HTTP
- El procesamiento de datos en formato JSON
- La implementación de códigos de estado HTTP apropiados
- La validación y prueba de servicios web mediante herramientas especializadas

El proyecto simula un sistema de gestión de items (cursos/clases) donde los datos se almacenan temporalmente en memoria, facilitando así el aprendizaje de los conceptos fundamentales antes de integrar una base de datos persistente.

---

## 📋 Descripción de los endpoints implementados.

### 1. ✅ Health Check
Verifica que el servidor esté funcionando y respondiendo correctamente.

* **Método:** `GET`
* **Endpoint:** `/api/health`
* **Respuesta Exitosa (200 OK):**
    ```json
    {
      "status": "OK",
      "message": "Servidor funcionando correctamente",
      "timestamp": "2026-01-21T10:30:00.000Z"
    }
    ```
* **Caso de uso:** Endpoint de diagnóstico para monitoreo de disponibilidad.

---

### 2. 📋 Listar Todos los Items
Obtiene la colección completa de registros almacenados.

* **Método:** `GET`
* **Endpoint:** `/api/items`
* **Respuesta Exitosa (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": 1,
          "name": "Matemáticas Avanzadas",
          "description": "Curso de cálculo diferencial e integral",
          "price": 75
        },
        {
          "id": 2,
          "name": "Programación en Python",
          "description": "Fundamentos de Python para principiantes",
          "price": 50
        }
      ]
    }
    ```
* **Casos de uso:** Mostrar catálogos de cursos o alimentar tablas en el frontend.

---

### 3. 🔎 Obtener Item por ID
Recupera los detalles de un item específico mediante su identificador único.

* **Método:** `GET`
* **Endpoint:** `/api/items/:id`

### Parámetros
| Parámetro | Tipo | Ubicación | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `Number` | Path | ID único del recurso |

### Respuestas
* **Éxito (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "id": 1,
        "name": "Matemáticas Avanzadas",
        "description": "Curso de cálculo diferencial e integral",
        "price": 75
      }
    }
    ```
* **Error (404 Not Found):**
    ```json
    {
      "success": false,
      "error": "Item no encontrado"
    }
    ```

---

### 4. ➕ Crear Nuevo Item
Registra un nuevo elemento en el sistema.

* **Método:** `POST`
* **Endpoint:** `/api/items`
* **Headers:** `Content-Type: application/json`

#### Cuerpo de la Petición (Body)
| Campo | Tipo | Obligatorio | Descripción |
| :--- | :--- | :--- | :--- |
| `name` | `String` | Sí | Nombre del item/curso |
| `description` | `String` | Sí | Detalle del contenido |
| `price` | `Number` | Sí | Costo numérico |

**Ejemplo del Body:**
```json
{
  "name": "JavaScript Moderno",
  "description": "ES6+ y frameworks actuales",
  "price": 85
}
```

### Respuestas
* **Éxito (200 OK):**
    ```json
    {
      "success": true,
      "message": "Item creado exitosamente",
      "data": { "id": 3, "name": "JavaScript Moderno", "price": 85 }
    }
    ```
* **Error (404 Not Found):**
    ```json
    {
      "success": false,
      "error": "Todos los campos son requeridos"
    }
    ```
---

### 5. 🗑️ Eliminar Item
Borra permanentemente un registro del servidor.

* **Método:** `DELETE`
* **Endpoint:** `/api/items/:id`

### Respuestas
* **Éxito (200 OK):**
    ```json
    {
      "success": true,
      "message": "Item eliminado exitosamente"
    }
    ```
* **Error (404 Not Found):**
    ```json
    {
      "success": false,
      "error": "Item no encontrado"
    }
    ```
---

### 📊 Códigos de Estado HTTP Utilizados

| Código | Significado | Uso en la API |
| :--- | :--- | :--- |
| **200** | OK | Operaciones GET y DELETE exitosas |
| **201** | Created | Item creado correctamente (POST) |
| **400** | Bad Request | Datos inválidos o incompletos |
| **404** | Not Found | Item no encontrado |
| **500** | Internal Server Error | Error del servidor |
    
## Capturas de Pantalla

## 📌 Conclusiones

### Miguel Avilez
**Arquitectura REST:** Se logró implementar exitosamente una API REST siguiendo los principios fundamentales de arquitectura orientada a recursos, donde cada endpoint representa una operación específica sobre los datos.

**Framework Express:** Express demostró ser un framework ligero pero poderoso para la creación rápida de servidores HTTP, facilitando el manejo de rutas, middlewares y respuestas JSON de manera eficiente.

Esta práctica también resaltó la relevancia de los códigos de estado HTTP para la comunicación efectiva entre cliente y servidor, así como la necesidad de mantener una estructura modular y ordenada en el código para facilitar el mantenimiento y la escalabilidad futura del proyecto.


### Jannys Garrido
**Protocolo HTTP:** La práctica permitió comprender en profundidad el uso de métodos HTTP estándar (GET, POST, DELETE) y la importancia de retornar códigos de estado apropiados para cada tipo de operación.

**Modelo Cliente-Servidor:** Se evidenció el flujo completo de comunicación: el cliente envía una solicitud HTTP, el servidor la procesa mediante controladores específicos y retorna una respuesta estructurada en formato JSON.

El uso de un arreglo en memoria como fuente de datos facilitó el enfoque en la lógica de negocio y el flujo de solicitudes y respuestas, permitiendo experimentar con la manipulación de datos en formato JSON y la validación de entradas. Además, la integración de herramientas como Postman para la prueba de los endpoints resultó esencial para verificar el correcto funcionamiento de la API y detectar posibles errores o mejoras.

### Steven Tintín
**Validación de Datos:** La implementación de validaciones en el servidor es fundamental para garantizar la integridad de los datos y prevenir errores en operaciones posteriores.

**Desarrollo Modular:** La separación de responsabilidades en capas (rutas, controladores, configuración) facilita el mantenimiento y escalabilidad del proyecto.

La implementación de una API REST utilizando Node.js y Express permitió comprender de manera práctica los principios fundamentales de la arquitectura REST y el desarrollo backend moderno. A través de la creación de endpoints para operaciones CRUD básicas, se evidenció la importancia de estructurar correctamente las rutas, manejar adecuadamente los métodos HTTP y retornar respuestas claras y apropiadas para cada situación.


## 💡 Recomendaciones

### Miguel Avilez
**Persistencia de datos:** Para proyectos reales, se recomienda reemplazar el almacenamiento en memoria por una base de datos (como MongoDB, PostgreSQL o MySQL) para garantizar la persistencia y seguridad de la información.

**Validación y manejo de errores:** Es fundamental implementar validaciones más robustas y un manejo centralizado de errores para mejorar la confiabilidad y la experiencia del usuario.

### Jannys Garrido
**Seguridad:** Proteger los endpoints mediante autenticación y autorización (por ejemplo, usando JWT) y aplicar buenas prácticas de seguridad como la sanitización de entradas y la configuración adecuada de CORS.

**Documentación:** Mantener una documentación clara y actualizada de la API, preferiblemente utilizando herramientas como Swagger/OpenAPI, para facilitar el uso y la integración por parte de otros desarrolladores.


### Steven Tintín
**Testing:** Implementar pruebas automatizadas (unitarias e integrales) para asegurar el correcto funcionamiento de la API ante cambios futuros.

**Escalabilidad y mantenimiento:** Adoptar una arquitectura modular, separar responsabilidades (rutas, controladores, servicios) y seguir convenciones de estilo de código para facilitar el trabajo en equipo y el crecimiento del proyecto.

**Monitoreo y logging:** Incorporar herramientas de monitoreo y registro de logs para detectar y solucionar problemas en producción de manera eficiente.

## 📚 Referencias

- MDN Web Docs. JavaScript Guide. Mozilla Foundation. Disponible en: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide

- MDN Web Docs. Manipulación del DOM. Mozilla Foundation. Disponible en: https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction

- MDN Web Docs. Validación de formularios. Mozilla Foundation. Disponible en: https://developer.mozilla.org/es/docs/Learn/Forms/Form_validation

- MDN Web Docs. Fetch API. Mozilla Foundation. Disponible en: https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch

- W3C. WAI-ARIA Authoring Practices 1.2. World Wide Web Consortium (W3C). Disponible en: https://www.w3.org/TR/wai-aria-practices-1.2/

- Duckett, J. (2015). JavaScript y jQuery: Desarrollo web interactivo. Editorial Anaya Multimedia.

- Flanagan, D. (2020). JavaScript: The Definitive Guide, 7th Edition. O'Reilly Media.



