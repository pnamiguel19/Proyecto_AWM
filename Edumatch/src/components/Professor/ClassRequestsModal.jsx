import React, { useState } from 'react';
import './ClassRequestsModal.css';

const ClassRequestsModal = ({ isOpen, onClose, requests, onAccept, onReject }) => {
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
      stars.push(<span key={`full-${i}`} className="crm-star filled">★</span>);
    }
    if (hasHalf) {
      stars.push(<span key="half" className="crm-star half">★</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="crm-star empty">★</span>);
    }
    return stars;
  };

  return (
    <div className="crm-overlay" onClick={onClose}>
      <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="crm-header">
          <div className="crm-header-content">
            <h2 className="crm-title">📬 Solicitudes de Clases</h2>
            <p className="crm-subtitle">Gestiona las solicitudes de tus estudiantes</p>
          </div>
          <button className="crm-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Filtros */}
        <div className="crm-filters">
          <button 
            className={`crm-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas ({requests.length})
          </button>
          <button 
            className={`crm-filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pendientes ({requests.filter(r => r.status === 'pending').length})
          </button>
        </div>

        {/* Lista de Solicitudes */}
        <div className="crm-body">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div key={request.id} className="crm-request-card">
                <div className="crm-request-header">
                  <div className="crm-student-info">
                    <div className="crm-student-avatar">{request.student.avatar}</div>
                    <div className="crm-student-details">
                      <h3 className="crm-student-name">{request.student.name}</h3>
                      <div className="crm-student-rating">
                        <div className="crm-stars">{renderStars(request.student.rating)}</div>
                        <span className="crm-rating-number">{request.student.rating}</span>
                        <span className="crm-classes-count">• {request.student.classesCount} clases</span>
                      </div>
                    </div>
                  </div>
                  <div className="crm-request-time">{request.requestDate}</div>
                </div>

                <div className="crm-request-body">
                  <div className="crm-subject-info">
                    <span className="crm-subject-badge">{request.subject}</span>
                    <h4 className="crm-topic">{request.topic}</h4>
                  </div>

                  <div className="crm-request-message">
                    <p className="crm-message-text">{request.message}</p>
                  </div>

                  <div className="crm-request-details">
                    <div className="crm-detail-item">
                      <span className="crm-detail-icon">📅</span>
                      <span className="crm-detail-label">Fecha preferida:</span>
                      <span className="crm-detail-value">{request.preferredDate}</span>
                    </div>
                    <div className="crm-detail-item">
                      <span className="crm-detail-icon">🕐</span>
                      <span className="crm-detail-label">Hora:</span>
                      <span className="crm-detail-value">{request.preferredTime}</span>
                    </div>
                    <div className="crm-detail-item">
                      <span className="crm-detail-icon">⏱️</span>
                      <span className="crm-detail-label">Duración:</span>
                      <span className="crm-detail-value">{request.duration} min</span>
                    </div>
                    <div className="crm-detail-item">
                      <span className="crm-detail-icon">💵</span>
                      <span className="crm-detail-label">Presupuesto:</span>
                      <span className="crm-detail-value">{request.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="crm-request-actions">
                  <button 
                    className="crm-btn-reject"
                    onClick={() => onReject(request.id)}
                  >
                    ✕ Rechazar
                  </button>
                  <button 
                    className="crm-btn-accept"
                    onClick={() => onAccept(request)}
                  >
                    ✓ Aceptar y Crear Clase
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="crm-empty-state">
              <div className="crm-empty-icon">📭</div>
              <h3 className="crm-empty-title">No hay solicitudes</h3>
              <p className="crm-empty-text">Cuando los estudiantes soliciten clases, aparecerán aquí</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassRequestsModal;