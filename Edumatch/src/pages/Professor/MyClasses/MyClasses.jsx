import React, { useState } from 'react';
import ClassCard from '../../../components/Professor/ClassCard';
import ClassFormModal from '../../../components/Professor/ClassFormModal';
import ClassRequestsModal from '../../../components/Professor/ClassRequestsModal';
import './MyClasses.css';

const MyClasses = () => {
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

  // Solicitudes de estudiantes
  const [classRequests] = useState([
    {
      id: 1,
      student: {
        name: "Ana López",
        avatar: "AL",
        rating: 4.9,
        classesCount: 15
      },
      subject: "Cálculo Diferencial",
      topic: "Derivadas y límites",
      preferredDate: "2024-12-05",
      preferredTime: "16:00",
      duration: "60",
      budget: "$8",
      message: "Necesito ayuda urgente para preparar mi examen final de cálculo. Específicamente con derivadas parciales y límites.",
      requestDate: "Hace 2 horas",
      status: "pending"
    },
    {
      id: 2,
      student: {
        name: "Diego Vargas",
        avatar: "DV",
        rating: 4.7,
        classesCount: 8
      },
      subject: "Física",
      topic: "Mecánica clásica",
      preferredDate: "2024-12-06",
      preferredTime: "10:00",
      duration: "90",
      budget: "$10",
      message: "Estoy preparando mi examen de física y necesito reforzar conceptos de fuerzas y movimiento.",
      requestDate: "Hace 5 horas",
      status: "pending"
    },
    {
      id: 3,
      student: {
        name: "Sofía Martínez",
        avatar: "SM",
        rating: 5.0,
        classesCount: 22
      },
      subject: "Matemáticas",
      topic: "Álgebra lineal",
      preferredDate: "2024-12-07",
      preferredTime: "14:00",
      duration: "60",
      budget: "$6",
      message: "Necesito ayuda con matrices y sistemas de ecuaciones lineales para mi curso universitario.",
      requestDate: "Hace 1 día",
      status: "pending"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [filter, setFilter] = useState('all');

  // Crear nueva clase
  const handleCreateClass = () => {
    setEditingClass(null);
    setIsModalOpen(true);
  };

  // Ver solicitudes
  const handleViewRequests = () => {
    setIsRequestsModalOpen(true);
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

  // Aceptar solicitud
  const handleAcceptRequest = (request) => {
    // Crear nueva clase desde la solicitud
    const newClass = {
      id: Date.now(),
      title: request.topic,
      subject: request.subject,
      studentName: request.student.name,
      date: request.preferredDate,
      time: request.preferredTime,
      duration: request.duration,
      price: request.budget,
      status: "active",
      description: request.message
    };
    setClasses(prev => [...prev, newClass]);
    setIsRequestsModalOpen(false);
    alert(`¡Solicitud aceptada! Se ha creado la clase con ${request.student.name}`);
  };

  // Rechazar solicitud
  const handleRejectRequest = (requestId) => {
    alert(`Solicitud rechazada. Se notificará al estudiante.`);
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

  // Contar solicitudes pendientes
  const pendingRequestsCount = classRequests.filter(r => r.status === 'pending').length;

  return (
    <div className="prof-classes-container">
      <div className="prof-classes-header">
        <div>
          <h2 className="prof-page-title">Mis Clases</h2>
          <p className="prof-page-subtitle">Gestiona tus clases programadas</p>
        </div>
        <div className="prof-header-actions">
          <button className="prof-btn-requests" onClick={handleViewRequests}>
            <span className="prof-requests-icon">📬</span>
            <span>Solicitudes</span>
            {pendingRequestsCount > 0 && (
              <span className="prof-requests-badge">{pendingRequestsCount}</span>
            )}
          </button>
          <button className="prof-btn-create" onClick={handleCreateClass}>
            + Nueva Clase
          </button>
        </div>
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
            <button className="prof-btn-create" onClick={handleCreateClass}>
              Crear mi primera clase
            </button>
          </div>
        )}
      </div>

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

      {/* Modal de Solicitudes */}
      <ClassRequestsModal
        isOpen={isRequestsModalOpen}
        onClose={() => setIsRequestsModalOpen(false)}
        requests={classRequests}
        onAccept={handleAcceptRequest}
        onReject={handleRejectRequest}
      />
    </div>
  );
};

export default MyClasses;