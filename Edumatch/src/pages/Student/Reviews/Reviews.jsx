import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import StudentProfileSidebar from '../../../components/Student/StudentProfileSidebar';
import ReviewSummary from '../../../components/Student/ReviewSummary';
import ReviewStats from '../../../components/Student/ReviewStats';
import ReviewCard from '../../../components/Student/ReviewCard';
import './Reviews.css';

const Reviews = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) navigate('/login');
    else setCurrentUser(user);
  }, [navigate]);

  // DATOS MOCK
  const mockReviews = [
    {
      id: 1,
      teacherName: "Juan Pérez",
      teacherAvatar: "https://i.pravatar.cc/150?img=11", // URL real de avatar
      subject: "Física",
      rating: 5.0,
      date: "20 Nov 2024",
      comment: "Excelente profesor! Juan tiene una manera muy clara de explicar conceptos complejos. Me ayudó muchísimo con mi examen de física y logré una excelente calificación. Es muy paciente y se asegura de que entiendas todo antes de avanzar.",
      response: "¡Muchas gracias por tu comentario! Fue un placer trabajar contigo. Me alegra mucho que hayas logrado tus objetivos. ¡Sigue así!"
    },
    {
      id: 2,
      teacherName: "María González",
      teacherAvatar: "https://i.pravatar.cc/150?img=5",
      subject: "Matemáticas",
      rating: 5.0,
      date: "18 Nov 2024",
      comment: "María es una excelente profesora de matemáticas. Sus explicaciones son muy claras y siempre tiene paciencia para resolver todas mis dudas. Las clases son dinámicas y aprendo mucho en cada sesión.",
      response: "¡Gracias por tus palabras! Es un gusto trabajar contigo. Tu dedicación y esfuerzo hacen que las clases sean muy productivas. ¡Sigue adelante!"
    },
    {
      id: 3,
      teacherName: "Carlos Ruiz",
      teacherAvatar: "", // Sin avatar para probar las iniciales
      subject: "Cálculo",
      rating: 4.0,
      date: "15 Nov 2024",
      comment: "Buen profesor, explica bien los conceptos de cálculo. A veces la conexión de internet no fue la mejor, pero en general fue una buena experiencia de aprendizaje.",
      response: null
    },
    {
      id: 4,
      teacherName: "Ana Silva",
      teacherAvatar: "https://i.pravatar.cc/150?img=9",
      subject: "Física",
      rating: 5.0,
      date: "10 Nov 2024",
      comment: "Ana es una profesora excepcional. Su conocimiento de la física es impresionante y sabe cómo transmitirlo de manera comprensible.",
      response: "¡Muchas gracias por tu reseña! Me alegra mucho saber que las clases te han sido útiles."
    },
    {
      id: 5,
      teacherName: "Luis Moreno",
      teacherAvatar: "https://i.pravatar.cc/150?img=12",
      subject: "Matemáticas",
      rating: 5.0,
      date: "08 Nov 2024",
      comment: "Luis es muy profesional y puntual. Sus métodos de enseñanza son efectivos y hace que las matemáticas sean más fáciles de entender.",
      response: null
    }
  ];

  if (!currentUser) return null;

  return (
    <div className="em-reviews-page">
      <StudentHeader currentUser={currentUser} />
      
      <main className="em-main-container">
        {/* Sidebar */}
        <aside className="em-sidebar-wrapper">
          <StudentProfileSidebar />
        </aside>

        {/* Contenido Principal */}
        <section className="em-content-area">
          <div className="em-profile-card">
            <div className="em-card-header">
              <h2 className="em-card-title">Mis Reseñas</h2>
            </div>

            {/* 1. Resumen de Barras */}
            <ReviewSummary />

            {/* 2. Tarjetas de Estadísticas */}
            <ReviewStats />

            {/* 3. Filtros */}
            <div className="em-filters-section">
              <select className="em-filter-select">
                <option>Todas las calificaciones</option>
                <option>5 estrellas</option>
                <option>4 estrellas</option>
              </select>
              <select className="em-filter-select">
                <option>Todos los profesores</option>
                <option>Juan Pérez</option>
                <option>María González</option>
              </select>
            </div>

            {/* 4. Lista de Reseñas */}
            <div className="em-reviews-list">
              {mockReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default Reviews;