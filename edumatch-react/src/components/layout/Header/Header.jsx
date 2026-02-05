import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un usuario logueado
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', searchQuery);
    // Aquí implementarías la lógica de búsqueda
  };

  const handleFilterClick = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const getProfileLink = () => {
    if (!user) return '/login';
    
    switch(user.role) {
      case 'admin':
        return '/Admin/Dashboard';
      case 'professor':
        return '/professor/profile';
      case 'student':
        return '/student/profile';
      default:
        return '/login';
    }
  };

  const filters = [
    {
      name: 'materia',
      title: 'Materia',
      subtitle: '¿Qué quieres aprender?',
      options: ['Matemáticas', 'Física', 'Química', 'Inglés', 'Programación']
    },
    {
      name: 'nivel',
      title: 'Nivel Educativo',
      subtitle: '¿En qué grado te encuentras?',
      options: ['Primaria', 'Secundaria', 'Bachillerato', 'Universidad']
    },
    {
      name: 'modalidad',
      title: 'Modalidad',
      subtitle: '¿Cómo quieres recibir tu clase?',
      options: ['Presencial', 'Virtual', 'Híbrida']
    }
  ];

  return (
    <header className="header" role="banner">
      <div className="header__container">
        {/* TOP BAR */}
        <div className="header__top">
          <a href="/" className="logo" aria-label="EduMatch - Inicio">
            <span className="logo__icon" aria-hidden="true">🎓</span>
            <span className="logo__text">EduMatch</span>
          </a>

          {/* SEARCH BAR */}
          <form 
            className="search-bar" 
            role="search" 
            aria-label="Búsqueda principal"
            onSubmit={handleSearch}
          >
            <input
              type="search"
              id="main-search"
              className="search-bar__input"
              placeholder="Buscar clases, profesores..."
              aria-label="Campo de búsqueda"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="search-bar__button" 
              aria-label="Buscar"
            >
              🔍
            </button>
          </form>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Menú"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* HEADER ACTIONS */}
          <nav 
            className={`header__actions ${mobileMenuOpen ? 'mobile-open' : ''}`}
            aria-label="Acciones de usuario"
          >
            {user ? (
              <>
                <a href={getProfileLink()} className="header__link header__user">
                  👤 {user.firstName || user.email}
                </a>
                <button onClick={handleLogout} className="header__link header__logout">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <a href="#funcionamiento" className="header__link">
                  ¿Cómo funciona?
                </a>
                <a href="/register" className="header__link">
                  Regístrate
                </a>
                <a href="/teacher-registration" className="header__link">
                  Postúlate
                </a>
              </>
            )}
          </nav>
        </div>

        {/* NAVIGATION FILTERS */}
        <nav className="nav-filters" aria-label="Filtros de búsqueda">
          {filters.map((filter) => (
            <div
              key={filter.name}
              className={`nav-filters__item ${activeFilter === filter.name ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter.name)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleFilterClick(filter.name);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={activeFilter === filter.name}
            >
              <div className="nav-filters__title">{filter.title}</div>
              <div className="nav-filters__subtitle">{filter.subtitle}</div>

              {/* DROPDOWN MENU */}
              {activeFilter === filter.name && (
                <div className="dropdown-menu">
                  {filter.options.map((option, index) => (
                    <a
                      key={index}
                      href={`#${filter.name}-${option.toLowerCase()}`}
                      className="dropdown-menu__item"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Seleccionado: ${filter.name} - ${option}`);
                      }}
                    >
                      {option}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;