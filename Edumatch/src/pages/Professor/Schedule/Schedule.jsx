import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Schedule.css';

function Schedule() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'
  const [showConfig, setShowConfig] = useState(false);
  const [showUpcomingClasses, setShowUpcomingClasses] = useState(true);

  // Configuration states
  const [autoAcceptBookings, setAutoAcceptBookings] = useState(true);
  const [notifyNewBookings, setNotifyNewBookings] = useState(true);
  const [allowWeekends, setAllowWeekends] = useState(false);
  const [allow24hCancellation, setAllow24hCancellation] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'professor') {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getInitials = () => {
    if (!currentUser) return '';
    return `${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`;
  };

  const menuItems = [
    { id: 'info', icon: '👤', label: 'Información sobre mí', path: '/professor/profile' },
    { id: 'classes', icon: '📚', label: 'Mis Clases', path: '/professor/classes' },
    { id: 'courses', icon: '📖', label: 'Mis Cursos', path: '/professor/courses' },
    { id: 'history', icon: '📊', label: 'Mi historial de Enseñanza', path: '/professor/history' },
    { id: 'schedule', icon: '📅', label: 'Disponibilidad y Horario', path: '/professor/schedule' },
    { id: 'documents', icon: '📄', label: 'Documentos de Acreditación', path: '/professor/documents' },
    { id: 'ratings', icon: '⭐', label: 'Mis Calificaciones y reseñas', path: '/professor/ratings' }
  ];

  // Próximas clases programadas
  const upcomingClasses = [
    {
      id: 1,
      student: 'Javier Ramos',
      subject: 'Matemáticas',
      date: 'Viernes 25 Nov',
      time: '16:00 - 17:30',
      modality: 'En línea',
      cost: '$18.00',
      bgColor: '#d4edda'
    },
    {
      id: 2,
      student: 'María González',
      subject: 'Física',
      date: 'Martes 22 Nov',
      time: '10:00 - 12:00',
      modality: 'Presencial',
      cost: '$22.50',
      bgColor: '#cfe2ff'
    },
    {
      id: 3,
      student: 'Carlos Ruiz',
      subject: 'Física',
      date: 'Martes 22 Nov',
      time: '14:00 - 15:30',
      modality: 'En línea',
      cost: '$22.50',
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

  if (!currentUser) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando...</div>;
  }

  return (
    <div className="sch-page">
      {/* HEADER */}
      <header className="sch-header">
        <div className="sch-header-content">
          <div className="sch-header-left">
            <div className="sch-logo" onClick={() => navigate('/professor/profile')}>
              <span className="sch-logo-icon">🎓</span>
              <span className="sch-logo-text">EduMatch</span>
            </div>
          </div>

          <div className="sch-header-right">
            <button className="sch-btn-convert" onClick={() => navigate('/student/home')}>
              Conviértete en Estudiante
            </button>
            
            <div className="sch-user-menu-container">
              <button
                className="sch-user-avatar-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="sch-avatar-placeholder">{getInitials()}</div>
                <span className="sch-menu-icon">☰</span>
              </button>

              {showUserMenu && (
                <div className="sch-user-dropdown">
                  <div className="sch-dropdown-header">
                    <p className="sch-user-name">{currentUser.firstName} {currentUser.lastName}</p>
                    <p className="sch-user-email">{currentUser.email}</p>
                  </div>
                  <div className="sch-dropdown-divider"></div>
                  <button className="sch-dropdown-item" onClick={() => navigate('/professor/profile')}>
                    👤 Mi Perfil
                  </button>
                  <button className="sch-dropdown-item sch-logout" onClick={handleLogout}>
                    🚪 Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="sch-main-content">
        {/* SIDEBAR */}
        <aside className="sch-sidebar">
          <h2 className="sch-sidebar-title">Perfil</h2>
          <nav className="sch-sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`sch-sidebar-item ${item.id === 'schedule' ? 'sch-active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="sch-sidebar-icon">{item.icon}</span>
                <span className="sch-sidebar-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN SECTION */}
        <section className="sch-section">
          <div className="sch-header-section">
            <h1 className="sch-section-title">Disponibilidad y Horario</h1>
            <button className="sch-btn-add">+ Agregar Disponibilidad</button>
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
                      <h4 className="sch-upcoming-student">{classItem.student} - {classItem.subject}</h4>
                      <div className="sch-upcoming-details">
                        <span className={`sch-upcoming-modality ${classItem.modality === 'En línea' ? 'online' : 'presencial'}`}>
                          {classItem.modality === 'En línea' ? '🌐' : '🏫'} {classItem.modality}
                        </span>
                        <span className="sch-upcoming-cost">• {classItem.cost}</span>
                      </div>
                    </div>
                    <div className="sch-upcoming-right">
                      <div className="sch-upcoming-date">{classItem.date}</div>
                      <div className="sch-upcoming-time">{classItem.time}</div>
                      <div className="sch-upcoming-actions">
                        <button className="sch-btn-details">Ver Detalles</button>
                        <button className="sch-btn-cancel">Cancelar</button>
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
        </section>
      </div>
    </div>
  );
}

export default Schedule;