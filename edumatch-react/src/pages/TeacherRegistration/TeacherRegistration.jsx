import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Hero from '../../components/layout/Hero';
import ProgressBar from '../../components/registration/ProgressBar';
import PersonalInfoStep from '../../components/registration/PersonalInfoStep';
import EducationStep from '../../components/registration/EducationStep';
import ClassesStep from '../../components/registration/ClassesStep';
import ScheduleStep from '../../components/registration/ScheduleStep';
import ConfirmationStep from '../../components/registration/ConfirmationStep';
import { authService } from '../../services/api';
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
    
    // Validar contraseñas en el primer paso
    if (currentStep === 1) {
      if (!formData.password || formData.password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
    }
    
    // Validar formación académica en el paso 2
    if (currentStep === 2) {
      if (!formData.degree || !formData.university || !formData.graduationYear || !formData.experience) {
        alert('Por favor completa todos los campos de formación académica');
        return;
      }
      if (!formData.degreeFile || !formData.professionalIdFile) {
        alert('Por favor sube los documentos requeridos (Título Universitario y Cédula Profesional)');
        return;
      }
    }
    
    // Validar materias y modalidades en el paso 3
    if (currentStep === 3) {
      if (!formData.subjects || formData.subjects.length === 0) {
        alert('Por favor selecciona al menos una materia que enseñas');
        return;
      }
      if (!formData.educationLevels || formData.educationLevels.length === 0) {
        alert('Por favor selecciona al menos un nivel educativo');
        return;
      }
      if (!formData.teachingModalities || formData.teachingModalities.length === 0) {
        alert('Por favor selecciona al menos una modalidad de enseñanza');
        return;
      }
      if (!formData.hourlyRate || parseFloat(formData.hourlyRate) < 5) {
        alert('Por favor establece una tarifa por hora válida (mínimo $5)');
        return;
      }
    }
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.termsAccept) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    // Validación final de contraseña
    if (!formData.password || formData.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    try {
      // Convertir schedule de objeto a array para el backend
      const scheduleArray = [];
      if (formData.schedule && typeof formData.schedule === 'object') {
        Object.entries(formData.schedule).forEach(([day, slots]) => {
          const selectedSlots = [];
          if (slots.morning) selectedSlots.push('morning');
          if (slots.afternoon) selectedSlots.push('afternoon');
          if (slots.evening) selectedSlots.push('evening');
          
          if (selectedSlots.length > 0) {
            scheduleArray.push({
              day: day,
              timeSlots: selectedSlots
            });
          }
        });
      }

      // Mapear valores del frontend al formato del backend
      const dataToSend = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        birthDate: formData.birthDate,
        gender: mapGender(formData.gender),
        bio: formData.bio || '',
        // Campos de formación académica
        universityDegree: formData.degree,
        university: formData.university,
        graduationYear: parseInt(formData.graduationYear),
        teachingExperience: formData.experience,
        // Archivos (en siguiente fase con FormData)
        degreeFile: formData.degreeFile,
        professionalIdFile: formData.professionalIdFile,
        certificates: formData.certificates || [],
        // Datos de enseñanza
        subjects: formData.subjects || [],
        educationLevels: formData.educationLevels || [],
        teachingModalities: formData.teachingModalities || [],
        hourlyRate: parseFloat(formData.hourlyRate) || 0,
        currency: formData.currency || 'USD',
        schedule: scheduleArray,
        maxStudentsPerClass: parseInt(formData.maxStudentsPerClass) || 1,
        minimumNoticeHours: parseInt(formData.advanceNotice) || 24,
        additionalNotes: formData.additionalNotes || '',
        acceptTerms: formData.termsAccept || true,
        acceptPrivacy: formData.termsAccept || true,
        acceptNotifications: true
      };

      console.log('📤 Enviando datos al backend:', dataToSend);
      await authService.registerProfessor(dataToSend);
      setShowSuccess(true);
    } catch (error) {
      alert(error.message || 'Error al enviar el formulario. Por favor, intenta nuevamente.');
      console.error('Error:', error);
    }
  };

  // Funciones para mapear valores del frontend al backend
  const mapGender = (gender) => {
    const mapping = {
      'masculino': 'male',
      'femenino': 'female',
      'otro': 'other',
      'prefiero-no-decir': 'prefer_not_to_say'
    };
    return mapping[gender] || 'prefer_not_to_say';
  };

  const mapEducationLevel = (level) => {
    const mapping = {
      'bachillerato': 'high_school',
      'universidad': 'university',
      'maestria': 'postgraduate',
      'doctorado': 'postgraduate'
    };
    return mapping[level] || 'university';
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