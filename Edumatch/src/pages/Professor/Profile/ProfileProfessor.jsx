import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import ProfileSidebar from '../../../components/Professor/ProfileSidebar';
import ProfessorPersonalInfo from '../../../components/Professor/ProfessorPersonalInfo';
import './ProfileProfessor.css';

const ProfileProfessor = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

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

  return (
    <div className="professor-layout">
      <StudentHeader currentUser={currentUser} />

      <main className="professor-main-container">
        <div className="professor-content-grid">
          
          <aside className="prof-sidebar-column">
            <ProfileSidebar />
          </aside>

          <section className="prof-content-column">
            <ProfessorPersonalInfo professor={currentUser} />
          </section>

        </div>
      </main>
    </div>
  );
};

export default ProfileProfessor;