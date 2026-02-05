import React from 'react';
import './CourseCarousel.css';

const CourseCarousel = ({ courses, teacherModality, priceVirtual, pricePresencial }) => {
  // Si no hay cursos del backend, crear uno por defecto
  const displayCourses = courses && courses.length > 0 ? courses : [
    {
      title: 'Clase personalizada',
      duration: '1h de clase',
      price: priceVirtual || 10,
      modality: teacherModality || 'Virtual/Presencial'
    }
  ];

  return (
    <section className="section">
      <header className="section__header">
        <span aria-hidden="true">📖</span>
        <h3 className="section__title">Clases que imparto</h3>
      </header>
      <ul className="courses-list">
        {displayCourses.map((course, index) => (
          <li key={index} className="course">
            <h4 className="course__title">{course.title}</h4>
            <div className="course__details">
              <span className="course__detail">
                <span aria-hidden="true">⏱️</span> {course.duration || '1h de clase'}
              </span>
              <span className="course__detail">
                <span aria-hidden="true">💰</span> ${course.price || priceVirtual} USD
              </span>
              <span className="course__detail">
                <span aria-hidden="true">📍</span> {course.modality || teacherModality}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CourseCarousel;
