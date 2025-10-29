document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const form = document.getElementById('registrationForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const birthdate = document.getElementById('birthdate');
    const dni = document.getElementById('dni');
    const address = document.getElementById('address');
    const bio = document.getElementById('bio');
    const profilePhotos = document.getElementById('profilePhotos');
    const photoPreview = document.getElementById('photoPreview');
    const videoUrl = document.getElementById('videoUrl');
    const nextBtn = document.getElementById('nextBtn');

    // Validación en tiempo real para nombres y apellidos (solo letras y espacios)
    function validateNameField(input, fieldName) {
        input.addEventListener('input', function() {
            let value = this.value;
            // Eliminar caracteres no permitidos
            const newValue = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]/g, '');
            if (value !== newValue) {
                this.value = newValue;
                showNotification(`${fieldName} solo debe contener letras y espacios`, 'error');
            }
            // Validar longitud mínima
            if (newValue.trim().length < 2) {
                showNotification(`${fieldName} debe tener al menos 2 caracteres`, 'error');
            }
        });
    }

    validateNameField(firstName, 'Nombres');
    validateNameField(lastName, 'Apellidos');

    // Validación de correo electrónico
    email.addEventListener('input', function() {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (this.value && !emailRegex.test(this.value)) {
            showNotification('Ingresa un correo electrónico válido', 'error');
        }
    });

    // Validación de teléfono
    phone.addEventListener('input', function() {
        let value = this.value;
        // Solo permitir números, espacios y + al inicio
        const newValue = value.replace(/[^\d\s+]/g, '');
        if (value !== newValue) {
            this.value = newValue;
            showNotification('Teléfono solo debe contener números, espacios y + al inicio', 'error');
        }
        // Validar longitud mínima (sin contar espacios y +)
        const digitsOnly = newValue.replace(/[^\d]/g, '');
        if (digitsOnly.length < 7) {
            showNotification('El teléfono debe tener al menos 7 dígitos', 'error');
        }
    });

    // Validación de fecha de nacimiento
    birthdate.addEventListener('change', function() {
        const today = new Date();
        const birthDate = new Date(this.value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (birthDate > today) {
            this.value = '';
            showNotification('La fecha no puede ser futura', 'error');
            return;
        }

        // Ajustar edad si aún no ha cumplido años este año
        const realAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
            ? age - 1 : age;

        if (realAge < 18) {
            this.value = '';
            showNotification('Debes ser mayor de 18 años', 'error');
        }
    });

    // Validación de cédula/DNI
    dni.addEventListener('input', function() {
        let value = this.value;
        // Solo permitir números
        const newValue = value.replace(/\D/g, '');
        if (value !== newValue) {
            this.value = newValue;
            showNotification('La cédula solo debe contener números', 'error');
        }
        // Validar longitud
        if (newValue.length < 8) {
            showNotification('La cédula debe tener al menos 8 dígitos', 'error');
        } else if (newValue.length > 15) {
            this.value = newValue.slice(0, 15);
            showNotification('La cédula no puede tener más de 15 dígitos', 'error');
        }
    });

    // Validación de dirección
    address.addEventListener('input', function() {
        let value = this.value;
        // Permitir letras, números y signos básicos
        const newValue = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñüÜ0-9\s,.\-#]/g, '');
        if (value !== newValue) {
            this.value = newValue;
            showNotification('La dirección no puede contener caracteres especiales', 'error');
        }
    });

    // Validación de biografía
    bio.addEventListener('input', function() {
        let value = this.value;
        // Permitir letras, números y signos de puntuación básicos
        const newValue = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñüÜ0-9\s,.\-()]/g, '');
        if (value !== newValue) {
            this.value = newValue;
            showNotification('La biografía solo puede contener texto y signos básicos', 'error');
        }
        // Validar longitud mínima
        if (newValue.length < 100) {
            showNotification(`Necesitas ${100 - newValue.length} caracteres más en tu biografía`, 'error');
        }
    });

    // Validación de fotos de perfil
    let uploadedPhotos = [];
    
    profilePhotos.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        // Validar número de archivos
        if (uploadedPhotos.length + files.length >= 3) {
            showNotification('Máximo 3 fotos permitidas', 'error');
            return;
        }

        files.forEach(file => {
            // Validar formato
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                showNotification('Solo se permiten archivos JPG y PNG', 'error');
                return;
            }

            // Validar tamaño
            if (file.size > 5 * 1024 * 1024) {
                showNotification('Cada imagen debe ser menor a 5MB', 'error');
                return;
            }

            // Validar que sea una imagen real
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);
            
            img.onload = function() {
                URL.revokeObjectURL(objectUrl);
                uploadedPhotos.push(file);
                updatePhotoPreview();
            };

            img.onerror = function() {
                URL.revokeObjectURL(objectUrl);
                showNotification('El archivo no es una imagen válida', 'error');
            };

            img.src = objectUrl;
        });
    });

    function updatePhotoPreview() {
        photoPreview.innerHTML = '';
        uploadedPhotos.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.createElement('div');
                preview.className = 'photo-preview-item';
                preview.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="remove-photo" data-index="${index}">×</button>
                `;
                photoPreview.appendChild(preview);
            };
            reader.readAsDataURL(file);
        });
    }

    // Eliminar fotos del preview
    photoPreview.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-photo')) {
            const index = parseInt(e.target.dataset.index);
            uploadedPhotos.splice(index, 1);
            updatePhotoPreview();
        }
    });

    // Validación de URL de video
    videoUrl.addEventListener('input', function() {
        if (this.value) {
            const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/;
            const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com\/)[0-9]+$/;
            
            if (!youtubeRegex.test(this.value) && !vimeoRegex.test(this.value)) {
                showNotification('Ingresa una URL válida de YouTube o Vimeo', 'error');
            }
        }
    });

    // Validación al hacer clic en siguiente
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let errores = [];

        // Validar todos los campos obligatorios
        if (!firstName.value.trim()) {
            errores.push('El campo Nombres es obligatorio');
            firstName.focus();
        } else if (firstName.value.trim().length < 2) {
            errores.push('El nombre debe tener al menos 2 caracteres');
            firstName.focus();
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/.test(firstName.value)) {
            errores.push('El nombre solo puede contener letras y espacios');
            firstName.focus();
        }

        if (!lastName.value.trim()) {
            errores.push('El campo Apellidos es obligatorio');
            !firstName.value && lastName.focus();
        } else if (lastName.value.trim().length < 2) {
            errores.push('Los apellidos deben tener al menos 2 caracteres');
            !firstName.value && lastName.focus();
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/.test(lastName.value)) {
            errores.push('Los apellidos solo pueden contener letras y espacios');
            !firstName.value && lastName.focus();
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email.value) {
            errores.push('El correo electrónico es obligatorio');
            !firstName.value && !lastName.value && email.focus();
        } else if (!emailRegex.test(email.value)) {
            errores.push('El formato del correo electrónico no es válido (ejemplo: usuario@dominio.com)');
            !firstName.value && !lastName.value && email.focus();
        }

        const digitsOnly = phone.value.replace(/[^\d]/g, '');
        if (!phone.value) {
            errores.push('El número de teléfono es obligatorio');
            !firstName.value && !lastName.value && !email.value && phone.focus();
        } else if (digitsOnly.length < 7) {
            errores.push('El teléfono debe tener al menos 7 dígitos');
            !firstName.value && !lastName.value && !email.value && phone.focus();
        } else if (!/^[+]?\d[\d\s]*$/.test(phone.value)) {
            errores.push('El teléfono solo puede contener números, espacios y + al inicio');
            !firstName.value && !lastName.value && !email.value && phone.focus();
        }

        if (!birthdate.value) {
            errores.push('La fecha de nacimiento es obligatoria');
            !firstName.value && !lastName.value && !email.value && !phone.value && birthdate.focus();
        } else {
            const today = new Date();
            const birthDate = new Date(birthdate.value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const realAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
                ? age - 1 : age;

            if (birthDate > today) {
                errores.push('La fecha de nacimiento no puede ser futura');
                !firstName.value && !lastName.value && !email.value && !phone.value && birthdate.focus();
            } else if (realAge < 18) {
                errores.push('Debes ser mayor de 18 años para registrarte');
                !firstName.value && !lastName.value && !email.value && !phone.value && birthdate.focus();
            }
        }

        if (!dni.value) {
            errores.push('El número de cédula/DNI es obligatorio');
            !firstName.value && !lastName.value && !email.value && !phone.value && !birthdate.value && dni.focus();
        } else if (dni.value.length < 8) {
            errores.push('La cédula/DNI debe tener al menos 8 dígitos');
            !firstName.value && !lastName.value && !email.value && !phone.value && !birthdate.value && dni.focus();
        } else if (!/^\d+$/.test(dni.value)) {
            errores.push('La cédula/DNI solo puede contener números');
            !firstName.value && !lastName.value && !email.value && !phone.value && !birthdate.value && dni.focus();
        }

        if (!address.value.trim()) {
            errores.push('La dirección es obligatoria');
            !firstName.value && !lastName.value && !email.value && !phone.value && !birthdate.value && !dni.value && address.focus();
        } else if (/[@#$%^&*()_+\=\[\]{};':"\\|,.<>/?]+/.test(address.value)) {
            errores.push('La dirección no puede contener caracteres especiales');
            !firstName.value && !lastName.value && !email.value && !phone.value && !birthdate.value && !dni.value && address.focus();
        }

        if (!bio.value.trim()) {
            errores.push('La biografía es obligatoria');
            !firstName.value && !lastName.value && !email.value && !phone.value && !birthdate.value && !dni.value && !address.value && bio.focus();
        } else if (bio.value.trim().length < 100) {
            errores.push(`La biografía debe tener al menos 100 caracteres (faltan ${100 - bio.value.trim().length} caracteres)`);
            !firstName.value && !lastName.value && !email.value && !phone.value && !birthdate.value && !dni.value && !address.value && bio.focus();
        }

        if (uploadedPhotos.length === 0) {
            errores.push('Debes subir al menos una foto de perfil');
        } else if (uploadedPhotos.length > 3) {
            errores.push('No puedes subir más de 3 fotos de perfil');
        }

        if (videoUrl.value) {
            const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/;
            const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com\/)[0-9]+$/;
            if (!youtubeRegex.test(videoUrl.value) && !vimeoRegex.test(videoUrl.value)) {
                errores.push('La URL del video debe ser de YouTube o Vimeo');
                !firstName.value && !lastName.value && !email.value && !phone.value && !birthdate.value && !dni.value && !address.value && !bio.value && videoUrl.focus();
            }
        }

        // Si hay errores, mostrarlos todos
        if (errores.length > 0) {
            const errorList = errores.join('\n• ');
            showNotification('Por favor, corrige los siguientes errores:\n\n• ' + errorList, 'error');
            return;
        }

        // Si todo está validado, continuar al siguiente paso
        window.location.href = 'FormacionProfesor.html';
    });

    // Función para mostrar notificaciones
    function showNotification(message, type) {
        // Eliminar notificaciones anteriores
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Si el mensaje contiene saltos de línea, formatéalo como lista
        if (message.includes('\n')) {
            const lines = message.split('\n');
            const title = lines[0];
            const items = lines.slice(2); // Omitir el título y la línea en blanco
            
            notification.innerHTML = `
                <div class="notification-content">
                    <div class="notification-header">
                        <span class="notification-icon">${type === 'success' ? '✅' : '⚠️'}</span>
                        <span class="notification-title">${title}</span>
                    </div>
                    <div class="notification-message error-list">
                        ${items.join('<br>')}
                    </div>
                </div>
            `;
        } else {
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">${type === 'success' ? '✅' : '⚠️'}</span>
                    <span class="notification-message">${message}</span>
                </div>
            `;
        }

        document.body.appendChild(notification);
        
        // Para mensajes de error con lista, mantener más tiempo
        const timeout = message.includes('\n') ? 6000 : 3000;
        
        setTimeout(() => {
            notification.remove();
        }, timeout);
    }
});
