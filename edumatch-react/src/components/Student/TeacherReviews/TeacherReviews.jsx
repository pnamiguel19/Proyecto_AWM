import React from 'react';
import './TeacherReviews.css';

const TeacherReviews = ({ reviews, rating, reviewCount, approvalRate }) => {
  // Mock reviews si no hay del backend
  const mockReviews = [
    {
      name: 'María Fernández',
      rating: 5,
      date: 'Hace 1 mes',
      text: 'Excelente profesor. Explica de manera clara y siempre está dispuesto a resolver dudas.'
    },
    {
      name: 'Carlos Rodríguez',
      rating: 5,
      date: 'Hace 2 meses',
      text: 'Sus clases son muy dinámicas y usa ejemplos de la vida real que hacen fácil entender conceptos complicados.'
    },
    {
      name: 'Ana Martínez',
      rating: 4,
      date: 'Hace 3 meses',
      text: 'Muy paciente y dedicado. Me ayudó a prepararme para mi examen final y obtuve una excelente calificación.'
    }
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : mockReviews;

  return (
    <section className="reviews-section">
      <div className="container">
        <header className="reviews-header">
          <h3 className="reviews-title">
            <span aria-hidden="true">⭐</span>
            Lo que dicen mis estudiantes
          </h3>
          <div className="reviews-stats">
            <span className="reviews-average">{rating || 4.8}</span>
            <div className="reviews-stats__info">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(rating) ? "star" : "star star--empty"}>★</span>
                ))}
              </div>
              <p className="reviews-percentage">El {approvalRate || 98}% lo recomienda</p>
            </div>
          </div>
        </header>

        <ul className="reviews-grid">
          {displayReviews.map((review, index) => (
            <li key={index} className="review-card">
              <div className="review-card__header">
                <div className="review-avatar">👤</div>
                <div className="review-user">
                  <h4 className="review-user__name">{review.name || review.studentName}</h4>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < (review.rating || 5) ? "star" : "star star--empty"}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <time className="review-card__date">{review.date || review.createdAt}</time>
              <p className="review-card__text">{review.text || review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TeacherReviews;
