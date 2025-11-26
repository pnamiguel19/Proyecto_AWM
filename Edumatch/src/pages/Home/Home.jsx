import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../../data/mockTeachers';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProfessors, setAllProfessors] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
    
    // Cargar todos los profesores (mock + registrados)
    const teachers = getAllTeachers();
    console.log('📚 Profesores cargados:', teachers);
    console.log('📊 Total profesores:', teachers.length);
    setAllProfessors(teachers);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getInitials = () => {
    if (!currentUser) return '';
    const first = currentUser.firstName || currentUser.name || 'U';
    const last = currentUser.lastName || '';
    return `${first[0] || ''}${last[0] || ''}`.toUpperCase();
  };

  // Usar profesores cargados dinámicamente
  const featuredProfessors = allProfessors.slice(0, 3);
  const expertProfessors = allProfessors.slice(3, 6);
  const expertProfessors2 = allProfessors.slice(6, 9);
  const recommendedProfessors = allProfessors.slice(9, 12);

  const handleTeacherClick = (teacherId) => {
    navigate(`/teacher/${teacherId}`);
  };

  const ProfessorCard = ({ professor }) => (
    <div 
      className="professor-card"
      onClick={() => handleTeacherClick(professor.id)}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleTeacherClick(professor.id);
      }}
    >
      <div className="professor-image-container">
        <div className="professor-placeholder">
          <span className="placeholder-emoji">😊</span>
        </div>
      </div>
      <div className="professor-info">
        <h3 className="professor-name">{professor.name}</h3>
        <p className="professor-level">{professor.mainSubject}</p>
        <p className="professor-price">{professor.modality}</p>
        <div className="professor-rating">
          <span className="rating-star">⭐</span>
          <span className="rating-value">{professor.rating}</span>
          <span className="rating-reviews">({professor.reviewCount})</span>
        </div>
      </div>
    </div>
  );

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-header-content">
          <div className="home-logo" onClick={() => navigate('/')}>
            <span className="logo-icon">🎓</span>
            <span className="logo-text">EduMatch</span>
          </div>

          <div className="home-search-bar">
            <input
              type="text"
              placeholder="¿Qué quieres aprender hoy?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <span className="search-icon">🔍</span>
            </button>
          </div>

          <nav className="home-nav">
            {/* 
              BOTÓN "CONVIÉRTETE EN INSTRUCTOR"
              ✅ Redirige a: /register/professor
              ✅ Archivo destino: src/pages/Auth/Register/RegisterProfessor.jsx
            */}
            {currentUser.role !== 'professor' && (
              <button 
                className="nav-link-instructor"
                onClick={() => navigate('/register/professor')}
              >
                Conviértete en instructor
              </button>
            )}

            <div className="user-menu-container">
              <button
                className="user-avatar-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {currentUser.profilePhoto || currentUser.avatar ? (
                  <img 
                    src={currentUser.profilePhoto || currentUser.avatar} 
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
                      {currentUser.firstName || currentUser.name}
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