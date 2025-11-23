import React from 'react';
import './ClassCard.css';

const ClassCard = ({ classItem }) => {
  if (!classItem) return null;

  return (
    <div className="em-class-card">
      {/* Izquierda: Avatar */}
      <div className="em-card-left">
        <div className="em-avatar-placeholder">
           {/* Simulamos iniciales o imagen */}
           {classItem.teacherName.split(' ').map(n=>n[0]).join('').substring(0,2)}
        </div>
        {/* Nombre debajo del avatar como en algunos diseños, o a la derecha */}
      </div>

      {/* Derecha: Contenido */}
      <div className="em-card-right">
        
        {/* Header: Nombre y Estado */}
        <div className="em-card-header">
          <div className="em-teacher-info">
            <h3 className="em-teacher-name">{classItem.teacherName}</h3>
            <span className="em-subject-tag">{classItem.subject}</span>
          </div>
          <div className="em-status-badge">
            📅 {classItem.status}
          </div>
        </div>

        {/* Detalles: Fecha, Hora, etc */}
        <div className="em-card-details">
          <div className="em-detail-item">
            <span>📅</span> {classItem.date}
          </div>
          <div className="em-detail-item">
            <span>🕒</span> {classItem.time} ({classItem.duration})
          </div>
          <div className="em-detail-item">
            <span>🌐</span> {classItem.modality}
          </div>
          <div className="em-detail-item">
            <span>💰</span> <strong>${classItem.price}</strong>
          </div>
        </div>

        {/* Botones: DELINEADOS */}
        <div className="em-card-actions">
          <button className="em-btn em-btn-outline-cyan">
            📝 Ver Detalles
          </button>
          <button className="em-btn em-btn-outline-red">
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;