import React, { useState } from 'react';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import ProfileSidebar from '../../../components/Professor/ProfileSidebar';
import CourseCard from '../../../components/Professor/CourseCard';
import CourseFormModal from '../../../components/Professor/CourseFormModal';
import CourseViewModal from '../../../components/Professor/CourseViewModal';
import './MyCourses.css';

const MyCourses = () => {
  const [currentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {
    name: "Juan Pérez",
    role: "professor"
  });

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

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setIsFormModalOpen(true);
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

  return (
    <div className="professor-layout">
      <StudentHeader currentUser={currentUser} />

      <main className="professor-main-container">
        <div className="professor-content-grid">
          
          <aside className="prof-sidebar-column">
            <ProfileSidebar />
          </aside>

          <section className="prof-content-column">
            <div className="prof-courses-header">
              <div>
                <h2 className="prof-page-title">Mis Cursos</h2>
                <p className="prof-page-subtitle">Crea y gestiona tus cursos educativos</p>
              </div>
              <button className="prof-btn-create" onClick={handleCreateCourse}>
                + Nuevo Curso
              </button>
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
          </section>

        </div>
      </main>

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
    </div>
  );
};

export default MyCourses;