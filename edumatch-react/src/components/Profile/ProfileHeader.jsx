import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ user }) => {
  // Generar iniciales del nombre
  const getInitials = () => {
    if (!user) return '?';
    const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || '';
    const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  };

  // Traducir rol
  const getRoleLabel = () => {
    if (user?.role === 'student') return 'Estudiante';
    if (user?.role === 'professor') return 'Profesor';
    return user?.role || 'Usuario';
  };

  return (
    <div className="profile-header">
      <div className="profile-header__avatar">
        <span className="profile-header__initials">{getInitials()}</span>
        <div className="profile-header__badge">✓</div>
      </div>
      <div className="profile-header__info">
        <h1 className="profile-header__name">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="profile-header__role">{getRoleLabel()}</p>
      </div>
      <div className="profile-header__verified">
        <span className="verified-icon">🛡️</span>
        <span className="verified-text">Identidad verificada</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
