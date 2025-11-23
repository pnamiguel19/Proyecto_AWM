import React from 'react';
import './CourseCard.css';

const CourseCard = ({ course, onEdit, onView, onDelete }) => {
  return (
    <div className="prof-course-card">
      <div className="prof-course-image">
        {course.image ? (
          <img src={course.image} alt={course.title} />
        ) : (
          <div className="prof-course-placeholder">
            <span className="placeholder-icon">📚</span>
          </div>
        )}
        <span className={`prof-course-badge ${course.published ? 'published' : 'draft'}`}>
          {course.published ? 'Publicado' : 'Borrador'}
        </span>
      </div>

      <div className="prof-course-content">
        <h3 className="prof-course-title">{course.title}</h3>
        <p className="prof-course-description">{course.description}</p>

        <div className="prof-course-stats">
          <div className="prof-stat-item">
            <span className="stat-icon">📖</span>
            <span className="stat-text">{course.modulesCount} módulos</span>
          </div>
          <div className="prof-stat-item">
            <span className="stat-icon">👥</span>
            <span className="stat-text">{course.studentsCount} estudiantes</span>
          </div>
          <div className="prof-stat-item">
            <span className="stat-icon">⭐</span>
            <span className="stat-text">{course.rating || 'N/A'}</span>
          </div>
        </div>

        <div className="prof-course-footer">
          <span className="prof-course-price">{course.price}</span>
          <div className="prof-course-actions">
            <button className="prof-action-btn view" onClick={() => onView(course)} title="Ver contenido">
              👁️
            </button>
            <button className="prof-action-btn edit" onClick={() => onEdit(course)} title="Editar">
              ✏️
            </button>
            <button className="prof-action-btn delete" onClick={() => onDelete(course)} title="Eliminar">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;