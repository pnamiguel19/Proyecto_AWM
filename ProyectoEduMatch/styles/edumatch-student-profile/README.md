# edumatch-student-profile

Este proyecto es una aplicación web diseñada para gestionar perfiles de estudiantes en la plataforma EduMatch. Permite a los estudiantes crear y editar su perfil, así como interactuar con otros usuarios y acceder a recursos educativos.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
edumatch-student-profile
├── public
│   └── index.html          # Plantilla HTML principal
├── src
│   ├── main.jsx            # Punto de entrada de la aplicación
│   ├── App.jsx             # Componente principal de la aplicación
│   ├── App.css             # Estilos globales
│   ├── index.css           # Estilos adicionales
│   ├── assets
│   │   └── styles
│   │       ├── base
│   │       │   ├── reset.css          # Restablecimiento de estilos
│   │       │   ├── typography.css      # Estilos tipográficos
│   │       │   └── variables.css       # Variables CSS
│   │       ├── layout
│   │       │   └── container.css       # Estilos de contenedores
│   │       └── components
│   │           ├── header.css          # Estilos del encabezado
│   │           ├── sidebar.css         # Estilos de la barra lateral
│   │           ├── profile-card.css     # Estilos de la tarjeta de perfil
│   │           ├── badges.css          # Estilos de insignias
│   │           ├── buttons.css         # Estilos de botones
│   │           └── cards.css           # Estilos de tarjetas
│   ├── components
│   │   ├── common
│   │   │   ├── Button                  # Componente de botón
│   │   │   ├── Badge                   # Componente de insignia
│   │   ├── layout
│   │   │   ├── Header                  # Componente de encabezado
│   │   │   └── Sidebar                 # Componente de barra lateral
│   │   └── profile
│   │       ├── ProfileCard             # Componente de tarjeta de perfil
│   │       ├── ProfileImage            # Componente de imagen de perfil
│   │       ├── VerificationSection      # Componente de sección de verificación
│   │       └── ReviewsSection          # Componente de sección de reseñas
│   ├── pages
│   │   └── StudentProfile               # Página de perfil del estudiante
│   ├── hooks
│   │   └── useStudentData.js            # Hook personalizado para datos del estudiante
│   ├── services
│   │   └── studentService.js            # Servicio para interactuar con la API de estudiantes
│   └── utils
│       └── constants.js                 # Constantes utilizadas en la aplicación
├── package.json                         # Configuración del proyecto
├── vite.config.js                       # Configuración de Vite
└── README.md                            # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:
   ```
   cd edumatch-student-profile
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Inicia la aplicación:
   ```
   npm run dev
   ```

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.