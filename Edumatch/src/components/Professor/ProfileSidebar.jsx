import React from 'react';
import { NavLink } from 'react-router-dom';
import './ProfileSidebar.css';

const ProfileSidebar = () => {
  return (
    <div className="prof-sidebar-container">
      <h1 className="prof-sidebar-title">Perfil</h1>
      
      <div className="prof-sidebar-menu-card">
        <nav className="prof-sidenav-menu">
          
          <NavLink 
            to="/professor/profile" 
            className={({ isActive }) => `prof-sidenav-item ${isActive ? 'active' : ''}`}
            end
          >
            <span className="prof-sidenav-icon">👤</span>
            <span className="prof-sidenav-text">Información sobre mí</span>
          </NavLink>

          <NavLink 
            to="/professor/my-classes" 
            className={({ isActive }) => `prof-sidenav-item ${isActive ? 'active' : ''}`}
          >
            <span className="prof-sidenav-icon">🧑‍🏫</span>
            <span className="prof-sidenav-text">Mis Clases</span>
          </NavLink>

          <NavLink 
            to="/professor/my-courses" 
            className={({ isActive }) => `prof-sidenav-item ${isActive ? 'active' : ''}`}
          >
            <span className="prof-sidenav-icon">📚</span>
            <span className="prof-sidenav-text">Mis Cursos</span>
          </NavLink>

          <NavLink 
            to="/professor/teaching-history" 
            className={({ isActive }) => `prof-sidenav-item ${isActive ? 'active' : ''}`}
          >
            <span className="prof-sidenav-icon">☝</span>
            <span className="prof-sidenav-text">Mi historial de Enseñanza</span>
          </NavLink>

          <NavLink 
            to="/professor/schedule" 
            className={({ isActive }) => `prof-sidenav-item ${isActive ? 'active' : ''}`}
          >
            <span className="prof-sidenav-icon">📅</span>
            <span className="prof-sidenav-text">Disponibilidad y Horario</span>
          </NavLink>

          <NavLink 
            to="/professor/documents" 
            className={({ isActive }) => `prof-sidenav-item ${isActive ? 'active' : ''}`}
          >
            <span className="prof-sidenav-icon">📑</span>
            <span className="prof-sidenav-text">Documentos de Acreditación</span>
          </NavLink>

          <NavLink 
            to="/professor/ratings" 
            className={({ isActive }) => `prof-sidenav-item ${isActive ? 'active' : ''}`}
          >
            <span className="prof-sidenav-icon">🤓</span>
            <span className="prof-sidenav-text">Mis Calificaciones y reseñas</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default ProfileSidebar;