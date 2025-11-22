import React from 'react';
import './PersonalInfo.css';

function PersonalInfo({ user }) {
  const getInitials = () => {
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`;
  };

  const formatSubjects = () => {
    if (!user.subjects || user.subjects.length === 0) return 'No especificado';
    return user.subjects.join(' / ');
  };

  return (
    <div className="personal-info-container">
      <div className="personal-info-header">
        <h1>Información sobre mí</h1>
      </div>

      <div className="profile-card">
        <div className="profile-card-header">
          <div className="profile-photo-container">
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt="Perfil" className="profile-photo" />
            ) : (
              <div className="profile-photo-placeholder">
                {getInitials()}
              </div>
            )}
            <button className="profile-photo-verified">✓</button>
          </div>

          <div className="profile-intro">
            <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
            <p className="profile-title">Profesor de {formatSubjects()}</p>
            <p className="profile-bio">{user.bio || 'Sin descripción disponible'}</p>
          </div>
        </div>

        <div className="personal-info-section">
          <h3>Información Personal</h3>
          
          <div className="info-grid">
            <div className="info-item">
              <label>NOMBRE COMPLETO</label>
              <p>{user.firstName} {user.lastName}</p>
            </div>

            <div className="info-item">
              <label>FECHA DE NACIMIENTO</label>
              <p>{new Date(user.birthDate).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</p>
            </div>

            <div className="info-item">
              <label>CIUDAD</label>
              <p>{user.address || 'No especificado'}</p>
            </div>

            <div className="info-item">
              <label>CORREO ELECTRÓNICO</label>
              <p>{user.email}</p>
            </div>

            <div className="info-item">
              <label>TELÉFONO</label>
              <p>{user.phone}</p>
            </div>

            <div className="info-item">
              <label>AÑOS DE EXPERIENCIA</label>
              <p>{user.teachingExperience || 'No especificado'}</p>
            </div>
          </div>

          <div className="verification-badge">
            <span className="badge-icon">✓</span>
            <span className="badge-text">Tu identidad ha sido verificada.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;