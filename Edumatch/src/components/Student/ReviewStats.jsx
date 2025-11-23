import React from 'react';
import './ReviewStats.css';

const ReviewStats = ({ stats }) => {
  const statsData = [
    { icon: '💬', value: stats.totalWritten, label: 'Reseñas Escritas' },
    { icon: '👍', value: stats.positiveReviews, label: 'Reseñas Positivas' },
    { icon: '📝', value: stats.withResponse, label: 'Con Respuesta' },
    { icon: '📋', value: stats.pending, label: 'Pendientes' }
  ];

  return (
    <div className="review-stats-grid">
      {statsData.map((stat, index) => (
        <div key={index} className="review-stat-card">
          <div className="review-stat-icon">{stat.icon}</div>
          <div className="review-stat-value">{stat.value}</div>
          <div className="review-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewStats;