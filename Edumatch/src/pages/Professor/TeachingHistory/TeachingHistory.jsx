import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeachingHistory.css';

function TeachingHistory() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Todas las materias');
  const [selectedStatus, setSelectedStatus] = useState('Todos los estados');
  const [selectedPeriod, setSelectedPeriod] = useState('Último mes');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Datos de ejemplo
  const classesHistory = [
    {
      id: 1,
      student: { name: 'Sofía Fernández', email: 'sofia.f@email.com', avatar: 'SF' },
      subject: 'Matemáticas',
      date: '15 Nov 2024',
      time: '18:00 - 19:30',
      modality: 'En línea',
      duration: '1.5 hrs',
      cost: '$18.00',
      status: 'Completada'
    },
    {
      id: 2,
      student: { name: 'Diego Torres', email: 'diego.t@email.com', avatar: 'DT' },
      subject: 'Física',
      date: '14 Nov 2024',
      time: '09:00 - 11:00',
      modality: 'Presencial',
      duration: '2 hrs',
      cost: '$30.00',
      status: 'Completada'
    },
    {
      id: 3,
      student: { name: 'Valentina Parra', email: 'valen.p@email.com', avatar: 'VP' },
      subject: 'Cálculo',
      date: '13 Nov 2024',
      time: '14:00 - 15:00',
      modality: 'En línea',
      duration: '1 hr',
      cost: '$18.00',
      status: 'Completada'
    },
    {
      id: 4,
      student: { name: 'Javier Ramos', email: 'javier.r@email.com', avatar: 'JR' },
      subject: 'Matemáticas',
      date: '25 Nov 2024',
      time: '16:00 - 17:30',
      modality: 'En línea',
      duration: '1.5 hrs',
      cost: '$18.00',
      status: 'Programada'
    }
  ];

  if (!currentUser) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando...</div>;
  }

  return (
    <div className="th-page">
      {/* HEADER */}
      <header className="th-header">
        <div className="th-header-content">
          <div className="th-header-left">
            <div className="th-logo" onClick={() => navigate('/professor/profile')}>
              <span className="th-logo-icon">🎓</span>
              <span className="th-logo-text">EduMatch</span>
            </div>
          </div>

          <div className="th-header-right">
            <button className="th-btn-convert" onClick={() => navigate('/student/home')}>
              Conviértete en Estudiante
            </button>
            
            <div className="th-user-menu-container">
              <button
                className="th-user-avatar-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="th-avatar-placeholder">{getInitials()}</div>
                <span className="th-menu-icon">☰</span>
              </button>

              {showUserMenu && (
                <div className="th-user-dropdown">
                  <div className="th-dropdown-header">
                    <p className="th-user-name">{currentUser.firstName} {currentUser.lastName}</p>
                    <p className="th-user-email">{currentUser.email}</p>
                  </div>
                  <div className="th-dropdown-divider"></div>
                  <button className="th-dropdown-item" onClick={() => navigate('/professor/profile')}>
                    👤 Mi Perfil
                  </button>
                  <button className="th-dropdown-item th-logout" onClick={handleLogout}>
                    🚪 Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="th-main-content">
        {/* SIDEBAR */}
        <aside className="th-sidebar">
          <h2 className="th-sidebar-title">Perfil</h2>
          <nav className="th-sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`th-sidebar-item ${item.id === 'history' ? 'th-active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="th-sidebar-icon">{item.icon}</span>
                <span className="th-sidebar-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN SECTION */}
        <section className="th-section">
          <h1 className="th-section-title">Mi Historial de Enseñanza</h1>

          {/* Stats Cards */}
          <div className="th-stats-grid">
            <div className="th-stat-card">
              <div className="th-stat-icon">📚</div>
              <div className="th-stat-value">127</div>
              <div className="th-stat-label">Clases Totales</div>
            </div>

            <div className="th-stat-card">
              <div className="th-stat-icon">✅</div>
              <div className="th-stat-value">118</div>
              <div className="th-stat-label">Completadas</div>
            </div>

            <div className="th-stat-card">
              <div className="th-stat-icon">👥</div>
              <div className="th-stat-value">45</div>
              <div className="th-stat-label">Estudiantes</div>
            </div>

            <div className="th-stat-card">
              <div className="th-stat-icon">⏱️</div>
              <div className="th-stat-value">189</div>
              <div className="th-stat-label">Horas Enseñadas</div>
            </div>

            <div className="th-stat-card">
              <div className="th-stat-icon">💰</div>
              <div className="th-stat-value">$2,835</div>
              <div className="th-stat-label">Ingresos</div>
            </div>
          </div>

          {/* Filters */}
          <div className="th-filters">
            <div className="th-filter-item">
              <label className="th-filter-label">Buscar Estudiante</label>
              <input
                type="text"
                className="th-filter-input"
                placeholder="Nombre del estudiante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="th-filter-item">
              <label className="th-filter-label">Materia</label>
              <select
                className="th-filter-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option>Todas las materias</option>
                <option>Matemáticas</option>
                <option>Física</option>
                <option>Cálculo</option>
              </select>
            </div>

            <div className="th-filter-item">
              <label className="th-filter-label">Estado</label>
              <select
                className="th-filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>Todos los estados</option>
                <option>Completada</option>
                <option>Cancelada</option>
                <option>Programada</option>
              </select>
            </div>

            <div className="th-filter-item">
              <label className="th-filter-label">Periodo</label>
              <select
                className="th-filter-select"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option>Último mes</option>
                <option>Últimos 3 meses</option>
                <option>Últimos 6 meses</option>
                <option>Este año</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="th-table-container">
            <table className="th-table">
              <thead className="th-table-head">
                <tr>
                  <th>Estudiante</th>
                  <th>Materia</th>
                  <th>Fecha y Hora</th>
                  <th>Modalidad</th>
                  <th>Duración</th>
                  <th>Costo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="th-table-body">
                {classesHistory.map((classItem) => (
                  <tr key={classItem.id} className="th-table-row">
                    <td className="th-cell-student">
                      <div className="th-student-info">
                        <div className="th-student-avatar">{classItem.student.avatar}</div>
                        <div className="th-student-details">
                          <div className="th-student-name">{classItem.student.name}</div>
                          <div className="th-student-email">{classItem.student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="th-subject-badge">{classItem.subject}</span>
                    </td>
                    <td>
                      <div className="th-date-time">
                        <div className="th-date">{classItem.date}</div>
                        <div className="th-time">{classItem.time}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`th-modality-badge ${classItem.modality === 'En línea' ? 'online' : 'presencial'}`}>
                        {classItem.modality === 'En línea' ? '🌐' : '🏫'} {classItem.modality}
                      </span>
                    </td>
                    <td className="th-duration">{classItem.duration}</td>
                    <td className="th-cost">{classItem.cost}</td>
                    <td>
                      <span className={`th-status-badge ${
                        classItem.status === 'Completada' ? 'completed' : 
                        classItem.status === 'Programada' ? 'scheduled' : 'cancelled'
                      }`}>
                        {classItem.status === 'Completada' ? '✓' : 
                         classItem.status === 'Programada' ? '⏳' : '✕'} {classItem.status}
                      </span>
                    </td>
                    <td>
                      <button className="th-btn-action">Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="th-pagination">
            <button 
              className="th-pagination-btn" 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              ← Anterior
            </button>
            
            <div className="th-pagination-numbers">
              <button 
                className={`th-pagination-number ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button 
                className={`th-pagination-number ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button 
                className={`th-pagination-number ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button 
                className={`th-pagination-number ${currentPage === 4 ? 'active' : ''}`}
                onClick={() => setCurrentPage(4)}
              >
                4
              </button>
            </div>

            <button 
              className="th-pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(4, prev + 1))}
              disabled={currentPage === 4}
            >
              Siguiente →
            </button>
          </div>

          {/* FINANCIAL SUMMARY */}
          <div className="th-financial-summary">
            <div className="th-financial-header">
              <span className="th-financial-icon">💰</span>
              <h3 className="th-financial-title">Resumen Financiero del Mes</h3>
            </div>
            
            <div className="th-financial-content">
              <div className="th-financial-item">
                <div className="th-financial-label">Ingresos de Noviembre</div>
                <div className="th-financial-value income">$468.50</div>
              </div>

              <div className="th-financial-item">
                <div className="th-financial-label">Clases este Mes</div>
                <div className="th-financial-value classes">28 clases</div>
              </div>

              <div className="th-financial-item">
                <div className="th-financial-label">Promedio por Clase</div>
                <div className="th-financial-value average">$16.73</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeachingHistory;