import React from 'react';
import './Notification.css';

const Notification = ({ type, message, onClose }) => {
  const icon = type === 'success' ? '✓' : '✕';

  return (
    <div className={`notification notification--${type}`}>
      <div className="notification__icon">{icon}</div>
      <p className="notification__message">{message}</p>
      <button 
        className="notification__close" 
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;