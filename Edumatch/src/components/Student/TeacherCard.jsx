import React from 'react';
import './TeacherCard.css';

const TeacherCard = ({ teacher, onScheduleClass, onViewProfile }) => {
  return (
    <div className="teacher-card">
      <div className="teacher-card-header">
        <div className="teacher-avatar-section">
          <div className="teacher-avatar-large">
            <img src={teacher.avatar || ""} alt={teacher.name} />
            {teacher.verified && (
              <span className="verified-badge-teacher">✓</span>
            )}
          </div>
        </div>
        <div className="teacher-main-info">
          <h3 className="teacher-card-name">{teacher.name}</h3>
          <div className="teacher-subjects">
            {teacher.subjects.map((subject, index) => (
              <span key={index} className="subject-tag">{subject}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="teacher-card-body">
        <div className="teacher-rating-section">
          <div className="rating-stars">
            {'⭐'.repeat(Math.floor(teacher.rating))}
            {teacher.rating % 1 !== 0 && '⭐'}
          </div>
          <span className="rating-value">{teacher.rating}</span>
          <span className="rating-count">({teacher.reviewCount} reseñas)</span>
        </div>

        <div className="teacher-stats-inline">
          <div className="stat-inline">
            <span className="stat-inline-value">{teacher.classesTogether}</span>
            <span className="stat-inline-label">Clases juntos</span>
          </div>
          <div className="stat-inline">
            <span className="stat-inline-value">{teacher.totalHours}h</span>
            <span className="stat-inline-label">Horas totales</span>
          </div>
        </div>

        <div className="teacher-last-class">
          <span className="last-class-label">Última clase:</span>
          <span className="last-class-date">{teacher.lastClassDate} - {teacher.lastClassSubject}</span>
        </div>
      </div>

      <div className="teacher-card-actions">
        <button 
          className="btn-schedule-class"
          onClick={() => onScheduleClass(teacher.id)}
        >
          📅 Agendar Clase
        </button>
        <button 
          className="btn-view-profile"
          onClick={() => onViewProfile(teacher.id)}
        >
          👁️ Ver Perfil
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;