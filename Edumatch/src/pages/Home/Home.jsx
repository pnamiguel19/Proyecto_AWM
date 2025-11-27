import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../../data/mockTeachers';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProfessors, setAllProfessors] = useState([]);
  
  // Estados para filtros
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showModalityDropdown, setShowModalityDropdown] = useState(false);

  // Referencias para cerrar dropdowns al hacer click fuera
  const subjectRef = useRef(null);
  const levelRef = useRef(null);
  const modalityRef = useRef(null);

  // Opciones de filtros
  const subjects = [
    '📐 Matemáticas',
    '🧪 Física',
    '🧬 Química',
    '📚 Literatura',
    '🌍 Historia',
    '🗣️ Inglés',
    '🗣️ Francés',
    '💻 Programación',
    '🎨 Arte',
    '🎨 Dibujo',
    '🎵 Música',
    '⚽ Educación Física',
    '🔬 Biología',
    '📖 Filosofía'
  ];

  const levels = [
    '👶 Inicial',
    '🎓 Primaria',
    '📖 Secundaria',
    '🎯 Bachillerato',
    '🏛️ Universidad',
    '💼 Posgrado',
    '📚 Todos los niveles'
  ];

  const modalities = [
    '💻 Virtual',
    '🏠 Presencial',
    '🔀 Híbrido'
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
    
    // Cargar todos los profesores
    const teachers = getAllTeachers();
    console.log('📚 Profesores cargados:', teachers);
    setAllProfessors(teachers);
  }, [navigate]);

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subjectRef.current && !subjectRef.current.contains(event.target)) {
        setShowSubjectDropdown(false);
      }
      if (levelRef.current && !levelRef.current.contains(event.target)) {
        setShowLevelDropdown(false);
      }
      if (modalityRef.current && !modalityRef.current.contains(event.target)) {
        setShowModalityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Función auxiliar para normalizar texto (quitar emojis y espacios extra)
  const normalizeText = (text) => {
    if (!text) return '';
    return text
      .replace(/[^\w\s]/g, '') // Quita emojis y caracteres especiales
      .trim()
      .toLowerCase();
  };

  // Función de filtrado mejorada
  const getFilteredProfessors = () => {
    return allProfessors.filter(professor => {
      // FILTRO DE BÚSQUEDA
      const matchesSearch = 
        searchQuery === '' ||
        normalizeText(professor.name).includes(normalizeText(searchQuery)) ||
        normalizeText(professor.mainSubject).includes(normalizeText(searchQuery)) ||
        normalizeText(professor.modality).includes(normalizeText(searchQuery));
      
      // FILTRO DE MATERIA
      let matchesSubject = true;
      if (selectedSubject) {
        const subjectToFind = normalizeText(selectedSubject);
        const professorSubject = normalizeText(professor.mainSubject);
        
        // Buscar coincidencia en mainSubject
        matchesSubject = professorSubject.includes(subjectToFind);
        
        console.log('🔍 Filtro Materia:', {
          buscando: subjectToFind,
          profesorMateria: professorSubject,
          coincide: matchesSubject
        });
      }
      
      // FILTRO DE NIVEL EDUCATIVO
      let matchesLevel = true;
      if (selectedLevel) {
        const levelToFind = normalizeText(selectedLevel);
        const professorLevel = normalizeText(professor.mainSubject);
        
        // Buscar coincidencia en mainSubject (que contiene el nivel)
        // Ejemplo: "Matemáticas - Primaria y Secundaria" debe coincidir con "Primaria"
        matchesLevel = professorLevel.includes(levelToFind);
        
        // Si no coincide, buscar en el campo educationLevel si existe
        if (!matchesLevel && professor.educationLevel) {
          matchesLevel = normalizeText(professor.educationLevel).includes(levelToFind);
        }
        
        // Si dice "todos los niveles", siempre coincide
        if (!matchesLevel && professorLevel.includes('todos')) {
          matchesLevel = true;
        }
        
        console.log('🎓 Filtro Nivel:', {
          buscando: levelToFind,
          profesorNivel: professorLevel,
          coincide: matchesLevel
        });
      }
      
      // FILTRO DE MODALIDAD
      let matchesModality = true;
      if (selectedModality) {
        const modalityToFind = normalizeText(selectedModality);
        const professorModality = normalizeText(professor.modality);
        
        // "Virtual / Presencial" debe coincidir con "Virtual" o "Presencial"
        matchesModality = professorModality.includes(modalityToFind);
        
        // Si es "Híbrido", buscar "/" o "virtual" Y "presencial"
        if (!matchesModality && modalityToFind === 'hibrido') {
          matchesModality = professorModality.includes('virtual') && professorModality.includes('presencial');
        }
        
        console.log('🔀 Filtro Modalidad:', {
          buscando: modalityToFind,
          profesorModalidad: professorModality,
          coincide: matchesModality
        });
      }

      const result = matchesSearch && matchesSubject && matchesLevel && matchesModality;
      
      if (selectedSubject || selectedLevel || selectedModality) {
        console.log('📊 Resultado Final:', {
          profesor: professor.name,
          materia: professor.mainSubject,
          pasaFiltros: result
        });
      }

      return result;
    });
  };

  // Limpiar filtros
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject('');
    setSelectedLevel('');
    setSelectedModality('');
  };

  const hasActiveFilters = searchQuery || selectedSubject || selectedLevel || selectedModality;
  const filteredProfessors = getFilteredProfessors();

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

  // Dividir profesores filtrados en secciones
  const featuredProfessors = filteredProfessors.slice(0, 3);
  const expertProfessors = filteredProfessors.slice(3, 6);
  const expertProfessors2 = filteredProfessors.slice(6, 9);
  const recommendedProfessors = filteredProfessors.slice(9, 12);

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
          {/* Materia */}
          <div 
            className={`filter-card ${showSubjectDropdown ? 'active' : ''}`}
            ref={subjectRef}
          >
            <div 
              className="filter-card-header"
              onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
            >
              <h3 className="filter-title">Materia</h3>
              <p className="filter-subtitle">
                {selectedSubject || '¿Qué quieres aprender?'}
              </p>
              <span className="filter-arrow">{showSubjectDropdown ? '▲' : '▼'}</span>
            </div>

            {showSubjectDropdown && (
              <div className="filter-dropdown">
                {subjects.map((subject, index) => (
                  <button
                    key={index}
                    className={`filter-option ${selectedSubject === subject ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedSubject(subject === selectedSubject ? '' : subject);
                      setShowSubjectDropdown(false);
                    }}
                  >
                    {subject}
                    {selectedSubject === subject && <span className="check-mark">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nivel Educativo */}
          <div 
            className={`filter-card ${showLevelDropdown ? 'active' : ''}`}
            ref={levelRef}
          >
            <div 
              className="filter-card-header"
              onClick={() => setShowLevelDropdown(!showLevelDropdown)}
            >
              <h3 className="filter-title">Nivel Educativo</h3>
              <p className="filter-subtitle">
                {selectedLevel || '¿En qué grado te encuentras?'}
              </p>
              <span className="filter-arrow">{showLevelDropdown ? '▲' : '▼'}</span>
            </div>

            {showLevelDropdown && (
              <div className="filter-dropdown">
                {levels.map((level, index) => (
                  <button
                    key={index}
                    className={`filter-option ${selectedLevel === level ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedLevel(level === selectedLevel ? '' : level);
                      setShowLevelDropdown(false);
                    }}
                  >
                    {level}
                    {selectedLevel === level && <span className="check-mark">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Modalidad */}
          <div 
            className={`filter-card ${showModalityDropdown ? 'active' : ''}`}
            ref={modalityRef}
          >
            <div 
              className="filter-card-header"
              onClick={() => setShowModalityDropdown(!showModalityDropdown)}
            >
              <h3 className="filter-title">Modalidad</h3>
              <p className="filter-subtitle">
                {selectedModality || '¿Cómo quieres recibir tu clase?'}
              </p>
              <span className="filter-arrow">{showModalityDropdown ? '▲' : '▼'}</span>
            </div>

            {showModalityDropdown && (
              <div className="filter-dropdown">
                {modalities.map((modality, index) => (
                  <button
                    key={index}
                    className={`filter-option ${selectedModality === modality ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedModality(modality === selectedModality ? '' : modality);
                      setShowModalityDropdown(false);
                    }}
                  >
                    {modality}
                    {selectedModality === modality && <span className="check-mark">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Botón limpiar filtros */}
        {hasActiveFilters && (
          <div className="filters-actions">
            <button className="btn-clear-filters" onClick={clearFilters}>
              ✕ Limpiar filtros
            </button>
            <p className="results-count">
              {filteredProfessors.length} profesor(es) encontrado(s)
            </p>
          </div>
        )}
      </section>

      {/* Secciones de profesores */}
      {filteredProfessors.length > 0 ? (
        <>
          {featuredProfessors.length > 0 && (
            <section className="professors-section">
              <div className="professors-container">
                <h2 className="section-title">
                  {hasActiveFilters ? 'Resultados de búsqueda' : 'Profesores destacados'}
                </h2>
                <div className="professors-grid">
                  {featuredProfessors.map((professor) => (
                    <ProfessorCard key={professor.id} professor={professor} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {!hasActiveFilters && expertProfessors.length > 0 && (
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
          )}

          {!hasActiveFilters && expertProfessors2.length > 0 && (
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
          )}

          {!hasActiveFilters && recommendedProfessors.length > 0 && (
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
          )}
        </>
      ) : (
        <section className="professors-section">
          <div className="professors-container">
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3 className="no-results-title">No se encontraron profesores</h3>
              <p className="no-results-text">
                Intenta ajustar tus filtros de búsqueda
              </p>
              <button className="btn-clear-filters" onClick={clearFilters}>
                Limpiar filtros
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;