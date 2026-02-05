import React from 'react';
import './ConfirmationStep.css';

const ConfirmationStep = ({ formData, onChange }) => {
  const getSubjectNames = () => {
    const subjectMap = {
      'matematicas': 'Matemáticas',
      'fisica': 'Física',
      'quimica': 'Química',
      'biologia': 'Biología',
      'lengua': 'Lengua y Literatura',
      'ingles': 'Inglés',
      'historia': 'Historia',
      'geografia': 'Geografía',
      'informatica': 'Informática',
      'arte': 'Arte',
      'musica': 'Música',
      'educacion-fisica': 'Educación Física'
    };
    return (formData.subjects || []).map(id => subjectMap[id] || id).join(', ');
  };

  const getLevelNames = () => {
    const levelMap = {
      'primaria': 'Primaria',
      'secundaria': 'Secundaria',
      'bachillerato': 'Bachillerato',
      'universidad': 'Universidad',
      'adultos': 'Adultos'
    };
    return (formData.levels || []).map(id => levelMap[id] || id).join(', ');
  };

  const getModalityNames = () => {
    const modalityMap = {
      'presencial': 'Presencial',
      'online': 'En Línea',
      'hibrido': 'Híbrido'
    };
    return (formData.modalities || []).map(id => modalityMap[id] || id).join(', ');
  };

  const getScheduleSummary = () => {
    if (!formData.schedule) return 'No especificado';
    
    let count = 0;
    Object.values(formData.schedule).forEach(day => {
      Object.values(day).forEach(slot => {
        if (slot) count++;
      });
    });
    return `${count} franjas horarias seleccionadas`;
  };

  return (
    <section className="form-step">
      <div className="step-header">
        <h2>✅ Confirmación y Revisión</h2>
        <p>Revisa toda tu información antes de enviar tu solicitud</p>
      </div>

      {/* Información Personal */}
      <div className="review-section">
        <div className="review-header">
          <span className="review-icon">👤</span>
          <h3>Información Personal</h3>
        </div>
        <div className="review-content">
          <div className="review-row">
            <span className="review-label">Nombre completo:</span>
            <span className="review-value">{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Email:</span>
            <span className="review-value">{formData.email}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Contraseña:</span>
            <span className="review-value">••••••••</span>
          </div>
          <div className="review-row">
            <span className="review-label">Teléfono:</span>
            <span className="review-value">{formData.phone}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Fecha de nacimiento:</span>
            <span className="review-value">{formData.birthDate}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Género:</span>
            <span className="review-value">{formData.gender}</span>
          </div>
        </div>
      </div>

      {/* Formación Académica */}
      <div className="review-section">
        <div className="review-header">
          <span className="review-icon">🎓</span>
          <h3>Formación Académica</h3>
        </div>
        <div className="review-content">
          <div className="review-row">
            <span className="review-label">Título universitario:</span>
            <span className="review-value">{formData.degree || 'No especificado'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Universidad:</span>
            <span className="review-value">{formData.university || 'No especificado'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Año de graduación:</span>
            <span className="review-value">{formData.graduationYear || 'No especificado'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Cédula profesional:</span>
            <span className="review-value">{formData.professionalId || 'No especificado'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Experiencia docente:</span>
            <span className="review-value">{formData.experience || 'No especificado'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Certificaciones adicionales:</span>
            <span className="review-value">
              {formData.certificates?.length || 0} certificación(es)
            </span>
          </div>
        </div>
      </div>

      {/* Materias y Modalidades */}
      <div className="review-section">
        <div className="review-header">
          <span className="review-icon">📚</span>
          <h3>Materias y Modalidades</h3>
        </div>
        <div className="review-content">
          <div className="review-row">
            <span className="review-label">Materias:</span>
            <span className="review-value">{getSubjectNames() || 'No especificado'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Niveles educativos:</span>
            <span className="review-value">{getLevelNames() || 'No especificado'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Modalidades:</span>
            <span className="review-value">{getModalityNames() || 'No especificado'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Tarifa por hora:</span>
            <span className="review-value">
              ${formData.hourlyRate || '0'} {formData.currency || 'USD'}
            </span>
          </div>
        </div>
      </div>

      {/* Disponibilidad */}
      <div className="review-section">
        <div className="review-header">
          <span className="review-icon">📅</span>
          <h3>Disponibilidad Horaria</h3>
        </div>
        <div className="review-content">
          <div className="review-row">
            <span className="review-label">Horarios disponibles:</span>
            <span className="review-value">{getScheduleSummary()}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Estudiantes máximo por clase:</span>
            <span className="review-value">{formData.maxStudentsPerClass || '1'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Tiempo de anticipación:</span>
            <span className="review-value">
              {formData.advanceNotice ? `${formData.advanceNotice} horas` : 'No especificado'}
            </span>
          </div>
        </div>
      </div>

      {/* Términos y Condiciones */}
      <div className="terms-section">
        <div className="terms-box">
          <label className="terms-checkbox">
            <input
              type="checkbox"
              checked={formData.termsAccept || false}
              onChange={(e) => onChange('termsAccept', e.target.checked)}
              required
            />
            <span className="checkbox-custom"></span>
            <span className="terms-text">
              He leído y acepto los{' '}
              <a href="#terms" target="_blank" rel="noopener noreferrer">
                Términos y Condiciones
              </a>
              {' '}y la{' '}
              <a href="#privacy" target="_blank" rel="noopener noreferrer">
                Política de Privacidad
              </a>
            </span>
          </label>
        </div>

        <div className="terms-box">
          <label className="terms-checkbox">
            <input
              type="checkbox"
              checked={formData.dataConsent || false}
              onChange={(e) => onChange('dataConsent', e.target.checked)}
              required
            />
            <span className="checkbox-custom"></span>
            <span className="terms-text">
              Autorizo el uso de mis datos personales según la política de privacidad
            </span>
          </label>
        </div>

        <div className="terms-box">
          <label className="terms-checkbox">
            <input
              type="checkbox"
              checked={formData.notifications || false}
              onChange={(e) => onChange('notifications', e.target.checked)}
            />
            <span className="checkbox-custom"></span>
            <span className="terms-text">
              Deseo recibir notificaciones sobre nuevas solicitudes de clases (opcional)
            </span>
          </label>
        </div>
      </div>

      {/* Mensaje final */}
      <div className="final-message">
        <div className="message-icon">🎉</div>
        <div className="message-content">
          <h3>¡Estás a un paso de unirte a EduMatch!</h3>
          <p>
            Al completar tu registro, nuestro equipo revisará tu perfil y te enviaremos
            una confirmación por correo electrónico en las próximas 24-48 horas.
          </p>
          <p>
            Una vez aprobado, podrás comenzar a recibir solicitudes de estudiantes y
            empezar a compartir tu conocimiento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStep;