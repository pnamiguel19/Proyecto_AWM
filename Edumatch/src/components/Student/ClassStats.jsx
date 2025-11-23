import React from 'react';
import './ClassStats.css';

const ClassStats = () => {
  return (
    <div className="em-stats-grid">
      <div className="em-stat-box">
        <div className="em-stat-icon">📚</div>
        <div className="em-stat-number">24</div>
        <div className="em-stat-label">Clases Totales</div>
      </div>
      <div className="em-stat-box">
        <div className="em-stat-icon">✅</div>
        <div className="em-stat-number">18</div>
        <div className="em-stat-label">Completadas</div>
      </div>
      <div className="em-stat-box">
        <div className="em-stat-icon">📅</div>
        <div className="em-stat-number">4</div>
        <div className="em-stat-label">Próximas</div>
      </div>
      <div className="em-stat-box">
        <div className="em-stat-icon">⏱️</div>
        <div className="em-stat-number">36</div>
        <div className="em-stat-label">Horas Totales</div>
      </div>
    </div>
  );
};

export default ClassStats;