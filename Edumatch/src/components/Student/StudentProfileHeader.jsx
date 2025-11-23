import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfileHeader.css';

const StudentProfileHeader = ({ currentUser }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const getInitials = () => {
    if (!currentUser) return '';
    return `${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`;
  };

  return (
    <header className="student-header">
      <div className="header__container">
        <a href="/" className="logo" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <span className="logo__icon">🎓</span>
          <span>EduMatch</span>
        </a>

        <div className="user-actions-area">
          <button 
            className="mode-switch-link"
            onClick={() => navigate('/register/professor')}
          >
            Conviértete en instructor
          </button>

          <div className="user-menu-dropdown-container">
            <button 
              className="user-menu-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="menu-bars-icon">☰</span>
              
              <div className="header-avatar-container">
                {currentUser?.profilePhoto ? (
                  <img 
                    src={currentUser.profilePhoto} 
                    alt="Foto de perfil" 
                    className="header-avatar"
                  />
                ) : (
                  <div className="header-avatar header-avatar-placeholder">
                    {getInitials()}
                  </div>
                )}
                <span className="notification-dot-header"></span>
              </div>
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item dropdown-item--bold">
                  Notificaciones
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => navigate('/student/dashboard')}
                >
                  Menú Principal
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentProfileHeader;