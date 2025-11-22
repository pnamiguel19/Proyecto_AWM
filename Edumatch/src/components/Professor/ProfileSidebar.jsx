import React from 'react';
import './ProfileSidebar.css';

function ProfileSidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: 'info', icon: '👤', label: 'Información sobre mí' },
    { id: 'classes', icon: '📚', label: 'Mis Clases' },
    { id: 'courses', icon: '📖', label: 'Mis Cursos' },
    { id: 'history', icon: '📝', label: 'Mi historial de Enseñanza' },
    { id: 'schedule', icon: '📅', label: 'Disponibilidad y Horario' },
    { id: 'documents', icon: '📄', label: 'Documentos de Acreditación' },
    { id: 'ratings', icon: '⭐', label: 'Mis Calificaciones y reseñas' }
  ];

  return (
    <aside className="profile-sidebar">
      <div className="sidebar-header">
        <h2>Perfil</h2>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-menu-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="menu-item-icon">{item.icon}</span>
            <span className="menu-item-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default ProfileSidebar;