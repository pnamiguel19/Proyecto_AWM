import React, { useState } from 'react';
import './ScheduleStep.css';

const ScheduleStep = ({ formData, onChange }) => {
  const [schedule, setSchedule] = useState(formData.schedule || {
    lunes: { morning: false, afternoon: false, evening: false },
    martes: { morning: false, afternoon: false, evening: false },
    miercoles: { morning: false, afternoon: false, evening: false },
    jueves: { morning: false, afternoon: false, evening: false },
    viernes: { morning: false, afternoon: false, evening: false },
    sabado: { morning: false, afternoon: false, evening: false },
    domingo: { morning: false, afternoon: false, evening: false }
  });

  const days = [
    { id: 'lunes', name: 'Lunes' },
    { id: 'martes', name: 'Martes' },
    { id: 'miercoles', name: 'Miércoles' },
    { id: 'jueves', name: 'Jueves' },
    { id: 'viernes', name: 'Viernes' },
    { id: 'sabado', name: 'Sábado' },
    { id: 'domingo', name: 'Domingo' }
  ];

  const timeSlots = [
    { id: 'morning', name: 'Mañana', time: '6:00 - 12:00', icon: '🌅' },
    { id: 'afternoon', name: 'Tarde', time: '12:00 - 18:00', icon: '☀️' },
    { id: 'evening', name: 'Noche', time: '18:00 - 23:00', icon: '🌙' }
  ];

  const handleToggle = (day, slot) => {
    const updated = {
      ...schedule,
      [day]: {
        ...schedule[day],
        [slot]: !schedule[day][slot]
      }
    };
    setSchedule(updated);
    onChange('schedule', updated);
  };

  const handleSelectAll = (day) => {
    const allSelected = timeSlots.every(slot => schedule[day][slot.id]);
    const updated = {
      ...schedule,
      [day]: {
        morning: !allSelected,
        afternoon: !allSelected,
        evening: !allSelected
      }
    };
    setSchedule(updated);
    onChange('schedule', updated);
  };

  const handleSelectSlot = (slot) => {
    const updated = { ...schedule };
    days.forEach(day => {
      updated[day.id] = {
        ...updated[day.id],
        [slot]: !updated[day.id][slot]
      };
    });
    setSchedule(updated);
    onChange('schedule', updated);
  };

  const getSelectedSlotsCount = () => {
    let count = 0;
    Object.values(schedule).forEach(day => {
      Object.values(day).forEach(slot => {
        if (slot) count++;
      });
    });
    return count;
  };

  return (
    <section className="form-step">
      <div className="step-header">
        <h2>📅 Disponibilidad Horaria</h2>
        <p>Selecciona los horarios en los que estás disponible para dar clases</p>
      </div>

      {/* Información sobre horarios */}
      <div className="info-box">
        <div className="info-icon">💡</div>
        <div className="info-content">
          <h4>Consejos para tu horario</h4>
          <ul>
            <li>Sé flexible y ofrece diferentes horarios para atraer más estudiantes</li>
            <li>Considera las zonas horarias si ofreces clases en línea</li>
            <li>Puedes actualizar tu disponibilidad en cualquier momento desde tu perfil</li>
          </ul>
        </div>
      </div>

      {/* Tabla de Horarios */}
      <div className="section-box">
        <div className="section-title">
          <span className="section-icon">🕐</span>
          <h3>Selecciona tu Disponibilidad *</h3>
        </div>

        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="day-header">Día</th>
                {timeSlots.map(slot => (
                  <th key={slot.id} className="time-header">
                    <button
                      type="button"
                      className="select-column-btn"
                      onClick={() => handleSelectSlot(slot.id)}
                      title={`Seleccionar toda la columna ${slot.name}`}
                    >
                      <span className="slot-icon">{slot.icon}</span>
                      <span className="slot-name">{slot.name}</span>
                      <small className="slot-time">{slot.time}</small>
                    </button>
                  </th>
                ))}
                <th className="action-header">Todo el día</th>
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day.id}>
                  <td className="day-cell">
                    <strong>{day.name}</strong>
                  </td>
                  {timeSlots.map(slot => (
                    <td key={slot.id} className="slot-cell">
                      <label className="checkbox-slot">
                        <input
                          type="checkbox"
                          checked={schedule[day.id][slot.id]}
                          onChange={() => handleToggle(day.id, slot.id)}
                        />
                        <span className="checkbox-custom"></span>
                      </label>
                    </td>
                  ))}
                  <td className="action-cell">
                    <button
                      type="button"
                      className="btn-select-day"
                      onClick={() => handleSelectAll(day.id)}
                    >
                      {timeSlots.every(slot => schedule[day.id][slot.id]) ? '✓' : '+'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preferencias Adicionales */}
      <div className="section-box">
        <div className="section-title">
          <span className="section-icon">⚙️</span>
          <h3>Preferencias Adicionales</h3>
        </div>

        <div className="input-group full-width">
          <label htmlFor="maxStudentsPerClass">Máximo de Estudiantes por Clase</label>
          <select
            id="maxStudentsPerClass"
            value={formData.maxStudentsPerClass || '1'}
            onChange={(e) => onChange('maxStudentsPerClass', e.target.value)}
          >
            <option value="1">1 estudiante (Individual)</option>
            <option value="2">2 estudiantes</option>
            <option value="3">3 estudiantes</option>
            <option value="4">4 estudiantes</option>
            <option value="5">5 estudiantes</option>
            <option value="10">Hasta 10 estudiantes (Grupo pequeño)</option>
            <option value="20">Hasta 20 estudiantes (Grupo grande)</option>
          </select>
          <small className="input-hint">Define el número máximo de estudiantes que aceptas por clase</small>
        </div>

        <div className="input-group full-width">
          <label htmlFor="advanceNotice">Tiempo de Anticipación para Reservas</label>
          <select
            id="advanceNotice"
            value={formData.advanceNotice || '24'}
            onChange={(e) => onChange('advanceNotice', e.target.value)}
          >
            <option value="1">1 hora antes</option>
            <option value="3">3 horas antes</option>
            <option value="6">6 horas antes</option>
            <option value="12">12 horas antes</option>
            <option value="24">24 horas antes</option>
            <option value="48">48 horas antes</option>
            <option value="72">3 días antes</option>
            <option value="168">1 semana antes</option>
          </select>
          <small className="input-hint">¿Con cuánta anticipación deben reservar los estudiantes?</small>
        </div>

        <div className="input-group full-width">
          <label htmlFor="additionalNotes">Notas Adicionales sobre tu Disponibilidad</label>
          <textarea
            id="additionalNotes"
            value={formData.additionalNotes || ''}
            onChange={(e) => onChange('additionalNotes', e.target.value)}
            rows="4"
            placeholder="Ej: Tengo mayor disponibilidad durante vacaciones escolares, puedo ajustar horarios para grupos, etc."
          />
        </div>
      </div>

      {/* Resumen de Disponibilidad */}
      <div className="availability-summary">
        <div className="summary-title">
          <span className="summary-icon">📊</span>
          <h3>Resumen de Disponibilidad</h3>
        </div>
        <div className="summary-stats">
          <div className="stat-card">
            <div className="stat-number">{getSelectedSlotsCount()}</div>
            <div className="stat-label">Franjas horarias seleccionadas</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {days.filter(day => 
                timeSlots.some(slot => schedule[day.id][slot.id])
              ).length}
            </div>
            <div className="stat-label">Días disponibles</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{formData.maxStudentsPerClass || 1}</div>
            <div className="stat-label">Estudiantes máx. por clase</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleStep;