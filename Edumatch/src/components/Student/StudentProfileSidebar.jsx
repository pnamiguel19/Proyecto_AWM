import React from 'react';
import { NavLink } from 'react-router-dom';
import './StudentProfileSidebar.css';

const StudentProfileSidebar = () => {
  return (
    <div className="em-sidebar-container">
      <h1 className="em-sidebar-title">Perfil</h1>
      
      <div className="em-sidebar-menu-card">
        <nav className="em-sidenav-menu">
          
          {/* Ahora sí podemos usar /student/profile porque ya existe en App.jsx */}
          <NavLink 
            to="/student/profile" 
            className={({ isActive }) => `em-sidenav-item ${isActive ? 'active' : ''}`}
            end
          >
            <span className="em-sidenav-icon">👤</span>
            <span className="em-sidenav-text">Información sobre mí</span>
          </NavLink>

          <NavLink 
            to="/student/my-classes" 
            className={({ isActive }) => `em-sidenav-item ${isActive ? 'active' : ''}`}
          >
            <span className="em-sidenav-icon">🎓</span>
            <span className="em-sidenav-text">Mis Clases</span>
          </NavLink>

          <NavLink 
            to="/student/my-teachers" 
            className={({ isActive }) => `em-sidenav-item ${isActive ? 'active' : ''}`}
          >
            <span className="em-sidenav-icon">💪</span>
            <span className="em-sidenav-text">Mis Profesores</span>
          </NavLink>

          <NavLink 
            to="/student/reviews" 
            className={({ isActive }) => `em-sidenav-item ${isActive ? 'active' : ''}`}
          >
            <span className="em-sidenav-icon">👆</span>
            <span className="em-sidenav-text">Reseñas</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default StudentProfileSidebar;