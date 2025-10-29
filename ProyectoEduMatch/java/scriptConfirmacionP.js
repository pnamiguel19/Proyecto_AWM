document.addEventListener('DOMContentLoaded', function() {
    const termsCheck = document.getElementById('termsCheck');
    const dataCheck = document.getElementById('dataCheck');
    const updatesCheck = document.getElementById('updatesCheck');
    const completeBtn = document.getElementById('completeBtn');
    const backBtn = document.querySelector('.btn.btn-secondary');

    // Actualizar el estado del botón de completar
    function updateButtonState() {
        completeBtn.disabled = !(termsCheck.checked && dataCheck.checked);
    }

    termsCheck.addEventListener('change', updateButtonState);
    dataCheck.addEventListener('change', updateButtonState);
    updatesCheck.addEventListener('change', updateButtonState);

    // Manejar el botón de completar registro
    completeBtn.addEventListener('click', function() {
        if ((!termsCheck.checked || !dataCheck.checked )|| !updatesCheck.checked ) {
            showNotification('Debes aceptar los términos y confirmar la información', 'error');
            return;
        }

        // Simular el guardado del registro
        showNotification('¡Registro completado exitosamente!', 'success');
        setTimeout(() => {
            // Redirigir al home
            window.location.href = 'Home.html';
        }, 1500);
    });

    // Manejar el botón de regresar
    backBtn.addEventListener('click', function() {
        window.location.href = 'HorarioProfesor.html';
    });

    // Función para mostrar notificaciones
    function showNotification(message, type) {
        const notification = document.getElementById('notification');
        const messageElement = notification.querySelector('.notification-message');
        const iconElement = notification.querySelector('.notification-icon');

        messageElement.textContent = message;
        iconElement.textContent = type === 'success' ? '✅' : '⚠️';

        notification.className = 'notification show ' + type;

        setTimeout(() => {
            notification.classList.remove('show', type);
        }, 3000);
    }
});