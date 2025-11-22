import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ratings.css';

function Ratings() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [filterRating, setFilterRating] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterSort, setFilterSort] = useState('recent');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'professor') {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getInitials = () => {
    if (!currentUser) return '';
    return `${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`;
  };

  const menuItems = [
    { id: 'info', icon: '👤', label: 'Información sobre mí', path: '/professor/profile' },
    { id: 'classes', icon: '📚', label: 'Mis Clases', path: '/professor/classes' },
    { id: 'courses', icon: '📖', label: 'Mis Cursos', path: '/professor/courses' },
    { id: 'history', icon: '📊', label: 'Mi historial de Enseñanza', path: '/professor/history' },
    { id: 'schedule', icon: '📅', label: 'Disponibilidad y Horario', path: '/professor/schedule' },
    { id: 'documents', icon: '📄', label: 'Documentos de Acreditación', path: '/professor/documents' },
    { id: 'ratings', icon: '⭐', label: 'Mis Calificaciones y reseñas', path: '/professor/ratings' }
  ];

  // Reseñas de estudiantes
  const reviews = [
    {
      id: 1,
      student: {
        name: 'María González',
        avatar: 'MG',
        verified: true,
        classesCount: 6
      },
      rating: 5.0,
      subject: 'Física',
      comment: 'Excelente preparación para mi examen de admisión universitaria. Juan tiene un don para enseñar física de manera comprensible. Los ejercicios que preparo fueron muy similares a los del examen real. ¡Totalmente recomendado!',
      helpful: 10,
      date: 'Hace 3 semanas',
      response: {
        text: '¡Gracias Luis! Me alegra saber que entraste a la universidad. Todo el esfuerzo valió la pena. ¡Éxitos en esta nueva etapa!',
        date: 'Hace 3 semanas'
      }
    },
    {
      id: 2,
      student: {
        name: 'Sofía Fernández',
        avatar: 'SF',
        verified: true,
        classesCount: 10
      },
      rating: 5.0,
      subject: 'Matemáticas',
      comment: 'Las mejores clases de matemáticas que he tenido! Juan hace que incluso los temas más difíciles parezcan fáciles. Su método de enseñanza es muy efectivo y siempre tiene ejemplos prácticos. Pasé de reprobar a sacar 9 en mis exámenes. ¡Gracias!',
      helpful: 18,
      date: 'Hace 1 mes',
      response: null
    },
    {
      id: 3,
      student: {
        name: 'Diego Torres',
        avatar: 'DT',
        verified: true,
        classesCount: 4
      },
      rating: 5.0,
      subject: 'Física',
      comment: 'Profesor muy dedicado y paciente. Explica conceptos complejos de forma clara y siempre está dispuesto a resolver dudas. Recomendado 100%.',
      helpful: 8,
      date: 'Hace 2 meses',
      response: null
    },
    {
      id: 4,
      student: {
        name: 'Ana Silva',
        avatar: 'AS',
        verified: true,
        classesCount: 8
      },
      rating: 4.5,
      subject: 'Cálculo',
      comment: 'Muy buen profesor, explica bien y tiene mucha paciencia. Solo le daría 4.5 estrellas porque a veces las clases terminan un poco tarde.',
      helpful: 5,
      date: 'Hace 2 meses',
      response: null
    }
  ];

  // Estadísticas de calificaciones
  const ratingStats = {
    average: 4.8,
    total: 87,
    distribution: [
      { stars: 5, percentage: 75, count: 65 },
      { stars: 4, percentage: 18, count: 16 },
      { stars: 3, percentage: 5, count: 4 },
      { stars: 2, percentage: 2, count: 2 },
      { stars: 1, percentage: 0, count: 0 }
    ],
    positive: 82,
    recommendationRate: 94,
    responses: 12
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="rat-star filled">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="rat-star half">★</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="rat-star empty">★</span>);
    }

    return stars;
  };

  if (!currentUser) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando...</div>;
  }

  return (
    <div className="rat-page">
      {/* HEADER */}
      <header className="rat-header">
        <div className="rat-header-content">
          <div className="rat-header-left">
            <div className="rat-logo" onClick={() => navigate('/professor/profile')}>
              <span className="rat-logo-icon">🎓</span>
              <span className="rat-logo-text">EduMatch</span>
            </div>
          </div>

          <div className="rat-header-right">
            <button className="rat-btn-convert" onClick={() => navigate('/student/home')}>
              Conviértete en Estudiante
            </button>
            
            <div className="rat-user-menu-container">
              <button
                className="rat-user-avatar-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="rat-avatar-placeholder">{getInitials()}</div>
                <span className="rat-menu-icon">☰</span>
              </button>

              {showUserMenu && (
                <div className="rat-user-dropdown">
                  <div className="rat-dropdown-header">
                    <p className="rat-user-name">{currentUser.firstName} {currentUser.lastName}</p>
                    <p className="rat-user-email">{currentUser.email}</p>
                  </div>
                  <div className="rat-dropdown-divider"></div>
                  <button className="rat-dropdown-item" onClick={() => navigate('/professor/profile')}>
                    👤 Mi Perfil
                  </button>
                  <button className="rat-dropdown-item rat-logout" onClick={handleLogout}>
                    🚪 Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="rat-main-content">
        {/* SIDEBAR */}
        <aside className="rat-sidebar">
          <h2 className="rat-sidebar-title">Perfil</h2>
          <nav className="rat-sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`rat-sidebar-item ${item.id === 'ratings' ? 'rat-active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="rat-sidebar-icon">{item.icon}</span>
                <span className="rat-sidebar-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN SECTION */}
        <section className="rat-section">
          <h1 className="rat-section-title">Mis Calificaciones y Reseñas</h1>

          {/* RATING OVERVIEW */}
          <div className="rat-overview">
            <div className="rat-overview-left">
              <div className="rat-average-score">
                <div className="rat-score-number">{ratingStats.average}</div>
                <div className="rat-score-stars">{renderStars(ratingStats.average)}</div>
                <div className="rat-score-text">Basado en {ratingStats.total} reseñas</div>
              </div>
            </div>

            <div className="rat-overview-right">
              <div className="rat-distribution">
                {ratingStats.distribution.map((item) => (
                  <div key={item.stars} className="rat-distribution-row">
                    <span className="rat-distribution-label">{item.stars} estrellas</span>
                    <div className="rat-distribution-bar">
                      <div 
                        className="rat-distribution-fill" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="rat-distribution-percentage">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="rat-stats-grid">
            <div className="rat-stat-card">
              <div className="rat-stat-icon">💬</div>
              <div className="rat-stat-value">{ratingStats.total}</div>
              <div className="rat-stat-label">Total Reseñas</div>
            </div>

            <div className="rat-stat-card">
              <div className="rat-stat-icon">👍</div>
              <div className="rat-stat-value">{ratingStats.positive}</div>
              <div className="rat-stat-label">Reseñas Positivas</div>
            </div>

            <div className="rat-stat-card">
              <div className="rat-stat-icon">📝</div>
              <div className="rat-stat-value">{ratingStats.recommendationRate}%</div>
              <div className="rat-stat-label">Tasa de Recomendación</div>
            </div>

            <div className="rat-stat-card">
              <div className="rat-stat-icon">💭</div>
              <div className="rat-stat-value">{ratingStats.responses}</div>
              <div className="rat-stat-label">Respuestas Dadas</div>
            </div>
          </div>

          {/* FILTERS */}
          <div className="rat-filters">
            <select 
              className="rat-filter-select"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="all">Todas las calificaciones</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
            </select>

            <select 
              className="rat-filter-select"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="all">Todas las materias</option>
              <option value="matematicas">Matemáticas</option>
              <option value="fisica">Física</option>
              <option value="calculo">Cálculo</option>
            </select>

            <select 
              className="rat-filter-select"
              value={filterSort}
              onChange={(e) => setFilterSort(e.target.value)}
            >
              <option value="recent">Más recientes</option>
              <option value="oldest">Más antiguas</option>
              <option value="highest">Mejor calificadas</option>
              <option value="lowest">Peor calificadas</option>
            </select>
          </div>

          {/* REVIEWS LIST */}
          <div className="rat-reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="rat-review-card">
                <div className="rat-review-header">
                  <div className="rat-student-info">
                    <div className="rat-student-avatar">{review.student.avatar}</div>
                    <div className="rat-student-details">
                      <div className="rat-student-name">
                        {review.student.name}
                        {review.student.verified && <span className="rat-verified-badge">✓ Estudiante verificado</span>}
                      </div>
                      <div className="rat-student-meta">
                        • {review.student.classesCount} clases tomadas
                      </div>
                    </div>
                  </div>
                  <div className="rat-review-rating">
                    <div className="rat-rating-stars">{renderStars(review.rating)}</div>
                    <div className="rat-rating-number">{review.rating}</div>
                  </div>
                </div>

                <div className="rat-review-subject">
                  <span className="rat-subject-badge">{review.subject}</span>
                </div>

                <div className="rat-review-content">
                  <p className="rat-review-comment">{review.comment}</p>
                </div>

                <div className="rat-review-footer">
                  <div className="rat-review-helpful">
                    <button className="rat-helpful-btn">
                      👍 {review.helpful} personas encontraron esto útil
                    </button>
                  </div>
                  <div className="rat-review-date">{review.date}</div>
                </div>

                {review.response && (
                  <div className="rat-response">
                    <div className="rat-response-header">
                      <span className="rat-response-icon">✓</span>
                      <span className="rat-response-title">Respuesta del profesor</span>
                    </div>
                    <p className="rat-response-text">{review.response.text}</p>
                  </div>
                )}

                {!review.response && (
                  <div className="rat-response-actions">
                    <button className="rat-btn-respond">💬 Responder</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Ratings;