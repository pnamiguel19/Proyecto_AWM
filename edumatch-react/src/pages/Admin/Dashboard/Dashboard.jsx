import React from 'react';
import Header from '../../../components/layout/Header';
import Sidebar from '../../../components/layout/Sidebar';
import { StatsCard } from '../../../components/common/Card';
import './Dashboard.css';

const Dashboard = () => {
  const statsData = [
    { title: 'Usuarios Totales', value: '1,247', icon: '👥', trend: '↑ +12.5% este mes', bgColor: 'blue' },
    { title: 'Profesores Activos', value: '389', icon: '👨‍🏫', trend: '↑ +8.3% este mes', bgColor: 'yellow' },
    { title: 'Clases Realizadas', value: '2,456', icon: '📚', trend: '↑ +15.7% este mes', bgColor: 'green' },
    { title: 'Ingresos del Mes', value: '$8,945', icon: '💰', trend: '↑ +23.1% este mes', bgColor: 'red' }
  ];

  const recentProfessors = [
    { name: 'María González', subject: 'Matemáticas', status: 'Activo', rating: 4.8 },
    { name: 'Carlos Ramírez', subject: 'Física', status: 'Pendiente', rating: 4.5 },
    { name: 'Ana Martínez', subject: 'Química', status: 'Activo', rating: 4.9 },
    { name: 'Luis Torres', subject: 'Inglés', status: 'Inactivo', rating: 4.3 },
    { name: 'Patricia López', subject: 'Historia', status: 'Activo', rating: 4.7 }
  ];

  const recentActivities = [
    { icon: '👤', text: 'Nuevo usuario registrado', time: 'Hace 5 minutos' },
    { icon: '✓', text: 'Profesor verificado', time: 'Hace 15 minutos' },
    { icon: '💰', text: 'Nueva transacción: $45', time: 'Hace 32 minutos' },
    { icon: '📚', text: 'Contenido publicado', time: 'Hace 1 hora' },
    { icon: '⭐', text: 'Nueva reseña recibida', time: 'Hace 2 horas' },
    { icon: '📅', text: 'Clase agendada', time: 'Hace 3 horas' }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Activo':
        return 'status-badge status-badge--active';
      case 'Pendiente':
        return 'status-badge status-badge--pending';
      case 'Inactivo':
        return 'status-badge status-badge--inactive';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="admin-layout">
      <Header />
      <Sidebar />
      
      <main className="admin-content">
        <div className="dashboard">
          <div className="dashboard__header">
            <div>
              <h1 className="dashboard__title">Dashboard</h1>
              <p className="dashboard__subtitle">Resumen general de la plataforma EduMatch</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                bgColor={stat.bgColor}
              />
            ))}
          </div>

          {/* Content Grid */}
          <div className="content-grid">
            {/* Recent Professors */}
            <div className="dashboard-card">
              <div className="dashboard-card__header">
                <h2 className="dashboard-card__title">Profesores Recientes</h2>
                <a href="#" className="dashboard-card__link">Ver todos →</a>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>NOMBRE</th>
                      <th>MATERIA</th>
                      <th>ESTADO</th>
                      <th>CALIFICACIÓN</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProfessors.map((prof, index) => (
                      <tr key={index}>
                        <td>{prof.name}</td>
                        <td>{prof.subject}</td>
                        <td>
                          <span className={getStatusClass(prof.status)}>
                            {prof.status}
                          </span>
                        </td>
                        <td>
                          <span className="rating">⭐ {prof.rating}</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn action-btn--view" title="Ver">👁️</button>
                            <button className="action-btn action-btn--edit" title="Editar">✏️</button>
                            <button className="action-btn action-btn--delete" title="Eliminar">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-card">
              <div className="dashboard-card__header">
                <h2 className="dashboard-card__title">Actividad Reciente</h2>
                <a href="#" className="dashboard-card__link">Ver todo →</a>
              </div>
              <div className="activity-list">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <p className="activity-text">{activity.text}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;