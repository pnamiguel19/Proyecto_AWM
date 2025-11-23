import React from 'react';
import './TeacherCard.css';

const TeacherCard = ({ teacher }) => {
  if (!teacher) return null;

  return (
    <div className="em-teacher-card">
      {/* Header: Avatar y Badge */}
      <div className="em-tc-header">
        <div className="em-avatar-wrapper">
          <img src={teacher.avatar} alt={teacher.name} className="em-tc-avatar" />
          <div className="em-verified-badge">✓</div>
        </div>
        <h3 className="em-tc-name">{teacher.name}</h3>
        
        <div className="em-tc-subjects">
          {teacher.subjects.map((sub, idx) => (
            <span key={idx} className="em-subject-pill">{sub}</span>
          ))}
        </div>

        <div className="em-tc-rating">
          <span className="em-stars">★★★★★</span>
          <span className="em-rating-val">{teacher.rating}</span>
          <span className="em-rating-count">({teacher.reviewCount} reseñas)</span>
        </div>
      </div>

      {/* Stats Internos */}
      <div className="em-tc-stats">
        <div className="em-tc-stat-item">
          <span className="em-val">{teacher.classesTogether}</span>
          <span className="em-lbl">Clases juntos</span>
        </div>
        <div className="em-tc-stat-item">
          <span className="em-val">{teacher.totalHours}</span>
          <span className="em-lbl">Horas totales</span>
        </div>
      </div>

      {/* Botones */}
      <div className="em-tc-actions">
        <button className="em-btn-full em-btn-cyan-solid">
          📅 Agendar Clase
        </button>
        <button className="em-btn-full em-btn-cyan-outline">
          👁️ Ver Perfil
        </button>
      </div>

      {/* Footer */}
      <div className="em-tc-footer">
        <strong>Última clase:</strong> {teacher.lastClass}
      </div>
    </div>
  );
};

export default TeacherCard;