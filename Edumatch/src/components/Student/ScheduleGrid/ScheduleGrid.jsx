import React, { useState } from 'react';
import './ScheduleGrid.css';

const ScheduleGrid = ({ selectedSlots, onToggleSlot }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const horas = [
    '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Generar los días de la semana según el offset
  const getWeekDays = (weekOffset) => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + (weekOffset * 7));
    
    // Ir al lunes de esa semana
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
    startDate.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeek);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
  };

  const getWeekRange = () => {
    return `${formatDate(weekDays[0])} - ${formatDate(weekDays[6])}`;
  };

  const toggleSlot = (dayIndex, hora) => {
    const slotId = `${weekDays[dayIndex].toISOString().split('T')[0]}_${hora}`;
    const newSlots = selectedSlots.includes(slotId)
      ? selectedSlots.filter(s => s !== slotId)
      : [...selectedSlots, slotId];
    onToggleSlot(newSlots);
  };

  const isSlotSelected = (dayIndex, hora) => {
    const slotId = `${weekDays[dayIndex].toISOString().split('T')[0]}_${hora}`;
    return selectedSlots.includes(slotId);
  };

  return (
    <div className="schedule-grid">
      <div className="schedule-grid__header">
        <h2 className="schedule-grid__title">Elige la fecha:</h2>
        <div className="schedule-grid__navigation">
          <button
            onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
            disabled={currentWeek === 0}
            className="schedule-grid__nav-button"
          >
            ← Semana anterior
          </button>
          <div className="schedule-grid__week-indicator">
            <span className="schedule-grid__calendar-icon">📅</span>
            <span className="schedule-grid__week-range">{getWeekRange()}</span>
          </div>
          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="schedule-grid__nav-button"
          >
            Semana siguiente →
          </button>
        </div>
      </div>

      <div className="schedule-grid__table-container">
        <table className="schedule-grid__table">
          <thead>
            <tr>
              <th className="schedule-grid__cell schedule-grid__cell--header">
                🕐 Hora
              </th>
              {weekDays.map((date, idx) => (
                <th key={idx} className="schedule-grid__cell schedule-grid__cell--header schedule-grid__cell--day">
                  <div className="schedule-grid__day-name">{diasSemana[idx]}</div>
                  <div className="schedule-grid__day-date">{formatDate(date)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map((hora) => (
              <tr key={hora}>
                <td className="schedule-grid__cell schedule-grid__cell--time">
                  {hora}
                </td>
                {weekDays.map((_, dayIdx) => (
                  <td
                    key={dayIdx}
                    onClick={() => toggleSlot(dayIdx, hora)}
                    className={`schedule-grid__cell schedule-grid__cell--slot ${
                      isSlotSelected(dayIdx, hora) ? 'schedule-grid__cell--selected' : ''
                    }`}
                  >
                    <div className="schedule-grid__slot-content"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="schedule-grid__hint">
        💡 Haz clic en las celdas para seleccionar los horarios. Seleccionados: {selectedSlots.length}
      </p>
    </div>
  );
};

export default ScheduleGrid;