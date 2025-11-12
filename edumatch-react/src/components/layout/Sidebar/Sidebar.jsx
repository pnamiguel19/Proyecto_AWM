import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
    { id: 'usuarios', icon: '👥', label: 'Usuarios', path: '/admin/usuarios' },
    { id: 'profesores', icon: '👨‍🏫', label: 'Profesores', path: '/admin/profesores' },
    { id: 'contenido', icon: '📚', label: 'Contenido', path: '/admin/contenido' },
    { id: 'clases', icon: '📅', label: 'Clases Agendadas', path: '/admin/clases' },
    { id: 'transacciones', icon: '💰', label: 'Transacciones', path: '/admin/transacciones' },
    { id: 'reseñas', icon: '⭐', label: 'Reseñas', path: '/admin/reseñas' },
    { id: 'verificaciones', icon: '✓', label: 'Verificaciones', path: '/admin/verificaciones' },
    { id: 'reportes', icon: '📈', label: 'Reportes', path: '/admin/reportes' },
    { id: 'configuracion', icon: '⚙️', label: 'Configuración', path: '/admin/configuracion' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar__item ${location.pathname === item.path ? 'sidebar__item--active' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span className="sidebar__label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;