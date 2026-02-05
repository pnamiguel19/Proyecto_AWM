import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { professorService, studentService } from '../../../services/api';
import './BookingPage.css';

const BookingPage = () => {
  const { professorId } = useParams();
  const navigate = useNavigate();
  
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [description, setDescription] = useState('');
  const [modality, setModality] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [location, setLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  useEffect(() => {
    loadProfessorData();
  }, [professorId]);

  const loadProfessorData = async () => {
    try {
      setLoading(true);
      const response = await professorService.getById(professorId);
      if (response.success) {
        setProfessor(response.data);
        
        // Establecer modalidad por defecto según lo que ofrece el profesor
        const modalities = response.data.teachingModalities || [];
        if (modalities.length > 0) {
          setModality(modalities[0]);
        }
        
        // Establecer primera materia por defecto
        if (response.data.subjects && response.data.subjects.length > 0) {
          setSelectedSubject(response.data.subjects[0]);
        }
      }
    } catch (error) {
      console.error('Error cargando profesor:', error);
      alert('Error al cargar información del profesor');
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validaciones
    if (!selectedSubject) {
      alert('Por favor selecciona una materia');
      return;
    }
    if (!description.trim()) {
      alert('Por favor describe los temas que quieres cubrir');
      return;
    }
    if (!modality) {
      alert('Por favor selecciona una modalidad');
      return;
    }
    if (!selectedDay || !selectedTime) {
      alert('Por favor selecciona día y hora');
      return;
    }
    if (modality === 'online' && !location) {
      alert('Por favor selecciona una plataforma');
      return;
    }
    if (modality === 'in_person' && !customLocation.trim()) {
      alert('Por favor ingresa la dirección');
      return;
    }

    setSubmitting(true);
    try {
      const response = await studentService.addBooking(professorId);
      if (response.success) {
        // Mostrar mensaje de éxito
        alert('¡Clase agendada exitosamente! El profesor revisará tu solicitud.');
        navigate('/student/profile');
      }
    } catch (error) {
      console.error('Error agendando clase:', error);
      alert('Error al agendar clase: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <div className="loading">Cargando...</div>
        </div>
      </div>
    );
  }

  if (!professor) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <div className="error">Profesor no encontrado</div>
        </div>
      </div>
    );
  }

  const availableModalities = professor.teachingModalities || [];
  const hasOnline = availableModalities.includes('online');
  const hasInPerson = availableModalities.includes('in_person');
  const hasHybrid = availableModalities.includes('hybrid');

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1 className="booking-title">
          Genial vamos a agendar tu cita con {professor.firstName}:
        </h1>

        {/* Selección de Materia */}
        <div className="booking-section">
          <label className="booking-label">Elige la materia que quieres tu clase:</label>
          <div className="subject-buttons">
            {professor.subjects?.map((subject, index) => (
              <button
                key={index}
                className={`subject-btn ${selectedSubject === subject ? 'active' : ''}`}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Descripción */}
        <div className="booking-section">
          <label className="booking-label">Dame una descripción de tu clase:</label>
          <textarea
            className="booking-textarea"
            placeholder="Describe qué temas específicos te gustaría cubrir..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
          <button className="accept-description-btn">Aceptar</button>
        </div>

        {/* Modalidad */}
        <div className="booking-section">
          <label className="booking-label">Elige tu modalidad:</label>
          <div className="modality-buttons">
            {(hasInPerson || hasHybrid) && (
              <button
                className={`modality-btn ${modality === 'in_person' ? 'active' : ''}`}
                onClick={() => setModality('in_person')}
              >
                Presencial
              </button>
            )}
            {(hasOnline || hasHybrid) && (
              <button
                className={`modality-btn ${modality === 'online' ? 'active' : ''}`}
                onClick={() => setModality('online')}
              >
                Virtual
              </button>
            )}
          </div>
        </div>

        {/* Calendario de Horarios */}
        <div className="booking-section">
          <label className="booking-label">Elige la fecha:</label>
          <div className="schedule-grid">
            <div className="schedule-header">
              <div className="schedule-cell header-cell">Hora</div>
              {daysOfWeek.map((day, index) => (
                <div key={index} className="schedule-cell header-cell">{day}</div>
              ))}
            </div>
            {timeSlots.map((time, timeIndex) => (
              <div key={timeIndex} className="schedule-row">
                <div className="schedule-cell time-cell">{time}</div>
                {daysOfWeek.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`schedule-cell slot-cell ${
                      selectedDay === day && selectedTime === time ? 'selected' : ''
                    }`}
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedTime(time);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Lugar de la Clase */}
        <div className="booking-section">
          <label className="booking-label">El sitio donde vamos a llevar a cabo la clase:</label>
          
          {modality === 'online' ? (
            <div className="location-options">
              <label className={`location-option ${location === 'Zoom' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="location"
                  value="Zoom"
                  checked={location === 'Zoom'}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <span className="location-icon">📹</span>
                <span>Zoom</span>
              </label>
              
              <label className={`location-option ${location === 'Teams' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="location"
                  value="Teams"
                  checked={location === 'Teams'}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <span className="location-icon">💼</span>
                <span>Teams</span>
              </label>
              
              <label className={`location-option ${location === 'Webex' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="location"
                  value="Webex"
                  checked={location === 'Webex'}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <span className="location-icon">🌐</span>
                <span>Webex</span>
              </label>
            </div>
          ) : (
            <div className="location-input">
              <span className="location-marker">📍</span>
              <input
                type="text"
                placeholder="Calle Principal, calle secundaria, número de casa"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Botones de Acción */}
        <div className="booking-actions">
          <button 
            className="btn-back"
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
          <button 
            className="btn-accept"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Procesando...' : 'Aceptar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
