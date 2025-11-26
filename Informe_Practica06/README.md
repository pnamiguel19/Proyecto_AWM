# 🎓  Nombre de la aplicacion: 
- EduMatch
## 📘 Descripcion de la Practica 06

## Descripción breve del objetivo de la práctica
El objetivo principal de esta práctica es evolucionar el prototipo estático de EduMatch hacia una Single Page Application (SPA) dinámica y escalable utilizando la librería React. Se busca transformar la estructura previa de HTML y JavaScript en una arquitectura basada en componentes funcionales, permitiendo la reutilización de código en vistas clave (como perfiles de profesores y catálogos de cursos). Además, se implementa la gestión de estado mediante Hooks (useState, useEffect) y el flujo de datos a través de Props, garantizando una interfaz interactiva y modular que facilite futuras expansiones del sistema de agendamiento y monetización.

## Documentación de pasos de migración y cambios realizados
Para la migración de EduMatch a React, se siguió un proceso estructurado que transformó la lógica y presentación de la aplicación. A continuación, se detallan los pasos y cambios técnicos:

## 1. Configuración del Entorno y Estructura Modular

Inicialización: Se creó el proyecto base utilizando una herramienta de construcción moderna (ej. Vite/Create React App) para optimizar el entorno de desarrollo.

Organización: Se reestructuró el proyecto separando la lógica en carpetas específicas: /components (elementos reutilizables), /pages (vistas principales como Home, Búsqueda, Perfil), /assets (imágenes y estilos) y /utils (datos simulados).

## 2. Componentización de Vistas (HTML a JSX)

Descomposición: Se identificaron patrones repetitivos en el prototipo original. Elementos como la barra de navegación, el pie de página, y las tarjetas de presentación de los profesores se convirtieron en componentes independientes (Navbar.jsx, Footer.jsx, TeacherCard.jsx).

Sintaxis JSX: Se migró todo el código HTML a JSX, ajustando atributos (ej. class por className, cierre de etiquetas img/input) para cumplir con los estándares de React.

## 3. Implementación de Props para Flujo de Datos

Dinamismo: En lugar de "quemar" (hardcode) la información de cada profesor en el HTML, se implementó el paso de parámetros mediante Props. Ahora, un solo componente TeacherCard puede renderizar distintos perfiles (nombre, materia, calificación, foto) según los datos que reciba.

Validación: Se definieron los tipos de datos esperados para asegurar que la información crítica (como el precio por hora o la ubicación) se visualice correctamente.

## 4. Gestión de Estado y Hooks (Lógica Interactiva)

useState: Se reemplazaron las variables globales de JavaScript por estados locales. Ejemplos aplicados en EduMatch:

Control del formulario de búsqueda y filtros (presencial vs. virtual).

Manejo de la visibilidad de menús desplegables en versión móvil.

Gestión de datos en formularios de contacto/login.

useEffect: Se implementó este hook para simular la carga inicial de datos (lista de profesores o cursos) al montar los componentes, preparando el terreno para futuras conexiones con una API real.

## 5. Manejo de Eventos y Formularios Controlados

Inputs Vinculados: Los campos de entrada (búsqueda de materias, registro de usuarios) se convirtieron en componentes controlados, donde React es la única fuente de la verdad, permitiendo validaciones en tiempo real antes de enviar la información.

## 📌 Conclusiones:
### Miguel Avilez
- Aumento Significativo de la Modularidad y Reutilización de Código: La transición a la arquitectura de componentes funcionales de React ha sido crucial para desglosar la interfaz de usuario en piezas independientes y manejables. Elementos como Navbar.jsx, Footer.jsx, y especialmente TeacherCard.jsx, ya no son bloques monolíticos de HTML, sino funciones reutilizables. Esto se traduce en una reducción drástica del código duplicado y establece la base para un desarrollo más rápido y consistente. El uso de Props garantiza que un mismo layout de tarjeta pueda mostrar perfiles variados, lo cual es fundamental para el catálogo de profesores de EduMatch.

- Preparación para la Escalabilidad y Conexión con Backend: La implementación de Hooks como useState y useEffect transforma la aplicación de una simple maqueta de presentación a un sistema capaz de manejar lógica de aplicación compleja. Al simular la carga inicial de datos con useEffect, se establece el patrón correcto para el futuro: el componente sabrá qué hacer (obtener datos) justo después de montarse, desacoplando la presentación de la fuente de datos. Esta estructura es la clave para una migración fluida hacia una arquitectura full-stack con una API real para gestionar el agendamiento y la monetización.

### Jannys Garrido
- Mejora en la Experiencia de Usuario a través de la Reactividad: La adopción de la gestión de estado con useState elimina la necesidad de manipular directamente el DOM (Document Object Model) de forma manual. Esto resulta en una interfaz mucho más reactiva y eficiente. La visibilidad de menús desplegables o la actualización de los resultados de búsqueda son ahora inmediatas, ya que React solo actualiza los componentes específicos que han cambiado. Este dinamismo inherente a las SPA mejora la percepción de velocidad y fluidez por parte del usuario de EduMatch.

- Flujo de Datos Unidireccional y Mantenibilidad Optimizada: El uso estricto de Props para el flujo de datos (de padre a hijo) fuerza una arquitectura de datos unidireccional más predecible que el uso de variables globales de JavaScript. Esta predictibilidad es vital para una aplicación que busca gestionar transacciones y agendamiento. Al centralizar la "fuente de la verdad" en el estado del componente padre y pasarlo hacia abajo, se facilita la depuración de errores y el mantenimiento del código, ya que es claro dónde y cuándo se originan los datos para cada componente.
### Steven Tintín

- Estandarización del Manejo de Formularios (Componentes Controlados): La conversión de inputs HTML en componentes controlados le da a React el control total sobre el estado del formulario en todo momento. En el contexto de EduMatch (registro, login, filtros de búsqueda), esto es esencial. Permite implementar validaciones en tiempo real (ej. formato de correo electrónico, disponibilidad de horarios) de manera eficiente, previniendo el envío de datos incorrectos al servidor. Además, estandariza cómo se capturan los datos, haciendo que la lógica de la aplicación sea más robusta.

- Adopción de una Sintaxis Moderna y Developer Experience Superior: El cambio del markup tradicional al estándar JSX (JavaScript XML) permite a los desarrolladores escribir lógica de JavaScript y estructura de interfaz en el mismo archivo, mejorando la experiencia de desarrollo (Developer Experience). Junto con la configuración del entorno moderno (como Vite/Create React App), se ha establecido una pipeline de desarrollo que incluye recarga en caliente y optimizaciones, lo cual es clave para el desarrollo ágil y la incorporación de futuros features de EduMatch.

## 💡Recomendaciones:
### Miguel Avilez

- Aunque la aplicación ya es una SPA gracias a React, para manejar las rutas y asegurar que el usuario pueda navegar entre las pages (/home, /busqueda, /perfil/:id) sin recargar la página y que el Deep Linking funcione (poder compartir un enlace directo), es fundamental integrar una librería de routing.
- Actualmente, el estado se maneja localmente con useState. Sin embargo, a medida que EduMatch crezca y necesite compartir datos complejos (ej. el perfil del usuario autenticado, la lista completa de profesores filtrados) entre componentes distantes, el "Prop Drilling" (pasar props innecesariamente a través de varios niveles) se volverá inmanejable.

### Jannys Garrido

- La funcionalidad de agendamiento y monetización será el núcleo de EduMatch. Asegurar que los componentes más importantes (TeacherCard, formularios controlados, lógica de filtros) funcionen como se espera es crucial antes de conectarlos a un backend transaccional.
- Una SPA con muchos componentes puede volverse lenta si se renderizan innecesariamente. En una lista como el catálogo de profesores, si un componente padre cambia un estado menor, no es necesario que todas las TeacherCard se vuelvan a renderizar.

### Steven Tintín

- El prototipo actual tiene estilos migrados, pero para garantizar la coherencia visual y acelerar el desarrollo futuro de nuevas vistas (ej. dashboard de profesor, checkout), es vital definir un marco de estilos sólido.
- Si bien se documentó la validación de props, a medida que el proyecto crezca y el equipo se expanda, el riesgo de errores por tipos de datos incorrectos (ej. esperando un número, recibiendo una cadena) aumenta.
