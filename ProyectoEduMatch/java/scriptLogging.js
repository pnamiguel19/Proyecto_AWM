/**
 * FORMULARIO DE LOGIN / INICIO DE SESIÓN
 * Manejo de DOM, validaciones y eventos con notificaciones
 */

// ================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ================================
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const submitBtn = document.getElementById('submitBtn');
const googleBtn = document.getElementById('googleBtn');
const facebookBtn = document.getElementById('facebookBtn');
const notificationContainer = document.getElementById('notificationContainer');

// Elementos de error
const errorEmail = document.getElementById('error-email');
const errorPassword = document.getElementById('error-password');

// ================================
// SISTEMA DE NOTIFICACIONES
// ================================

/**
 * Muestra una notificación flotante
 * @param {string} type - 'success' o 'error'
 * @param {string} icon - Emoji o icono
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración en ms (0 = sin auto-remover)
 */
function showNotification(type, icon, message, duration = 4000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');

    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    if (duration > 0) {
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }

    console.log(`📢 [${type.toUpperCase()}] ${message}`);
}

/**
 * Muestra notificación de éxito
 */
function showSuccess(message, duration = 4000) {
    showNotification('success', '✅', message, duration);
}

/**
 * Muestra notificación de error
 */
function showError(message, duration = 5000) {
    showNotification('error', '❌', message, duration);
}

// ================================
// OBJETO CON REGLAS DE VALIDACIÓN
// ================================
const validationRules = {
    email: {
        element: emailInput,
        errorElement: errorEmail,
        required: true,
        validators: [
            {
                test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                message: 'Por favor ingresa un correo electrónico válido'
            }
        ]
    },
    password: {
        element: passwordInput,
        errorElement: errorPassword,
        required: true,
        validators: [
            {
                test: (value) => value.length >= 8,
                message: 'La contraseña debe tener al menos 8 caracteres'
            }
        ]
    }
};

// ================================
// FUNCIONES DE VALIDACIÓN
// ================================

/**
 * Valida un campo individual
 * @param {string} fieldName - Nombre del campo a validar
 * @returns {boolean} - True si el campo es válido
 */
function validateField(fieldName) {
    const rule = validationRules[fieldName];
    const value = rule.element.value;

    // Validar si es un campo requerido y está vacío
    if (rule.required && value.trim() === '') {
        showFieldError(fieldName, 'Este campo es requerido');
        return false;
    }

    // Ejecutar validadores personalizados
    for (let validator of rule.validators) {
        if (!validator.test(value)) {
            showFieldError(fieldName, validator.message);
            return false;
        }
    }

    // Si todo es válido
    clearFieldError(fieldName);
    return true;
}

/**
 * Muestra error en un campo
 * @param {string} fieldName - Nombre del campo
 * @param {string} message - Mensaje de error
 */
function showFieldError(fieldName, message) {
    const rule = validationRules[fieldName];
    rule.element.classList.remove('valid');
    rule.element.classList.add('invalid');
    rule.errorElement.textContent = '❌ ' + message;
}

/**
 * Limpia el error de un campo
 * @param {string} fieldName - Nombre del campo
 */
function clearFieldError(fieldName) {
    const rule = validationRules[fieldName];
    rule.element.classList.remove('invalid');
    rule.element.classList.add('valid');
    rule.errorElement.textContent = '';
}

/**
 * Valida el formulario completo
 * @returns {boolean} - True si todo es válido
 */
function validateForm() {
    const fields = Object.keys(validationRules);
    let isValid = true;

    console.log('🔍 Iniciando validación del formulario de login...');

    for (let field of fields) {
        if (!validateField(field)) {
            isValid = false;
            console.log(`❌ Campo inválido: ${field}`);
        } else {
            console.log(`✅ Campo válido: ${field}`);
        }
    }

    return isValid;
}

/**
 * Limpia todos los errores
 */
function clearAllErrors() {
    Object.keys(validationRules).forEach(field => {
        const rule = validationRules[field];
        rule.element.classList.remove('invalid', 'valid');
        rule.errorElement.textContent = '';
    });
}

// ================================
// EVENT LISTENERS - VALIDACIÓN EN TIEMPO REAL
// ================================

/**
 * Validación al salir del campo (blur)
 */
emailInput.addEventListener('blur', () => {
    console.log('👁️ Validando email al salir del campo');
    validateField('email');
});

