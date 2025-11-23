import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import StudentProfileSidebar from '../../../components/Student/StudentProfileSidebar';
import TeacherStats from '../../../components/Student/TeacherStats';
import TeacherCard from '../../../components/Student/TeacherCard';
import './MyTeachers.css';

const MyTeachers = ({ currentUser, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
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

  // Mock data de profesores
  const mockTeachers = [
    {
      id: 1,
      name: 'María García',
      subject: 'Matemáticas',
      rating: 4.9,
      totalClasses: 12,
      price: 25,
      avatar: null,
      specialties: ['Álgebra', 'Geometría', 'Cálculo']
    },
    {
      id: 2,
      name: 'Juan Pérez',
      subject: 'Física',
      rating: 4.8,
      totalClasses: 8,
      price: 30,
      avatar: null,
      specialties: ['Mecánica', 'Termodinámica']
    },
    {
      id: 3,
      name: 'Ana López',
      subject: 'Química',
      rating: 5.0,
      totalClasses: 15,
      price: 28,
      avatar: null,
      specialties: ['Química Orgánica', 'Química Inorgánica']
    }
  ];

  const stats = {
    total: mockTeachers.length,
    active: mockTeachers.length,
    favorites: 2
  };

  const subjects = ['all', 'Física', 'Matemáticas', 'Química'];

  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || teacher.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="my-teachers-page">
      <StudentHeader currentUser={currentUser} onLogout={onLogout} />

      <main className="teachers-main">
        <div className="teachers-container">
          <StudentProfileSidebar activeSection="teachers" />
          
          <div className="teachers-content">
            <div className="teachers-header">
              <h1 className="page-title">Mis Profesores</h1>
              <p className="page-subtitle">Profesores con los que has tomado clases</p>
            </div>

            <TeacherStats stats={stats} />

            <div className="teachers-filters">
              <input
                type="text"
                placeholder="Buscar profesor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="subject-filter"
              >
                <option value="all">Todas las materias</option>
                {subjects.filter(s => s !== 'all').map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div className="teachers-grid">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map(teacher => (
                  <TeacherCard key={teacher.id} teacher={teacher} />
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">👨‍🏫</div>
                  <h3>Aún no tienes profesores</h3>
                  <p>Agenda tu primera clase para comenzar</p>
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
        </div>
      </main>
    </div>
  );
};

export default MyTeachers;