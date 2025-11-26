import React from 'react';
import './ActionButtons.css';
import { useNavigate } from 'react-router-dom';

const ActionButtons = ({ teacherId }) => {
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    console.log('Redirigir a agendamiento de clases');
    navigate(`/schedule/${teacherId}`);
  };

  const handleCoursesClick = () => {
    console.log('Redirigir a más cursos disponibles');
    // TODO: Implementar navegación futura
  };

  const handleCurriculumClick = () => {
    console.log('Redirigir a curriculum profesional');
    // TODO: Implementar navegación futura
  };

  return (
    <div className="action-buttons">
      <button 
        className="action-button action-button--primary"
        onClick={handleScheduleClick}
      >
        📅 Agenda tus clases
      </button>
      <button 
        className="action-button action-button--secondary"
        onClick={handleCoursesClick}
      >
        📚 Más cursos disponibles
      </button>
      <button 
        className="action-button action-button--tertiary"
        onClick={handleCurriculumClick}
      >
        📄 Curriculum Profesional
      </button>
    </div>
  );
};

export default ActionButtons;