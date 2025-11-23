import React from 'react';
import './ClassCard.css';

const ClassCard = ({ classData }) => {
  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { text: 'Próxima', class: 'badge-upcoming', icon: '📅' },
      completed: { text: 'Completada', class: 'badge-completed', icon: '✅' },
      cancelled: { text: 'Cancelada', class: 'badge-cancelled', icon: '❌' }
    };
    return badges[status] || badges.upcoming;
  };

  const badge = getStatusBadge(classData.status);

  return (
    <div className="class-card">
      <div className="class-card__header">
        <h3 className="class-subject">{classData.subject}</h3>
        <span className={`class-badge ${badge.class}`}>
          <span className="badge-icon">{badge.icon}</span>
          {badge.text}
        </span>
      </div>

      <div className="class-card__body">
        <div className="class-info-item">
          <span className="info-icon">👨‍🏫</span>
          <span className="info-text">{classData.teacher}</span>
        </div>

        <div className="class-info-item">
          <span className="info-icon">📅</span>
          <span className="info-text">{classData.date}</span>
        </div>

        <div className="class-info-item">
          <span className="info-icon">⏰</span>
          <span className="info-text">{classData.time}</span>
        </div>

        <div className="class-info-item">
          <span className="info-icon">⏱️</span>
          <span className="info-text">{classData.duration}</span>
        </div>

        <div className="class-info-item">
          <span className="info-icon">
            {classData.type === 'Virtual' ? '💻' : '🏫'}
          </span>
          <span className="info-text">{classData.type}</span>
        </div>
      </div>

      <div className="class-card__footer">
        {classData.status === 'upcoming' && (
          <>
            <button className="btn-class btn-class-primary">
              Unirse a la Clase
            </button>
            <button className="btn-class btn-class-secondary">
              Cancelar
            </button>
          </>
        )}

        {classData.status === 'completed' && (
          <button className="btn-class btn-class-primary">
            Dejar Reseña
          </button>
        )}
      </div>
    </div>
  );
};

export default ClassCard;