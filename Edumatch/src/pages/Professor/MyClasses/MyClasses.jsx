import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyClasses.css';

function MyClasses() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  if (!currentUser) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando...</div>;
  }

  return (
    <div className="my-classes-page">
      {/* HEADER */}
      <header className="mc-header">
        <div className="mc-header-content">
          <div className="mc-header-left">
            <div className="mc-logo" onClick={() => navigate('/professor/profile')}>
              <span className="mc-logo-icon">🎓</span>
              <span className="mc-logo-text">EduMatch</span>
            </div>
          </div>

          <div className="mc-header-right">
            <button className="mc-btn-convert" onClick={() => navigate('/student/home')}>
              Conviértete en Estudiante
            </button>
            
            <div className="mc-user-menu-container">
              <button
                className="mc-user-avatar-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="mc-avatar-placeholder">{getInitials()}</div>
                <span className="mc-menu-icon">☰</span>
              </button>

              {showUserMenu && (
                <div className="mc-user-dropdown">
                  <div className="mc-dropdown-header">
                    <p className="mc-user-name">{currentUser.firstName} {currentUser.lastName}</p>
                    <p className="mc-user-email">{currentUser.email}</p>
                  </div>
                  <div className="mc-dropdown-divider"></div>
                  <button className="mc-dropdown-item" onClick={() => navigate('/professor/profile')}>
                    👤 Mi Perfil
                  </button>
                  <button className="mc-dropdown-item mc-logout" onClick={handleLogout}>
                    🚪 Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mc-main-content">
        {/* SIDEBAR */}
        <aside className="mc-sidebar">
          <h2 className="mc-sidebar-title">Perfil</h2>
          <nav className="mc-sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`mc-sidebar-item ${item.id === 'classes' ? 'mc-active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="mc-sidebar-icon">{item.icon}</span>
                <span className="mc-sidebar-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN SECTION */}
        <section className="mc-classes-section">
          {/* Header */}
          <div className="mc-classes-header">
            <h1 className="mc-section-title">Mis Clases</h1>
            <button className="mc-btn-add-class">+ Agregar Nueva Clase</button>
          </div>

          {/* Stats Cards */}
          <div className="mc-stats-grid">
            <div className="mc-stat-card">
              <div className="mc-stat-icon">📚</div>
              <div className="mc-stat-value">5</div>
              <div className="mc-stat-label">Clases Activas</div>
            </div>

            <div className="mc-stat-card">
              <div className="mc-stat-icon">👥</div>
              <div className="mc-stat-value">42</div>
              <div className="mc-stat-label">Estudiantes Totales</div>
            </div>

            <div className="mc-stat-card">
              <div className="mc-stat-icon">⭐</div>
              <div className="mc-stat-value">4.8</div>
              <div className="mc-stat-label">Calificación Promedio</div>
            </div>

            <div className="mc-stat-card">
              <div className="mc-stat-icon">⏰</div>
              <div className="mc-stat-value">120</div>
              <div className="mc-stat-label">Horas Enseñadas</div>
            </div>
          </div>

          {/* Classes List */}
          <div className="mc-classes-list">
            {/* Clase 1 - Física */}
            <div className="mc-class-card">
              <div className="mc-class-header mc-header-active">
                <div className="mc-class-title-section">
                  <h3 className="mc-class-title">Física</h3>
                  <p className="mc-class-subtitle">Bachillerato - Universitario</p>
                </div>
                <span className="mc-class-status mc-status-active">● Activa</span>
              </div>

              <div className="mc-class-body">
                <div className="mc-class-price">
                  <span className="mc-price-icon">💰</span>
                  <span className="mc-price-text">$15 por hora</span>
                </div>

                <p className="mc-class-description">
                  Clases de Física para secundaria y universidad. Incluye mecánica, electricidad, ondas y más. Método práctico con ejercicios.
                </p>

                <div className="mc-class-stats">
                  <div className="mc-class-stat">
                    <span className="mc-stat-icon">👥</span>
                    <span className="mc-stat-text">15 estudiantes</span>
                  </div>
                  <div className="mc-class-stat">
                    <span className="mc-stat-icon">⭐</span>
                    <span className="mc-stat-text">4.9</span>
                  </div>
                  <button className="mc-btn-edit-inline">✏️</button>
                </div>
              </div>
            </div>

            {/* Clase 2 - Matemáticas */}
            <div className="mc-class-card">
              <div className="mc-class-header mc-header-active">
                <div className="mc-class-title-section">
                  <h3 className="mc-class-title">Matemáticas</h3>
                  <p className="mc-class-subtitle">Primaria - Secundaria</p>
                </div>
                <span className="mc-class-status mc-status-active">● Activa</span>
              </div>

              <div className="mc-class-body">
                <div className="mc-class-price">
                  <span className="mc-price-icon">💰</span>
                  <span className="mc-price-text">$12 por hora</span>
                </div>

                <p className="mc-class-description">
                  Clases de matemáticas desde nivel básico hasta avanzado. Álgebra, geometría, trigonometría y cálculo.
                </p>

                <div className="mc-class-stats">
                  <div className="mc-class-stat">
                    <span className="mc-stat-icon">👥</span>
                    <span className="mc-stat-text">12 estudiantes</span>
                  </div>
                  <div className="mc-class-stat">
                    <span className="mc-stat-icon">⭐</span>
                    <span className="mc-stat-text">4.7</span>
                  </div>
                  <button className="mc-btn-edit-inline">✏️</button>
                </div>
              </div>
            </div>

            {/* Clase 3 - Cálculo Diferencial */}
            <div className="mc-class-card">
              <div className="mc-class-header mc-header-active">
                <div className="mc-class-title-section">
                  <h3 className="mc-class-title">Cálculo Diferencial</h3>
                  <p className="mc-class-subtitle">Universitario</p>
                </div>
                <span className="mc-class-status mc-status-active">● Activa</span>
              </div>

              <div className="mc-class-body">
                <div className="mc-class-price">
                  <span className="mc-price-icon">💰</span>
                  <span className="mc-price-text">$18 por hora</span>
                </div>

                <p className="mc-class-description">
                  Cálculo diferencial e integral para estudiantes universitarios. Límites, derivadas, integrales y aplicaciones.
                </p>

                <div className="mc-class-stats">
                  <div className="mc-class-stat">
                    <span className="mc-stat-icon">👥</span>
                    <span className="mc-stat-text">8 estudiantes</span>
                  </div>
                  <div className="mc-class-stat">
                    <span className="mc-stat-icon">⭐</span>
                    <span className="mc-stat-text">5.0</span>
                  </div>
                  <button className="mc-btn-edit-inline">✏️</button>
                </div>
              </div>
            </div>

            {/* Clase 4 - Física Cuántica (Pausada) */}
            <div className="mc-class-card">
              <div className="mc-class-header mc-header-paused">
                <div className="mc-class-title-section">
                  <h3 className="mc-class-title">Física Cuántica</h3>
                  <p className="mc-class-subtitle">Universitario Avanzado</p>
                </div>
                <span className="mc-class-status mc-status-paused">● Pausada</span>
              </div>

              <div className="mc-class-body">
                <div className="mc-class-price">
                  <span className="mc-price-icon">💰</span>
                  <span className="mc-price-text">$25 por hora</span>
                </div>

                <p className="mc-class-description">
                  Introducción a la mecánica cuántica y física moderna. Para estudiantes de física e ingeniería.
                </p>

                <div className="mc-class-stats">
                  <div className="mc-class-stat">
                    <span className="mc-stat-icon">👥</span>
                    <span className="mc-stat-text">5 estudiantes</span>
                  </div>
                  <div className="mc-class-stat">
                    <span className="mc-stat-icon">⭐</span>
                    <span className="mc-stat-text">4.8</span>
                  </div>
                  <button className="mc-btn-edit-inline">✏️</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyClasses;