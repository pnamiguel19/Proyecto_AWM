import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import ProfileSidebar from '../../../components/Professor/ProfileSidebar';
import ProfessorPersonalInfo from '../../../components/Professor/ProfessorPersonalInfo';
import MyClasses from '../MyClasses/MyClasses';
import MyCourses from '../MyCourses/MyCourses';
import TeachingHistory from '../TeachingHistory/TeachingHistory';
import Schedule from '../Schedule/Schedule';
import Documents from '../Documents/Documents';
import Ratings from '../Ratings/Ratings';
import './ProfileProfessor.css';

const ProfileProfessor = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState('personal-info');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user) {
      setCurrentUser(user);
    } else {
      // Usuario de prueba
      setCurrentUser({
        name: "Juan Pérez",
        role: "professor",
        avatar: "https://via.placeholder.com/150"
      });
    }
  }, [navigate]);

  // Función para renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case 'personal-info':
        return <ProfessorPersonalInfo professor={currentUser} />;
      case 'my-classes':
        return <MyClasses />;
      case 'my-courses':
        return <MyCourses />;
      case 'teaching-history':
        return <TeachingHistory />;
      case 'schedule':
        return <Schedule />;
      case 'documents':
        return <Documents />;
      case 'ratings':
        return <Ratings />;
      default:
        return <ProfessorPersonalInfo professor={currentUser} />;
    }
  };

  return (
    <div className="professor-layout">
      <StudentHeader currentUser={currentUser} />

      <main className="professor-main-container">
        <div className="professor-content-grid">
          <aside className="prof-sidebar-column">
            <ProfileSidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </aside>

          <section className="prof-content-column">
            {renderContent()}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfileProfessor;