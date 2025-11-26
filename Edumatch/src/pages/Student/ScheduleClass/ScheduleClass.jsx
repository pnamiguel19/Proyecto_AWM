import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeacherById } from '../../../data/mockTeachers';
import SubjectSelector from '../../../components/Student/SubjectSelector/SubjectSelector';
import ModalitySelector from '../../../components/Student/ModalitySelector/ModalitySelector';
import LocationSelector from '../../../components/Student/LocationSelector/LocationSelector';
import ScheduleGrid from '../../../components/Student/ScheduleGrid/ScheduleGrid';
import './ScheduleClass.css';

const ScheduleClass = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  
  // Estados del formulario
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [description, setDescription] = useState('');
  const [modality, setModality] = useState('virtual');
  const [platform, setPlatform] = useState('zoom');
  const [location, setLocation] = useState('student');
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Cargar datos del profesor
  useEffect(() => {
    const teacherData = getTeacherById(teacherId);
    if (!teacherData) {
      navigate('/');
      return;
    }
    setTeacher(teacherData);
  }, [teacherId, navigate]);

  // Consolidar horarios seleccionados por fecha
  const consolidateSchedules = () => {
    const schedulesByDate = {};
    
    selectedSlots.forEach(slot => {
      const [date, time] = slot.split('_');
      if (!schedulesByDate[date]) {
        schedulesByDate[date] = [];
      }
      schedulesByDate[date].push(time);
    });

    const consolidated = [];
    Object.keys(schedulesByDate).forEach(date => {
      const times = schedulesByDate[date].sort();
      const dateObj = new Date(date);
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      // Agrupar tiempos continuos
      let startTime = times[0];
      let endTime = times[0];
      
      for (let i = 1; i < times.length; i++) {
        const prevHour = parseInt(times[i - 1].split(':')[0]);
        const currHour = parseInt(times[i].split(':')[0]);
        
        if (currHour === prevHour + 1) {
          endTime = times[i];
        } else {
          // Guardar rango anterior
          const startHour = parseInt(startTime.split(':')[0]);
          const endHour = parseInt(endTime.split(':')[0]) + 1;
          
          consolidated.push({
            date,
            dayName: dayNames[dateObj.getDay()],
            startTime,
            endTime: `${endHour}:00`,
            hours: endHour - startHour
          });
          
          startTime = times[i];
          endTime = times[i];
        }
      }
      
      // Guardar último rango
      const startHour = parseInt(startTime.split(':')[0]);
      const endHour = parseInt(endTime.split(':')[0]) + 1;
      
      consolidated.push({
        date,
        dayName: dayNames[dateObj.getDay()],
        startTime,
        endTime: `${endHour}:00`,
        hours: endHour - startHour
      });
    });

    return consolidated;
  };

  const handleAccept = () => {
    if (!selectedSubject) {
      alert('Por favor selecciona una materia');
      return;
    }

    if (selectedSlots.length === 0) {
      alert('Por favor selecciona al menos un horario');
      return;
    }

    const schedules = consolidateSchedules();
    const totalHours = schedules.reduce((sum, schedule) => sum + schedule.hours, 0);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const appointment = {
      id: `appointment_${Date.now()}`,
      studentId: currentUser?.id || 'guest',
      studentName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Invitado',
      teacherId: teacher.id,
      teacherName: teacher.name,
      subject: selectedSubject,
      modality,
      platform: modality === 'virtual' ? platform : null,
      location: modality === 'presencial' ? location : null,
      locationAddress: modality === 'presencial' 
        ? (location === 'student' 
            ? 'Av. 6 de Diciembre N34-120 y Av. Ignacio de Veintimilla, Quito, Ecuador'
            : teacher.location.address)
        : null,
      description,
      schedules,
      totalHours,
      status: 'pending_payment',
      createdAt: new Date().toISOString()
    };

    // Guardar en localStorage
    const pendingAppointments = JSON.parse(localStorage.getItem('pending_appointments') || '[]');
    pendingAppointments.push(appointment);
    localStorage.setItem('pending_appointments', JSON.stringify(pendingAppointments));

    console.log('Agendamiento creado:', appointment);
    alert(`¡Agendamiento creado exitosamente!\n\nTotal de horas: ${totalHours}\nEstado: Pendiente de pago`);
    
    // TODO: Navegar a vista de pago (futura)
    // navigate(`/payment/${appointment.id}`);
    navigate('/');
  };

  if (!teacher) {
    return (
      <div className="schedule-class__loading">
        Cargando...
      </div>
    );
  }

  // Extraer materias únicas de los cursos del profesor
  const subjects = [...new Set(teacher.courses.map(course => course.title))];

  return (
    <div className="schedule-class">
      <div className="schedule-class__container">
        <button 
          className="schedule-class__back-button"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>

        <h1 className="schedule-class__title">
          ¡Genial! Vamos a agendar tu cita con {teacher.name}:
        </h1>

        <SubjectSelector 
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
        />

        <div className="schedule-class__section">
          <h2 className="schedule-class__section-title">Dame una descripción de tu clase:</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe qué temas específicos te gustaría cubrir..."
            className="schedule-class__textarea"
            rows="3"
          />
        </div>

        <ModalitySelector
          modality={modality}
          onSelectModality={setModality}
          platform={platform}
          onSelectPlatform={setPlatform}
        />

        {modality === 'presencial' && (
          <LocationSelector
            location={location}
            onSelectLocation={setLocation}
            teacherLocation={teacher.location}
          />
        )}

        <ScheduleGrid
          selectedSlots={selectedSlots}
          onToggleSlot={setSelectedSlots}
        />

        <div className="schedule-class__actions">
          <button
            onClick={() => navigate(-1)}
            className="schedule-class__button schedule-class__button--secondary"
          >
            Regresar
          </button>
          <button
            onClick={handleAccept}
            className="schedule-class__button schedule-class__button--primary"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleClass;