import React from 'react';
import './ReviewFilters.css';

const ReviewFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="review-filters-container">
      <div className="filter-group">
        <label htmlFor="rating-filter" className="filter-label">Calificación:</label>
        <select 
          id="rating-filter"
          className="filter-select"
          value={filters.rating}
          onChange={(e) => onFilterChange('rating', e.target.value)}
        >
          <option value="all">Todas las calificaciones</option>
          <option value="5">5 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="3">3 estrellas</option>
          <option value="2">2 estrellas</option>
          <option value="1">1 estrella</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="teacher-filter" className="filter-label">Profesor:</label>
        <select 
          id="teacher-filter"
          className="filter-select"
          value={filters.teacher}
          onChange={(e) => onFilterChange('teacher', e.target.value)}
        >
          <option value="all">Todos los profesores</option>
          {filters.teacherOptions.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ReviewFilters;