document.addEventListener('DOMContentLoaded', function() {
    const scheduleBody = document.getElementById('scheduleBody');
    const startHour = 7;
    const endHour = 22;
    const selectedSlots = new Set();

    // Generar las filas del horario
    for (let hour = startHour; hour <= endHour; hour++) {
        const row = document.createElement('tr');

        // Columna de hora
        const timeCell = document.createElement('td');
        timeCell.innerHTML = `<div class="time-slot">${hour}:00</div>`;
        row.appendChild(timeCell);

        // Columnas de días
        for (let day = 0; day < 7; day++) {
            const cell = document.createElement('td');
            const scheduleCell = document.createElement('div');
            scheduleCell.className = 'schedule-cell';
            scheduleCell.dataset.hour = hour;
            scheduleCell.dataset.day = day;

            // Manejo de clic y doble clic
            let clickTimeout;
            scheduleCell.addEventListener('click', function() {
                if (clickTimeout) {
                    clearTimeout(clickTimeout);
                    clickTimeout = null;
                    // Doble clic: deseleccionar
                    const slotId = `${hour}-${day}`;
                    selectedSlots.delete(slotId);
                    this.classList.remove('selected');
                } else {
                    clickTimeout = setTimeout(() => {
                        clickTimeout = null;
                        // Clic: seleccionar
                        const slotId = `${hour}-${day}`;
                        if (selectedSlots.has(slotId)) {
                            selectedSlots.delete(slotId);
                            this.classList.remove('selected');
                        } else {
                            selectedSlots.add(slotId);
                            this.classList.add('selected');
                        }
                    }, 300);
                }
            });

            cell.appendChild(scheduleCell);
            row.appendChild(cell);
        }

        scheduleBody.appendChild(row);
    }

    // Manejo del botón anterior
    document.querySelector('.btn.btn-secondary').addEventListener('click', function() {
        window.location.href = 'ExperienciaProfesor.html';
    });

    // Manejo del botón siguiente
    document.getElementById('nextBtn').addEventListener('click', function() {
        if (selectedSlots.size === 0) {
            showNotification('Debes seleccionar al menos un horario disponible', 'error');
            return;
        }

        // Redirigir a la página de confirmación
        window.location.href = 'ConfirmacionProfesor.html';
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