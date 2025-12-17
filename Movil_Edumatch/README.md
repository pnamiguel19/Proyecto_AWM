# 📱 EduMatch - Aplicación Móvil (Mockups HTML/CSS)

## 📋 Descripción

Este proyecto contiene todos los mockups HTML/CSS de la aplicación móvil EduMatch, adaptados para dispositivos móviles con diseño responsive y las mismas funcionalidades que la aplicación web.

## 🎨 Paleta de Colores

La aplicación utiliza la misma paleta de colores que la versión web:

- **Color Principal (Cyan):** `#00bcd4`
- **Cyan Oscuro:** `#00acc1`
- **Cyan Claro:** `#b2ebf2`
- **Secundario (Amarillo):** `#ffb300`
- **Peligro (Rojo):** `#e53935`
- **Éxito (Verde):** `#4caf50`
- **Fondo:** `#f5f7fa`
- **Tarjetas:** `#ffffff`
- **Texto Principal:** `#333333`
- **Texto Secundario:** `#777777`

## 📁 Estructura del Proyecto

```
Movil_Edumatch/
├── auth/                          # Autenticación
│   ├── login.html                 # Inicio de sesión
│   ├── registro.html              # Registro de usuario
│   └── recuperar-password.html    # Recuperación de contraseña
│
├── home/                          # Página principal
│   └── home.html                  # Inicio con búsqueda y categorías
│
├── student/                       # Vistas del estudiante
│   ├── buscar-profesores.html     # Búsqueda y filtrado de profesores
│   ├── mis-clases.html            # Gestión de clases del estudiante
│   ├── perfil.html                # Perfil del estudiante
│   ├── mensajes.html              # Mensajería
│   ├── perfil-profesor.html       # Vista detallada del profesor
│   └── resenas.html               # Sistema de reseñas
│
├── profesor/                      # Vistas del profesor
│   ├── dashboard-prof.html        # Panel de control del profesor
│   ├── perfil-prof.html           # Perfil del profesor
│   ├── mis-clases-prof.html       # Gestión de clases del profesor
│   └── mis-cursos.html            # Gestión de cursos
│
├── booking/                       # Sistema de agendamiento
│   └── agendar-clase.html         # Formulario de reserva de clases
│
└── styles/                        # Estilos CSS
    ├── variables.css              # Variables globales
    ├── global.css                 # Estilos globales y componentes
    ├── auth.css                   # Estilos de autenticación
    ├── home.css                   # Estilos de la página principal
    ├── student.css                # Estilos del estudiante
    ├── profesor.css               # Estilos del profesor
    ├── booking.css                # Estilos de agendamiento
    ├── teacher-profile.css        # Estilos del perfil del profesor
    └── reviews.css                # Estilos de reseñas
```

## 🚀 Funcionalidades Implementadas

### Autenticación
- ✅ Login con email y contraseña
- ✅ Registro de usuarios (estudiante/profesor)
- ✅ Recuperación de contraseña
- ✅ Login social (Google, Facebook)

### Estudiante
- ✅ Búsqueda de profesores con filtros
- ✅ Vista de perfil completo del profesor
- ✅ Sistema de agendamiento de clases
- ✅ Gestión de clases (próximas, pasadas, canceladas)
- ✅ Sistema de mensajería
- ✅ Perfil del estudiante
- ✅ Sistema de reseñas y calificaciones
- ✅ Favoritos

### Profesor
- ✅ Dashboard con estadísticas
- ✅ Gestión de clases (pendientes, confirmadas, completadas)
- ✅ Gestión de cursos
- ✅ Perfil profesional
- ✅ Solicitudes de clases
- ✅ Historial de clases
- ✅ Configuración de disponibilidad

### Características Móviles
- ✅ Navegación inferior (Bottom Navigation)
- ✅ Header móvil sticky
- ✅ Diseño responsive
- ✅ Tarjetas táctiles optimizadas
- ✅ Botones flotantes (FAB)
- ✅ Modales y overlays
- ✅ Scroll horizontal para listas
- ✅ Gestos táctiles optimizados

## 🎯 Componentes Reutilizables

### Botones
```html
<button class="btn btn-primary">Botón Principal</button>
<button class="btn btn-secondary">Botón Secundario</button>
<button class="btn btn-outline">Botón Outline</button>
<button class="btn btn-danger">Botón Peligro</button>
```

### Tarjetas
```html
<div class="card">
    <!-- Contenido -->
</div>
```

### Badges
```html
<span class="badge badge-primary">Badge</span>
<span class="badge badge-success">Éxito</span>
<span class="badge badge-warning">Advertencia</span>
<span class="badge badge-danger">Peligro</span>
```

### Inputs
```html
<div class="input-group">
    <label for="campo">Etiqueta</label>
    <input type="text" id="campo" placeholder="Placeholder">
</div>
```

### Rating (Estrellas)
```html
<div class="rating">
    <span class="star">★</span>
    <span class="star">★</span>
    <span class="star">★</span>
    <span class="star">★</span>
    <span class="star">★</span>
</div>
```

### Avatar
```html
<img src="imagen.jpg" alt="Usuario" class="avatar">
<img src="imagen.jpg" alt="Usuario" class="avatar avatar-lg">
```

## 📱 Navegación Bottom Nav

Todas las páginas principales incluyen navegación inferior:

```html
<nav class="bottom-nav">
    <a href="home.html" class="nav-item active">
        <span class="nav-icon">🏠</span>
        <span>Inicio</span>
    </a>
    <!-- Más items -->
</nav>
```

## 🎨 Personalización de Estilos

Las variables CSS están centralizadas en `styles/variables.css`:

```css
:root {
  --em-primary: #00bcd4;
  --em-spacing-md: 16px;
  --em-font-md: 16px;
  /* ... más variables */
}
```

## 📐 Sistema de Grid

Grid de 2 columnas:
```html
<div class="grid-2">
    <div>Columna 1</div>
    <div>Columna 2</div>
</div>
```

## 🔧 Utilidades

### Espaciado
- `mt-1`, `mt-2`, `mt-3`, `mt-4` - Margin top
- `mb-1`, `mb-2`, `mb-3`, `mb-4` - Margin bottom

### Texto
- `text-muted` - Texto secundario
- `text-primary` - Texto color principal
- `text-center` - Texto centrado
- `text-sm` - Texto pequeño
- `text-lg` - Texto grande

### Flexbox
- `flex-between` - Espacio entre elementos
- `flex-center` - Centrado completo

## 🌐 Compatibilidad

Los mockups están optimizados para:
- Dispositivos móviles (320px - 480px)
- Tablets (481px - 768px)
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

## 📝 Notas de Implementación

1. **Imágenes placeholder:** Actualmente se usan imágenes de `placeholder.com`. Reemplazar con imágenes reales.
2. **Enlaces:** Los enlaces están conectados entre páginas para navegación completa.
3. **Iconos:** Se utilizan emojis para los iconos. Considerar reemplazar con Font Awesome o similar.
4. **Funcionalidad JavaScript:** Los mockups son estáticos. Requieren JavaScript para funcionalidad completa.

## 🔄 Próximos Pasos

- [ ] Agregar JavaScript para interactividad
- [ ] Implementar validación de formularios
- [ ] Conectar con backend/API
- [ ] Agregar animaciones y transiciones
- [ ] Implementar Progressive Web App (PWA)
- [ ] Optimizar rendimiento
- [ ] Testing en dispositivos reales

## 👥 Equipo

- Miguel Avilez
- Jannys Garrido
- Steven Tintín

## 📅 Fecha de Creación

Diciembre 2025

---

**EduMatch** - Conecta con los mejores profesores 📚
