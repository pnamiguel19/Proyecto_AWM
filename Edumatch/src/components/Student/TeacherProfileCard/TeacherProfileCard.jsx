import React from 'react';
import './TeacherProfileCard.css';

const TeacherProfileCard = ({ teacher }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < Math.floor(rating) ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <div className="teacher-profile-card">
      <div className="teacher-profile-card__images">
        <div className="teacher-profile-card__main-image">
          <img src={teacher.photos.main} alt={teacher.name} />
        </div>
        <div className="teacher-profile-card__additional-images">
          {teacher.photos.additional.map((photo, index) => (
            <div key={index} className="teacher-profile-card__small-image">
              <img src={photo} alt={`${teacher.name} - imagen ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="teacher-profile-card__info">
        <h1 className="teacher-profile-card__name">{teacher.name}</h1>
        <p className="teacher-profile-card__subject">{teacher.mainSubject}</p>
        <div className="teacher-profile-card__rating">
          <div className="teacher-profile-card__stars">
            {renderStars(teacher.rating)}
          </div>
          <span className="teacher-profile-card__rating-number">{teacher.rating}</span>
          <span className="teacher-profile-card__review-count">({teacher.reviewCount} reseñas)</span>
        </div>
        <div className="teacher-profile-card__modality">
          <span className="modality-badge">📍 {teacher.modality}</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileCard;