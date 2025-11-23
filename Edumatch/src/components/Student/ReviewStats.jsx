import React from 'react';

const ReviewStats = () => {
  return (
    <div className="em-stats-grid">
      <div className="em-stat-card">
        <div className="em-stat-icon">💬</div>
        <div className="em-stat-value">12</div>
        <div className="em-stat-label">Reseñas Escritas</div>
      </div>
      <div className="em-stat-card">
        <div className="em-stat-icon">👍</div>
        <div className="em-stat-value">11</div>
        <div className="em-stat-label">Reseñas Positivas</div>
      </div>
      <div className="em-stat-card">
        <div className="em-stat-icon">💬</div>
        <div className="em-stat-value">8</div>
        <div className="em-stat-label">Con Respuesta</div>
      </div>
      <div className="em-stat-card">
        <div className="em-stat-icon">📝</div>
        <div className="em-stat-value">6</div>
        <div className="em-stat-label">Pendientes</div>
      </div>
    </div>
  );
};

export default ReviewStats;