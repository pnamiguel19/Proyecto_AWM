import React from 'react';
import './ReviewSummary.css';

const ReviewSummary = ({ summary }) => {
  const getRatingPercentage = (count) => {
    return summary.totalReviews > 0 
      ? Math.round((count / summary.totalReviews) * 100) 
      : 0;
  };

  return (
    <div className="review-summary-container">
      <div className="average-rating-section">
        <div className="average-rating-value">{summary.averageRating.toFixed(1)}</div>
        <div className="average-rating-stars">
          {'⭐'.repeat(Math.floor(summary.averageRating))}
          {summary.averageRating % 1 !== 0 && '⭐'}
        </div>
        <p className="average-rating-text">Promedio de {summary.totalReviews} reseñas</p>
      </div>

      <div className="rating-distribution">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="rating-bar-row">
            <span className="rating-label">{stars} estrella{stars !== 1 && 's'}</span>
            <div className="rating-bar-container">
              <div 
                className="rating-bar-fill"
                style={{ width: `${getRatingPercentage(summary.ratingCounts[stars] || 0)}%` }}
              ></div>
            </div>
            <span className="rating-percentage">{getRatingPercentage(summary.ratingCounts[stars] || 0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;