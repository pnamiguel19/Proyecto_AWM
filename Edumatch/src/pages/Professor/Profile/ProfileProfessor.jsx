import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '../../../components/Professor/ProfileSidebar';
import ProfileHeader from '../../../components/Professor/ProfileHeader';
import PersonalInfo from '../../../components/Professor/PersonalInfo';
import './ProfileProfessor.css';

function ProfileProfessor() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState('info');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'professor') {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'info':
        return <PersonalInfo user={currentUser} />;
      case 'classes':
        return <div className="section-content">Mis Clases (Próximamente)</div>;
      case 'courses':
        return <div className="section-content">Mis Cursos (Próximamente)</div>;
      case 'history':
        return <div className="section-content">Mi Historial (Próximamente)</div>;
      case 'schedule':
        return <div className="section-content">Disponibilidad y Horario (Próximamente)</div>;
      case 'documents':
        return <div className="section-content">Documentos de Acreditación (Próximamente)</div>;
      case 'ratings':
        return <div className="section-content">Mis Calificaciones y Reseñas (Próximamente)</div>;
      default:
        return <PersonalInfo user={currentUser} />;
    }
  };

  return (
    <div className="profile-professor-container">
      <ProfileHeader />
      
      <div className="profile-content">
        <ProfileSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        
        <main className="profile-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default ProfileProfessor;