import React from 'react';
import './StudentPersonalInfo.css';

const StudentPersonalInfo = ({ currentUser }) => {
  const getInitials = () => {
    if (!currentUser) return '';
    return `${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`;
  };

  return (
    <section className="content-area">
      <div className="profile-card">
        <div className="card-header">
          <h2 className="card-title">Información sobre mí</h2>
        </div>

        <div className="profile-summary">
          <div className="profile-avatar-large-container">
            {currentUser?.profilePhoto ? (
              <img 
                src={currentUser.profilePhoto} 
                alt="Foto grande del usuario" 
                className="profile-avatar-large"
              />
            ) : (
              <div className="profile-avatar-large profile-avatar-placeholder-large">
                {getInitials()}
              </div>
            )}
            <div className="verified-badge-large">✔</div>
          </div>
          <h1 className="profile-name">
            {currentUser?.firstName} {currentUser?.lastName}
          </h1>
          <p className="profile-role">Estudiante</p>
        </div>

        <div className="detail-section">
          <span className="detail-icon">🛡️</span>
          <a href="#">Identidad verificada</a>
        </div>

        {/* Información adicional */}
        {currentUser?.email && (
          <div className="info-section">
            <h3 className="info-title">📧 Correo Electrónico</h3>
            <p className="info-text">{currentUser.email}</p>
          </div>
        )}

        {currentUser?.phone && (
          <div className="info-section">
            <h3 className="info-title">📱 Teléfono</h3>
            <p className="info-text">{currentUser.phone}</p>
          </div>
        )}

        {currentUser?.educationLevel && (
          <div className="info-section">
            <h3 className="info-title">🎓 Nivel Educativo</h3>
            <p className="info-text">{currentUser.educationLevel}</p>
          </div>
        )}

        {currentUser?.bio && (
          <div className="info-section">
            <h3 className="info-title">📝 Biografía</h3>
            <p className="info-text">{currentUser.bio}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentPersonalInfo;