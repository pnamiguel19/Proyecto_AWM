import React from 'react';
import './StudentPersonalInfo.css';

const StudentPersonalInfo = ({ user }) => {
  // Datos simulados de un ESTUDIANTE (sin descripción)
  const displayUser = {
    name: user?.name || "Maria Gonzales",
    role: "Estudiante", 
    fullName: "Maria Gonzales",
    birthDate: "22 de agosto de 2002",
    city: "Quito, Ecuador",
    email: "maria.gonzales@student.com",
    phone: "+593 9 1234 5678",
    educationLevel: "Universitario", 
    avatar: user?.avatar || "https://i.pravatar.cc/150?img=5" // Avatar de ejemplo
  };

  return (
    <div className="em-personal-info-container">
      <h2 className="em-info-title">Información sobre mí</h2>
      
      {/* Sección Superior: Foto y Datos Básicos (Sin Bio) */}
      <div className="em-profile-header-section">
        <div className="em-avatar-column">
          <div className="em-avatar-wrapper">
            <img src={displayUser.avatar} alt="Foto de perfil" className="em-profile-avatar-img" />
          </div>
        </div>
        
        <div className="em-bio-column" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 className="em-profile-name">{displayUser.name}</h1>
          <p className="em-profile-role">{displayUser.role}</p>
          
          {/* ELIMINADA LA DESCRIPCIÓN (BIO) */}

          {/* Mantenemos el check rosa decorativo si gustas, o lo quitamos. 
              Lo dejo aquí alineado cerca del nombre */}
          <div className="em-pink-badge-container" style={{ marginTop: '10px', justifyContent: 'flex-start' }}>
            <div className="em-pink-check">✓</div>
          </div>
        </div>
      </div>

      {/* Sección Inferior: Grid de Datos de Registro */}
      <div className="em-details-section">
        <h3 className="em-subsection-title">Información Personal</h3>
        
        <div className="em-info-grid">
          <div className="em-grid-item">
            <span className="em-label">NOMBRE COMPLETO</span>
            <span className="em-value">{displayUser.fullName}</span>
          </div>
          <div className="em-grid-item">
            <span className="em-label">FECHA DE NACIMIENTO</span>
            <span className="em-value">{displayUser.birthDate}</span>
          </div>
          
          <div className="em-grid-item">
            <span className="em-label">CIUDAD</span>
            <span className="em-value">{displayUser.city}</span>
          </div>
          <div className="em-grid-item">
            <span className="em-label">CORREO ELECTRÓNICO</span>
            <span className="em-value">{displayUser.email}</span>
          </div>

          <div className="em-grid-item">
            <span className="em-label">TELÉFONO</span>
            <span className="em-value">{displayUser.phone}</span>
          </div>
          <div className="em-grid-item">
            <span className="em-label">NIVEL EDUCATIVO</span>
            <span className="em-value">{displayUser.educationLevel}</span>
          </div>
        </div>
      </div>

      {/* Footer Verde */}
      <div className="em-verified-footer">
        <div className="em-green-box-icon">✓</div>
        <span>Tu identidad ha sido verificada.</span>
      </div>

    </div>
  );
};

export default StudentPersonalInfo;