import React from 'react';
import './ReviewsSection.css';

const ReviewsSection = ({ reviews }) => {
    return (
        <div className="reviews-section">
            <h3>Reseñas</h3>
            {reviews.length > 0 ? (
                <ul className="reviews-list">
                    {reviews.map((review, index) => (
                        <li key={index} className="review-item">
                            <div className="review-header">
                                <span className="review-author">{review.author}</span>
                                <span className="review-rating">⭐ {review.rating}</span>
                            </div>
                            <p className="review-content">{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay reseñas disponibles.</p>
            )}
        </div>
    );
};

export default ReviewsSection;