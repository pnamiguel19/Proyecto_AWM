import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentStep, progress }) => {
  const steps = [
    { number: 1, name: 'Información Personal', icon: '👤' },
    { number: 2, name: 'Formación', icon: '🎓' },
    { number: 3, name: 'Clases', icon: '📚' },
    { number: 4, name: 'Horario', icon: '📅' },
    { number: 5, name: 'Confirmación', icon: '✅' }
  ];

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="steps-container">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`step ${currentStep === step.number ? 'active' : ''} ${
              currentStep > step.number ? 'completed' : ''
            }`}
          >
            <div className="step-circle">
              <span className="step-icon">{step.icon}</span>
              <span className="step-number">{step.number}</span>
            </div>
            <span className="step-name">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;