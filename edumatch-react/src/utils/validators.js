/**
 * UTILIDADES DE VALIDACIÓN
 */

export const validators = {
  // Validar nombre/apellido
  isValidName: (value) => {
    if (!value || value.trim().length < 2) {
      return 'Debe tener al menos 2 caracteres';
    }
    if (!/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/.test(value)) {
      return 'Solo puede contener letras';
    }
    return null;
  },

  // Validar email
  isValidEmail: (value) => {
    if (!value) {
      return 'El correo electrónico es requerido';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Por favor ingresa un correo electrónico válido';
    }
    return null;
  },

  // Validar teléfono (opcional)
  isValidPhone: (value) => {
    if (!value) return null; // Campo opcional
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10) {
      return 'El teléfono debe tener al menos 10 dígitos';
    }
    return null;
  },

  // Validar ciudad (opcional)
  isValidCity: (value) => {
    if (!value) return null; // Campo opcional
    if (value.trim().length < 2) {
      return 'La ciudad debe tener al menos 2 caracteres';
    }
    return null;
  },

  // Validar contraseña
  isValidPassword: (value) => {
    if (!value) {
      return 'La contraseña es requerida';
    }
    if (value.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/[A-Z]/.test(value)) {
      return 'Debe contener al menos una mayúscula';
    }
    if (!/[a-z]/.test(value)) {
      return 'Debe contener al menos una minúscula';
    }
    if (!/[\d]/.test(value)) {
      return 'Debe contener al menos un número';
    }
    return null;
  },

  // Validar confirmación de contraseña
  isValidPasswordConfirmation: (value, password) => {
    if (!value) {
      return 'Debes confirmar tu contraseña';
    }
    if (value !== password) {
      return 'Las contraseñas no coinciden';
    }
    return null;
  }
};