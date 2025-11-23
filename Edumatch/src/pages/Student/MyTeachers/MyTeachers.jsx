import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import StudentProfileSidebar from '../../../components/Student/StudentProfileSidebar';
import TeacherStats from '../../../components/Student/TeacherStats';
import TeacherCard from '../../../components/Student/TeacherCard';
import './MyTeachers.css';

const MyTeachers = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) navigate('/login');
    else setCurrentUser(user);
  }, [navigate]);

  // DATOS MOCK EXACTOS DE LA IMAGEN
  const mockTeachers = [
    {
      id: 1,
      name: "Juan Pérez",
      avatar: "https://i.pravatar.cc/150?img=11",
      subjects: ["Física", "Matemáticas"],
      rating: 4.9,
      reviewCount: 45,
      classesTogether: 8,
      totalHours: "12h",
      lastClass: "20 Nov 2024 - Física"
    },
    {
      id: 2,
      name: "María González",
      avatar: "https://i.pravatar.cc/150?img=5",
      subjects: ["Matemáticas"],
      rating: 4.8,
      reviewCount: 32,
      classesTogether: 5,
      totalHours: "6h",
      lastClass: "18 Nov 2024 - Matemáticas"
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      avatar: "https://i.pravatar.cc/150?img=3",
      subjects: ["Cálculo", "Álgebra"],
      rating: 4.6,
      reviewCount: 28,
      classesTogether: 4,
      totalHours: "8h",
      lastClass: "15 Nov 2024 - Cálculo"
    },
    {
      id: 4,
      name: "Ana Silva",
      avatar: "https://i.pravatar.cc/150?img=9",
      subjects: ["Física", "Química"],
      rating: 5.0,
      reviewCount: 18,
      classesTogether: 3,
      totalHours: "4.5h",
      lastClass: "10 Nov 2024 - Física"
    },
    {
      id: 5,
      name: "Luis Moreno",
      avatar: "https://i.pravatar.cc/150?img=12",
      subjects: ["Matemáticas", "Estadística"],
      rating: 4.5,
      reviewCount: 22,
      classesTogether: 2,
      totalHours: "2h",
      lastClass: "08 Nov 2024 - Matemáticas"
    },
    {
      id: 6,
      name: "Sofía Fernández",
      avatar: "https://i.pravatar.cc/150?img=24",
      subjects: ["Inglés", "Literatura"],
      rating: 4.7,
      reviewCount: 35,
      classesTogether: 2,
      totalHours: "3h",
      lastClass: "05 Nov 2024 - Inglés"
    }
  ];

  if (!currentUser) return null;

  return (
    <div className="em-student-layout">
      <StudentHeader currentUser={currentUser} />
      
      <div className="em-main-container">
        {/* Sidebar */}
        <div className="em-sidebar-wrapper">
          <StudentProfileSidebar />
        </div>

        {/* Contenido Principal */}
        <div className="em-content-card">
          <h2 className="em-page-title">Mis Profesores</h2>
          
          <TeacherStats />

          <div className="em-teachers-grid">
            {mockTeachers.map(teacher => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeachers;