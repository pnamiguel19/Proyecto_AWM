import React from 'react';
import './Header.css';

const Header = ({ userRole = 'ADMIN', userName = 'Administrador' }) => {
  return (
    <header className="header">
      <div className="header__left">
        <div className="logo">
          <div className="logo__icon">🎓</div>
          <div className="logo__text">EduMatch</div>
        </div>
        <span className="user-badge">{userRole}</span>
      </div>

      <div className="header__right">
        <div className="notification-bell">
          🔔
          <span className="notification-count">3</span>
        </div>
        <div className="user-menu">
          <div className="user-avatar">👤</div>
          <span className="user-name">{userName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;