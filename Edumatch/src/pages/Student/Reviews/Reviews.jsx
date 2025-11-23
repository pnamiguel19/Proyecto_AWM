import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import StudentProfileSidebar from '../../../components/Student/StudentProfileSidebar';
import ReviewCard from '../../../components/Student/ReviewCard';
import ReviewFilters from '../../../components/Student/ReviewFilters';
import ReviewStats from '../../../components/Student/ReviewStats';
import './Reviews.css';

const Reviews = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🎓</div>
        <p>Cargando...</p>
      </div>
    );
  }

  const mockReviews = [
    {
      id: 1,
      teacher: 'María García',
      subject: 'Matemáticas',
      rating: 5,
      comment: 'Excelente profesora, muy paciente y clara en sus explicaciones.',
      date: '2024-11-15'
    }
  ];

  const stats = {
    total: 12,
    average: 4.8,
    lastMonth: 3
  };

  return (
    <div className="reviews-page">
      <StudentHeader currentUser={currentUser} onLogout={onLogout} />

      <main className="reviews-main">
        <div className="reviews-container">
          <StudentProfileSidebar activeSection="reviews" />
          
          <div className="reviews-content">
            <div className="reviews-header">
              <h1 className="page-title">Mis Reseñas</h1>
              <p className="page-subtitle">Reseñas que has dejado a tus profesores</p>
            </div>

            <ReviewStats stats={stats} />
            
            <ReviewFilters />

            <div className="reviews-list">
              {mockReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {mockReviews.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">⭐</div>
                <h3>No has dejado reseñas aún</h3>
                <p>Después de tus clases, podrás calificar a tus profesores</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reviews;