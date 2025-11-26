import React from 'react';
import './TeacherReviews.css';

const TeacherReviews = ({ reviews, rating, reviewCount, approvalRate }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < Math.floor(rating) ? 'review-star filled' : 'review-star'}>
        ★
      </span>
    ));
  };

  return (
    <div className="teacher-reviews">
      <div className="teacher-reviews__header">
        <h2 className="teacher-reviews__title">⭐ Lo que dicen mis estudiantes</h2>
        <div className="teacher-reviews__stats">
          <div className="teacher-reviews__rating-large">
            {rating}
          </div>
          <div className="teacher-reviews__rating-details">
            <div className="teacher-reviews__stars">
              {renderStars(rating)}
            </div>
            <p className="teacher-reviews__approval">
              El {approvalRate}% lo recomienda
            </p>
          </div>
        </div>
      </div>

      <div className="teacher-reviews__list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-card__header">
              <div className="review-card__avatar">
                <span className="review-card__avatar-icon">👤</span>
              </div>
              <div className="review-card__info">
                <h3 className="review-card__name">{review.studentName}</h3>
                <div className="review-card__rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              <span className="review-card__date">{review.date}</span>
            </div>
            <p className="review-card__comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherReviews;