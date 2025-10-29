document.addEventListener('DOMContentLoaded', function() {
    // Prevenir envío por defecto del formulario
    const form = document.getElementById('clasesForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
    // ==================== ELEMENTOS DEL DOM ====================
    const subjectsCheckboxes = document.querySelectorAll('input[name="subjects"]');
    const levelsCheckboxes = document.querySelectorAll('input[name="levels"]');
    const modalityCheckboxes = document.querySelectorAll('input[name="modality"]');
    const priceInput = document.getElementById('pricePerHour');
    const durationSelect = document.getElementById('minClassDuration');
    const descriptionTextarea = document.getElementById('classDescription');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');

    // ==================== ESCUCHADORES DE CAMBIO ====================
    
    // Materias - Actualizar contador y resumen en tiempo real
    subjectsCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCounter('subjects', 'subjectsCount', 'selectedSubjects');
        });
    });

    // Niveles - Actualizar contador y resumen en tiempo real
    levelsCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCounter('levels', 'levelsCount', 'selectedLevels');
        });
    });

    // Modalidades - Limitar a máximo 2 y actualizar contador y resumen
    modalityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedCount = document.querySelectorAll('input[name="modality"]:checked').length;
            if (selectedCount > 2) {
                this.checked = false;
                showNotification('⚠️ Solo puedes seleccionar máximo 2 modalidades', 'error');
                return;
            }
            updateCounter('modality', 'modalityCount', 'selectedModality');
        });
    });

    // Validación en tiempo real del precio - Solo números con máximo 2 decimales y máximo $50
    priceInput.addEventListener('input', function() {
        let value = this.value;

        // Remover caracteres inválidos
        value = value.replace(/[^\d.]/g, '');
        
        // Solo permitir un punto decimal
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts[1];
        }

        // Limitar a 2 decimales
        if (parts.length === 2 && parts[1].length > 2) {
            value = parts[0] + '.' + parts[1].substring(0, 2);
        }

        // Validar que no sea mayor a 50
        if (parseFloat(value) > 50) {
            this.value = '50.00';
            showNotification('⚠️ El precio máximo permitido es $50.00 por hora', 'error');
            return;
        }

        this.value = value;
    });

    // Evento blur en precio para formatear
    priceInput.addEventListener('blur', function() {
        if (this.value !== '' && !isNaN(parseFloat(this.value))) {
            const num = parseFloat(this.value);
            this.value = num.toFixed(2);
        }
    });

    // ==================== VALIDACIÓN Y NAVEGACIÓN ====================

    // Botón SIGUIENTE
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Validar materias
        const selectedSubjects = document.querySelectorAll('input[name="subjects"]:checked');
        if (selectedSubjects.length === 0) {
            showNotification('❌ Debes seleccionar al menos una materia', 'error');
            scrollToSection('subjects');
            return;
        }

        // Validar niveles
        const selectedLevels = document.querySelectorAll('input[name="levels"]:checked');
        if (selectedLevels.length === 0) {
            showNotification('❌ Debes seleccionar al menos un nivel educativo', 'error');
            scrollToSection('levels');
            return;
        }

        // Validar modalidades
        const selectedModality = document.querySelectorAll('input[name="modality"]:checked');
        if (selectedModality.length === 0) {
            showNotification('❌ Debes seleccionar al menos una modalidad de enseñanza', 'error');
            scrollToSection('modality');
            return;
        }
        // Validar precio
const price = priceInput.value.trim();
if (!price || price === '' || price === '.' || price === ',') {
    showNotification('❌ Ingresa un precio por hora (máximo $50.00 USD)', 'error');
    priceInput.focus();
    return;
}

// Reemplazar coma por punto para uniformar el formato decimal
const normalizedPrice = price.replace(',', '.');
const priceNum = parseFloat(normalizedPrice);

// Validar que sea un número válido dentro del rango
if (isNaN(priceNum) || priceNum <= 0 || priceNum > 50) {
    showNotification('❌ El precio debe ser entre $0.01 y $50.00 USD', 'error');
    priceInput.focus();
    return;
}

