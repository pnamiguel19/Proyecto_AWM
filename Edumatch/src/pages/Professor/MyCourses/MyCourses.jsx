import React, { useState } from 'react';
import CourseCard from '../../../components/Professor/CourseCard';
import CourseFormModal from '../../../components/Professor/CourseFormModal';
import CourseViewModal from '../../../components/Professor/CourseViewModal';
import CourseRequestsModal from '../../../components/Professor/CourseRequestsModal';
import './MyCourses.css';

const MyCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Curso Completo de Física",
      description: "Aprende los fundamentos de la física desde cero hasta nivel avanzado",
      category: "Física",
      level: "Intermedio",
      price: "$45",
      image: "",
      published: true,
      modulesCount: 8,
      studentsCount: 125,
      rating: "4.8"
    },
    {
      id: 2,
      title: "Matemáticas para Bachillerato",
      description: "Domina las matemáticas necesarias para aprobar el bachillerato",
      category: "Matemáticas",
      level: "Básico",
      price: "$35",
      image: "",
      published: false,
      modulesCount: 5,
      studentsCount: 0,
      rating: null
    }
  ]);

  // Solicitudes de cursos de estudiantes
  const [courseRequests] = useState([
    {
      id: 1,
      student: {
        name: "Laura Méndez",
        avatar: "LM",
        rating: 4.9,
        coursesCount: 8
      },
      topic: "Cálculo Integral Avanzado",
      category: "Matemáticas",
      level: "Avanzado",
      description: "Necesito un curso completo que cubra integrales definidas e indefinidas, aplicaciones de integración, y técnicas avanzadas. Me gustaría que incluya ejercicios prácticos y aplicaciones en física.",
      suggestedModules: [
        "Fundamentos de integración",
        "Integrales definidas e indefinidas",
        "Técnicas de integración",
        "Aplicaciones en física y geometría",
        "Ejercicios y problemas resueltos"
      ],
      budget: "$60-$80",
      studentsInterested: 15,
      requestDate: "Hace 1 día",
      status: "pending"
    },
    {
      id: 2,
      student: {
        name: "Roberto Sánchez",
        avatar: "RS",
        rating: 5.0,
        coursesCount: 12
      },
      topic: "Programación en Python desde Cero",
      category: "Programación",
      level: "Básico",
      description: "Busco un curso estructurado de Python que me lleve desde lo básico hasta poder hacer proyectos reales. Quiero aprender sintaxis, estructuras de datos, POO y aplicaciones prácticas.",
      suggestedModules: [
        "Introducción a Python",
        "Variables y tipos de datos",
        "Estructuras de control",
        "Funciones y módulos",
        "POO en Python",
        "Proyecto final"
      ],
      budget: "$50-$70",
      studentsInterested: 28,
      requestDate: "Hace 2 días",
      status: "pending"
    },
    {
      id: 3,
      student: {
        name: "Andrea Torres",
        avatar: "AT",
        rating: 4.7,
        coursesCount: 6
      },
      topic: "Química Orgánica para Medicina",
      category: "Química",
      level: "Intermedio",
      description: "Como estudiante de medicina, necesito un curso enfocado en química orgánica con énfasis en compuestos biológicos, reacciones importantes en el cuerpo humano y aplicaciones médicas.",
      suggestedModules: [
        "Introducción a química orgánica",
        "Hidrocarburos y grupos funcionales",
        "Compuestos biológicos",
        "Reacciones orgánicas básicas",
        "Aplicaciones en medicina"
      ],
      budget: "$55-$75",
      studentsInterested: 10,
      requestDate: "Hace 3 días",
      status: "pending"
    },
    {
      id: 4,
      student: {
        name: "Miguel Ángel Ruiz",
        avatar: "MR",
        rating: 4.8,
        coursesCount: 15
      },
      topic: "Estadística Aplicada con R",
      category: "Estadística",
      level: "Intermedio",
      description: "Necesito aprender estadística aplicada usando el lenguaje R. Busco un curso que cubra desde lo básico hasta análisis de datos reales, visualizaciones y pruebas estadísticas.",
      suggestedModules: [
        "Introducción a R",
        "Estadística descriptiva",
        "Probabilidad",
        "Distribuciones",
        "Pruebas de hipótesis",
        "Análisis de regresión",
        "Visualización de datos"
      ],
      budget: "$65-$85",
      studentsInterested: 22,
      requestDate: "Hace 4 días",
      status: "pending"
    }
  ]);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setIsFormModalOpen(true);
  };

  const handleViewRequests = () => {
    setIsRequestsModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsFormModalOpen(true);
  };

  const handleViewCourse = (course) => {
    setViewingCourse(course);
    setIsViewModalOpen(true);
  };

  const handleDeleteCourse = (course) => {
    if (window.confirm(`¿Estás seguro de eliminar "${course.title}"?`)) {
      setCourses(prev => prev.filter(c => c.id !== course.id));
    }
  };

  const handleSaveCourse = (formData) => {
    if (editingCourse) {
      setCourses(prev => prev.map(c => 
        c.id === editingCourse.id ? { ...formData, id: c.id, modulesCount: c.modulesCount, studentsCount: c.studentsCount, rating: c.rating } : c
      ));
    } else {
      const newCourse = {
        ...formData,
        id: Date.now(),
        modulesCount: 0,
        studentsCount: 0,
        rating: null
      };
      setCourses(prev => [...prev, newCourse]);
    }
    setIsFormModalOpen(false);
    setEditingCourse(null);
  };

  // Aceptar solicitud de curso
  const handleAcceptRequest = (request) => {
    const newCourse = {
      id: Date.now(),
      title: request.topic,
      description: request.description,
      category: request.category,
      level: request.level,
      price: request.budget.split('-')[1].trim(), // Toma el precio máximo
      image: "",
      published: false,
      modulesCount: request.suggestedModules.length,
      studentsCount: request.studentsInterested,
      rating: null
    };
    setCourses(prev => [...prev, newCourse]);
    setIsRequestsModalOpen(false);
    alert(`¡Solicitud aceptada! Se ha creado el borrador del curso "${request.topic}"`);
  };

  // Rechazar solicitud
  const handleRejectRequest = (requestId) => {
    alert(`Solicitud rechazada. Se notificará al estudiante.`);
  };

  // Contar solicitudes pendientes
  const pendingRequestsCount = courseRequests.filter(r => r.status === 'pending').length;

  return (
    <div className="prof-courses-container">
      <div className="prof-courses-header">
        <div>
          <h2 className="prof-page-title">Mis Cursos</h2>
          <p className="prof-page-subtitle">Crea y gestiona tus cursos educativos</p>
        </div>
        <div className="prof-header-actions">
          <button className="prof-btn-requests" onClick={handleViewRequests}>
            <span className="prof-requests-icon">📚</span>
            <span>Solicitudes de Cursos</span>
            {pendingRequestsCount > 0 && (
              <span className="prof-requests-badge">{pendingRequestsCount}</span>
            )}
          </button>
          <button className="prof-btn-create" onClick={handleCreateCourse}>
            + Nuevo Curso
          </button>
        </div>
      </div>

      <div className="prof-courses-grid">
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEditCourse}
              onView={handleViewCourse}
              onDelete={handleDeleteCourse}
            />
          ))
        ) : (
          <div className="prof-empty-state">
            <p>No tienes cursos creados aún</p>
            <button className="prof-btn-create" onClick={handleCreateCourse}>
              Crear mi primer curso
            </button>
          </div>
        )}
      </div>

      <CourseFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingCourse(null);
        }}
        courseData={editingCourse}
        onSave={handleSaveCourse}
      />

      <CourseViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingCourse(null);
        }}
        course={viewingCourse}
      />

      <CourseRequestsModal
        isOpen={isRequestsModalOpen}
        onClose={() => setIsRequestsModalOpen(false)}
        requests={courseRequests}
        onAccept={handleAcceptRequest}
        onReject={handleRejectRequest}
      />
    </div>
  );
};

export default MyCourses;