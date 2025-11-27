import React, { useState, useMemo } from 'react';
import './Ratings.css';

function Ratings() {
  const [filterRating, setFilterRating] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterSort, setFilterSort] = useState('recent');

  // Reseñas de estudiantes
  const allReviews = [
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
      timestamp: new Date('2024-11-06'),
      response: {
        text: '¡Gracias María! Me alegra saber que entraste a la universidad. Todo el esfuerzo valió la pena. ¡Éxitos en esta nueva etapa!',
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
      timestamp: new Date('2024-10-27'),
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
      timestamp: new Date('2024-09-27'),
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
      timestamp: new Date('2024-09-25'),
      response: null
    },
    {
      id: 5,
      student: {
        name: 'Carlos Ramírez',
        avatar: 'CR',
        verified: true,
        classesCount: 12
      },
      rating: 4.0,
      subject: 'Matemáticas',
      comment: 'Buen profesor, aunque a veces va muy rápido con los temas. Me ayudó mucho a preparar mi examen final.',
      helpful: 7,
      date: 'Hace 3 meses',
      timestamp: new Date('2024-08-27'),
      response: {
        text: 'Gracias Carlos por tu feedback. Trataré de ajustar el ritmo de las clases para que todos puedan seguir mejor.',
        date: 'Hace 3 meses'
      }
    },
    {
      id: 6,
      student: {
        name: 'Laura Méndez',
        avatar: 'LM',
        verified: true,
        classesCount: 3
      },
      rating: 3.5,
      subject: 'Física',
      comment: 'El contenido es bueno pero creo que necesita mejorar la puntualidad. Varias veces empezamos tarde.',
      helpful: 3,
      date: 'Hace 4 meses',
      timestamp: new Date('2024-07-27'),
      response: null
    },
    {
      id: 7,
      student: {
        name: 'Pedro Vargas',
        avatar: 'PV',
        verified: true,
        classesCount: 15
      },
      rating: 5.0,
      subject: 'Cálculo',
      comment: 'Increíble profesor! Gracias a él pude aprobar Cálculo II. Muy recomendado.',
      helpful: 12,
      date: 'Hace 5 meses',
      timestamp: new Date('2024-06-27'),
      response: {
        text: '¡Felicidades Pedro! Tu esfuerzo fue clave. Sigue así!',
        date: 'Hace 5 meses'
      }
    },
    {
      id: 8,
      student: {
        name: 'Valeria Ruiz',
        avatar: 'VR',
        verified: true,
        classesCount: 7
      },
      rating: 4.5,
      subject: 'Matemáticas',
      comment: 'Excelente metodología de enseñanza. Explica todo de manera muy clara.',
      helpful: 9,
      date: 'Hace 6 meses',
      timestamp: new Date('2024-05-27'),
      response: null
    }
  ];

  // Filtrar y ordenar reseñas
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = [...allReviews];

    // Filtrar por calificación
    if (filterRating !== 'all') {
      const ratingNum = parseFloat(filterRating);
      filtered = filtered.filter(review => {
        const reviewRating = Math.floor(review.rating);
        return reviewRating === ratingNum;
      });
    }

    // Filtrar por materia
    if (filterSubject !== 'all') {
      filtered = filtered.filter(review => 
        review.subject.toLowerCase() === filterSubject.toLowerCase()
      );
    }

    // Ordenar
    switch (filterSort) {
      case 'recent':
        filtered.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [filterRating, filterSubject, filterSort, allReviews]);

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

  return (
    <div className="rat-container">
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
        <div className="rat-filter-group">
          <label className="rat-filter-label">📊 Calificación</label>
          <select 
            className="rat-filter-select"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="all">Todas las calificaciones</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 estrellas</option>
            <option value="4">⭐⭐⭐⭐ 4 estrellas</option>
            <option value="3">⭐⭐⭐ 3 estrellas</option>
            <option value="2">⭐⭐ 2 estrellas</option>
            <option value="1">⭐ 1 estrella</option>
          </select>
        </div>

        <div className="rat-filter-group">
          <label className="rat-filter-label">📚 Materia</label>
          <select 
            className="rat-filter-select"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option value="all">Todas las materias</option>
            <option value="matemáticas">Matemáticas</option>
            <option value="física">Física</option>
            <option value="cálculo">Cálculo</option>
          </select>
        </div>

        <div className="rat-filter-group">
          <label className="rat-filter-label">🔄 Ordenar por</label>
          <select 
            className="rat-filter-select"
            value={filterSort}
            onChange={(e) => setFilterSort(e.target.value)}
          >
            <option value="recent">🕐 Más recientes</option>
            <option value="oldest">🕑 Más antiguas</option>
            <option value="highest">⬆️ Mejor calificadas</option>
            <option value="lowest">⬇️ Peor calificadas</option>
          </select>
        </div>
      </div>

      {/* RESULTS COUNT */}
      <div className="rat-results-info">
        <span className="rat-results-count">
          {filteredAndSortedReviews.length} {filteredAndSortedReviews.length === 1 ? 'reseña encontrada' : 'reseñas encontradas'}
        </span>
        {(filterRating !== 'all' || filterSubject !== 'all') && (
          <button 
            className="rat-clear-filters"
            onClick={() => {
              setFilterRating('all');
              setFilterSubject('all');
            }}
          >
            ✕ Limpiar filtros
          </button>
        )}
      </div>

      {/* REVIEWS LIST */}
      {filteredAndSortedReviews.length > 0 ? (
        <div className="rat-reviews-list">
          {filteredAndSortedReviews.map((review) => (
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
      ) : (
        <div className="rat-no-results">
          <div className="rat-no-results-icon">🔍</div>
          <h3 className="rat-no-results-title">No se encontraron reseñas</h3>
          <p className="rat-no-results-text">
            Intenta cambiar los filtros para ver más resultados
          </p>
          <button 
            className="rat-btn-reset"
            onClick={() => {
              setFilterRating('all');
              setFilterSubject('all');
              setFilterSort('recent');
            }}
          >
            Restablecer filtros
          </button>
        </div>
      )}
    </div>
  );
}

export default Ratings;