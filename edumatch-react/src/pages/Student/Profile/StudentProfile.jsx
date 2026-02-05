import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '../../../components/Profile/ProfileSidebar';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import { studentService } from '../../../services/api';
import '../../Home/Home.css';
import './StudentProfile.css';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('info');
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [favoriteProfessors, setFavoriteProfessors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      alert('Debes iniciar sesión primero');
      navigate('/login');
      return;
    }
    
    loadUserData();
    loadFavorites();
    loadClasses();
    loadStats();
  }, []);

  const loadUserData = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserData(user);
    setFormData(user);
  };

  const loadFavorites = async () => {
    try {
      const response = await studentService.getFavorites();
      if (response.success) {
        setFavoriteProfessors(response.data || []);
      }
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  };

  const loadClasses = async () => {
    try {
      const response = await studentService.getClasses();
      if (response.success) {
        // Transformar los datos del backend al formato esperado
        const formattedClasses = (response.data || []).map(item => ({
          _id: item._id || item.professorId,
          professorId: item.professorId || item._id,
          professorName: item.professorName || `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Profesor',
          subject: item.subject || (item.subjects && item.subjects[0]) || 'Materia',
          date: item.date || new Date().toISOString(),
          time: item.time || '10:00 AM',
          status: item.status || 'confirmed',
          hourlyRate: item.hourlyRate || 0
        }));
        setClasses(formattedClasses);
      }
    } catch (error) {
      console.error('Error al cargar clases:', error);
      setClasses([]);
    }
  };

  const loadStats = async () => {
    try {
      const response = await studentService.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const handleRemoveFavorite = async (professorId) => {
    try {
      const response = await studentService.removeFavorite(professorId);
      if (response.success) {
        // Actualizar estado local
        setFavoriteProfessors(favoriteProfessors.filter(p => p._id !== professorId));
        // Recargar estadísticas
        loadStats();
        alert('Profesor removido de favoritos');
      }
    } catch (error) {
      console.error('Error al remover favorito:', error);
      alert('Error al remover de favoritos: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getInitials = () => {
    if (!userData) return '';
    const first = userData.firstName || userData.name || 'U';
    const last = userData.lastName || '';
    return `${first[0] || ''}${last[0] || ''}`.toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await studentService.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        educationLevel: formData.educationLevel,
        gender: formData.gender,
        aboutMe: formData.aboutMe,
        learningGoals: formData.learningGoals
      });

      if (response.success) {
        const updatedUser = { ...userData, ...response.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
        setFormData(updatedUser);
        setIsEditing(false);
        alert('Perfil actualizado correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil: ' + error.message);
    }
  };

  const renderInfoSection = () => (
    <div className="profile-section">
      <div className="profile-section__header">
        <h2 className="profile-section__title">Información sobre mí</h2>
        <button 
          className="btn-edit"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? '💾 Guardar' : '✏️ Editar'}
        </button>
      </div>

      <div className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nivel Educativo</label>
            <select
              name="educationLevel"
              value={formData.educationLevel || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="elementary">Primaria</option>
              <option value="middle_school">Secundaria</option>
              <option value="high_school">Bachillerato</option>
              <option value="university">Universidad</option>
              <option value="postgraduate">Posgrado</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Género</label>
            <select
              name="gender"
              value={formData.gender || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
              <option value="prefer_not_to_say">Prefiero no decir</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Sobre mí</label>
          <textarea
            name="aboutMe"
            value={formData.aboutMe || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows="4"
            placeholder="Cuéntanos sobre ti..."
          />
        </div>

        <div className="form-group">
          <label>Objetivos de Aprendizaje</label>
          <textarea
            name="learningGoals"
            value={formData.learningGoals || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows="4"
            placeholder="¿Qué quieres aprender?"
          />
        </div>
      </div>
    </div>
  );

  const renderClassesSection = () => {
    const upcomingClasses = classes.filter(c => c.status === 'confirmed' || c.status === 'pending');
    const completedClasses = classes.filter(c => c.status === 'completed');
    const canceledClasses = classes.filter(c => c.status === 'cancelled');

    return (
      <div className="profile-section">
        <h2 className="profile-section__title">Mis Clases</h2>
        
        {stats && (
          <div className="stats-summary">
            <div className="stat-item">
              <span className="stat-icon">📚</span>
              <div className="stat-info">
                <h4>{stats.totalBookings || 0}</h4>
                <p>Total Reservas</p>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">✅</span>
              <div className="stat-info">
                <h4>{stats.completedClasses || 0}</h4>
                <p>Clases Completadas</p>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <div className="stat-info">
                <h4>{stats.favoriteProfessorsCount || 0}</h4>
                <p>Profesores Favoritos</p>
              </div>
            </div>
          </div>
        )}

        <div className="classes-tabs">
          <button className="tab active">Próximas ({upcomingClasses.length})</button>
          <button className="tab">Completadas ({completedClasses.length})</button>
          <button className="tab">Canceladas ({canceledClasses.length})</button>
        </div>
        
        <div className="classes-list">
          {classes.length > 0 ? (
            <div className="classes-grid">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="class-card">
                  <div className="class-header">
                    <h4>{classItem.professorName || 'Profesor'}</h4>
                    <span className={`status-badge ${classItem.status}`}>
                      {classItem.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                    </span>
                  </div>
                  <p className="class-subject">{classItem.subject || 'Materia'}</p>
                  <p className="class-date">📅 {new Date(classItem.date).toLocaleDateString()}</p>
                  <p className="class-time">🕐 {classItem.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">📚</span>
              <h3>No tienes clases agendadas</h3>
              <p>Explora profesores y agenda tu primera clase</p>
              <button className="btn-primary" onClick={() => navigate('/')}>
                Ver Profesores
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderProfessorsSection = () => (
    <div className="profile-section">
      <h2 className="profile-section__title">Mis Profesores Favoritos</h2>
      <div className="professors-grid">
        {favoriteProfessors.length > 0 ? (
          <div className="favorites-grid">
            {favoriteProfessors.map((professor) => (
              <div key={professor._id} className="favorite-card">
                <div className="favorite-header">
                  <div className="professor-avatar">
                    {professor.firstName?.charAt(0)}{professor.lastName?.charAt(0)}
                  </div>
                  <div className="professor-info">
                    <h4>{professor.firstName} {professor.lastName}</h4>
                    <p className="professor-subject">{professor.subjects?.join(', ') || 'Sin materias'}</p>
                  </div>
                </div>
                <div className="professor-details">
                  <div className="detail-item">
                    <span>⭐</span>
                    <span>{professor.rating?.average?.toFixed(1) || '0.0'} ({professor.rating?.count || 0} reseñas)</span>
                  </div>
                  <div className="detail-item">
                    <span>💰</span>
                    <span>S/. {professor.hourlyRate || 0}/hora</span>
                  </div>
                  <div className="detail-item">
                    <span>📚</span>
                    <span>{professor.totalClasses || 0} clases</span>
                  </div>
                </div>
                <div className="favorite-actions">
                  <button 
                    className="btn-view" 
                    onClick={() => navigate(`/teacher/${professor._id}`)}
                  >
                    Ver Perfil
                  </button>
                  <button 
                    className="btn-remove" 
                    onClick={() => handleRemoveFavorite(professor._id)}
                  >
                    ❌ Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">👨‍🏫</span>
            <h3>No tienes profesores favoritos</h3>
            <p>Agrega profesores a tus favoritos para acceder rápidamente</p>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Explorar Profesores
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'info':
        return renderInfoSection();
      case 'classes':
        return renderClassesSection();
      case 'professors':
        return renderProfessorsSection();
      default:
        return renderInfoSection();
    }
  };

  return (
    <div className="student-profile">
      {/* HEADER EXACTO DEL HOME */}
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
              className="search-input"
            />
            <button className="search-button">
              <span className="search-icon">🔍</span>
            </button>
          </div>

          <nav className="home-nav">
            {userData && userData.role !== 'professor' && (
              <button 
                className="nav-link-instructor"
                onClick={() => navigate('/teacher-registration')}
              >
                Conviértete en instructor
              </button>
            )}

            <div className="user-menu-container">
              <button
                className="user-avatar-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {userData?.profilePhoto || userData?.avatar ? (
                  <img 
                    src={userData.profilePhoto || userData.avatar} 
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
                      {userData?.firstName || userData?.name}
                    </p>
                    <p className="user-dropdown-email">{userData?.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      navigate('/profile');
                      setShowUserMenu(false);
                    }}
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
            <div className="filter-card-header">
              <h3 className="filter-title">Materia</h3>
              <p className="filter-subtitle">¿Qué quieres aprender?</p>
              <span className="filter-arrow">▼</span>
            </div>
          </div>

          <div className="filter-card">
            <div className="filter-card-header">
              <h3 className="filter-title">Nivel Educativo</h3>
              <p className="filter-subtitle">¿En qué grado te encuentras?</p>
              <span className="filter-arrow">▼</span>
            </div>
          </div>

          <div className="filter-card">
            <div className="filter-card-header">
              <h3 className="filter-title">Modalidad</h3>
              <p className="filter-subtitle">¿Cómo quieres recibir tu clase?</p>
              <span className="filter-arrow">▼</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO DEL PERFIL */}
      <div className="profile-container">
        <div className="profile-content-wrapper">
          <ProfileSidebar 
            role="student"
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <div className="profile-main">
            <ProfileHeader user={userData} />
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
