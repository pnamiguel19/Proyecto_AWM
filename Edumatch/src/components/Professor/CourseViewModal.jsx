import React, { useState } from 'react';
import './CourseViewModal.css';

const CourseViewModal = ({ isOpen, onClose, course }) => {
  const [activeModule, setActiveModule] = useState(0);

  if (!isOpen || !course) return null;

  // Datos de ejemplo de módulos
  const modules = course.modules || [
    {
      id: 1,
      title: "Módulo 1: Introducción",
      lessons: [
        { id: 1, title: "Lección 1: Bienvenida", duration: "10 min", type: "video" },
        { id: 2, title: "Lección 2: Conceptos básicos", duration: "15 min", type: "video" }
      ]
    },
    {
      id: 2,
      title: "Módulo 2: Fundamentos",
      lessons: [
        { id: 3, title: "Lección 1: Teoría fundamental", duration: "20 min", type: "video" },
        { id: 4, title: "Lección 2: Práctica guiada", duration: "25 min", type: "ejercicio" }
      ]
    }
  ];

  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal-content prof-course-view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="prof-modal-header">
          <h2>📚 {course.title}</h2>
          <button className="prof-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="prof-course-view-body">
          {/* Sidebar de módulos */}
          <aside className="prof-modules-sidebar">
            <h3>Contenido del Curso</h3>
            <div className="prof-modules-list">
              {modules.map((module, idx) => (
                <div 
                  key={module.id} 
                  className={`prof-module-item ${activeModule === idx ? 'active' : ''}`}
                  onClick={() => setActiveModule(idx)}
                >
                  <div className="prof-module-header">
                    <span className="prof-module-icon">📖</span>
                    <span className="prof-module-title">{module.title}</span>
                  </div>
                  <span className="prof-module-count">{module.lessons.length} lecciones</span>
                </div>
              ))}
            </div>

            <button className="prof-btn-add-module">
              + Agregar Módulo
            </button>
          </aside>

          {/* Contenido del módulo activo */}
          <div className="prof-module-content">
            <h3>{modules[activeModule].title}</h3>
            
            <div className="prof-lessons-list">
              {modules[activeModule].lessons.map(lesson => (
                <div key={lesson.id} className="prof-lesson-item">
                  <div className="prof-lesson-info">
                    <span className="prof-lesson-type">
                      {lesson.type === 'video' ? '🎥' : '📝'}
                    </span>
                    <div>
                      <p className="prof-lesson-title">{lesson.title}</p>
                      <p className="prof-lesson-duration">{lesson.duration}</p>
                    </div>
                  </div>
                  <div className="prof-lesson-actions">
                    <button className="prof-lesson-btn edit">✏️</button>
                    <button className="prof-lesson-btn delete">🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            <button className="prof-btn-add-lesson">
              + Agregar Lección
            </button>
          </div>
        </div>

        <div className="prof-modal-footer">
          <button className="prof-btn-cancel" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseViewModal;