import React from 'react';
import './ProfessorPersonalInfo.css';

const ProfessorPersonalInfo = ({ professor }) => {
  const displayData = {
    name: professor?.name || "Juan Pérez",
    role: "Profesor de Física / Matemáticas",
    bio: professor?.bio || "Soy profesor con más de 8 años de experiencia en la enseñanza de Física y Matemáticas a nivel secundario y universitario. Me apasiona ayudar a mis estudiantes a comprender conceptos complejos de manera simple y práctica. Cuento con certificaciones internacionales y he trabajado con estudiantes de diferentes países.",
    fullName: professor?.fullName || "Juan Andres Pérez Rodríguez",
    birthDate: professor?.birthDate || "15 de marzo de 1990",
    city: professor?.city || "Quito, Ecuador",
    email: professor?.email || "juan.perez@edumatch.com",
    phone: professor?.phone || "+593 99 123 4567",
    experience: professor?.experience || "8 años",
    avatar: professor?.avatar || "https://via.placeholder.com/150"
  };

  return (
    <div className="prof-personal-info-container">
      <h2 className="prof-info-title">Información sobre mí</h2>
      
      {/* Sección Superior: Foto y Bio */}
      <div className="prof-profile-header-section">
        <div className="prof-avatar-column">
          <div className="prof-avatar-wrapper">
            <img src={displayData.avatar} alt="Foto de perfil" className="prof-profile-avatar-img" />
            <div className="prof-verified-badge">✓</div>
          </div>
        </div>
        
        <div className="prof-bio-column">
          <h1 className="prof-profile-name">{displayData.name}</h1>
          <p className="prof-profile-role">{displayData.role}</p>
          <p className="prof-profile-bio">{displayData.bio}</p>
        </div>
      </div>

      {/* Sección Inferior: Grid de Datos */}
      <div className="prof-details-section">
        <h3 className="prof-subsection-title">Información Personal</h3>
        
        <div className="prof-info-grid">
          <div className="prof-grid-item">
            <span className="prof-label">NOMBRE COMPLETO</span>
            <span className="prof-value">{displayData.fullName}</span>
          </div>
          <div className="prof-grid-item">
            <span className="prof-label">FECHA DE NACIMIENTO</span>
            <span className="prof-value">{displayData.birthDate}</span>
          </div>
          
          <div className="prof-grid-item">
            <span className="prof-label">CIUDAD</span>
            <span className="prof-value">{displayData.city}</span>
          </div>
          <div className="prof-grid-item">
            <span className="prof-label">CORREO ELECTRÓNICO</span>
            <span className="prof-value">{displayData.email}</span>
          </div>

          <div className="prof-grid-item">
            <span className="prof-label">TELÉFONO</span>
            <span className="prof-value">{displayData.phone}</span>
          </div>
          <div className="prof-grid-item">
            <span className="prof-label">AÑOS DE EXPERIENCIA</span>
            <span className="prof-value">{displayData.experience}</span>
          </div>
        </div>
      </div>

      {/* Footer Verde de Verificación */}
      <div className="prof-verified-footer">
        <div className="prof-green-box-icon">✓</div>
        <span>Tu identidad ha sido verificada.</span>
      </div>

    </div>
  );
};

export default ProfessorPersonalInfo;