passwordInput.addEventListener('blur', () => {
    console.log('👁️ Validando contraseña al salir del campo');
    validateField('password');
});

/**
 * Validación mientras se escribe (input)
 */
emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('invalid')) {
        validateField('email');
    }
    updateSubmitButton();
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('invalid')) {
        validateField('password');
    }
    updateSubmitButton();
});

// ================================
// EVENT LISTENERS - RECORDARME
// ================================

/**
 * Manejo del checkbox "Recordarme"
 */
rememberCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        console.log('✅ Opción "Recordarme" activada');
        // Guardar en localStorage
        localStorage.setItem('rememberLogin', 'true');
    } else {
        console.log('❌ Opción "Recordarme" desactivada');
        localStorage.removeItem('rememberLogin');
    }
});

// ================================
// EVENT LISTENERS - REDES SOCIALES
// ================================

/**
 * Botón de Google
 */
googleBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('🔗 Intento de login con Google');
    showNotification('info', 'ℹ️', 'Redirigiendo a Google...', 3000);
    // window.location.href = 'https://accounts.google.com/';
});

/**
 * Botón de Facebook
 */
facebookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('🔗 Intento de login con Facebook');
    showNotification('info', 'ℹ️', 'Redirigiendo a Facebook...', 3000);
    // window.location.href = 'https://www.facebook.com/';
});

// ================================
// EVENT LISTENER - ENVÍO DEL FORMULARIO
// ================================

/**
 * Envío del formulario (submit)
 */
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    console.log('📤 Intento de envío del formulario de login');

    // Validar todo el formulario
    if (validateForm()) {
        // ✅ TODOS LOS CAMPOS VÁLIDOS
        const datosLogin = {
            email: emailInput.value.trim(),
            password: passwordInput.value,
            recordarme: rememberCheckbox.checked
        };

        console.log('✅✅✅ DATOS DE LOGIN VÁLIDOS');
        console.log('📋 Datos:', datosLogin);

        // Mostrar notificación de éxito
        showSuccess(`¡Bienvenido! Iniciando sesión...`, 3000);

        // Simular validación con servidor
        console.log('🔄 Validando credenciales con servidor...');

        // Después de 2 segundos, simular redirección
        setTimeout(() => {
            console.log('✅ Login exitoso. Redirigiendo...');
            
            // Guardar en localStorage si "Recordarme" está marcado
            if (datosLogin.recordarme) {
                localStorage.setItem('userEmail', datosLogin.email);
                localStorage.setItem('lastLogin', new Date().toLocaleString());
                console.log('💾 Datos guardados en localStorage');
            }

            // Aquí iría la redirección real
            // window.location.href = 'dashboard.html';
            
        }, 2000);

    } else {
        // ❌ HAY ERRORES EN EL FORMULARIO
        console.log('❌❌❌ FORMULARIO CON ERRORES');
        showError('Por favor corrige los errores marcados en rojo', 5000);
    }
});

// ================================
// FUNCIÓN - HABILITAR/DESHABILITAR BOTÓN
// ================================

/**
 * Actualiza el estado del botón de envío
 */
function updateSubmitButton() {
    const emailValid = emailInput.value.trim() !== '';
    const passwordValid = passwordInput.value.trim() !== '';

    submitBtn.disabled = !(emailValid && passwordValid);
    
    if (emailValid && passwordValid) {
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    } else {
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
    }
}

// ================================
// CARGAR DATOS GUARDADOS (RECORDARME)
// ================================

/**
 * Al cargar la página, recuperar datos si "Recordarme" estaba activado
 */
function loadSavedLogin() {
    const savedEmail = localStorage.getItem('userEmail');
    const lastLogin = localStorage.getItem('lastLogin');

    if (savedEmail) {
        console.log('💾 Recuperando email guardado desde localStorage');
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
        console.log(`📧 Email restaurado: ${savedEmail}`);
        console.log(`⏰ Último login: ${lastLogin}`);
        showNotification('info', 'ℹ️', `Bienvenido de nuevo. Tu email ha sido recuperado.`, 4000);
    }
}

// ================================
// INICIALIZACIÓN
// ================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Script de login cargado correctamente');
    console.log('📍 Página: Iniciar Sesión');
    
    // Cargar datos guardados si existen
    loadSavedLogin();
    
    // Inicializar estado del botón
    updateSubmitButton();
    
    // Mostrar bienvenida
    showNotification('info', 'ℹ️', 'Ingresa tus credenciales para continuar', 3000);
});