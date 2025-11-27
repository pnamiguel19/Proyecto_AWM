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

      {/* PASO 5: CONFIRMACIÓN Y REVISIÓN */}
      {currentStep === 5 && (
        <div className="step-content">
          <div className="step-header">
            <h2 className="step-title">
              <span>✅</span> Confirmación y Revisión
            </h2>
            <p className="step-description">
              Revisa toda tu información antes de enviar tu solicitud
            </p>
          </div>

          <form className="register-professor-form" onSubmit={(e) => e.preventDefault()}>
            {/* MENSAJE DE BIENVENIDA */}
            <div className="success-message-section">
              <div className="success-icon">🎉</div>
              <h3 className="success-title">¡Estás a un paso de unirte a EduMatch!</h3>
              <p className="success-description">
                Al completar tu registro, nuestro equipo revisará tu perfil y te enviaremos una confirmación 
                por correo electrónico en las próximas 24-48 horas.
              </p>
              <p className="success-subdescription">
                Una vez aprobado, podrás comenzar a recibir solicitudes de estudiantes y empezar a 
                compartir tu conocimiento.
              </p>
            </div>

            {/* SECCIÓN 1: INFORMACIÓN PERSONAL */}
            <div className="review-section">
              <div className="review-header">
                <span className="review-icon">👤</span>
                <h3 className="review-title">Información Personal</h3>
              </div>

              <div className="review-grid">
                <div className="review-item">
                  <span className="review-label">Nombre completo:</span>
                  <span className="review-value">
                    {formData.firstName && formData.lastName 
                      ? `${formData.firstName} ${formData.lastName}` 
                      : 'No especificado'}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Email:</span>
                  <span className="review-value">{formData.email || 'No especificado'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Teléfono:</span>
                  <span className="review-value">{formData.phone || 'No especificado'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Fecha de nacimiento:</span>
                  <span className="review-value">
                    {formData.birthDate 
                      ? new Date(formData.birthDate).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'No especificado'}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Género:</span>
                  <span className="review-value">
                    {formData.gender 
                      ? genderOptions.find(opt => opt.value === formData.gender)?.label 
                      : 'No especificado'}
                  </span>
                </div>
                {formData.address && (
                  <div className="review-item full-width">
                    <span className="review-label">Dirección:</span>
                    <span className="review-value">{formData.address}</span>
                  </div>
                )}
                {formData.bio && (
                  <div className="review-item full-width">
                    <span className="review-label">Biografía:</span>
                    <span className="review-value">{formData.bio}</span>
                  </div>
                )}
              </div>
            </div>

            {/* SECCIÓN 2: FORMACIÓN ACADÉMICA */}
            <div className="review-section">
              <div className="review-header">
                <span className="review-icon">🎓</span>
                <h3 className="review-title">Formación Académica</h3>
              </div>

              <div className="review-grid">
                <div className="review-item">
                  <span className="review-label">Título universitario:</span>
                  <span className="review-value">{formData.universityDegree || 'No especificado'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Universidad:</span>
                  <span className="review-value">{formData.university || 'No especificado'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Año de graduación:</span>
                  <span className="review-value">{formData.graduationYear || 'No especificado'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Experiencia docente:</span>
                  <span className="review-value">
                    {formData.teachingExperience 
                      ? experienceOptions.find(opt => opt.value === formData.teachingExperience)?.label 
                      : 'No especificado'}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Título universitario (PDF):</span>
                  <span className="review-value">
                    {formData.universityDegreeFile 
                      ? `✓ ${formData.universityDegreeFile.name}` 
                      : '✕ No cargado'}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Cédula profesional (PDF):</span>
                  <span className="review-value">
                    {formData.professionalLicenseFile 
                      ? `✓ ${formData.professionalLicenseFile.name}` 
                      : '✕ No cargado'}
                  </span>
                </div>
                <div className="review-item full-width">
                  <span className="review-label">Certificaciones adicionales:</span>
                  <span className="review-value">
                    {formData.certifications.filter(c => c.file).length > 0
                      ? `${formData.certifications.filter(c => c.file).length} certificación(es) cargada(s)`
                      : 'Ninguna certificación adicional'}
                  </span>
                </div>
              </div>
            </div>

            {/* SECCIÓN 3: MATERIAS Y MODALIDADES */}
            <div className="review-section">
              <div className="review-header">
                <span className="review-icon">📚</span>
                <h3 className="review-title">Materias y Modalidades</h3>
              </div>

              <div className="review-grid">
                <div className="review-item full-width">
                  <span className="review-label">Materias que enseñas:</span>
                  <span className="review-value">
                    {formData.subjects.length > 0
                      ? formData.subjects
                          .map(id => subjectsOptions.find(s => s.id === id)?.name)
                          .filter(Boolean)
                          .join(', ')
                      : 'No especificado'}
                  </span>
                </div>
                <div className="review-item full-width">
                  <span className="review-label">Niveles educativos:</span>
                  <span className="review-value">
                    {formData.educationLevels.length > 0
                      ? formData.educationLevels
                          .map(id => educationLevelsOptions.find(l => l.id === id)?.name)
                          .filter(Boolean)
                          .join(', ')
                      : 'No especificado'}
                  </span>
                </div>
                <div className="review-item full-width">
                  <span className="review-label">Modalidades de enseñanza:</span>
                  <span className="review-value">
                    {formData.teachingModalities.length > 0
                      ? formData.teachingModalities
                          .map(id => modalitiesOptions.find(m => m.id === id)?.name)
                          .filter(Boolean)
                          .join(', ')
                      : 'No especificado'}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Tarifa por hora:</span>
                  <span className="review-value">
                    {formData.pricePerHour && formData.currency
                      ? `${formData.pricePerHour} ${formData.currency}`
                      : 'No especificado'}
                  </span>
                </div>
              </div>
            </div>

            {/* SECCIÓN 4: DISPONIBILIDAD HORARIA */}
            <div className="review-section">
              <div className="review-header">
                <span className="review-icon">📅</span>
                <h3 className="review-title">Disponibilidad Horaria</h3>
              </div>

              <div className="review-grid">
                <div className="review-item">
                  <span className="review-label">Franjas horarias disponibles:</span>
                  <span className="review-value">
                    {getScheduleStats().timeSlots} franja{getScheduleStats().timeSlots !== 1 ? 's' : ''} horaria{getScheduleStats().timeSlots !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Días disponibles:</span>
                  <span className="review-value">
                    {getScheduleStats().daysAvailable} día{getScheduleStats().daysAvailable !== 1 ? 's' : ''} a la semana
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Estudiantes máximo por clase:</span>
                  <span className="review-value">
                    {formData.maxStudentsPerClass
                      ? maxStudentsOptions.find(opt => opt.value === formData.maxStudentsPerClass)?.label.split('(')[0].trim()
                      : 'No especificado'}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Tiempo de anticipación para reservas:</span>
                  <span className="review-value">
                    {formData.reservationTime
                      ? reservationTimeOptions.find(opt => opt.value === formData.reservationTime)?.label
                      : 'No especificado'}
                  </span>
                </div>
                {formData.availabilityNotes && (
                  <div className="review-item full-width">
                    <span className="review-label">Notas adicionales:</span>
                    <span className="review-value">{formData.availabilityNotes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* TÉRMINOS Y CONDICIONES */}
            <div className="terms-section">
              <div className="terms-checkbox-group">
                <label className={`terms-checkbox ${errors.acceptTerms ? 'error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }));
                      if (errors.acceptTerms) {
                        setErrors(prev => ({ ...prev, acceptTerms: '' }));
                      }
                    }}
                  />
                  <span className="terms-checkmark"></span>
                  <span className="terms-text">
                    He leído y acepto los{' '}
                    <a href="/terminos-condiciones" target="_blank" rel="noopener noreferrer">
                      Términos y Condiciones
                    </a>
                    {' '}y la{' '}
                    <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer">
                      Política de Privacidad
                    </a>
                    {' '}<span style={{color: '#f44336', fontWeight: 'bold'}}>*</span>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <span className="error-message" style={{marginTop: '-10px', marginLeft: '38px'}}>{errors.acceptTerms}</span>
                )}

                <label className={`terms-checkbox ${errors.acceptPrivacy ? 'error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={formData.acceptPrivacy}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, acceptPrivacy: e.target.checked }));
                      if (errors.acceptPrivacy) {
                        setErrors(prev => ({ ...prev, acceptPrivacy: '' }));
                      }
                    }}
                  />
                  <span className="terms-checkmark"></span>
                  <span className="terms-text">
                    Autorizo el uso de mis datos personales según la política de privacidad
                    {' '}<span style={{color: '#f44336', fontWeight: 'bold'}}>*</span>
                  </span>
                </label>
                {errors.acceptPrivacy && (
                  <span className="error-message" style={{marginTop: '-10px', marginLeft: '38px'}}>{errors.acceptPrivacy}</span>
                )}

                <label className="terms-checkbox optional">
                  <input
                    type="checkbox"
                    checked={formData.acceptNotifications}
                    onChange={(e) => setFormData(prev => ({ ...prev, acceptNotifications: e.target.checked }))
                    }
                  />
                  <span className="terms-checkmark"></span>
                  <span className="terms-text">
                    Deseo recibir notificaciones sobre nuevas solicitudes de clases (opcional)
                  </span>
                </label>
              </div>
            </div>

            {/* BOTONES */}
            <div className="form-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setCurrentStep(4)}
              >
                ← Anterior
              </Button>
              <Button 
                type="button" 
                variant="primary" 
                onClick={handleSubmit}
              >
                🎉 Completar Registro
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;