import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ currentUser, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    setShowDropdown(false);
    navigate('/');
  };

  const getInitials = () => {
    if (!currentUser?.firstName) return '👤';
    const first = currentUser.firstName?.[0] || '';
    const last = currentUser.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase();
  };

  const getRoleName = () => {
    if (currentUser?.role === 'student') return 'Estudiante';
    if (currentUser?.role === 'professor') return 'Profesor';
    return 'Usuario';
  };

  return (
    <header className="main-header">
      <div className="header-container">
        {/* LOGO - Siempre visible */}
        <div className="header-logo" onClick={() => navigate('/')}>
          <span className="logo-icon">🎓</span>
          <span className="logo-text">EduMatch</span>
        </div>

        {/* ACCIONES DERECHA */}
        <div className="header-actions">
          {!currentUser ? (
            /* SIN SESIÓN INICIADA */
            <>
              <button 
                className="btn-header btn-login"
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </button>
              <button 
                className="btn-header btn-register"
                onClick={() => navigate('/register')}
              >
                Registrarte
              </button>
            </>
          ) : (
            /* CON SESIÓN INICIADA */
            <>
              {/* Botón "Conviértete en..." */}
              {currentUser.role === 'student' && (
                <button 
                  className="btn-convert"
                  onClick={() => navigate('/register/professor')}
                >
                  Conviértete en Instructor
                </button>
              )}

              {currentUser.role === 'professor' && (
                <button 
                  className="btn-convert"
                  onClick={() => navigate('/register/student')}
                >
                  Conviértete en Estudiante
                </button>
              )}

              {/* Menú Usuario */}
              <div className="user-menu">
                <button 
                  className="user-menu-trigger"
                  onClick={() => setShowDropdown(!showDropdown)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                >
                  <span className="menu-icon">☰</span>
                  <div className="user-avatar">
                    {currentUser.profilePhoto ? (
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

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="user-dropdown" ref={dropdownRef}>
                    <div className="dropdown-header">
                      <strong className="user-name">
                        {currentUser.firstName} {currentUser.lastName}
                      </strong>
                      <span className="user-role">{getRoleName()}</span>
                    </div>

                    <div className="dropdown-divider"></div>

                    <button 
                      className="dropdown-item"
                      onClick={() => {
                        setShowDropdown(false);
                        if (currentUser.role === 'student') {
                          navigate('/student/profile');
                        } else if (currentUser.role === 'professor') {
                          navigate('/professor/profile');
                        }
                      }}
                    >
                      <span className="item-icon">👤</span>
                      Mi Perfil
                    </button>

                    <button 
                      className="dropdown-item"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/');
                      }}
                    >
                      <span className="item-icon">🏠</span>
                      Menú Principal
                    </button>

                    <div className="dropdown-divider"></div>

                    <button 
                      className="dropdown-item dropdown-item-danger"
                      onClick={handleLogout}
                    >
                      <span className="item-icon">🚪</span>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;