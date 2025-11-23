import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import StudentProfileSidebar from '../../../components/Student/StudentProfileSidebar';
import StudentPersonalInfo from '../../../components/Student/StudentPersonalInfo';
import './ProfileStudent.css';

const ProfileStudent = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🎓</div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="profile-student-page">
      <StudentHeader currentUser={currentUser} onLogout={onLogout} />

      <main className="profile-main">
        <div className="profile-container">
          <StudentProfileSidebar activeSection="info" />
          
          <div className="profile-content">
            <StudentPersonalInfo currentUser={currentUser} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileStudent;