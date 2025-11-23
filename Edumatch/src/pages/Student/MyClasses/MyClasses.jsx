import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import StudentProfileSidebar from '../../../components/Student/StudentProfileSidebar';
import ClassStats from '../../../components/Student/ClassStats';
import ClassCard from '../../../components/Student/ClassCard';
import './MyClasses.css'; // Asegúrate de que este archivo tenga el CSS del paso 1

const MyClasses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [currentUser, setCurrentUser] = useState(null);

  // Datos Mock (Iguales a tu imagen)
  const mockClasses = [
    {
      id: 1,
      teacherName: "Juan Pérez",
      subject: "Física",
      status: "Programada",
      date: "Viernes 25 Nov 2024",
      time: "16:00 - 17:30",
      duration: "1.5 hrs",
      modality: "En línea",
      price: "18.00"
    },
    {
      id: 2,
      teacherName: "María González",
      subject: "Matemáticas",
      status: "Programada",
      date: "Sábado 26 Nov 2024",
      time: "10:00 - 11:00",
      duration: "1 hr",
      modality: "Presencial",
      price: "12.00"
    },
    {
      id: 3,
      teacherName: "Carlos Ruiz",
      subject: "Cálculo",
      status: "Programada",
      date: "Lunes 28 Nov 2024",
      time: "14:00 - 16:00",
      duration: "2 hrs",
      modality: "En línea",
      price: "36.00"
    }
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) navigate('/login');
    else setCurrentUser(user);
  }, [navigate]);

  if (!currentUser) return null;

  return (
    <div className="em-student-layout">
      <StudentHeader currentUser={currentUser} />
      
      <div className="em-main-container">
        {/* Sidebar */}
        <div className="em-sidebar-wrapper">
          <StudentProfileSidebar />
        </div>

        {/* Tarjeta Blanca Principal */}
        <div className="em-content-card">
          <h2 className="em-page-title">Mis Clases</h2>
          
          {/* Estadísticas */}
          <ClassStats />

          {/* Tabs */}
          <div className="em-tabs">
            <button 
              className={`em-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Próximas (4)
            </button>
            <button 
              className={`em-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completadas (18)
            </button>
            <button 
              className={`em-tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
              onClick={() => setActiveTab('cancelled')}
            >
              Canceladas (2)
            </button>
          </div>

          {/* Lista de Clases */}
          <div>
            {mockClasses.map(item => (
              <ClassCard key={item.id} classItem={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;