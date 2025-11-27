import React, { useState } from 'react';
import ClassDetailsModal from '../../../components/Professor/ClassDetailsModal';
import './TeachingHistory.css';

function TeachingHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Todas las materias');
  const [selectedStatus, setSelectedStatus] = useState('Todos los estados');
  const [selectedPeriod, setSelectedPeriod] = useState('Último mes');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Datos de ejemplo
  const allClassesHistory = [
    {
      id: 1,
      student: { name: 'Sofía Fernández', email: 'sofia.f@email.com', avatar: 'SF' },
      subject: 'Matemáticas',
      date: '15 Nov 2024',
      time: '18:00 - 19:30',
      modality: 'En línea',
      duration: '1.5 hrs',
      cost: '$18.00',
      status: 'Completada'
    },
    {
      id: 2,
      student: { name: 'Diego Torres', email: 'diego.t@email.com', avatar: 'DT' },
      subject: 'Física',
      date: '14 Nov 2024',
      time: '09:00 - 11:00',
      modality: 'Presencial',
      duration: '2 hrs',
      cost: '$30.00',
      status: 'Completada'
    },
    {
      id: 3,
      student: { name: 'Valentina Parra', email: 'valen.p@email.com', avatar: 'VP' },
      subject: 'Cálculo',
      date: '13 Nov 2024',
      time: '14:00 - 15:00',
      modality: 'En línea',
      duration: '1 hr',
      cost: '$18.00',
      status: 'Completada'
    },
    {
      id: 4,
      student: { name: 'Javier Ramos', email: 'javier.r@email.com', avatar: 'JR' },
      subject: 'Matemáticas',
      date: '25 Nov 2024',
      time: '16:00 - 17:30',
      modality: 'En línea',
      duration: '1.5 hrs',
      cost: '$18.00',
      status: 'Programada'
    },
    {
      id: 5,
      student: { name: 'Ana López', email: 'ana.l@email.com', avatar: 'AL' },
      subject: 'Física',
      date: '10 Nov 2024',
      time: '10:00 - 11:00',
      modality: 'En línea',
      duration: '1 hr',
      cost: '$15.00',
      status: 'Cancelada'
    }
  ];

  // Lógica de filtrado
  const filteredClasses = allClassesHistory.filter(classItem => {
    // Filtrar por búsqueda de estudiante
    const matchesSearch = searchTerm === '' || 
      classItem.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.student.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtrar por materia
    const matchesSubject = selectedSubject === 'Todas las materias' || 
      classItem.subject === selectedSubject;

    // Filtrar por estado
    const matchesStatus = selectedStatus === 'Todos los estados' || 
      classItem.status === selectedStatus;

    return matchesSearch && matchesSubject && matchesStatus;
  });

  // Paginación
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClasses = filteredClasses.slice(startIndex, endIndex);

  // Reset página cuando cambian los filtros
  const handleFilterChange = (filterSetter, value) => {
    filterSetter(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (classData) => {
    setSelectedClass(classData);
    setIsModalOpen(true);
  };

  return (
    <div className="prof-teaching-history-container">
      <div className="prof-history-header">
        <h2 className="prof-page-title">Mi Historial de Enseñanza</h2>
        <p className="prof-page-subtitle">
          Mostrando {filteredClasses.length} de {allClassesHistory.length} clases
        </p>
      </div>

      {/* Stats Cards */}
      <div className="th-stats-grid">
        <div className="th-stat-card">
          <div className="th-stat-icon">📚</div>
          <div className="th-stat-value">{allClassesHistory.length}</div>
          <div className="th-stat-label">Clases Totales</div>
        </div>

        <div className="th-stat-card">
          <div className="th-stat-icon">✅</div>
          <div className="th-stat-value">
            {allClassesHistory.filter(c => c.status === 'Completada').length}
          </div>
          <div className="th-stat-label">Completadas</div>
        </div>

        <div className="th-stat-card">
          <div className="th-stat-icon">👥</div>
          <div className="th-stat-value">
            {new Set(allClassesHistory.map(c => c.student.name)).size}
          </div>
          <div className="th-stat-label">Estudiantes</div>
        </div>

        <div className="th-stat-card">
          <div className="th-stat-icon">⏱️</div>
          <div className="th-stat-value">189</div>
          <div className="th-stat-label">Horas Enseñadas</div>
        </div>

        <div className="th-stat-card">
          <div className="th-stat-icon">💰</div>
          <div className="th-stat-value">$2,835</div>
          <div className="th-stat-label">Ingresos</div>
        </div>
      </div>

      {/* Filters */}
      <div className="th-filters">
        <div className="th-filter-item">
          <label className="th-filter-label">Buscar Estudiante</label>
          <input
            type="text"
            className="th-filter-input"
            placeholder="Nombre del estudiante..."
            value={searchTerm}
            onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
          />
        </div>

        <div className="th-filter-item">
          <label className="th-filter-label">Materia</label>
          <select
            className="th-filter-select"
            value={selectedSubject}
            onChange={(e) => handleFilterChange(setSelectedSubject, e.target.value)}
          >
            <option>Todas las materias</option>
            <option>Matemáticas</option>
            <option>Física</option>
            <option>Cálculo</option>
          </select>
        </div>

        <div className="th-filter-item">
          <label className="th-filter-label">Estado</label>
          <select
            className="th-filter-select"
            value={selectedStatus}
            onChange={(e) => handleFilterChange(setSelectedStatus, e.target.value)}
          >
            <option>Todos los estados</option>
            <option>Completada</option>
            <option>Cancelada</option>
            <option>Programada</option>
          </select>
        </div>

        <div className="th-filter-item">
          <label className="th-filter-label">Periodo</label>
          <select
            className="th-filter-select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option>Último mes</option>
            <option>Últimos 3 meses</option>
            <option>Últimos 6 meses</option>
            <option>Este año</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="th-table-container">
        {currentClasses.length > 0 ? (
          <table className="th-table">
            <thead className="th-table-head">
              <tr>
                <th>Estudiante</th>
                <th>Materia</th>
                <th>Fecha y Hora</th>
                <th>Modalidad</th>
                <th>Duración</th>
                <th>Costo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="th-table-body">
              {currentClasses.map((classItem) => (
                <tr key={classItem.id} className="th-table-row">
                  <td className="th-cell-student">
                    <div className="th-student-info">
                      <div className="th-student-avatar">{classItem.student.avatar}</div>
                      <div className="th-student-details">
                        <div className="th-student-name">{classItem.student.name}</div>
                        <div className="th-student-email">{classItem.student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="th-subject-badge">{classItem.subject}</span>
                  </td>
                  <td>
                    <div className="th-date-time">
                      <div className="th-date">{classItem.date}</div>
                      <div className="th-time">{classItem.time}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`th-modality-badge ${classItem.modality === 'En línea' ? 'online' : 'presencial'}`}>
                      {classItem.modality === 'En línea' ? '🌐' : '🏫'} {classItem.modality}
                    </span>
                  </td>
                  <td className="th-duration">{classItem.duration}</td>
                  <td className="th-cost">{classItem.cost}</td>
                  <td>
                    <span className={`th-status-badge ${
                      classItem.status === 'Completada' ? 'completed' : 
                      classItem.status === 'Programada' ? 'scheduled' : 'cancelled'
                    }`}>
                      {classItem.status === 'Completada' ? '✓' : 
                       classItem.status === 'Programada' ? '⏳' : '✕'} {classItem.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="th-btn-action"
                      onClick={() => handleViewDetails(classItem)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="th-empty-state">
            <p>No se encontraron clases con los filtros seleccionados</p>
            <button 
              className="th-btn-clear-filters"
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('Todas las materias');
                setSelectedStatus('Todos los estados');
                setCurrentPage(1);
              }}
            >
              Limpiar Filtros
            </button>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {filteredClasses.length > 0 && (
        <div className="th-pagination">
          <button 
            className="th-pagination-btn" 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>
          
          <div className="th-pagination-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button 
                key={index + 1}
                className={`th-pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button 
            className="th-pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* FINANCIAL SUMMARY */}
      <div className="th-financial-summary">
        <div className="th-financial-header">
          <span className="th-financial-icon">💰</span>
          <h3 className="th-financial-title">Resumen Financiero del Mes</h3>
        </div>
        
        <div className="th-financial-content">
          <div className="th-financial-item">
            <div className="th-financial-label">Ingresos de Noviembre</div>
            <div className="th-financial-value income">$468.50</div>
          </div>

          <div className="th-financial-item">
            <div className="th-financial-label">Clases este Mes</div>
            <div className="th-financial-value classes">28 clases</div>
          </div>

          <div className="th-financial-item">
            <div className="th-financial-label">Promedio por Clase</div>
            <div className="th-financial-value average">$16.73</div>
          </div>
        </div>
      </div>

      <ClassDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
      />
    </div>
  );
}

export default TeachingHistory;