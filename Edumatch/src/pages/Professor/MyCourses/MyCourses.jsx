import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyCourses.css';

function MyCourses() {
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
    <div className="courses-page">
      {/* HEADER */}
      <header className="courses-header">
        <div className="courses-header-content">
          <div className="courses-header-left">
            <div className="courses-logo" onClick={() => navigate('/professor/profile')}>
              <span className="courses-logo-icon">🎓</span>
              <span className="courses-logo-text">EduMatch</span>
            </div>
          </div>

          <div className="courses-header-right">
            <button className="courses-btn-convert" onClick={() => navigate('/student/home')}>
              Conviértete en Estudiante
            </button>
            
            <div className="courses-user-menu-container">
              <button
                className="courses-user-avatar-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="courses-avatar-placeholder">{getInitials()}</div>
                <span className="courses-menu-icon">☰</span>
              </button>

              {showUserMenu && (
                <div className="courses-user-dropdown">
                  <div className="courses-dropdown-header">
                    <p className="courses-user-name">{currentUser.firstName} {currentUser.lastName}</p>
                    <p className="courses-user-email">{currentUser.email}</p>
                  </div>
                  <div className="courses-dropdown-divider"></div>
                  <button className="courses-dropdown-item" onClick={() => navigate('/professor/profile')}>
                    👤 Mi Perfil
                  </button>
                  <button className="courses-dropdown-item courses-logout" onClick={handleLogout}>
                    🚪 Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="courses-main-content">
        {/* SIDEBAR */}
        <aside className="courses-sidebar">
          <h2 className="courses-sidebar-title">Perfil</h2>
          <nav className="courses-sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`courses-sidebar-item ${item.id === 'courses' ? 'courses-active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="courses-sidebar-icon">{item.icon}</span>
                <span className="courses-sidebar-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN SECTION */}
        <section className="courses-section">
          {/* Header */}
          <div className="courses-header-section">
            <h1 className="courses-section-title">Mis Cursos Asincrónicos</h1>
            <button className="courses-btn-add">+ Crear Nuevo Curso</button>
          </div>

          {/* Stats Cards */}
          <div className="courses-stats-grid">
            <div className="courses-stat-card">
              <div className="courses-stat-icon">📚</div>
              <div className="courses-stat-value">3</div>
              <div className="courses-stat-label">Cursos Publicados</div>
            </div>

            <div className="courses-stat-card">
              <div className="courses-stat-icon">👥</div>
              <div className="courses-stat-value">156</div>
              <div className="courses-stat-label">Estudiantes Inscritos</div>
            </div>

            <div className="courses-stat-card">
              <div className="courses-stat-icon">⭐</div>
              <div className="courses-stat-value">4.7</div>
              <div className="courses-stat-label">Valoración Promedio</div>
            </div>

            <div className="courses-stat-card">
              <div className="courses-stat-icon">💰</div>
              <div className="courses-stat-value">$2,340</div>
              <div className="courses-stat-label">Ingresos Totales</div>
            </div>
          </div>

          {/* Courses List */}
          <div className="courses-list">
            {/* Curso 1 */}
            <div className="course-card">
              <div className="course-image">
                <img 
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400" 
                  alt="Física Avanzada" 
                  className="course-thumbnail"
                />
              </div>

              <div className="course-content">
                <div className="course-header">
                  <h3 className="course-title">Física Avanzada: Mecánica Clásica</h3>
                  <span className="course-status-badge published">✓ Publicado</span>
                </div>

                <div className="course-tags">
                  <span className="course-tag">Física</span>
                  <span className="course-tag">Universitario</span>
                </div>

                <p className="course-description">
                  Curso completo de mecánica clásica para estudiantes universitarios. Incluye teoría, 
                  ejercicios resueltos y simulaciones interactivas. Aprenderás desde cinemática hasta 
                  mecánica lagrangiana.
                </p>

                <div className="course-info-row">
                  <div className="course-info-item">
                    <span className="info-icon">📦</span>
                    <span className="info-text">8 módulos • 42 lecciones</span>
                  </div>
                  <div className="course-info-item">
                    <span className="info-icon">⏱️</span>
                    <span className="info-text">12 horas totales</span>
                  </div>
                  <div className="course-info-item">
                    <span className="info-icon">💰</span>
                    <span className="info-text-price">$79.99</span>
                  </div>
                </div>

                <div className="course-meta">
                  <span className="course-update">📅 Actualizado: 15 Nov 2024</span>
                </div>

                <div className="course-modules">
                  <div className="modules-header">
                    <span className="modules-icon">📋</span>
                    <span className="modules-title">Contenido del Curso</span>
                  </div>
                  <ul className="modules-list">
                    <li className="module-item">
                      <span className="module-checkbox">☐</span>
                      <span className="module-name">Módulo 1: Introducción a la Mecánica</span>
                      <span className="module-duration">45 min</span>
                    </li>
                    <li className="module-item">
                      <span className="module-checkbox">☐</span>
                      <span className="module-name">Módulo 2: Cinemática en 1D y 2D</span>
                      <span className="module-duration">90 min</span>
                    </li>
                    <li className="module-item">
                      <span className="module-checkbox">☐</span>
                      <span className="module-name">Módulo 3: Leyes de Newton</span>
                      <span className="module-duration">120 min</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Curso 2 */}
            <div className="course-card">
              <div className="course-image">
                <img 
                  src="https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400" 
                  alt="Cálculo Integral" 
                  className="course-thumbnail"
                />
              </div>

              <div className="course-content">
                <div className="course-header">
                  <h3 className="course-title">Cálculo Integral y Aplicaciones</h3>
                  <span className="course-status-badge published">✓ Publicado</span>
                </div>

                <div className="course-tags">
                  <span className="course-tag">Matemáticas</span>
                  <span className="course-tag">Universitario</span>
                </div>

                <p className="course-description">
                  Aprende cálculo integral desde cero. Incluye integrales definidas e indefinidas, 
                  técnicas de integración, aplicaciones en física y geometría.
                </p>

                <div className="course-info-row">
                  <div className="course-info-item">
                    <span className="info-icon">📦</span>
                    <span className="info-text">6 módulos • 35 lecciones</span>
                  </div>
                  <div className="course-info-item">
                    <span className="info-icon">⏱️</span>
                    <span className="info-text">10 horas totales</span>
                  </div>
                  <div className="course-info-item">
                    <span className="info-icon">💰</span>
                    <span className="info-text-price">$59.99</span>
                  </div>
                </div>

                <div className="course-meta">
                  <span className="course-update">📅 Actualizado: 10 Nov 2024</span>
                </div>

                <div className="course-modules">
                  <div className="modules-header">
                    <span className="modules-icon">📋</span>
                    <span className="modules-title">Contenido del Curso</span>
                  </div>
                  <ul className="modules-list">
                    <li className="module-item">
                      <span className="module-checkbox">☐</span>
                      <span className="module-name">Módulo 1: Introducción al Cálculo Integral</span>
                      <span className="module-duration">40 min</span>
                    </li>
                    <li className="module-item">
                      <span className="module-checkbox">☐</span>
                      <span className="module-name">Módulo 2: Integrales Indefinidas</span>
                      <span className="module-duration">85 min</span>
                    </li>
                    <li className="module-item">
                      <span className="module-checkbox">☐</span>
                      <span className="module-name">Módulo 3: Técnicas de Integración</span>
                      <span className="module-duration">100 min</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Curso 3 */}
            <div className="course-card">
              <div className="course-image">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400" 
                  alt="Ecuaciones Diferenciales" 
                  className="course-thumbnail"
                />
              </div>

              <div className="course-content">
                <div className="course-header">
                  <h3 className="course-title">Ecuaciones Diferenciales Ordinarias</h3>
                  <span className="course-status-badge published">✓ Publicado</span>
                </div>

                <div className="course-tags">
                  <span className="course-tag">Matemáticas</span>
                  <span className="course-tag">Avanzado</span>
                </div>

                <p className="course-description">
                  Domina las ecuaciones diferenciales ordinarias. Métodos de resolución, aplicaciones 
                  en ingeniería y física, sistemas de EDOs y transformadas de Laplace.
                </p>

                <div className="course-info-row">
                  <div className="course-info-item">
                    <span className="info-icon">📦</span>
                    <span className="info-text">10 módulos • 50 lecciones</span>
                  </div>
                  <div className="course-info-item">
                    <span className="info-icon">⏱️</span>
                    <span className="info-text">15 horas totales</span>
                  </div>
                  <div className="course-info-item">
                    <span className="info-icon">💰</span>
                    <span className="info-text-price">$89.99</span>
                  </div>
                </div>

                <div className="course-meta">
                  <span className="course-update">📅 Actualizado: 5 Nov 2024</span>
                </div>

                <div className="course-modules">
                  <div className="modules-header">
                    <span className="modules-icon">📋</span>
                    <span className="modules-title">Contenido del Curso</span>
                  </div>
                  <ul className="modules-list">
                    <li className="module-item">
                      <span className="module-checkbox">☐</span>
                      <span className="module-name">Módulo 1: Conceptos Fundamentales</span>
                      <span className="module-duration">50 min</span>
                    </li>
                    <li className="module-item">
                      <span className="module-checkbox">☐</span>
                      <span className="module-name">Módulo 2: EDOs de Primer Orden</span>
                      <span className="module-duration">95 min</span>
                    </li>
                    <li className="module-item">
                      <span className="module-checkbox">☐</span>
                      <span className="module-name">Módulo 3: EDOs de Orden Superior</span>
                      <span className="module-duration">110 min</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyCourses;