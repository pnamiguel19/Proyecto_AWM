import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="teacher-review-info">
          <div className="teacher-review-avatar">
            <img src={review.teacherAvatar || ""} alt={review.teacherName} />
          </div>
          <div className="teacher-review-details">
            <h3 className="teacher-review-name">{review.teacherName}</h3>
            <span className="teacher-review-verified">
              {review.teacherVerified && '✓ '} Profesor verificado
            </span>
            <span className="review-subject-tag">{review.subject}</span>
          </div>
        </div>
        <div className="review-rating-header">
          <div className="review-stars-display">
            {'⭐'.repeat(review.rating)}
          </div>
          <span className="review-rating-value">{review.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="review-card-body">
        <p className="review-text">{review.comment}</p>

        <div className="review-metadata">
          <span className="review-class-info">
            Clase tomada el {review.classDate}
          </span>
        </div>

        {review.teacherResponse && (
          <div className="teacher-response-section">
            <div className="teacher-response-header">
              <span className="response-icon">✓</span>
              <span className="response-label">Respuesta del profesor</span>
            </div>
            <p className="teacher-response-text">{review.teacherResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;