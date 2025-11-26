import React from 'react';
import './AppointmentSummary.css';

const AppointmentSummary = ({ appointmentData }) => {
  const {
    teacherName,
    teacherPhoto,
    subject,
    modality,
    platform,
    location,
    locationAddress,
    schedules,
    description
  } = appointmentData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <div className="appointment-summary">
      <h2>📋 Resumen del Agendamiento</h2>

      {/* Información del profesor */}
      <div className="summary-teacher">
        <img 
          src={teacherPhoto} 
          alt={teacherName}
          className="teacher-avatar"
        />
        <div className="teacher-info">
          <h3>{teacherName}</h3>
          <p className="subject">{subject}</p>
        </div>
      </div>

      {/* Modalidad */}
      <div className="summary-section">
        <h4>📍 Modalidad</h4>
        <div className="modality-info">
          <span className={`modality-badge ${modality.toLowerCase()}`}>
            {modality}
          </span>
          {modality === 'virtual' && platform && (
            <p className="platform-info">🔗 Plataforma: {platform}</p>
          )}
          {modality === 'presencial' && locationAddress && (
            <p className="location-info">📌 Ubicación: {locationAddress}</p>
          )}
        </div>
      </div>

      {/* Horarios */}
      <div className="summary-section">
        <h4>🗓️ Horarios Agendados</h4>
        <div className="schedules-list">
          {schedules && schedules.map((schedule, index) => (
            <div key={index} className="schedule-item">
              <div className="schedule-date">
                📅 {formatDate(schedule.date)}
              </div>
              <div className="schedule-time">
                🕐 {schedule.startTime} - {schedule.endTime} ({schedule.hours}h)
              </div>
            </div>
          ))}
        </div>
        <p className="total-hours">
          Total: <strong>{appointmentData.totalHours} horas</strong>
        </p>
      </div>

      {/* Descripción */}
      {description && (
        <div className="summary-section">
          <h4>📝 Descripción</h4>
          <p className="description-text">{description}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentSummary;