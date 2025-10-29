/**
 * FORMULARIO DE REGISTRO DE USUARIO
 * Manejo de DOM, validaciones y eventos con notificaciones
 */

// ================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ================================
const form = document.getElementById('registroForm');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('email');
const telefonoInput = document.getElementById('telefono');
const ciudadInput = document.getElementById('ciudad');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const submitBtn = document.getElementById('submitBtn');
const notificationContainer = document.getElementById('notificationContainer');

// Elementos de error
const errorNombre = document.getElementById('error-nombre');
const errorApellido = document.getElementById('error-apellido');
const errorEmail = document.getElementById('error-email');
const errorTelefono = document.getElementById('error-telefono');
const errorCiudad = document.getElementById('error-ciudad');
const errorPassword = document.getElementById('error-password');
const errorConfirmPassword = document.getElementById('error-confirm-password');

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
    // Crear elemento de notificación
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

    // Agregar al contenedor
    notificationContainer.appendChild(notification);

    // Disparar animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto-remover
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
    nombre: {
        element: nombreInput,
        errorElement: errorNombre,
        required: true,
        validators: [
            {
                test: (value) => value.trim().length >= 2,
                message: 'El nombre debe tener al menos 2 caracteres'
            },
            {
                test: (value) => /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/.test(value),
                message: 'El nombre solo puede contener letras'
            }
        ]
    },
    apellido: {
        element: apellidoInput,
        errorElement: errorApellido,
        required: true,
        validators: [
            {
                test: (value) => value.trim().length >= 2,
                message: 'El apellido debe tener al menos 2 caracteres'
            },
            {
                test: (value) => /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/.test(value),
                message: 'El apellido solo puede contener letras'
            }
        ]
    },
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
    telefono: {
        element: telefonoInput,
        errorElement: errorTelefono,
        required: false,
        validators: [
            {
                test: (value) => {
                    if (value.trim() === '') return true;
                    return /^[\d\s\+\-\(\)]{10,}$/.test(value);
                },
                message: 'El teléfono debe tener al menos 10 dígitos'
            }
        ]
    },
    ciudad: {
        element: ciudadInput,
        errorElement: errorCiudad,
        required: false,
        validators: [
            {
                test: (value) => {
                    if (value.trim() === '') return true;
                    return value.trim().length >= 2;
                },
                message: 'La ciudad debe tener al menos 2 caracteres'
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
            },
            {
                test: (value) => /[A-Z]/.test(value),
                message: 'Debe contener al menos una mayúscula'
            },
            {
                test: (value) => /[a-z]/.test(value),
                message: 'Debe contener al menos una minúscula'
            },
            {
                test: (value) => /[\d]/.test(value),
                message: 'Debe contener al menos un número'
            }
        ]
    },
    confirmPassword: {
        element: confirmPasswordInput,
        errorElement: errorConfirmPassword,
        required: true,
        validators: [
            {
                test: (value) => value === passwordInput.value,
                message: 'Las contraseñas no coinciden'
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

    // Si no es requerido y está vacío, es válido
    if (!rule.required && value.trim() === '') {
        clearFieldError(fieldName);
        return true;
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

    console.log('🔍 Iniciando validación del formulario...');

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
// EVENT LISTENERS
// ================================

nombreInput.addEventListener('blur', () => validateField('nombre'));
apellidoInput.addEventListener('blur', () => validateField('apellido'));
emailInput.addEventListener('blur', () => validateField('email'));
telefonoInput.addEventListener('blur', () => validateField('telefono'));
ciudadInput.addEventListener('blur', () => validateField('ciudad'));

passwordInput.addEventListener('blur', () => {
    validateField('password');
    if (confirmPasswordInput.value.trim() !== '') {
        validateField('confirmPassword');
    }
});

confirmPasswordInput.addEventListener('blur', () => validateField('confirmPassword'));

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('invalid')) {
        validateField('password');
    }
    if (confirmPasswordInput.value.trim() !== '') {
        validateField('confirmPassword');
    }
});

confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.classList.contains('invalid')) {
        validateField('confirmPassword');
    }
});

/**
 * ENVÍO DEL FORMULARIO
 */
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    console.log('📤 Intento de envío de formulario');

    if (validateForm()) {
        // ✅ TODOS LOS CAMPOS VÁLIDOS
        const datosRegistro = {
            nombre: nombreInput.value.trim(),
            apellido: apellidoInput.value.trim(),
            email: emailInput.value.trim(),
            telefono: telefonoInput.value.trim(),
            ciudad: ciudadInput.value.trim()
        };

        console.log('✅✅✅ REGISTRO EXITOSO');
        console.log('📋 Datos:', datosRegistro);

        // Mostrar notificación de éxito
        showSuccess(`¡Bienvenido ${datosRegistro.nombre}! Registro exitoso`, 5000);

        // Limpiar formulario después de 1 segundo
        setTimeout(() => {
            form.reset();
            clearAllErrors();
            updateSubmitButton();
        }, 1000);

    } else {
        // ❌ ERRORES EN EL FORMULARIO
        console.log('❌❌❌ FORMULARIO CON ERRORES');
        showError('Por favor corrige los errores marcados en rojo', 5000);
    }
});

/**
 * Habilitar/Deshabilitar botón
 */
function updateSubmitButton() {
    const allFieldsValid = Object.keys(validationRules).every(field => {
        const rule = validationRules[field];
        const value = rule.element.value.trim();
        
        if (rule.required) {
            return value !== '';
        }
        return true;
    });

    submitBtn.disabled = !allFieldsValid;
    
    if (allFieldsValid) {
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    } else {
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
    }
}

[nombreInput, apellidoInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
    input.addEventListener('input', updateSubmitButton);
});

// ================================
// INICIALIZACIÓN
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Script de registro cargado');
    updateSubmitButton();
    showSuccess('Bienvenido a EduMatch', 4000);
});