// Validar formato: hasta 2 enteros y hasta 2 decimales
// Acepta punto o coma como separador
if (!/^\d{1,2}([.,]\d{1,2})?$/.test(price)) {
    showNotification('❌ El precio solo puede tener hasta 2 decimales (usa . o ,)', 'error');
    priceInput.focus();
    return;
}



        // Validar duración
        const duration = durationSelect.value.trim();
        if (!duration || duration === '') {
            showNotification('❌ Selecciona una duración mínima para tus clases', 'error');
            durationSelect.focus();
            return;
        }

        // Validar descripción
        const description = descriptionTextarea.value.trim();
        if (!description || description === '') {
            showNotification('❌ La descripción de tus clases es obligatoria', 'error');
            descriptionTextarea.focus();
            return;
        }

        if (description.length < 100) {
            const remaining = 100 - description.length;
            showNotification(`❌ La descripción necesita ${remaining} caracteres más (mínimo 100)`, 'error');
            descriptionTextarea.focus();
            return;
        }

        // ✅ Todo validado correctamente
        showNotification('✅ ¡Información guardada! Continuando a la siguiente etapa...', 'success');
        
        // Guardar datos en sessionStorage (opcional)
        saveFormData({
            subjects: Array.from(selectedSubjects).map(s => s.value),
            levels: Array.from(selectedLevels).map(l => l.value),
            modalities: Array.from(selectedModality).map(m => m.value),
            price: priceNum,
            duration: duration,
            description: description
        });

        // Navegar después de 1.5 segundos
        setTimeout(() => {
            window.location.href = 'HorarioProfesor.html';
        }, 1500);
    });

    // Botón ANTERIOR
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'FormacionProfesor.html';
    });

    // ==================== FUNCIONES AUXILIARES ====================

    /**
     * Actualiza el contador y el resumen de selecciones
     */
    function updateCounter(fieldName, counterId, summaryId) {
        const checkboxes = document.querySelectorAll(`input[name="${fieldName}"]:checked`);
        const count = checkboxes.length;

        // Actualizar contador
        document.getElementById(counterId).textContent = count;

        // Actualizar resumen
        const summaryContainer = document.getElementById(summaryId);
        summaryContainer.innerHTML = '';

        if (count === 0) {
            const emptyState = document.createElement('span');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'No has seleccionado opciones';
            summaryContainer.appendChild(emptyState);
        } else {
            checkboxes.forEach(checkbox => {
                const tag = document.createElement('span');
                tag.className = 'summary-tag';
                tag.textContent = checkbox.value;
                summaryContainer.appendChild(tag);
            });
        }
    }

    /**
     * Muestra notificaciones personalizadas
     */
    function showNotification(message, type) {
        const notification = document.getElementById('notification');
        const messageElement = notification.querySelector('.notification-message');
        const iconElement = notification.querySelector('.notification-icon');

        messageElement.textContent = message;
        
        // Cambiar color según tipo
        notification.className = 'notification show ' + type;
        
        // Remover después de 4 segundos
        setTimeout(() => {
            notification.classList.remove('show', type);
        }, 4000);
    }

    /**
     * Desplaza el formulario hasta la sección especificada
     */
    function scrollToSection(fieldName) {
        let targetElement = document.querySelector(`input[name="${fieldName}"]`);
        if (targetElement) {
            targetElement.closest('.section-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    /**
     * Guarda los datos del formulario en sessionStorage
     */
    function saveFormData(data) {
        sessionStorage.setItem('experienciaProfessorData', JSON.stringify(data));
    }

    // ==================== INICIALIZACIÓN ====================
    
    // Actualizar contadores iniciales
    updateCounter('subjects', 'subjectsCount', 'selectedSubjects');
    updateCounter('levels', 'levelsCount', 'selectedLevels');
    updateCounter('modality', 'modalityCount', 'selectedModality');
});