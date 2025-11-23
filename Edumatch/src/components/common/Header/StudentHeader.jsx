import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentHeader.css';

const StudentHeader = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (onLogout) onLogout();
    localStorage.removeItem('currentUser');
    setShowDropdown(false);
    navigate('/login');
  };

  // Obtener iniciales si no hay foto
  const getInitials = () => {
    if (!currentUser) return 'U';
    const name = currentUser.name || currentUser.firstName || 'U';
    return name.charAt(0).toUpperCase();
  };

  const userAvatar = currentUser?.avatar || currentUser?.profilePhoto;

  return (
    <header className="em-header">
      <div className="em-header-container">
        
        {/* 1. LOGO (Clic para ir al inicio) */}
        <div className="em-logo" onClick={() => navigate('/')}>
          <span className="em-logo-icon">🎓</span>
          <span className="em-logo-text">EduMatch</span>
        </div>

        {/* 2. ÁREA DE ACCIONES */}
        <div className="em-user-actions">
          
          {/* ENLACE: CONVIÉRTETE EN INSTRUCTOR 
              Redirige al registro de profesores como pediste */}
          {currentUser?.role !== 'professor' && (
            <button 
              className="em-mode-switch-link"
              onClick={() => navigate('/register/professor')}
            >
              Conviértete en instructor
            </button>
          )}

          {/* 3. MENÚ DE USUARIO (Píldora Blanca) */}
          <div className="em-user-menu" ref={dropdownRef}>
            <div 
              className="em-menu-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="em-menu-bars">☰</span>
              
              <div className="em-header-avatar">
                {userAvatar ? (
                  <img src={userAvatar} alt="Perfil" />
                ) : (
                  <span className="em-avatar-initials">{getInitials()}</span>
                )}
              </div>
              
              {/* Punto rojo de notificación */}
              <span className="em-notification-dot"></span>
            </div>

            {/* DROPDOWN DESPLEGABLE */}
            {showDropdown && (
              <div className="em-dropdown-content">
                <div className="em-dropdown-header">
                  <strong>Hola, {currentUser?.name || 'Usuario'}</strong>
                </div>
                
                <button onClick={() => navigate('/')} className="em-dropdown-item">
                  🏠 Inicio
                </button>
                
                <button onClick={() => navigate('/student/profile')} className="em-dropdown-item">
                  👤 Mi Perfil
                </button>

                <div className="em-dropdown-divider"></div>

                <button onClick={handleLogout} className="em-dropdown-item em-text-danger">
                  🚪 Cerrar Sesión
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