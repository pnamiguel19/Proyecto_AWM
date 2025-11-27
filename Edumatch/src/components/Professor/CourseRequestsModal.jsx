import React, { useState } from 'react';
import './CourseRequestsModal.css';

const CourseRequestsModal = ({ isOpen, onClose, requests, onAccept, onReject }) => {
  const [filter, setFilter] = useState('all');

  if (!isOpen) return null;

  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="crsm-star filled">★</span>);
    }
    if (hasHalf) {
      stars.push(<span key="half" className="crsm-star half">★</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="crsm-star empty">★</span>);
    }
    return stars;
  };

  return (
    <div className="crsm-overlay" onClick={onClose}>
      <div className="crsm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="crsm-header">
          <div className="crsm-header-content">
            <h2 className="crsm-title">📚 Solicitudes de Cursos</h2>
            <p className="crsm-subtitle">Estudiantes solicitando nuevos cursos</p>
          </div>
          <button className="crsm-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Filtros */}
        <div className="crsm-filters">
          <button 
            className={`crsm-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas ({requests.length})
          </button>
          <button 
            className={`crsm-filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pendientes ({requests.filter(r => r.status === 'pending').length})
          </button>
        </div>

        {/* Lista de Solicitudes */}
        <div className="crsm-body">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div key={request.id} className="crsm-request-card">
                <div className="crsm-request-header">
                  <div className="crsm-student-info">
                    <div className="crsm-student-avatar">{request.student.avatar}</div>
                    <div className="crsm-student-details">
                      <h3 className="crsm-student-name">{request.student.name}</h3>
                      <div className="crsm-student-rating">
                        <div className="crsm-stars">{renderStars(request.student.rating)}</div>
                        <span className="crsm-rating-number">{request.student.rating}</span>
                        <span className="crsm-courses-count">• {request.student.coursesCount} cursos</span>
                      </div>
                    </div>
                  </div>
                  <div className="crsm-request-meta">
                    <span className="crsm-request-time">{request.requestDate}</span>
                    <span className="crsm-interested-badge">
                      👥 {request.studentsInterested} interesados
                    </span>
                  </div>
                </div>

                <div className="crsm-request-body">
                  <div className="crsm-topic-info">
                    <h4 className="crsm-topic">{request.topic}</h4>
                    <div className="crsm-tags">
                      <span className="crsm-category-badge">{request.category}</span>
                      <span className="crsm-level-badge">{request.level}</span>
                    </div>
                  </div>

                  <div className="crsm-description">
                    <p className="crsm-description-text">{request.description}</p>
                  </div>

                  <div className="crsm-modules-section">
                    <h5 className="crsm-modules-title">📋 Módulos sugeridos:</h5>
                    <ul className="crsm-modules-list">
                      {request.suggestedModules.map((module, index) => (
                        <li key={index} className="crsm-module-item">
                          <span className="crsm-module-number">{index + 1}</span>
                          <span className="crsm-module-name">{module}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="crsm-request-footer">
                    <div className="crsm-budget-info">
                      <span className="crsm-budget-label">💰 Presupuesto:</span>
                      <span className="crsm-budget-value">{request.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="crsm-request-actions">
                  <button 
                    className="crsm-btn-reject"
                    onClick={() => onReject(request.id)}
                  >
                    ✕ Rechazar
                  </button>
                  <button 
                    className="crsm-btn-accept"
                    onClick={() => onAccept(request)}
                  >
                    ✓ Aceptar y Crear Curso
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="crsm-empty-state">
              <div className="crsm-empty-icon">📭</div>
              <h3 className="crsm-empty-title">No hay solicitudes</h3>
              <p className="crsm-empty-text">Cuando los estudiantes soliciten cursos, aparecerán aquí</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseRequestsModal;