import React from 'react';
import './ProfileSidebar.css';

const ProfileSidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'personal-info', icon: '👤', text: 'Información sobre mí' },
    { id: 'my-classes', icon: '🧑‍🏫', text: 'Mis Clases' },
    { id: 'my-courses', icon: '📚', text: 'Mis Cursos' },
    { id: 'teaching-history', icon: '☝', text: 'Mi historial de Enseñanza' },
    { id: 'schedule', icon: '📅', text: 'Disponibilidad y Horario' },
    { id: 'documents', icon: '📑', text: 'Documentos de Acreditación' },
    { id: 'ratings', icon: '🤓', text: 'Mis Calificaciones y reseñas' }
  ];

  return (
    <div className="prof-sidebar-container">
      <h1 className="prof-sidebar-title">Perfil</h1>
      
      <div className="prof-sidebar-menu-card">
        <nav className="prof-sidenav-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`prof-sidenav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <span className="prof-sidenav-icon">{item.icon}</span>
              <span className="prof-sidenav-text">{item.text}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileSidebar;