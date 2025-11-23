import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../../components/common/Header/StudentHeader';
import ProfileSidebar from '../../../components/Professor/ProfileSidebar';
import ClassCard from '../../../components/Professor/ClassCard';
import ClassFormModal from '../../../components/Professor/ClassFormModal';
import './MyClasses.css';

const MyClasses = () => {
  const navigate = useNavigate();
  const [currentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {
    name: "Juan Pérez",
    role: "professor"
  });

  // Estado para las clases
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Introducción a la Física",
      subject: "Física",
      studentName: "María González",
      date: "2024-12-01",
      time: "10:00",
      duration: "60",
      price: "$5",
      status: "active",
      description: "Clase inicial sobre conceptos básicos"
    },
    {
      id: 2,
      title: "Álgebra Avanzada",
      subject: "Matemáticas",
      studentName: "Carlos Ruiz",
      date: "2024-12-02",
      time: "15:00",
      duration: "90",
      price: "$7",
      status: "active",
      description: ""
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [filter, setFilter] = useState('all');

  // Crear nueva clase
  const handleCreateClass = () => {
    setEditingClass(null);
    setIsModalOpen(true);
  };

  // Editar clase existente
  const handleEditClass = (classData) => {
    setEditingClass(classData);
    setIsModalOpen(true);
  };

  // Guardar clase (crear o editar)
  const handleSaveClass = (formData) => {
    if (editingClass) {
      // Editar
      setClasses(prev => prev.map(c => 
        c.id === editingClass.id ? { ...formData, id: c.id } : c
      ));
    } else {
      // Crear nueva
      const newClass = {
        ...formData,
        id: Date.now()
      };
      setClasses(prev => [...prev, newClass]);
    }
    setIsModalOpen(false);
    setEditingClass(null);
  };

  // Ver detalles (placeholder)
  const handleViewDetails = (classData) => {
    alert(`Ver detalles de: ${classData.title}`);
    // Aquí puedes navegar a una página de detalles
  };

  // Filtrar clases
  const filteredClasses = classes.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  return (
    <div className="professor-layout">
      <StudentHeader currentUser={currentUser} />

      <main className="professor-main-container">
        <div className="professor-content-grid">
          
          <aside className="prof-sidebar-column">
            <ProfileSidebar />
          </aside>

          <section className="prof-content-column">
            <div className="prof-classes-header">
              <div>
                <h2 className="prof-page-title">Mis Clases</h2>
                <p className="prof-page-subtitle">Gestiona tus clases programadas</p>
              </div>
              <button className="prof-btn-create" onClick={handleCreateClass}>
                + Nueva Clase
              </button>
            </div>

            {/* Filtros */}
            <div className="prof-filters">
              <button 
                className={`prof-filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Todas ({classes.length})
              </button>
              <button 
                className={`prof-filter-btn ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Activas ({classes.filter(c => c.status === 'active').length})
              </button>
              <button 
                className={`prof-filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completadas ({classes.filter(c => c.status === 'completed').length})
              </button>
            </div>

            {/* Grid de Clases */}
            <div className="prof-classes-grid">
              {filteredClasses.length > 0 ? (
                filteredClasses.map(classData => (
                  <ClassCard
                    key={classData.id}
                    classData={classData}
                    onEdit={handleEditClass}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="prof-empty-state">
                  <p>No hay clases en esta categoría</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </main>

      {/* Modal de Formulario */}
      <ClassFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingClass(null);
        }}
        classData={editingClass}
        onSave={handleSaveClass}
      />
    </div>
  );
};

export default MyClasses;