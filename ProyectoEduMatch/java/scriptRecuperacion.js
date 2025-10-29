/**
 * FORMULARIO DE RECUPERACIÓN DE CONTRASEÑA
 * Manejo de DOM, validaciones y eventos con notificaciones
 */

// ================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ================================
const form = document.getElementById('recuperarForm');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const errorEmail = document.getElementById('error-email');
const notificationContainer = document.getElementById('notificationContainer');
const successMessage = document.getElementById('successMessage');
const emailSent = document.getElementById('emailSent');
const countdown = document.getElementById('countdown');

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
            },
            {
                test: (value) => value.length <= 254,
                message: 'El correo electrónico es demasiado largo'
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

    console.log(`🔍 Validando campo: ${fieldName}`);

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
    console.log(`❌ Error en ${fieldName}: ${message}`);
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
    console.log(`✅ Campo válido: ${fieldName}`);
}

/**
 * Valida el formulario completo
 * @returns {boolean} - True si todo es válido
 */
function validateForm() {
    console.log('🔍 Iniciando validación del formulario de recuperación...');
    return validateField('email');
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

/**
 * Validación mientras se escribe (input)
 */
emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('invalid')) {
        validateField('email');
    }
    updateSubmitButton();
});

// ================================
// FUNCIÓN - HABILITAR/DESHABILITAR BOTÓN
// ================================

/**
 * Actualiza el estado del botón de envío
 */
function updateSubmitButton() {
    const emailValid = emailInput.value.trim() !== '';

    submitBtn.disabled = !emailValid;
    
    if (emailValid) {
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    } else {
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
    }
}

// ================================
// EVENT LISTENER - ENVÍO DEL FORMULARIO
// ================================

/**
 * Envío del formulario (submit)
 */
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    console.log('📤 Intento de envío del formulario de recuperación');

    // Validar el formulario
    if (validateForm()) {
        // ✅ EMAIL VÁLIDO
        const email = emailInput.value.trim();

        console.log('✅✅✅ EMAIL VÁLIDO');
        console.log('📧 Email:', email);

        // Mostrar notificación de carga
        showNotification('info', '⏳', 'Enviando enlace de recuperación...', 0);

        // Deshabilitar botón y formulario durante el envío
        submitBtn.disabled = true;
        form.style.opacity = '0.6';
        form.style.pointerEvents = 'none';

        // Simular envío al servidor (3 segundos)
        setTimeout(() => {
            console.log('✅ Enlace de recuperación enviado exitosamente');

            // Limpiar notificaciones
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notif => notif.remove());

            // Mostrar notificación de éxito
            showSuccess('¡Enlace enviado a tu correo electrónico!', 0);

            // Mostrar mensaje de éxito grande
            form.style.display = 'none';
            successMessage.style.display = 'block';
            emailSent.textContent = `Enlace enviado a: ${email}`;

            // Contador regresivo
            let seconds = 5;
            const countdownInterval = setInterval(() => {
                seconds--;
                countdown.textContent = seconds;

                if (seconds === 0) {
                    clearInterval(countdownInterval);
                    console.log('🔄 Redirigiendo al login...');
                    // window.location.href = 'Logging.html';
                }
            }, 1000);

            // Guardar email en localStorage para referencia
            localStorage.setItem('lastRecoveryEmail', email);
            localStorage.setItem('recoveryTime', new Date().toLocaleString());
            console.log('💾 Email guardado en localStorage');

        }, 3000);

    } else {
        // ❌ ERROR EN VALIDACIÓN
        console.log('❌❌❌ EMAIL INVÁLIDO');
        showError('Por favor ingresa un correo electrónico válido', 5000);
    }
});

// ================================
// INICIALIZACIÓN
// ================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Script de recuperación cargado correctamente');
    console.log('📍 Página: Recuperación de Contraseña');
    
    // Inicializar estado del botón
    updateSubmitButton();
    
    // Mostrar bienvenida
    showNotification('info', 'ℹ️', 'Ingresa tu correo para recuperar tu contraseña', 4000);

    // Cargar último email si existe
    const lastEmail = localStorage.getItem('lastRecoveryEmail');
    if (lastEmail) {
        console.log(`💾 Email anterior encontrado: ${lastEmail}`);
        // Opcional: pre-llenar el campo
        // emailInput.value = lastEmail;
    }
});

// ================================
// EVENT LISTENERS ADICIONALES
// ================================

/**
 * Permitir Enter para enviar el formulario
 */
emailInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});

/**
 * Volver al login (botón de atrás)
 */
document.querySelector('.back-link a').addEventListener('click', (event) => {
    console.log('🔙 Volviendo al login');
    // event.preventDefault() no es necesario porque es un enlace normal
});