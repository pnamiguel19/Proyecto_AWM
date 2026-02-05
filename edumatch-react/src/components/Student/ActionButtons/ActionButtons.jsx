import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../../../services/api';
import './ActionButtons.css';

const ActionButtons = ({ teacherId, teacher, userRole }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, [teacherId]);

  const checkIfFavorite = async () => {
    if (userRole !== 'student') return;
    
    try {
      const response = await studentService.getFavorites();
      if (response.success) {
        const favorites = response.data || [];
        setIsFavorite(favorites.some(prof => prof._id === teacherId));
      }
    } catch (error) {
      console.error('Error verificando favoritos:', error);
    }
  };

  const handleToggleFavorite = async () => {
    if (userRole !== 'student') {
      alert('Debes iniciar sesión como estudiante');
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        const response = await studentService.removeFavorite(teacherId);
        if (response.success) {
          setIsFavorite(false);
          alert('Profesor removido de favoritos');
        }
      } else {
        const response = await studentService.addFavorite(teacherId);
        if (response.success) {
          setIsFavorite(true);
          alert('Profesor agregado a favoritos');
        }
      }
    } catch (error) {
      console.error('Error con favoritos:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClass = () => {
    if (userRole !== 'student') {
      alert('Debes iniciar sesión como estudiante');
      return;
    }
    // Navegar a la página de agendamiento
    navigate(`/booking/${teacherId}`);
  };

  return (
    <div className="action-buttons">
      {/* Solo mostrar botones si es estudiante */}
      {userRole === 'student' && (
        <>
          <button 
            className="btn btn-primary" 
            onClick={handleBookClass}
            aria-label="Agendar clase"
          >
            <span aria-hidden="true">📅</span> Agendar tu clase
          </button>
          
          <button 
            className={`btn ${isFavorite ? 'btn-favorite-active' : 'btn-secondary'}`}
            onClick={handleToggleFavorite}
            disabled={loading}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <span aria-hidden="true">{isFavorite ? '❤️' : '🤍'}</span> 
            {loading ? 'Cargando...' : (isFavorite ? 'En favoritos' : 'Agregar a favoritos')}
          </button>
        </>
      )}
      
      <button className="btn btn-outline" aria-label="Ver más cursos disponibles">
        <span aria-hidden="true">📚</span> Más cursos disponibles
      </button>
      
      <button className="btn btn-outline" aria-label="Ver carpeta profesional">
        <span aria-hidden="true">📁</span> Carpeta profesional
      </button>
    </div>
  );
};

export default ActionButtons;
