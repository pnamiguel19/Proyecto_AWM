import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentHeader.css';

const StudentHeader = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    onLogout();
    setShowDropdown(false);
    navigate('/');
  };

  const getInitials = () => {
    if (!currentUser || !currentUser.firstName) return '👤';
    const first = currentUser.firstName?.[0] || '';
    const last = currentUser.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase();
  };

  return (
    <header className="student-header">
      <div className="student-header__container">
        {/* LOGO - Izquierda */}
        <div 
          className="student-header__logo"
          onClick={() => navigate('/')}
        >
          <span className="logo__icon">🎓</span>
          <span className="logo__text">EduMatch</span>
        </div>

        {/* ACCIONES - Derecha */}
        <div className="student-header__actions">
          {/* Botón Conviértete en Profesor */}
          <button 
            className="btn-convert"
            onClick={() => navigate('/register/professor')}
          >
            Conviértete en Instructor
          </button>

          {/* Menú de Usuario */}
          <div className="user-menu">
            <button 
              className="user-menu__trigger"
              onClick={() => setShowDropdown(!showDropdown)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            >
              <span className="menu-bars">☰</span>
              <div className="user-avatar">
                {currentUser?.profilePhoto ? (
                  <img 
                    src={currentUser.profilePhoto} 
                    alt="Avatar" 
                    className="avatar-img"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {getInitials()}
                  </div>
                )}
              </div>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="user-menu__dropdown">
                <div className="dropdown__header">
                  <strong className="user-name">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </strong>
                  <span className="user-role">Estudiante</span>
                </div>
                
                <div className="dropdown__divider"></div>
                
                <button 
                  className="dropdown__item"
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/');
                  }}
                >
                  <span className="item-icon">🏠</span>
                  Menú Principal
                </button>
                
                <div className="dropdown__divider"></div>
                
                <button 
                  className="dropdown__item dropdown__item--danger"
                  onClick={handleLogout}
                >
                  <span className="item-icon">🚪</span>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;