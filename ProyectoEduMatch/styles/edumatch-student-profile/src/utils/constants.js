export const API_URL = "https://api.edumatch.com"; // URL base para la API

export const STUDENT_PROFILE_DEFAULT_IMAGE = "https://via.placeholder.com/150"; // Imagen de perfil por defecto

export const ROLES = {
    STUDENT: "Estudiante",
    TEACHER: "Profesor",
    ADMIN: "Administrador",
}; // Roles disponibles en la aplicación

export const SIDEBAR_MENU_ITEMS = [
    { label: "Información sobre mí", icon: "👤", path: "/profile" },
    { label: "Mis Clases", icon: "📚", path: "/classes" },
    { label: "Conexiones", icon: "👥", path: "/connections" },
]; // Elementos del menú de la barra lateral

export const VERIFICATION_STATUS = {
    VERIFIED: "Identidad verificada",
    UNVERIFIED: "Identidad no verificada",
}; // Estados de verificación del usuario