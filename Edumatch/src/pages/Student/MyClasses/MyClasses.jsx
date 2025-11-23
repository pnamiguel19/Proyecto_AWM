import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import StudentProfileSidebar from '../../../components/Student/StudentProfileSidebar';
import ClassCard from '../../../components/Student/ClassCard';
import ClassStats from '../../../components/Student/ClassStats';
import ClassTabs from '../../../components/Student/ClassTabs';
import './MyClasses.css';

const MyClasses = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

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

  // Mock data de clases
  const mockClasses = {
    upcoming: [
      {
        id: 1,
        subject: 'Matemáticas',
        teacher: 'Prof. María García',
        date: '2024-11-25',
        time: '10:00 AM',
        status: 'upcoming',
        duration: '1 hora',
        type: 'Virtual'
      },
      {
        id: 2,
        subject: 'Física',
        teacher: 'Prof. Juan Pérez',
        date: '2024-11-26',
        time: '3:00 PM',
        status: 'upcoming',
        duration: '1.5 horas',
        type: 'Presencial'
      }
    ],
    completed: [
      {
        id: 3,
        subject: 'Química',
        teacher: 'Prof. Ana López',
        date: '2024-11-20',
        time: '2:00 PM',
        status: 'completed',
        duration: '1 hora',
        type: 'Virtual'
      }
    ],
    cancelled: []
  };

  const stats = {
    total: 15,
    completed: 8,
    upcoming: 5,
    cancelled: 2
  };

  const currentClasses = mockClasses[activeTab] || [];

  return (
    <div className="my-classes-page">
      <StudentHeader currentUser={currentUser} onLogout={onLogout} />

      <main className="classes-main">
        <div className="classes-container">
          <StudentProfileSidebar activeSection="classes" />
          
          <div className="classes-content">
            <div className="classes-header">
              <h1 className="page-title">Mis Clases</h1>
              <p className="page-subtitle">Administra y revisa tus clases programadas</p>
            </div>

            <ClassStats stats={stats} />
            
            <ClassTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="classes-grid">
              {currentClasses.map(classItem => (
                <ClassCard key={classItem.id} classData={classItem} />
              ))}
            </div>

            {currentClasses.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>No tienes clases en esta categoría</h3>
                <p>Busca profesores y agenda tu primera clase</p>
                <button 
                  className="btn-primary"
                  onClick={() => navigate('/')}
                >
                  Buscar Profesores
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyClasses;