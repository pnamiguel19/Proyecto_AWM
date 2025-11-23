import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import StudentProfileSidebar from '../../../components/Student/StudentProfileSidebar';
import './StudentDashboard.css';

const StudentDashboard = ({ currentUser, onLogout }) => {
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

  const dashboardStats = {
    upcomingClasses: 5,
    completedClasses: 12,
    activeTeachers: 3,
    totalHours: 18
  };

  return (
    <div className="student-dashboard-page">
      <StudentHeader currentUser={currentUser} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="dashboard-container">
          <StudentProfileSidebar activeSection="dashboard" />
          
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1 className="page-title">Panel Principal</h1>
              <p className="page-subtitle">Bienvenido, {currentUser.firstName}</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-info">
                  <h3 className="stat-value">{dashboardStats.upcomingClasses}</h3>
                  <p className="stat-label">Clases Próximas</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3 className="stat-value">{dashboardStats.completedClasses}</h3>
                  <p className="stat-label">Clases Completadas</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👨‍🏫</div>
                <div className="stat-info">
                  <h3 className="stat-value">{dashboardStats.activeTeachers}</h3>
                  <p className="stat-label">Profesores Activos</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-info">
                  <h3 className="stat-value">{dashboardStats.totalHours}</h3>
                  <p className="stat-label">Horas Totales</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h2 className="section-title">Acciones Rápidas</h2>
              <div className="actions-grid">
                <button 
                  className="action-btn"
                  onClick={() => navigate('/')}
                >
                  <span className="action-icon">🔍</span>
                  <span>Buscar Profesores</span>
                </button>

                <button 
                  className="action-btn"
                  onClick={() => navigate('/student/classes')}
                >
                  <span className="action-icon">📅</span>
                  <span>Ver Mis Clases</span>
                </button>

                <button 
                  className="action-btn"
                  onClick={() => navigate('/student/teachers')}
                >
                  <span className="action-icon">👥</span>
                  <span>Mis Profesores</span>
                </button>

                <button 
                  className="action-btn"
                  onClick={() => navigate('/student/reviews')}
                >
                  <span className="action-icon">⭐</span>
                  <span>Mis Reseñas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;