import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Hero from '../../components/layout/Hero';
import ProgressBar from '../../components/registration/ProgressBar';
import PersonalInfoStep from '../../components/registration/PersonalInfoStep';
import EducationStep from '../../components/registration/EducationStep';
import ClassesStep from '../../components/registration/ClassesStep';
import ScheduleStep from '../../components/registration/ScheduleStep';
import ConfirmationStep from '../../components/registration/ConfirmationStep';
import './TeacherRegistration.css';

const TeacherRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log('Datos actualizados:', { ...formData, [field]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log('Avanzando al siguiente paso desde:', currentStep);
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    console.log('Retrocediendo desde:', currentStep);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.termsAccept) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    
    console.log('Formulario enviado:', formData);
    setShowSuccess(true);
  };

  const renderStep = () => {
    console.log('Renderizando paso:', currentStep);
    
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} onChange={handleChange} />;
      case 2:
        return <EducationStep formData={formData} onChange={handleChange} />;
      case 3:
        return <ClassesStep formData={formData} onChange={handleChange} />;
      case 4:
        return <ScheduleStep formData={formData} onChange={handleChange} />;
      case 5:
        return <ConfirmationStep formData={formData} onChange={handleChange} />;
      default:
        return <PersonalInfoStep formData={formData} onChange={handleChange} />;
    }
  };

  return (
    <>
      <Header />
      <Hero
        title="Únete como Profesor"
        subtitle="Comparte tu conocimiento y ayuda a estudiantes a alcanzar sus metas"
      />

      <main className="main-container">
        <ProgressBar currentStep={currentStep} progress={progress} />

        <div className="form-container">
          <form onSubmit={currentStep === totalSteps ? handleSubmit : handleNext}>
            {renderStep()}

            <div className="form-navigation">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handlePrev}
                >
                  ← Anterior
                </button>
              )}

              {currentStep < totalSteps ? (
                <button type="submit" className="btn btn-primary">
                  Siguiente →
                </button>
              ) : (
                <button type="submit" className="btn btn-success">
                  🎉 Completar Registro
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      {showSuccess && (
        <div className="modal-overlay-wrapper">
          <div className="modal-overlay" onClick={() => setShowSuccess(false)}></div>
          <div className="modal-content">
            <div className="modal-icon">🎉</div>
            <h2>¡Registro Exitoso!</h2>
            <p>
              Tu solicitud ha sido enviada. Nuestro equipo revisará tu perfil y te enviaremos un correo en las próximas 24-48 horas.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.href = '/'}
            >
              Ir al Inicio
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherRegistration;