import React from 'react';
import './TeacherStats.css';

const TeacherStats = () => {
  return (
    <div className="em-stats-grid">
      <div className="em-stat-box">
        <div className="em-stat-icon">👨‍🏫</div>
        <div className="em-stat-number">6</div>
        <div className="em-stat-label">Profesores</div>
      </div>
      <div className="em-stat-box">
        <div className="em-stat-icon">⭐</div>
        <div className="em-stat-number">4.7</div>
        <div className="em-stat-label">Calificación Promedio</div>
      </div>
      <div className="em-stat-box">
        <div className="em-stat-icon">📚</div>
        <div className="em-stat-number">24</div>
        <div className="em-stat-label">Clases Tomadas</div>
      </div>
      <div className="em-stat-box">
        <div className="em-stat-icon">💬</div>
        <div className="em-stat-number">5</div>
        <div className="em-stat-label">Reseñas Dejadas</div>
      </div>
    </div>
  );
};

export default TeacherStats;