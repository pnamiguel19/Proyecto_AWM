import React, { useState } from 'react';
import './ClassDetailsModal.css';

const ClassDetailsModal = ({ isOpen, onClose, classData }) => {
  const [activeTab, setActiveTab] = useState('general');

  if (!isOpen || !classData) return null;

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completada': return '✅';
      case 'Programada': return '⏳';
      case 'Cancelada': return '❌';
      default: return '📌';
    }
  };

  const renderGeneralTab = () => (
    <div className="cdm-tab-content">
      {/* Student Info */}
      <div className="cdm-section">
        <h3 className="cdm-section-title">
          <span className="cdm-section-icon">👤</span>
          Información del Estudiante
        </h3>
        <div className="cdm-student-card">
          <div className="cdm-student-avatar-large">
            {classData.student.avatar}
          </div>
          <div className="cdm-student-info">
            <h4 className="cdm-student-name">{classData.student.name}</h4>
            <p className="cdm-student-email">📧 {classData.student.email}</p>
            <p className="cdm-student-phone">📱 +52 555 123 4567</p>
            <div className="cdm-student-stats">
              <span className="cdm-stat-badge">📚 12 clases completadas</span>
              <span className="cdm-stat-badge">⭐ 4.8 de calificación</span>
            </div>
          </div>
        </div>
      </div>

      {/* Class Details */}
      <div className="cdm-section">
        <h3 className="cdm-section-title">
          <span className="cdm-section-icon">📝</span>
          Detalles de la Clase
        </h3>
        <div className="cdm-details-grid">
          <div className="cdm-detail-item">
            <span className="cdm-detail-label">Título</span>
            <span className="cdm-detail-value">{classData.title}</span>
          </div>
          <div className="cdm-detail-item">
            <span className="cdm-detail-label">Materia</span>
            <span className="cdm-detail-value">
              <span className="cdm-subject-badge">{classData.subject}</span>
            </span>
          </div>
          <div className="cdm-detail-item">
            <span className="cdm-detail-label">Fecha</span>
            <span className="cdm-detail-value">📅 {classData.date}</span>
          </div>
          <div className="cdm-detail-item">
            <span className="cdm-detail-label">Hora</span>
            <span className="cdm-detail-value">🕐 {classData.time}</span>
          </div>
          <div className="cdm-detail-item">
            <span className="cdm-detail-label">Duración</span>
            <span className="cdm-detail-value">⏱️ {classData.duration}</span>
          </div>
          <div className="cdm-detail-item">
            <span className="cdm-detail-label">Modalidad</span>
            <span className="cdm-detail-value">
              <span className={`cdm-modality-badge ${classData.modality === 'En línea' ? 'online' : 'presencial'}`}>
                {classData.modality === 'En línea' ? '🌐' : '🏫'} {classData.modality}
              </span>
            </span>
          </div>
        </div>

        {classData.modality === 'En línea' && (
          <div className="cdm-meeting-link">
            <span className="cdm-meeting-icon">🔗</span>
            <div>
              <p className="cdm-meeting-label">Enlace de videollamada:</p>
              <a href="#" className="cdm-meeting-url">https://meet.edumatch.com/clase-fisica-123</a>
            </div>
            <button className="cdm-copy-btn">📋 Copiar</button>
          </div>
        )}

        {classData.modality === 'Presencial' && (
          <div className="cdm-location">
            <span className="cdm-location-icon">📍</span>
            <div>
              <p className="cdm-location-label">Ubicación:</p>
              <p className="cdm-location-address">Av. Universidad 3000, Ciudad Universitaria, CDMX</p>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="cdm-section">
        <h3 className="cdm-section-title">
          <span className="cdm-section-icon">📄</span>
          Descripción
        </h3>
        <p className="cdm-description">
          {classData.description || 'Clase enfocada en resolver dudas y reforzar conceptos fundamentales de la materia. Se trabajará con ejercicios prácticos y ejemplos del mundo real.'}
        </p>
      </div>
    </div>
  );

  const renderPaymentTab = () => (
    <div className="cdm-tab-content">
      <div className="cdm-section">
        <h3 className="cdm-section-title">
          <span className="cdm-section-icon">💰</span>
          Información Financiera
        </h3>
        <div className="cdm-payment-card">
          <div className="cdm-payment-row">
            <span className="cdm-payment-label">Precio de la clase:</span>
            <span className="cdm-payment-value price">{classData.cost}</span>
          </div>
          <div className="cdm-payment-row">
            <span className="cdm-payment-label">Comisión plataforma (15%):</span>
            <span className="cdm-payment-value fee">-$2.70</span>
          </div>
          <div className="cdm-payment-row total">
            <span className="cdm-payment-label">Tus ganancias:</span>
            <span className="cdm-payment-value earnings">$15.30</span>
          </div>
        </div>

        <div className="cdm-payment-status">
          <div className="cdm-status-badge paid">
            ✅ Pago Completado
          </div>
          <p className="cdm-payment-date">Procesado el 15 Nov 2024 - 20:30</p>
          <p className="cdm-payment-method">💳 Tarjeta terminada en ****4532</p>
        </div>

        <button className="cdm-download-invoice-btn">
          📄 Descargar Factura
        </button>
      </div>
    </div>
  );

  const renderEvaluationTab = () => (
    <div className="cdm-tab-content">
      {classData.status === 'Completada' && (
        <>
          <div className="cdm-section">
            <h3 className="cdm-section-title">
              <span className="cdm-section-icon">⭐</span>
              Calificación del Estudiante
            </h3>
            <div className="cdm-rating-card">
              <div className="cdm-rating-stars">
                {'⭐'.repeat(5)}
              </div>
              <p className="cdm-rating-score">5.0 / 5.0</p>
              <div className="cdm-rating-comment">
                <p className="cdm-comment-label">Comentario:</p>
                <p className="cdm-comment-text">
                  "Excelente clase! El profesor explica muy bien y es muy paciente. 
                  Logré entender conceptos que antes me costaban mucho trabajo. 
                  Definitivamente tomaré más clases con él."
                </p>
              </div>
            </div>
          </div>

          <div className="cdm-section">
            <h3 className="cdm-section-title">
              <span className="cdm-section-icon">📊</span>
              Tu Evaluación del Estudiante
            </h3>
            <div className="cdm-student-eval">
              <div className="cdm-eval-item">
                <label>Asistencia:</label>
                <span className="cdm-attendance-badge present">✅ Presente</span>
              </div>
              <div className="cdm-eval-item">
                <label>Participación:</label>
                <div className="cdm-stars-input">
                  {'⭐'.repeat(5)}
                </div>
              </div>
              <div className="cdm-eval-item">
                <label>Comentarios:</label>
                <textarea 
                  className="cdm-eval-textarea"
                  placeholder="Escribe tu evaluación del estudiante..."
                  rows="4"
                  defaultValue="Excelente participación y comprensión de los temas tratados."
                />
              </div>
            </div>
          </div>
        </>
      )}

      {classData.status === 'Programada' && (
        <div className="cdm-upcoming-info">
          <div className="cdm-upcoming-icon">⏳</div>
          <h3>Clase Programada</h3>
          <p>La evaluación estará disponible una vez finalice la clase.</p>
        </div>
      )}

      {classData.status === 'Cancelada' && (
        <div className="cdm-cancelled-info">
          <div className="cdm-cancelled-icon">❌</div>
          <h3>Clase Cancelada</h3>
          <p className="cdm-cancel-reason">
            <strong>Razón:</strong> El estudiante tuvo un imprevisto
          </p>
          <p className="cdm-cancel-date">
            <strong>Cancelado el:</strong> 13 Nov 2024 - 10:00
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="cdm-overlay" onClick={onClose}>
      <div className="cdm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cdm-header">
          <div className="cdm-header-left">
            <h2 className="cdm-title">Detalles de la Clase</h2>
            <span className={`cdm-status-badge ${classData.status.toLowerCase()}`}>
              {getStatusIcon(classData.status)} {classData.status}
            </span>
          </div>
          <button className="cdm-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="cdm-tabs">
          <button 
            className={`cdm-tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            📋 General
          </button>
          <button 
            className={`cdm-tab ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            💰 Pago
          </button>
          <button 
            className={`cdm-tab ${activeTab === 'evaluation' ? 'active' : ''}`}
            onClick={() => setActiveTab('evaluation')}
          >
            ⭐ Evaluación
          </button>
        </div>

        {/* Content */}
        <div className="cdm-body">
          {activeTab === 'general' && renderGeneralTab()}
          {activeTab === 'payment' && renderPaymentTab()}
          {activeTab === 'evaluation' && renderEvaluationTab()}
        </div>

        {/* Footer Actions */}
        <div className="cdm-footer">
          {classData.status === 'Programada' && (
            <>
              <button className="cdm-action-btn secondary">
                📅 Reprogramar
              </button>
              <button className="cdm-action-btn danger">
                ❌ Cancelar Clase
              </button>
              <button className="cdm-action-btn primary">
                📧 Enviar Recordatorio
              </button>
            </>
          )}
          <button className="cdm-action-btn secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsModal;