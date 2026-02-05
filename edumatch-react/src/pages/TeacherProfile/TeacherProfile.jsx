import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { professorService } from '../../services/api';
import TeacherProfileCard from '../../components/Student/TeacherProfileCard/TeacherProfileCard';
import ActionButtons from '../../components/Student/ActionButtons/ActionButtons';
import VideoPresentation from '../../components/Student/VideoPresentation/VideoPresentation';
import CourseCarousel from '../../components/Student/CourseCarousel/CourseCarousel';
import TeacherReviews from '../../components/Student/TeacherReviews/TeacherReviews';
import LocationMap from '../../components/Student/LocationMap/LocationMap';
import './TeacherProfile.css';

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    loadTeacherData();
  }, [id]);

  const loadTeacherData = async () => {
    try {
      setLoading(true);
      const response = await professorService.getById(id);
      console.log('👨‍🏫 Datos del profesor:', response);
      
      // Adaptar datos del backend al formato del frontend
      const adaptedTeacher = {
        id: response.data._id,
        name: `${response.data.firstName} ${response.data.lastName}`,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        mainSubject: response.data.subjects?.join(', ') || 'Sin materia',
        subjects: response.data.subjects || [],
        modality: response.data.teachingModalities?.join(' / ') || 'Presencial',
        teachingModalities: response.data.teachingModalities || [],
        rating: response.data.averageRating || 4.5,
        reviewCount: response.data.totalReviews || 0,
        approvalRate: response.data.approvalRate || 95,
        educationLevel: response.data.educationLevel || '',
        hourlyRate: response.data.hourlyRate || 0,
        priceVirtual: response.data.hourlyRate || 0,
        pricePresencial: response.data.hourlyRate ? response.data.hourlyRate + 5 : 0,
        aboutMe: response.data.aboutMe || '',
        teachingPhilosophy: response.data.teachingPhilosophy || '',
        experience: response.data.experience || '',
        degree: response.data.degree || '',
        university: response.data.university || '',
        video: response.data.videoPresentation || null,
        location: response.data.location || { address: response.data.address || 'Ubicación no especificada' },
        courses: response.data.courses || [],
        reviews: response.data.reviews || [],
        schedule: response.data.schedule || {}
      };
      
      setTeacherData(adaptedTeacher);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error cargando profesor:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="teacher-profile">
        <div className="teacher-profile__container">
          <div className="loading">Cargando información del profesor...</div>
        </div>
      </div>
    );
  }

  if (error || !teacherData) {
    return (
      <div className="teacher-profile">
        <div className="teacher-profile__container">
          <button 
            className="teacher-profile__back-button"
            onClick={() => navigate('/')}
          >
            ← Volver al inicio
          </button>
          <div className="error-message">
            <h2>Error al cargar el profesor</h2>
            <p>{error || 'Profesor no encontrado'}</p>
            <button onClick={() => navigate('/')}>Volver al inicio</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-profile">
      {/* HEADER - Igual que en Home */}
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
            {!currentUser ? (
              <>
                <button 
                  className="nav-link-instructor"
                  onClick={() => navigate('/teacher-registration')}
                >
                  Conviértete en instructor
                </button>
                <button 
                  className="btn-login"
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </button>
              </>
            ) : (
              <>
                {currentUser.role !== 'professor' && (
                  <button 
                    className="nav-link-instructor"
                    onClick={() => navigate('/teacher-registration')}
                  >
                    Conviértete en instructor
                  </button>
                )}
                <div className="user-menu-container">
                  <button 
                    className="user-button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <span className="user-icon">👤</span>
                    <span className="user-name">{currentUser.firstName}</span>
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <button 
                        className="dropdown-item"
                        onClick={() => {
                          navigate('/profile');
                          setShowUserMenu(false);
                        }}
                      >
                        👤 Mi Perfil
                      </button>
                      <button 
                        className="dropdown-item"
                        onClick={() => {
                          localStorage.removeItem('token');
                          localStorage.removeItem('user');
                          navigate('/login');
                        }}
                      >
                        🚪 Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>
        </div>

        {/* Filtros */}
        <div className="home-filters">
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
      </header>

      {/* MAIN CONTENT */}
      <main className="main">
        {/* Header con título */}
        <div className="container">
          <header className="page-header">
            <h1 className="page-title">
              {teacherData.mainSubject ? `Mejor calificado en ${teacherData.mainSubject}` : 'Perfil del Profesor'}
            </h1>
          </header>

          {/* Layout principal: Sidebar + Contenido */}
          <div className="profile">
            {/* SIDEBAR: Tarjeta de perfil */}
            <aside className="profile-sidebar">
              <TeacherProfileCard teacher={teacherData} />
              <ActionButtons 
                teacherId={teacherData.id} 
                teacher={teacherData}
                userRole={currentUser?.role} 
              />
            </aside>

            {/* CONTENIDO: Video y Clases */}
            <div className="profile-content">
              <VideoPresentation video={teacherData.video} />
              <CourseCarousel 
                courses={teacherData.courses} 
                teacherModality={teacherData.modality}
                priceVirtual={teacherData.priceVirtual}
                pricePresencial={teacherData.pricePresencial}
              />
            </div>
          </div>
        </div>

        {/* RESEÑAS: Ancho completo */}
        <TeacherReviews 
          reviews={teacherData.reviews}
          rating={teacherData.rating}
          reviewCount={teacherData.reviewCount}
          approvalRate={teacherData.approvalRate}
        />

        {/* MAPA: Ancho completo */}
        <LocationMap location={teacherData.location} />
      </main>
    </div>
  );
};

export default TeacherProfile;