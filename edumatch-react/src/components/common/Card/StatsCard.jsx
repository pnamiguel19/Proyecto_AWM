import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon, trend, bgColor }) => {
  const isPositive = trend && trend.startsWith('+');

  return (
    <div className="stats-card">
      <div className="stats-card__content">
        <h3 className="stats-card__value">{value}</h3>
        <p className="stats-card__title">{title}</p>
        {trend && (
          <p className={`stats-card__trend ${isPositive ? 'stats-card__trend--positive' : 'stats-card__trend--negative'}`}>
            {trend}
          </p>
        )}
      </div>
      <div className={`stats-card__icon stats-card__icon--${bgColor}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;