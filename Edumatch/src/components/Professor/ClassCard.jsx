import React from 'react';
import './ClassCard.css';

const ClassCard = ({ classData, onEdit, onViewDetails }) => {
  return (
    <div className="prof-class-card">
      <div className="prof-class-header">
        <div className="prof-class-info">
          <h3 className="prof-class-title">{classData.title}</h3>
          <p className="prof-class-subject">{classData.subject}</p>
        </div>
        <span className={`prof-class-status ${classData.status}`}>
          {classData.status === 'active' ? 'Activa' : 
           classData.status === 'completed' ? 'Completada' : 'Cancelada'}
        </span>
      </div>

      <div className="prof-class-body">
        <div className="prof-class-detail">
          <span className="prof-detail-icon">👤</span>
          <span className="prof-detail-text">{classData.studentName}</span>
        </div>

        <div className="prof-class-detail">
          <span className="prof-detail-icon">📅</span>
          <span className="prof-detail-text">{classData.date}</span>
        </div>

        <div className="prof-class-detail">
          <span className="prof-detail-icon">⏰</span>
          <span className="prof-detail-text">{classData.time}</span>
        </div>

        <div className="prof-class-detail">
          <span className="prof-detail-icon">💵</span>
          <span className="prof-detail-text">{classData.price}</span>
        </div>
      </div>

      <div className="prof-class-footer">
        <button 
          className="prof-btn-secondary"
          onClick={() => onViewDetails(classData)}
        >
          Ver Detalles
        </button>
        <button 
          className="prof-btn-primary"
          onClick={() => onEdit(classData)}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default ClassCard;