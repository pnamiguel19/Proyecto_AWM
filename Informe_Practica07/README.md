# 🎓 Nombre de la aplicación: 
- EduMatch

## 📘 Descripción de la Práctica 07

## Descripción breve del objetivo de la práctica
El objetivo principal de esta práctica es integrar un módulo básico de backend con las vistas del frontend de EduMatch mediante solicitudes HTTP. Se busca establecer una comunicación efectiva entre el cliente y el servidor, consumiendo datos provenientes de un servidor simulado (API local o mock) para mostrarlos dinámicamente en el frontend. Además, se implementa el envío de información desde formularios hacia el backend y el procesamiento de las respuestas retornadas. Esta práctica permite comprender el flujo completo cliente–servidor mediante operaciones CRUD simples, asegurando que el prototipo mantenga coherencia entre interfaz, lógica y comunicación con el backend.

## 📋 Documentación de implementación y cambios realizados

### 1. Configuración del Backend

**Inicialización del servidor:** Se implementó un backend básico utilizando Node.js + Express (o JSON Server como alternativa) para proporcionar una API REST que gestiona los datos de la aplicación.

**Estructura del proyecto:** Se organizó el backend en una arquitectura modular, separando rutas, controladores y modelos de datos para facilitar el mantenimiento y escalabilidad.

**Configuración de CORS:** Se habilitó Cross-Origin Resource Sharing (CORS) para permitir que el frontend en React pueda comunicarse con el backend sin restricciones de origen cruzado.

### 2. Creación de Endpoints REST

Se implementaron los siguientes endpoints básicos para gestionar las operaciones CRUD:

**GET /items:** Endpoint para obtener la lista completa de elementos (profesores, cursos, reservas, etc.) almacenados en el servidor.

**POST /items:** Endpoint para crear nuevos elementos enviando datos desde formularios del frontend.

**PUT/PATCH /items/:id:** Endpoint para actualizar información de elementos existentes.

**DELETE /items/:id:** Endpoint para eliminar elementos específicos mediante su identificador único.

Cada endpoint retorna respuestas en formato JSON con códigos de estado HTTP apropiados (200, 201, 404, 500).

### 3. Consumo de API desde el Frontend

**Implementación de fetch():** Se utilizó la API Fetch de JavaScript para realizar solicitudes HTTP asíncronas desde los componentes de React hacia el backend.

**Operaciones GET:** Se implementó la carga dinámica de datos al montar los componentes mediante `useEffect`, reemplazando los datos mock estáticos por información proveniente del servidor.

**Operaciones POST:** Se configuraron los formularios para enviar datos (registro de usuarios, creación de perfiles de profesores, agendamiento de clases) al backend y procesar las respuestas.

**Operaciones DELETE:** Se añadió funcionalidad para eliminar elementos desde la interfaz, actualizando el estado local tras confirmación del servidor.

### 4. Renderizado Dinámico de Respuestas

**Actualización del DOM:** Se implementó la renderización dinámica de las respuestas del servidor en el DOM, actualizando listas, mostrando mensajes de confirmación y manejando estados de carga.

**Manejo de estados:** Se utilizaron hooks de React (`useState`) para gestionar el estado de carga (loading), datos recibidos (data) y errores (error) durante las peticiones HTTP.

**Feedback visual:** Se añadieron indicadores de carga, mensajes de éxito y manejo de errores para mejorar la experiencia del usuario durante las operaciones asíncronas.

### 5. Validación de Comunicación Cliente–Servidor

**Flujo completo:** Se validó el ciclo completo: solicitud del cliente → procesamiento en el servidor → respuesta del servidor → actualización en pantalla.

**Pruebas con Postman:** Se realizaron pruebas de los endpoints utilizando Postman para verificar la correcta funcionalidad antes de integrarlos con el frontend.

**Manejo de errores:** Se implementó lógica para capturar y mostrar errores de red, respuestas del servidor con códigos de error, y validaciones fallidas.

### 6. Estructura de Datos JSON

Se preparó una estructura de datos JSON de prueba que representa las entidades principales de EduMatch:

- **Usuarios:** Información de estudiantes y profesores (nombre, email, contraseña, rol).
- **Profesores:** Perfiles detallados con materias, experiencia, calificaciones, tarifas.
- **Cursos/Materias:** Catálogo de cursos disponibles con descripción y categorías.
- **Reservas/Agendamiento:** Registro de clases programadas con fechas, horarios y estados.


## 📌 Conclusiones

### Miguel Avilez
**Comprensión del Modelo Cliente–Servidor y Arquitectura Full-Stack:** La implementación de un backend básico con Node.js + Express ha permitido comprender de manera práctica el modelo cliente–servidor y cómo una aplicación web moderna se estructura en capas. La separación clara entre el frontend (React) y el backend (API REST) establece una arquitectura escalable y mantenible. Esta experiencia es fundamental para el desarrollo de aplicaciones full-stack, donde cada capa tiene responsabilidades bien definidas: el frontend gestiona la presentación y experiencia del usuario, mientras que el backend maneja la lógica de negocio, validación de datos y persistencia.

**Implementación de Operaciones CRUD y API REST:** La creación de endpoints básicos (GET, POST, DELETE) ha consolidado el entendimiento de las operaciones CRUD (Create, Read, Update, Delete) como base de cualquier aplicación que gestiona datos. En el contexto de EduMatch, estos endpoints son la columna vertebral para gestionar profesores, estudiantes, cursos y reservas. La implementación de una API REST siguiendo las convenciones estándar (uso correcto de métodos HTTP, códigos de estado, formato JSON) prepara el proyecto para futuras expansiones hacia funcionalidades más complejas como autenticación, pagos y notificaciones en tiempo real.

### Jannys Garrido
**Uso Efectivo de la API Fetch y Programación Asíncrona:** La utilización de `fetch()` para consumir los endpoints del backend ha reforzado el conocimiento sobre programación asíncrona en JavaScript. El manejo de Promesas, async/await, y la gestión de estados de carga, éxito y error son competencias esenciales para cualquier desarrollador frontend moderno. En EduMatch, esto se traduce en una interfaz que responde de manera fluida a las acciones del usuario, mostrando indicadores de carga mientras se procesan las solicitudes y manejando errores de forma elegante sin romper la experiencia del usuario.

**Sincronización de Estado entre Cliente y Servidor:** La integración frontend–backend ha evidenciado la importancia de mantener sincronizado el estado del cliente con los datos del servidor. Mediante `useEffect`, se logra cargar datos frescos al montar componentes, y mediante actualizaciones optimistas o refetching tras operaciones POST/DELETE, se garantiza que el usuario siempre vea información actualizada. Esta sincronización es crítica en EduMatch, donde la disponibilidad de profesores, horarios de clases y reservas deben reflejarse en tiempo real para evitar conflictos de agendamiento.

### Steven Tintín
**Validación Bidireccional y Robustez de Formularios:** La implementación de validaciones tanto en el frontend (componentes controlados de React) como en el backend (validación de datos recibidos en los endpoints) ha demostrado la importancia de un enfoque de defensa en profundidad. No se debe confiar únicamente en las validaciones del cliente, ya que pueden ser eludidas. En EduMatch, formularios como registro de usuarios, creación de perfiles de profesores y agendamiento de clases requieren validaciones estrictas para garantizar la integridad de los datos y prevenir errores o ataques de seguridad.

**Flujo Completo de Datos y Debugging Cliente–Servidor:** La validación del flujo completo (solicitud → procesamiento → respuesta → actualización en pantalla) mediante herramientas como Postman y las DevTools del navegador ha desarrollado habilidades críticas de debugging en aplicaciones full-stack. Identificar si un error proviene del frontend (solicitud mal formada), del backend (lógica incorrecta en el endpoint) o de la red (problemas de conectividad/CORS) es una competencia esencial. Esta capacidad de diagnosticar y resolver problemas en toda la pila tecnológica acelera el desarrollo y mejora la calidad del código de EduMatch.

## 💡 Recomendaciones

### Miguel Avilez
**Implementar Autenticación y Autorización:** Ahora que el flujo cliente–servidor está establecido, el siguiente paso crítico es implementar un sistema de autenticación (login/registro con JWT o sesiones) y autorización (control de acceso basado en roles: estudiante, profesor, admin). EduMatch maneja información sensible de usuarios y transacciones, por lo que proteger los endpoints mediante tokens de autenticación y validar permisos en cada operación es fundamental para la seguridad de la aplicación.

**Migrar a una Base de Datos Persistente:** Actualmente, el backend utiliza datos en memoria o archivos JSON. Para un entorno de producción, es esencial migrar a una base de datos relacional (PostgreSQL, MySQL) o NoSQL (MongoDB) que garantice persistencia, integridad referencial y capacidad de consulta eficiente. Esto permitirá gestionar el crecimiento de usuarios, profesores y reservas en EduMatch de manera escalable.

### Jannys Garrido
**Implementar Manejo de Errores Centralizado:** Establecer un sistema de manejo de errores consistente tanto en el frontend (mediante componentes de error boundaries o estados globales) como en el backend (middleware de manejo de errores) mejorará la experiencia del usuario y facilitará el debugging. Mostrar mensajes de error claros y accionables (ej. "El profesor seleccionado no está disponible en ese horario") en lugar de errores técnicos genéricos aumenta la usabilidad de EduMatch.

**Optimizar Rendimiento con Caché y Paginación:** A medida que el catálogo de profesores y cursos crezca, cargar todos los datos de una vez se volverá ineficiente. Implementar paginación en el backend (GET /teachers?page=1&limit=10) y técnicas de caché en el frontend (usando librerías como React Query o SWR) mejorará significativamente el rendimiento y la experiencia del usuario en EduMatch, especialmente en dispositivos móviles con conexiones lentas.

### Steven Tintín
**Documentar la API con Swagger/OpenAPI:** A medida que el backend crece y el equipo se expande (o se integra con otros sistemas), documentar formalmente la API REST utilizando estándares como Swagger/OpenAPI es crucial. Esta documentación proporciona una referencia clara de todos los endpoints, parámetros esperados, formatos de respuesta y códigos de error, facilitando el desarrollo frontend, las pruebas y la integración con terceros en EduMatch.

**Implementar Testing Automatizado:** Establecer una suite de pruebas automatizadas tanto para el frontend (testing de componentes con React Testing Library) como para el backend (testing de endpoints con Jest/Supertest) garantizará que nuevas funcionalidades no rompan características existentes. En una aplicación como EduMatch, donde la lógica de agendamiento y pagos es crítica, las pruebas automatizadas son esenciales para mantener la calidad y confiabilidad del sistema a lo largo del tiempo.

## 📸 Capturas de Pantalla

*(En esta sección se deben incluir capturas de pantalla mostrando:)*

- Carga dinámica de datos desde el backend (lista de profesores, cursos, etc.)
- Envío de información desde formularios (registro, creación de perfil, agendamiento)
- Actualización de la interfaz tras operaciones exitosas
- Funcionamiento de operaciones GET, POST, DELETE
- Manejo de estados de carga y errores
- Pruebas en Postman de los endpoints implementados

## 📚 Referencias

- MDN Web Docs. JavaScript Guide. Mozilla Foundation. Disponible en: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide

- MDN Web Docs. Manipulación del DOM. Mozilla Foundation. Disponible en: https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction

- MDN Web Docs. Validación de formularios. Mozilla Foundation. Disponible en: https://developer.mozilla.org/es/docs/Learn/Forms/Form_validation

- MDN Web Docs. Fetch API. Mozilla Foundation. Disponible en: https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch

- W3C. WAI-ARIA Authoring Practices 1.2. World Wide Web Consortium (W3C). Disponible en: https://www.w3.org/TR/wai-aria-practices-1.2/

- Duckett, J. (2015). JavaScript y jQuery: Desarrollo web interactivo. Editorial Anaya Multimedia.

- Flanagan, D. (2020). JavaScript: The Definitive Guide, 7th Edition. O'Reilly Media.



