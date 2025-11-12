import { useState, useCallback } from 'react';

/**
 * Hook para manejar notificaciones
 */
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((type, message, duration = 4000) => {
    const id = Date.now();
    const notification = { id, type, message };

    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const showSuccess = useCallback((message, duration = 4000) => {
    return showNotification('success', message, duration);
  }, [showNotification]);

  const showError = useCallback((message, duration = 5000) => {
    return showNotification('error', message, duration);
  }, [showNotification]);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notifications,
    showSuccess,
    showError,
    removeNotification
  };
};