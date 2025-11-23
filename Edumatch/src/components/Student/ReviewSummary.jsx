import React from 'react';
// El CSS ya está cargado globalmente o en el padre

const ReviewSummary = () => {
  return (
    <div className="em-rating-summary">
      <div className="em-overall-rating">
        <div className="em-rating-number">4.6</div>
        <div className="em-rating-stars">★★★★★</div>
        <div className="em-rating-count">Promedio de 12 reseñas</div>
      </div>
      <div className="em-rating-breakdown">
        <div className="em-rating-row">
          <span className="em-rating-label">5 estrellas</span>
          <div className="em-bar-container"><div className="em-rating-bar" style={{width: '67%'}}></div></div>
          <span className="em-rating-percentage">67%</span>
        </div>
        <div className="em-rating-row">
          <span className="em-rating-label">4 estrellas</span>
          <div className="em-bar-container"><div className="em-rating-bar" style={{width: '25%'}}></div></div>
          <span className="em-rating-percentage">25%</span>
        </div>
        <div className="em-rating-row">
          <span className="em-rating-label">3 estrellas</span>
          <div className="em-bar-container"><div className="em-rating-bar" style={{width: '8%'}}></div></div>
          <span className="em-rating-percentage">8%</span>
        </div>
        <div className="em-rating-row">
          <span className="em-rating-label">2 estrellas</span>
          <div className="em-bar-container"><div className="em-rating-bar" style={{width: '0%'}}></div></div>
          <span className="em-rating-percentage">0%</span>
        </div>
        <div className="em-rating-row">
          <span className="em-rating-label">1 estrella</span>
          <div className="em-bar-container"><div className="em-rating-bar" style={{width: '0%'}}></div></div>
          <span className="em-rating-percentage">0%</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;