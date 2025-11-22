import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileHeader.css';

function ProfileHeader() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getInitials = () => {
    if (!currentUser) return '';
    return `${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`;
  };

  return (
    <header className="profile-header">
      <div className="profile-header-content">
        <div className="profile-header-logo" onClick={() => navigate('/')}>
          <span className="logo-icon">🎓</span>
          <span className="logo-text">EduMatch</span>
        </div>

        <div className="profile-header-right">
          <button className="btn-student-view">
            Conviértete en Estudiante
          </button>

          <div className="profile-header-menu">
            <button 
              className="profile-menu-trigger"
              onClick={() => setShowMenu(!showMenu)}
            >
              <span className="menu-icon">☰</span>
              <div className="profile-avatar">
                {currentUser?.profilePhoto ? (
                  <img src={currentUser.profilePhoto} alt="Perfil" />
                ) : (
                  <span className="avatar-initials">{getInitials()}</span>
                )}
              </div>
            </button>

            {showMenu && (
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={() => navigate('/professor/profile')}>
                  👤 Perfil
                </div>
                <div className="dropdown-item" onClick={() => navigate('/professor/settings')}>
                  ⚙️ Configuración
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout" onClick={handleLogout}>
                  🚪 Cerrar Sesión
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;