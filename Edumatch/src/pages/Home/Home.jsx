import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
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

  // Profesores destacados
  const featuredProfessors = [
    { id: 1, name: 'Juan', subject: 'Física', level: 'Bachillerato', price: '$5 por hora', rating: '4.9' },
    { id: 2, name: 'María', subject: 'Matemáticas', level: 'Primaria y Secundaria', price: '$5 por hora', rating: '5.0' },
    { id: 3, name: 'Carlos', subject: 'Química', level: 'Bachillerato', price: '$5 por hora', rating: '4.8' }
  ];

  // Expertos en buenos resultados
  const expertProfessors = [
    { id: 4, name: 'Gabriela', subject: 'Francés', level: 'Todos los niveles', price: '$5 por hora', rating: '4.9' },
    { id: 5, name: 'Miguel', subject: 'Música', level: 'Piano y Guitarra', price: '$5 por hora', rating: '5.0' },
    { id: 6, name: 'Valentina', subject: 'Dibujo', level: 'Arte y Diseño', price: '$5 por hora', rating: '4.8' }
  ];

  // Expertos en buenos resultados (segunda sección)
  const expertProfessors2 = [
    { id: 7, name: 'Diego', subject: 'Programación', level: 'Bachillerato y Universidad', price: '$5 por hora', rating: '5.0' },
    { id: 8, name: 'Sofía', subject: 'Literatura', level: 'Secundaria y Bachillerato', price: '$5 por hora', rating: '4.9' },
    { id: 9, name: 'Roberto', subject: 'Economía', level: 'Bachillerato y Universidad', price: '$5 por hora', rating: '4.7' }
  ];

  // Los más recomendados
  const recommendedProfessors = [
    { id: 10, name: 'Ana', subject: 'Inglés', level: 'Todos los niveles', price: '$5 por hora', rating: '5.0' },
    { id: 11, name: 'Pedro', subject: 'Historia', level: 'Secundaria y Bachillerato', price: '$5 por hora', rating: '4.9' },
    { id: 12, name: 'Laura', subject: 'Biología', level: 'Bachillerato', price: '$5 por hora', rating: '4.8' }
  ];

  const ProfessorCard = ({ professor }) => (
    <div className="professor-card">
      <div className="professor-image-container">
        <div className="professor-placeholder">
          <span className="placeholder-emoji">😊</span>
        </div>
      </div>
      <div className="professor-info">
        <h3 className="professor-name">{professor.name}, {professor.subject}</h3>
        <p className="professor-level">{professor.level}</p>
        <p className="professor-price">{professor.price}</p>
        <div className="professor-rating">
          <span className="rating-star">⭐</span>
          <span className="rating-value">{professor.rating}</span>
        </div>
      </div>
    </div>
  );

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="home-container">
      {/* HEADER */}
      <header className="home-header">
        <div className="home-header-content">
          {/* Logo */}
          <div className="home-logo" onClick={() => navigate('/')}>
            <span className="logo-icon">🎓</span>
            <span className="logo-text">EduMatch</span>
          </div>

          {/* Barra de búsqueda */}
          <div className="home-search-bar">
            <input
              type="text"
              placeholder="Buscar clases, profesores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <span className="search-icon">🔍</span>
            </button>
          </div>

          {/* Menú de navegación */}
          <nav className="home-nav">
            <button className="nav-link">Regístrate</button>

            {/* Avatar del usuario */}
            <div className="user-menu-container">
              <button
                className="user-avatar-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {currentUser.profilePhoto ? (
                  <img 
                    src={currentUser.profilePhoto} 
                    alt="Perfil" 
                    className="user-avatar-image"
                  />
                ) : (
                  <div className="user-avatar-placeholder">
                    {getInitials()}
                  </div>
                )}
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <p className="user-dropdown-name">
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                    <p className="user-dropdown-email">{currentUser.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item"
                    onClick={() => navigate('/student/profile')}
                  >
                    👤 Mi Perfil
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => navigate('/student/classes')}
                  >
                    📚 Mis Clases
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => navigate('/student/settings')}
                  >
                    ⚙️ Configuración
                  </button>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    🚪 Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* SECCIÓN DE FILTROS */}
      <section className="filters-section">
        <div className="filters-container">
          <div className="filter-card">
            <h3 className="filter-title">Materia</h3>
            <p className="filter-subtitle">¿Qué quieres aprender?</p>
          </div>

          <div className="filter-card">
            <h3 className="filter-title">Nivel Educativo</h3>
            <p className="filter-subtitle">¿En qué grado te encuentras?</p>
          </div>

          <div className="filter-card">
            <h3 className="filter-title">Modalidad</h3>
            <p className="filter-subtitle">¿Cómo quieres recibir tu clase?</p>
          </div>
        </div>
      </section>

      {/* PROFESORES DESTACADOS */}
      <section className="professors-section">
        <div className="professors-container">
          <h2 className="section-title">Profesores destacados</h2>
          <div className="professors-grid">
            {featuredProfessors.map((professor) => (
              <ProfessorCard key={professor.id} professor={professor} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTOS EN BUENOS RESULTADOS - CYAN */}
      <section className="professors-section bg-cyan">
        <div className="professors-container">
          <h2 className="section-title">Expertos en buenos resultados</h2>
          <div className="professors-grid">
            {expertProfessors.map((professor) => (
              <ProfessorCard key={professor.id} professor={professor} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTOS EN BUENOS RESULTADOS - ORANGE */}
      <section className="professors-section bg-orange">
        <div className="professors-container">
          <h2 className="section-title">Expertos en buenos resultados</h2>
          <div className="professors-grid">
            {expertProfessors2.map((professor) => (
              <ProfessorCard key={professor.id} professor={professor} />
            ))}
          </div>
        </div>
      </section>

      {/* LOS MÁS RECOMENDADOS - YELLOW */}
      <section className="professors-section bg-yellow">
        <div className="professors-container">
          <h2 className="section-title">Los más recomendados por padres y estudiantes</h2>
          <div className="professors-grid">
            {recommendedProfessors.map((professor) => (
              <ProfessorCard key={professor.id} professor={professor} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;