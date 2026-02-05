import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileSidebar from '../../../components/Profile/ProfileSidebar';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import { professorServiceProfile } from '../../../services/api';
import '../../Home/Home.css';
import './ProfessorProfile.css';

function ProfessorProfile() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('info');
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('pending'); // Para appointments
  const [activeScheduleDay, setActiveScheduleDay] = useState('monday');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'professor') {
      navigate('/');
      return;
    }
    setCurrentUser(user);
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      universityDegree: user.universityDegree || '',
      university: user.university || '',
      subjects: user.subjects || [],
      educationLevels: user.educationLevels || [],
      teachingModalities: user.teachingModalities || [],
      hourlyRate: user.hourlyRate || '',
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getInitials = () => {
    if (!currentUser) return '';
    const first = currentUser.firstName || currentUser.name || 'U';
    const last = currentUser.lastName || '';
    return `${first[0] || ''}${last[0] || ''}`.toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, values) => {
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleSave = async () => {
    try {
      const response = await professorServiceProfile.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        bio: formData.bio,
        universityDegree: formData.universityDegree,
        university: formData.university,
        subjects: formData.subjects,
        educationLevels: formData.educationLevels,
        teachingModalities: formData.teachingModalities,
        hourlyRate: formData.hourlyRate
      });

      if (response.success) {
        const updatedUser = { ...currentUser, ...response.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        setFormData(updatedUser);
        setIsEditing(false);
        alert('Perfil actualizado correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil: ' + error.message);
    }
  };

  const handleCertificateUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar que sea un PDF
    if (file.type !== 'application/pdf') {
      alert('Solo se permiten archivos PDF');
      e.target.value = '';
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Máximo 5MB');
      e.target.value = '';
      return;
    }

    // Solicitar nombre del certificado
    const certName = prompt('Ingresa el nombre del certificado:', file.name.replace('.pdf', ''));
    if (!certName) {
      e.target.value = '';
      return;
    }

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('certification', file);
      formDataUpload.append('name', certName);

      const response = await professorServiceProfile.addCertification(formDataUpload);

      if (response.success) {
        alert('Certificado subido correctamente');
        const updatedUser = { ...currentUser, certifications: response.data.certifications };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
      }
    } catch (error) {
      console.error('Error al subir certificado:', error);
      alert('Error al subir el certificado: ' + error.message);
    }

    // Limpiar el input
    e.target.value = '';
  };

  const renderInfoSection = () => (
    <div className="profile-section">
      <div className="profile-section__header">
        <h2 className="profile-section__title">Información sobre mí</h2>
        {!isEditing ? (
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            ✏️ Editar Perfil
          </button>
        ) : (
          <button className="btn-edit" onClick={handleSave}>
            💾 Guardar Cambios
          </button>
        )}
      </div>

      <form className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Biografía</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Cuéntanos sobre tu experiencia..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Título Universitario</label>
            <input
              type="text"
              name="universityDegree"
              value={formData.universityDegree}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Universidad</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tarifa por Hora (S/.)</label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Modalidades de Enseñanza</label>
          <div className="checkbox-group">
            {['Presencial', 'Virtual', 'Híbrido'].map(modality => (
              <label key={modality} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.teachingModalities?.includes(modality)}
                  onChange={(e) => {
                    const newModalities = e.target.checked
                      ? [...(formData.teachingModalities || []), modality]
                      : formData.teachingModalities.filter(m => m !== modality);
                    handleArrayChange('teachingModalities', newModalities);
                  }}
                  disabled={!isEditing}
                />
                <span>{modality}</span>
              </label>
            ))}
          </div>
        </div>
      </form>
    </div>
  );

  const renderAppointmentsSection = () => (
    <div className="profile-section">
      <div className="profile-section__header">
        <h2 className="profile-section__title">Citas Agendadas</h2>
      </div>

      <div className="classes-tabs">
        <button
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pendientes
        </button>
        <button
          className={`tab ${activeTab === 'confirmed' ? 'active' : ''}`}
          onClick={() => setActiveTab('confirmed')}
        >
          Confirmadas
        </button>
        <button
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completadas
        </button>
      </div>

      <div className="empty-state">
        <span className="empty-icon">📅</span>
        <h3>No tienes citas {activeTab === 'pending' ? 'pendientes' : activeTab === 'confirmed' ? 'confirmadas' : 'completadas'}</h3>
        <p>Cuando los estudiantes agenden clases contigo, aparecerán aquí.</p>
      </div>
    </div>
  );

  const renderCoursesSection = () => (
    <div className="profile-section">
      <div className="profile-section__header">
        <h2 className="profile-section__title">Mis Cursos</h2>
        <button className="btn-edit">+ Agregar Curso</button>
      </div>

      <div className="empty-state">
        <span className="empty-icon">📚</span>
        <h3>No tienes cursos registrados</h3>
        <p>Agrega los cursos que impartes para que los estudiantes conozcan tu oferta académica.</p>
      </div>
    </div>
  );

  const renderScheduleSection = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayLabels = {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo'
    };

    return (
      <div className="profile-section">
        <div className="profile-section__header">
          <h2 className="profile-section__title">Horarios</h2>
          <button className="btn-edit">💾 Guardar Horarios</button>
        </div>

        <div className="schedule-container">
          <div className="schedule-tabs">
            {days.map(day => (
              <button
                key={day}
                className={`schedule-tab ${activeScheduleDay === day ? 'active' : ''}`}
                onClick={() => setActiveScheduleDay(day)}
              >
                {dayLabels[day]}
              </button>
            ))}
          </div>

          <div className="schedule-content">
            <h3>{dayLabels[activeScheduleDay]}</h3>
            <div className="empty-state">
              <span className="empty-icon">🕐</span>
              <p>No tienes horarios configurados para este día.</p>
              <button className="btn-primary">+ Agregar Horario</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDocumentsSection = () => {
    const certifications = currentUser?.certifications || [];

    return (
      <div className="profile-section">
        <div className="profile-section__header">
          <h2 className="profile-section__title">Documentos</h2>
        </div>

        <div className="documents-upload">
          <div className="upload-area">
            <span className="upload-icon">📄</span>
            <h3>Certificados de Formación</h3>
            <p>Sube tus certificados, diplomas y títulos académicos (Solo PDF, máximo 5MB)</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleCertificateUpload}
              id="certificate-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="certificate-upload" className="btn-primary">
              📤 Subir Certificado
            </label>
          </div>

          <div className="documents-list">
            {certifications.length > 0 ? (
              <div className="certificates-grid">
                {certifications.map((cert, index) => (
                  <div key={index} className="certificate-item">
                    <div className="certificate-icon">📄</div>
                    <div className="certificate-info">
                      <h4>{cert.name}</h4>
                      <a 
                        href={`http://localhost:8000/${cert.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="certificate-link"
                      >
                        Ver certificado
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">📂</span>
                <h3>No tienes documentos subidos</h3>
                <p>Los certificados que subas aparecerán aquí.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderHistorySection = () => (
    <div className="profile-section">
      <div className="profile-section__header">
        <h2 className="profile-section__title">Historial</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🎓</span>
          <h3>0</h3>
          <p>Clases Impartidas</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👨‍🎓</span>
          <h3>0</h3>
          <p>Estudiantes Atendidos</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <h3>0.0</h3>
          <p>Calificación Promedio</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <h3>S/. 0</h3>
          <p>Ingresos Totales</p>
        </div>
      </div>

      <div className="empty-state">
        <span className="empty-icon">📊</span>
        <h3>Historial vacío</h3>
        <p>Comienza a impartir clases para ver tu historial académico.</p>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'info':
        return renderInfoSection();
      case 'classes':
        return renderAppointmentsSection();
      case 'courses':
        return renderCoursesSection();
      case 'schedule':
        return renderScheduleSection();
      case 'documents':
        return renderDocumentsSection();
      case 'history':
        return renderHistorySection();
      default:
        return renderInfoSection();
    }
  };

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="professor-profile">
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
            <div className="user-menu-container">
              <button
                className="user-avatar-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {currentUser?.profilePhoto || currentUser?.avatar ? (
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
                      {currentUser?.firstName || currentUser?.name}
                    </p>
                    <p className="user-dropdown-email">{currentUser?.email}</p>
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

      <div className="profile-container">
        <div className="profile-content-wrapper">
          <ProfileSidebar
            role="professor"
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          
          <div className="profile-main">
            <ProfileHeader user={currentUser} role="professor" />
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorProfile;
