import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileProfessor.css';

function ProfileProfessor() {
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
    <div className="prof-profile-container">
      {/* HEADER */}
      <header className="prof-header">
        <div className="prof-header-content">
          <div className="prof-header-left">
            <div className="prof-logo" onClick={() => navigate('/professor/profile')}>
              <span className="prof-logo-icon">🎓</span>
              <span className="prof-logo-text">EduMatch</span>
            </div>
          </div>

          <div className="prof-header-right">
            <button className="prof-btn-convert" onClick={() => navigate('/student/home')}>
              Conviértete en Estudiante
            </button>
            
            <div className="prof-user-menu-container">
              <button
                className="prof-user-avatar-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {currentUser.profilePhoto ? (
                  <img src={currentUser.profilePhoto} alt="Perfil" className="prof-avatar-img" />
                ) : (
                  <div className="prof-avatar-placeholder">{getInitials()}</div>
                )}
                <span className="prof-menu-icon">☰</span>
              </button>

              {showUserMenu && (
                <div className="prof-user-dropdown">
                  <div className="prof-dropdown-header">
                    <p className="prof-user-name">{currentUser.firstName} {currentUser.lastName}</p>
                    <p className="prof-user-email">{currentUser.email}</p>
                  </div>
                  <div className="prof-dropdown-divider"></div>
                  <button className="prof-dropdown-item" onClick={() => navigate('/professor/profile')}>
                    👤 Mi Perfil
                  </button>
                  <button className="prof-dropdown-item" onClick={() => navigate('/professor/settings')}>
                    ⚙️ Configuración
                  </button>
                  <div className="prof-dropdown-divider"></div>
                  <button className="prof-dropdown-item prof-logout" onClick={handleLogout}>
                    🚪 Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="prof-main-content">
        {/* SIDEBAR */}
        <aside className="prof-sidebar">
          <h2 className="prof-sidebar-title">Perfil</h2>
          <nav className="prof-sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`prof-sidebar-item ${item.id === 'info' ? 'prof-active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="prof-sidebar-icon">{item.icon}</span>
                <span className="prof-sidebar-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* PROFILE CONTENT */}
        <section className="prof-profile-content">
          <h1 className="prof-section-title">Información sobre mí</h1>

          {/* Profile Card */}
          <div className="prof-profile-card">
            <div className="prof-profile-left">
              <div className="prof-photo-container">
                {currentUser.profilePhoto ? (
                  <img src={currentUser.profilePhoto} alt="Foto de perfil" className="prof-photo-large" />
                ) : (
                  <div className="prof-photo-placeholder-large">{getInitials()}</div>
                )}
                <div className="prof-verified-badge">✓</div>
              </div>
            </div>

            <div className="prof-profile-right">
              <h2 className="prof-profile-name">{currentUser.firstName} {currentUser.lastName}</h2>
              <p className="prof-profile-subtitle">
                Profesor de {currentUser.subjects?.[0] || 'Materias'} / {currentUser.subjects?.[1] || ''}
              </p>
              <p className="prof-profile-bio">{currentUser.bio || 'Sin biografía'}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="prof-info-section">
            <h2 className="prof-section-subtitle">Información Personal</h2>
            
            <div className="prof-info-grid">
              <div className="prof-info-item">
                <label className="prof-info-label">NOMBRE COMPLETO</label>
                <p className="prof-info-value">{currentUser.firstName} {currentUser.lastName}</p>
              </div>

              <div className="prof-info-item">
                <label className="prof-info-label">FECHA DE NACIMIENTO</label>
                <p className="prof-info-value">{currentUser.birthDate || 'No especificado'}</p>
              </div>

              <div className="prof-info-item">
                <label className="prof-info-label">CIUDAD</label>
                <p className="prof-info-value">{currentUser.address || 'No especificado'}</p>
              </div>

              <div className="prof-info-item">
                <label className="prof-info-label">CORREO ELECTRÓNICO</label>
                <p className="prof-info-value">{currentUser.email}</p>
              </div>

              <div className="prof-info-item">
                <label className="prof-info-label">TELÉFONO</label>
                <p className="prof-info-value">{currentUser.phone || 'No especificado'}</p>
              </div>

              <div className="prof-info-item">
                <label className="prof-info-label">AÑOS DE EXPERIENCIA</label>
                <p className="prof-info-value">{currentUser.teachingExperience || '0'} años</p>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="prof-verification-alert">
            <span className="prof-check-icon">✓</span>
            <span>Tu identidad ha sido verificada.</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfileProfessor;