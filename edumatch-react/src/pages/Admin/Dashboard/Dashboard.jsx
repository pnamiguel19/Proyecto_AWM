import React, { useState, useEffect } from 'react';
import Header from '../../../components/layout/Header';
import Sidebar from '../../../components/layout/Sidebar';
import { StatsCard } from '../../../components/common/Card';
import { adminService, professorService } from '../../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, professorsData] = await Promise.all([
        adminService.getStats(),
        professorService.getAll()
      ]);
      
      setStats(statsData.data);
      setProfessors(professorsData.data.slice(0, 5)); // Solo los primeros 5
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setLoading(false);
    }
  };

  const statsData = stats ? [
    { title: 'Usuarios Totales', value: stats.totalUsers || 0, icon: '👥', trend: 'Total en plataforma', bgColor: 'blue' },
    { title: 'Profesores Activos', value: stats.totalProfessors || 0, icon: '👨‍🏫', trend: `${stats.pendingProfessors || 0} pendientes`, bgColor: 'yellow' },
    { title: 'Estudiantes', value: stats.totalStudents || 0, icon: '📚', trend: 'Total registrados', bgColor: 'green' },
    { title: 'Administradores', value: stats.totalAdmins || 0, icon: '💼', trend: 'Activos', bgColor: 'red' }
  ] : [];

  const mapApprovalStatus = (status) => {
    const mapping = {
      'approved': 'Activo',
      'pending': 'Pendiente',
      'rejected': 'Rechazado'
    };
    return mapping[status] || status;
  };

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

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Cargando...</div>
          ) : (
            <>
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
                          <th>EMAIL</th>
                          <th>ESTADO</th>
                          <th>ACCIONES</th>
                        </tr>
                      </thead>
                      <tbody>
                        {professors.map((prof) => (
                          <tr key={prof._id}>
                            <td>{prof.firstName} {prof.lastName}</td>
                            <td>{prof.email}</td>
                            <td>
                              <span className={getStatusClass(mapApprovalStatus(prof.approvalStatus))}>
                                {mapApprovalStatus(prof.approvalStatus)}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="action-btn action-btn--view" title="Ver">👁️</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;