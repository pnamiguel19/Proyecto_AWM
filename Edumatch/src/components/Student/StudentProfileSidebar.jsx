import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfileSidebar.css';

const StudentProfileSidebar = ({ activeSection }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'info',
      label: 'Información Personal',
      icon: '👤',
      path: '/student/profile'
    },
    {
      id: 'dashboard',
      label: 'Panel Principal',
      icon: '📊',
      path: '/student/dashboard'
    },
    {
      id: 'classes',
      label: 'Mis Clases',
      icon: '📚',
      path: '/student/classes'
    },
    {
      id: 'teachers',
      label: 'Mis Profesores',
      icon: '👨‍🏫',
      path: '/student/teachers'
    },
    {
      id: 'reviews',
      label: 'Reseñas',
      icon: '⭐',
      path: '/student/reviews'
    }
  ];

  return (
    <aside className="student-sidebar">
      <h1>Mi Perfil</h1>
      <nav className="sidenav-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`sidenav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="sidenav-icon">{item.icon}</span>
            <span className="sidenav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default StudentProfileSidebar;