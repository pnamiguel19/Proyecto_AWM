import React from 'react';
import './ClassStats.css';

const ClassStats = ({ stats }) => {
  return (
    <div className="class-stats">
      <div className="stat-item">
        <div className="stat-icon stat-icon--total">📊</div>
        <div className="stat-content">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon stat-icon--completed">✅</div>
        <div className="stat-content">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completadas</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon stat-icon--upcoming">📅</div>
        <div className="stat-content">
          <span className="stat-value">{stats.upcoming}</span>
          <span className="stat-label">Próximas</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon stat-icon--cancelled">❌</div>
        <div className="stat-content">
          <span className="stat-value">{stats.cancelled}</span>
          <span className="stat-label">Canceladas</span>
        </div>
      </div>
    </div>
  );
};

export default ClassStats;