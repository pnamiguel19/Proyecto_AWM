import React, { useState } from 'react';

const ReviewCard = ({ review }) => {
  const [imgError, setImgError] = useState(false);
  
  // Generar estrellas visuales
  const stars = '★'.repeat(Math.floor(review.rating));
  
  // Obtener iniciales para el fallback
  const initials = review.teacherName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="em-review-card">
      <div className="em-review-header">
        <div className="em-teacher-info">
          {/* Lógica de imagen: Si hay error o no hay URL, muestra iniciales */}
          {!imgError && review.teacherAvatar ? (
            <img 
              src={review.teacherAvatar} 
              alt={review.teacherName} 
              className="em-teacher-avatar"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="em-avatar-placeholder">
              {initials}
            </div>
          )}
          
          <div className="em-teacher-details">
            <h4>{review.teacherName}</h4>
            <div className="em-review-meta">
              <span>Profesor verificado</span>
            </div>
          </div>
        </div>
        <div className="em-review-rating">
          <div className="em-stars">{stars}</div>
          <span className="em-rating-val">{review.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="em-review-body">
        <span className="em-review-subject">{review.subject}</span>
        <p className="em-review-text">{review.comment}</p>
      </div>

      <div className="em-review-footer">
        <span className="em-class-date">Clase tomada el {review.date}</span>
      </div>

      {review.response && (
        <div className="em-teacher-response">
          <div className="em-response-header">
            <span>✓</span>
            <span>Respuesta del profesor</span>
          </div>
          <p className="em-response-text">{review.response}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;