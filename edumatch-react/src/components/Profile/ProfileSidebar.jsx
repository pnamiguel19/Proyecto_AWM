import React from 'react';
import './ProfileSidebar.css';

const ProfileSidebar = ({ role, activeSection, onSectionChange }) => {
  const studentSections = [
    { id: 'info', icon: '👤', label: 'Información sobre mí' },
    { id: 'classes', icon: '🎓', label: 'Mis Clases' },
    { id: 'professors', icon: '👨‍🏫', label: 'Mis Profesores' }
  ];

  const professorSections = [
    { id: 'info', icon: '👤', label: 'Información sobre mí' },
    { id: 'classes', icon: '📅', label: 'Citas Agendadas' },
    { id: 'courses', icon: '📚', label: 'Mis Cursos' },
    { id: 'schedule', icon: '🕐', label: 'Horarios' },
    { id: 'documents', icon: '📄', label: 'Documentos' },
    { id: 'history', icon: '📊', label: 'Historial' }
  ];

  const sections = role === 'student' ? studentSections : professorSections;

  return (
    <aside className="profile-sidebar">
      <h2 className="profile-sidebar__title">Perfil</h2>
      <nav className="profile-sidebar__nav">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`profile-sidebar__item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionChange(section.id)}
          >
            <span className="profile-sidebar__icon">{section.icon}</span>
            <span className="profile-sidebar__label">{section.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
