import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import StudentProfileSidebar from '../../../components/Student/StudentProfileSidebar';
import StudentPersonalInfo from '../../../components/Student/StudentPersonalInfo';
import './ProfileStudent.css';

const ProfileStudent = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Intentamos obtener el usuario logueado
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    // Si existe, lo guardamos en el estado
    if (user) {
      setCurrentUser(user);
    } else {
      // Si no hay usuario (modo desarrollo), creamos uno falso para que veas el diseño
      setCurrentUser({
        name: "Maria Gonzales",
        avatar: "https://via.placeholder.com/150"
      });
    }
  }, [navigate]);

  return (
    <div className="student-layout">
      {/* 1. Header Superior */}
      <StudentHeader currentUser={currentUser} />

      <main className="student-main-container">
        <div className="student-content-grid">
          
          {/* 2. Columna Izquierda: Sidebar (Menú) */}
          <aside className="sidebar-column">
            <StudentProfileSidebar />
          </aside>

          {/* 3. Columna Derecha: Contenido (Tarjeta Blanca con Datos) */}
          <section className="content-column">
            <StudentPersonalInfo user={currentUser} />
          </section>

        </div>
      </main>
    </div>
  );
};

export default ProfileStudent;