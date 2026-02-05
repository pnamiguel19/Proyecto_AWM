import React from 'react';
import './TeacherProfileCard.css';

const TeacherProfileCard = ({ teacher }) => {
  return (
    <article className="profile-card">
      <div className="photo-gallery">
        <div className="gallery-grid">
          <div className="gallery__main">📷</div>
          <div className="gallery__secondary">📷</div>
          <div className="gallery__secondary">📷</div>
        </div>

        <div className="profile-info">
          <h2 className="profile-info__name">{teacher.name}</h2>
          <p className="profile-info__subject">
            {teacher.mainSubject} {teacher.educationLevel && `- ${teacher.educationLevel}`}
          </p>

          <div className="rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(teacher.rating) ? "star" : "star star--empty"}>★</span>
              ))}
            </div>
            <span className="rating__text">{teacher.rating} ({teacher.reviewCount} reseñas)</span>
          </div>
        </div>
      </div>

      <div className="profile-card__body">
        <span className="badge">
          <span aria-hidden="true">📍</span> {teacher.modality}
        </span>
      </div>
    </article>
  );
};

export default TeacherProfileCard;
