import React from 'react';
import './TeacherStats.css';

const TeacherStats = ({ stats }) => {
  const statsData = [
    { icon: '👨‍🏫', value: stats.totalTeachers, label: 'Profesores' },
    { icon: '⭐', value: stats.averageRating, label: 'Calificación Promedio' },
    { icon: '📚', value: stats.totalClasses, label: 'Clases Tomadas' },
    { icon: '💬', value: stats.reviewsLeft, label: 'Reseñas Dejadas' }
  ];

  return (
    <div className="teacher-stats-grid">
      {statsData.map((stat, index) => (
        <div key={index} className="teacher-stat-card">
          <div className="teacher-stat-icon">{stat.icon}</div>
          <div className="teacher-stat-value">{stat.value}</div>
          <div className="teacher-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TeacherStats;