
Descripción breve del objetivo de la práctica
El objetivo principal de esta práctica es evolucionar el prototipo estático de EduMatch hacia una Single Page Application (SPA) dinámica y escalable utilizando la librería React. Se busca transformar la estructura previa de HTML y JavaScript en una arquitectura basada en componentes funcionales, permitiendo la reutilización de código en vistas clave (como perfiles de profesores y catálogos de cursos). Además, se implementa la gestión de estado mediante Hooks (useState, useEffect) y el flujo de datos a través de Props, garantizando una interfaz interactiva y modular que facilite futuras expansiones del sistema de agendamiento y monetización.

Documentación de pasos de migración y cambios realizados
Para la migración de EduMatch a React, se siguió un proceso estructurado que transformó la lógica y presentación de la aplicación. A continuación, se detallan los pasos y cambios técnicos:

1. Configuración del Entorno y Estructura Modular

Inicialización: Se creó el proyecto base utilizando una herramienta de construcción moderna (ej. Vite/Create React App) para optimizar el entorno de desarrollo.

Organización: Se reestructuró el proyecto separando la lógica en carpetas específicas: /components (elementos reutilizables), /pages (vistas principales como Home, Búsqueda, Perfil), /assets (imágenes y estilos) y /utils (datos simulados).

2. Componentización de Vistas (HTML a JSX)

Descomposición: Se identificaron patrones repetitivos en el prototipo original. Elementos como la barra de navegación, el pie de página, y las tarjetas de presentación de los profesores se convirtieron en componentes independientes (Navbar.jsx, Footer.jsx, TeacherCard.jsx).

Sintaxis JSX: Se migró todo el código HTML a JSX, ajustando atributos (ej. class por className, cierre de etiquetas img/input) para cumplir con los estándares de React.

3. Implementación de Props para Flujo de Datos

Dinamismo: En lugar de "quemar" (hardcode) la información de cada profesor en el HTML, se implementó el paso de parámetros mediante Props. Ahora, un solo componente TeacherCard puede renderizar distintos perfiles (nombre, materia, calificación, foto) según los datos que reciba.

Validación: Se definieron los tipos de datos esperados para asegurar que la información crítica (como el precio por hora o la ubicación) se visualice correctamente.

4. Gestión de Estado y Hooks (Lógica Interactiva)

useState: Se reemplazaron las variables globales de JavaScript por estados locales. Ejemplos aplicados en EduMatch:

Control del formulario de búsqueda y filtros (presencial vs. virtual).

Manejo de la visibilidad de menús desplegables en versión móvil.

Gestión de datos en formularios de contacto/login.

useEffect: Se implementó este hook para simular la carga inicial de datos (lista de profesores o cursos) al montar los componentes, preparando el terreno para futuras conexiones con una API real.

5. Manejo de Eventos y Formularios Controlados

Inputs Vinculados: Los campos de entrada (búsqueda de materias, registro de usuarios) se convirtieron en componentes controlados, donde React es la única fuente de la verdad, permitiendo validaciones en tiempo real antes de enviar la información.
