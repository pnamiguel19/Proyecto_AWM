import React, { useState } from 'react';
import './CourseCarousel.css';

const CourseCarousel = ({ courses, teacherModality, priceVirtual, pricePresencial }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === courses.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? courses.length - 1 : prevIndex - 1
    );
  };

  // Determinar qué precio mostrar
  const getPrice = () => {
    if (teacherModality === 'Virtual') {
      return priceVirtual;
    } else if (teacherModality === 'Presencial') {
      return pricePresencial;
    } else {
      // Si es híbrido, mostrar ambos precios
      return `Virtual: ${priceVirtual} | Presencial: ${pricePresencial}`;
    }
  };

  return (
    <div className="course-carousel">
      <div className="carousel-header">
        <h2>📚 Cursos Disponibles</h2>
        <p className="price-info">💰 Precio por hora: ${getPrice()} USD</p>
      </div>
      <div className="course-carousel__container">
        {courses.length > 1 && (
          <button 
            className="course-carousel__nav course-carousel__nav--prev"
            onClick={prevSlide}
            aria-label="Curso anterior"
          >
            ‹
          </button>
        )}
        
        <div className="course-carousel__track">
          <div 
            className="course-carousel__slides"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {courses.map((course) => (
              <div key={course.id} className="course-carousel__slide">
                <div className="course-card">
                  <h3 className="course-card__title">{course.title}</h3>
                  <div className="course-card__details">
                    <div className="course-card__detail">
                      <span className="course-card__icon">⏰</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="course-card__detail">
                      <span className="course-card__icon">💵</span>
                      <span>{getPrice()}</span>
                    </div>
                    <div className="course-card__detail">
                      <span className="course-card__icon">📍</span>
                      <span>{course.modality}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {courses.length > 1 && (
          <button 
            className="course-carousel__nav course-carousel__nav--next"
            onClick={nextSlide}
            aria-label="Siguiente curso"
          >
            ›
          </button>
        )}
      </div>

      {courses.length > 1 && (
        <div className="course-carousel__dots">
          {courses.map((_, index) => (
            <button
              key={index}
              className={`course-carousel__dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir al curso ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCarousel;