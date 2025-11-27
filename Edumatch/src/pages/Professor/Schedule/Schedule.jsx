import React, { useState } from 'react';
import ClassDetailsModal from '../../../components/Professor/ClassDetailsModal';
import './Schedule.css';

function Schedule() {
  const [viewMode, setViewMode] = useState('week');
  const [showConfig, setShowConfig] = useState(false);
  const [showUpcomingClasses, setShowUpcomingClasses] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Configuration states
  const [autoAcceptBookings, setAutoAcceptBookings] = useState(false);
  const [notifyNewBookings, setNotifyNewBookings] = useState(true);
  const [allowWeekends, setAllowWeekends] = useState(true);
  const [allow24hCancellation, setAllow24hCancellation] = useState(true);

  // Próximas clases programadas
  const upcomingClasses = [
    {
      id: 1,
      student: { name: 'Javier Ramos', email: 'javier.r@email.com', avatar: 'JR' },
      title: 'Clase de Matemáticas - Ecuaciones Diferenciales',
      subject: 'Matemáticas',
      date: '25 Nov 2024',
      time: '16:00 - 17:30',
      modality: 'En línea',
      duration: '1.5 hrs',
      cost: '$18.00',
      status: 'Programada',
      bgColor: '#d4edda'
    },
    {
      id: 2,
      student: { name: 'María González', email: 'maria.g@email.com', avatar: 'MG' },
      title: 'Clase de Física - Mecánica Clásica',
      subject: 'Física',
      date: '22 Nov 2024',
      time: '10:00 - 12:00',
      modality: 'Presencial',
      duration: '2 hrs',
      cost: '$22.50',
      status: 'Programada',
      bgColor: '#cfe2ff'
    },
    {
      id: 3,
      student: { name: 'Carlos Ruiz', email: 'carlos.r@email.com', avatar: 'CR' },
      title: 'Clase de Física - Cinemática',
      subject: 'Física',
      date: '22 Nov 2024',
      time: '14:00 - 15:30',
      modality: 'En línea',
      duration: '1.5 hrs',
      cost: '$22.50',
      status: 'Programada',
      bgColor: '#fff3cd'
    }
  ];

  // Horarios de la semana
  const weekDays = ['Lun 21', 'Mar 22', 'Mié 23', 'Jue 24', 'Vie 25', 'Sáb 26', 'Dom 27'];
  const hours = ['08:00', '09:00', '10:00', '14:00', '16:00', '18:00'];

  const scheduleData = {
    'Lun 21': [
      { hour: '09:00', time: '09:00-10:30', student: 'Diego Torres', subject: 'Física', modality: 'Presencial', status: 'scheduled' },
      { hour: '14:00', time: '14:00-15:00', status: 'available' },
      { hour: '16:00', time: '16:00-17:30', student: 'Sofía Fernández', subject: 'Matemáticas', modality: 'Presencial', status: 'scheduled' },
      { hour: '18:00', time: '18:00-19:00', status: 'available' }
    ],
    'Mar 22': [
      { hour: '09:00', time: '09:00-10:00', status: 'available' },
      { hour: '10:00', time: '10:00-12:00', student: 'María González', subject: 'Matemáticas', modality: 'En línea', status: 'scheduled' },
      { hour: '14:00', time: '14:00-15:30', student: 'Carlos Ruiz', subject: 'Física', modality: 'En línea', status: 'scheduled' },
      { hour: '16:00', time: '16:00-17:00', status: 'available' },
      { hour: '18:00', time: '18:00-19:00', status: 'available' }
    ],
    'Mié 23': [
      { hour: '08:00', time: '08:00-09:00', status: 'available' },
      { hour: '10:00', time: '10:00-11:00', status: 'available' },
      { hour: '14:00', time: '14:00-15:00', status: 'available' },
      { hour: '16:00', time: '16:00-17:00', student: 'Luis Moreno', subject: 'Física', modality: 'En línea', status: 'scheduled' }
    ],
    'Jue 24': [
      { hour: '09:00', time: '09:00-10:00', student: 'Ana Silva', subject: 'Cálculo', modality: 'En línea', status: 'scheduled' },
      { hour: '10:00', time: '10:00-11:00', status: 'available' },
      { hour: '14:00', time: '14:00-15:00', student: 'Valentina Parra', subject: 'Cálculo', modality: 'En línea', status: 'scheduled' },
      { hour: '16:00', time: '16:00-17:00', status: 'available' },
      { hour: '18:00', time: '18:00-19:00', status: 'available' }
    ],
    'Vie 25': [
      { hour: '08:00', time: '08:00-09:00', status: 'available' },
      { hour: '09:00', time: '09:00-10:00', status: 'available' },
      { hour: '14:00', time: '14:00-15:00', status: 'available' },
      { hour: '16:00', time: '16:00-17:30', student: 'Javier Ramos', subject: 'Matemáticas', modality: 'En línea', status: 'scheduled' },
      { hour: '18:00', time: '18:00-19:00', student: 'Patricia Vega', subject: 'Física', modality: 'En línea', status: 'scheduled' }
    ],
    'Sáb 26': [
      { hour: '09:00', time: '09:00-12:00', status: 'unavailable' }
    ],
    'Dom 27': []
  };

  const handleViewDetails = (classData) => {
    setSelectedClass(classData);
    setIsModalOpen(true);
  };

  return (
    <div className="sch-container">
      <div className="sch-header-section">
        <h1 className="sch-section-title">Disponibilidad y Horario</h1>
      </div>

      {/* Toggle para mostrar/ocultar próximas clases */}
      <div className="sch-toggle-section">
        <button 
          className="sch-toggle-btn"
          onClick={() => setShowUpcomingClasses(!showUpcomingClasses)}
        >
          {showUpcomingClasses ? '▼' : '▶'} Próximas Clases Programadas
        </button>
        <button 
          className="sch-config-btn"
          onClick={() => setShowConfig(!showConfig)}
        >
          ⚙️ Configuración
        </button>
      </div>

      {/* CONFIGURATION PANEL */}
      {showConfig && (
        <div className="sch-config-panel">
          <div className="sch-config-header">
            <span className="sch-config-icon">⚙️</span>
            <h3 className="sch-config-title">Configuración de Disponibilidad</h3>
          </div>
          <div className="sch-config-grid">
            <div className="sch-config-item">
              <span className="sch-config-label">Aceptar reservas automáticas</span>
              <label className="sch-toggle">
                <input 
                  type="checkbox" 
                  checked={autoAcceptBookings}
                  onChange={() => setAutoAcceptBookings(!autoAcceptBookings)}
                />
                <span className="sch-toggle-slider"></span>
              </label>
            </div>

            <div className="sch-config-item">
              <span className="sch-config-label">Permitir clases los fines de semana</span>
              <label className="sch-toggle">
                <input 
                  type="checkbox" 
                  checked={allowWeekends}
                  onChange={() => setAllowWeekends(!allowWeekends)}
                />
                <span className="sch-toggle-slider"></span>
              </label>
            </div>

            <div className="sch-config-item">
              <span className="sch-config-label">Notificar nuevas reservas</span>
              <label className="sch-toggle">
                <input 
                  type="checkbox" 
                  checked={notifyNewBookings}
                  onChange={() => setNotifyNewBookings(!notifyNewBookings)}
                />
                <span className="sch-toggle-slider"></span>
              </label>
            </div>

            <div className="sch-config-item">
              <span className="sch-config-label">Permitir cancelaciones 24h antes</span>
              <label className="sch-toggle">
                <input 
                  type="checkbox" 
                  checked={allow24hCancellation}
                  onChange={() => setAllow24hCancellation(!allow24hCancellation)}
                />
                <span className="sch-toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* UPCOMING CLASSES */}
      {showUpcomingClasses && (
        <div className="sch-upcoming-classes">
          <div className="sch-upcoming-header">
            <span className="sch-upcoming-icon">📋</span>
            <h3 className="sch-upcoming-title">Próximas Clases Programadas</h3>
          </div>
          
          <div className="sch-upcoming-list">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="sch-upcoming-card" style={{ borderLeft: `4px solid ${classItem.bgColor}` }}>
                <div className="sch-upcoming-left">
                  <h4 className="sch-upcoming-student">{classItem.student.name} - {classItem.subject}</h4>
                  <div className="sch-upcoming-details">
                    <span className={`sch-upcoming-modality ${classItem.modality === 'En línea' ? 'online' : 'presencial'}`}>
                      {classItem.modality === 'En línea' ? '🌐' : '🏫'} {classItem.modality}
                    </span>
                    <span className="sch-upcoming-cost">• {classItem.cost}</span>
                  </div>
                </div>
                <div className="sch-upcoming-right">
                  <div className="sch-upcoming-date">
                    {classItem.date.includes('25') ? 'Viernes 25 Nov' : 'Martes 22 Nov'}
                  </div>
                  <div className="sch-upcoming-time">{classItem.time}</div>
                  <div className="sch-upcoming-actions">
                    <button 
                      className="sch-btn-details"
                      onClick={() => handleViewDetails(classItem)}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATS CARDS */}
      <div className="sch-stats-grid">
        <div className="sch-stat-card">
          <div className="sch-stat-icon">📅</div>
          <div className="sch-stat-value">28</div>
          <div className="sch-stat-label">Horas Disponibles</div>
        </div>

        <div className="sch-stat-card">
          <div className="sch-stat-icon">✅</div>
          <div className="sch-stat-value">15</div>
          <div className="sch-stat-label">Clases Agendadas</div>
        </div>

        <div className="sch-stat-card">
          <div className="sch-stat-icon">⏰</div>
          <div className="sch-stat-value">12</div>
          <div className="sch-stat-label">Horas Libres</div>
        </div>

        <div className="sch-stat-card">
          <div className="sch-stat-icon">📊</div>
          <div className="sch-stat-value">54%</div>
          <div className="sch-stat-label">Ocupación</div>
        </div>
      </div>

      {/* LEGEND */}
      <div className="sch-legend">
        <div className="sch-legend-item">
          <span className="sch-legend-box available"></span>
          <span className="sch-legend-label">Disponible</span>
        </div>
        <div className="sch-legend-item">
          <span className="sch-legend-box scheduled"></span>
          <span className="sch-legend-label">Clase Agendada</span>
        </div>
        <div className="sch-legend-item">
          <span className="sch-legend-box unavailable"></span>
          <span className="sch-legend-label">No Disponible</span>
        </div>
      </div>

      {/* CALENDAR NAVIGATION */}
      <div className="sch-calendar-nav">
        <button className="sch-nav-btn">← Anterior</button>
        <div className="sch-date-range">21 - 27 Noviembre 2024</div>
        <button className="sch-nav-btn">Siguiente →</button>
        <div className="sch-view-toggle">
          <button 
            className={`sch-view-btn ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Semana
          </button>
          <button 
            className={`sch-view-btn ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Mes
          </button>
        </div>
      </div>

      {/* WEEKLY SCHEDULE */}
      <div className="sch-calendar">
        <table className="sch-calendar-table">
          <thead>
            <tr>
              <th className="sch-hour-header">Hora</th>
              {weekDays.map((day) => (
                <th key={day} className="sch-day-header">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="sch-hour-cell">{hour}</td>
                {weekDays.map((day) => {
                  const daySchedule = scheduleData[day] || [];
                  const slot = daySchedule.find(s => s.hour === hour);
                  
                  return (
                    <td key={`${day}-${hour}`} className="sch-slot-cell">
                      {slot && (
                        <div className={`sch-slot ${slot.status}`}>
                          <div className="sch-slot-time">{slot.time}</div>
                          {slot.student && (
                            <>
                              <div className="sch-slot-student">{slot.student}</div>
                              <div className="sch-slot-subject">{slot.subject}</div>
                              <div className="sch-slot-modality">
                                {slot.modality === 'En línea' ? '🌐 En línea' : '🏫 Presencial'}
                              </div>
                            </>
                          )}
                          {slot.status === 'available' && (
                            <div className="sch-slot-available">Disponible</div>
                          )}
                          {slot.status === 'unavailable' && (
                            <div className="sch-slot-unavailable">No Disponible</div>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CLASS DETAILS MODAL */}
      <ClassDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
      />
    </div>
  );
}

export default Schedule;