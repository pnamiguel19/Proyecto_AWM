import React from 'react';
import './SubjectSelector.css';

const SubjectSelector = ({ subjects, selectedSubject, onSelectSubject }) => {
  return (
    <div className="subject-selector">
      <h2 className="subject-selector__title">Elige la materia que quieres tu clase:</h2>
      <div className="subject-selector__buttons">
        {subjects.map((subject, index) => (
          <button
            key={index}
            onClick={() => onSelectSubject(subject)}
            className={`subject-selector__button ${
              selectedSubject === subject ? 'subject-selector__button--active' : ''
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;