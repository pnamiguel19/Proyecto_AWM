import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, getAllProfessors } from '../../data/mockUsers';
import './AdminProfile.css';

function AdminProfile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProfessors: 0,
    totalStudents: 0,
    pendingApprovals: 0,
    totalEarnings: 0,
    monthlyEarnings: 0,
    totalClasses: 0,
    activeClasses: 0
  });
  const [users, setUsers] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    // Verificar que sea administrador
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    setCurrentUser(user);
    loadData();
  }, [navigate]);

  const loadData = () => {
    const allUsers = getAllUsers();
    const allProfessors = getAllProfessors();
    
    setUsers(allUsers);
    setProfessors(allProfessors);
    
    // Calcular estadísticas de ganancias
    const totalClasses = 245; // Simulado
    const activeClasses = 87; // Simulado
    const averageClassPrice = 25; // USD promedio por clase
    const platformCommission = 0.15; // 15% de comisión
    
    const totalRevenue = totalClasses * averageClassPrice;
    const totalEarnings = totalRevenue * platformCommission;
    
    const monthlyClasses = 68; // Simulado para el mes actual
    const monthlyRevenue = monthlyClasses * averageClassPrice;
    const monthlyEarnings = monthlyRevenue * platformCommission;
    
    setStats({
      totalUsers: allUsers.length,
      totalProfessors: allProfessors.length,
      totalStudents: allUsers.filter(u => u.role === 'student').length,
      pendingApprovals: allProfessors.filter(p => !p.isApproved).length,
      totalEarnings: totalEarnings.toFixed(2),
      monthlyEarnings: monthlyEarnings.toFixed(2),
      totalClasses: totalClasses,
      activeClasses: activeClasses
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getInitials = () => {
    if (!currentUser) return 'A';
    const first = currentUser.firstName || currentUser.name || 'Admin';
    return first[0].toUpperCase();
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProfessors = professors.filter(prof => 
    prof.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (prof.firstName + ' ' + prof.lastName).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="admin-container">
      {/* HEADER */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo" onClick={() => navigate('/')}>
            <span className="logo-icon">🎓</span>
            <span className="logo-text">EduMatch Admin</span>
          </div>

          <div className="admin-user-section">
            <div className="admin-welcome">
              <span className="welcome-text">Bienvenido,</span>
              <span className="welcome-name">{currentUser.firstName || 'Administrador'}</span>
            </div>

            <div className="user-menu-container">
              <button
                className="user-avatar-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar-placeholder admin-avatar">
                  {getInitials()}
                </div>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <p className="user-dropdown-name">
                      {currentUser.firstName || 'Administrador'}
                    </p>
                    <p className="user-dropdown-email">{currentUser.email}</p>
                    <span className="user-role-badge admin-badge">Administrador</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    🚪 Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* NAVEGACIÓN */}
      <nav className="admin-nav">
        <button 
          className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-text">Dashboard</span>
        </button>
        <button 
          className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <span className="nav-icon">👥</span>
          <span className="nav-text">Usuarios</span>
        </button>
        <button 
          className={`admin-nav-item ${activeTab === 'professors' ? 'active' : ''}`}
          onClick={() => setActiveTab('professors')}
        >
          <span className="nav-icon">👨‍🏫</span>
          <span className="nav-text">Profesores</span>
        </button>
        <button 
          className={`admin-nav-item ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <span className="nav-icon">⏳</span>
          <span className="nav-text">Pendientes</span>
          {stats.pendingApprovals > 0 && (
            <span className="nav-badge">{stats.pendingApprovals}</span>
          )}
        </button>
        <button 
          className={`admin-nav-item ${activeTab === 'earnings' ? 'active' : ''}`}
          onClick={() => setActiveTab('earnings')}
        >
          <span className="nav-icon">💰</span>
          <span className="nav-text">Ganancias</span>
        </button>
      </nav>

      {/* CONTENIDO */}
      <div className="admin-content">
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-section">
            <h2 className="section-title">📊 Panel de Control</h2>
            
            <div className="stats-grid">
              <div className="stat-card blue">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.totalUsers}</div>
                  <div className="stat-label">Total Usuarios</div>
                </div>
              </div>

              <div className="stat-card green">
                <div className="stat-icon">👨‍🏫</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.totalProfessors}</div>
                  <div className="stat-label">Profesores</div>
                </div>
              </div>

              <div className="stat-card purple">
                <div className="stat-icon">🎓</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.totalStudents}</div>
                  <div className="stat-label">Estudiantes</div>
                </div>
              </div>

              <div className="stat-card orange">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.pendingApprovals}</div>
                  <div className="stat-label">Pendientes Aprobación</div>
                </div>
              </div>

              <div className="stat-card money">
                <div className="stat-icon">💵</div>
                <div className="stat-content">
                  <div className="stat-value">${stats.monthlyEarnings}</div>
                  <div className="stat-label">Ganancias del Mes</div>
                </div>
              </div>

              <div className="stat-card success">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <div className="stat-value">${stats.totalEarnings}</div>
                  <div className="stat-label">Ganancias Totales</div>
                </div>
              </div>

              <div className="stat-card info">
                <div className="stat-icon">📚</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.totalClasses}</div>
                  <div className="stat-label">Total Clases</div>
                </div>
              </div>

              <div className="stat-card warning">
                <div className="stat-icon">🔔</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.activeClasses}</div>
                  <div className="stat-label">Clases Activas</div>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h3 className="subsection-title">Actividad Reciente</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">✅</span>
                  <span className="activity-text">Sistema funcionando correctamente</span>
                  <span className="activity-time">Ahora</span>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">💰</span>
                  <span className="activity-text">Ganancia del mes: ${stats.monthlyEarnings}</span>
                  <span className="activity-time">Hoy</span>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">👥</span>
                  <span className="activity-text">{stats.totalUsers} usuarios registrados</span>
                  <span className="activity-time">Hoy</span>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">👨‍🏫</span>
                  <span className="activity-text">{stats.totalProfessors} profesores activos</span>
                  <span className="activity-time">Hoy</span>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">📚</span>
                  <span className="activity-text">{stats.activeClasses} clases activas en curso</span>
                  <span className="activity-time">Hoy</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GANANCIAS */}
        {activeTab === 'earnings' && (
          <div className="earnings-section">
            <h2 className="section-title">💰 Estadísticas de Ganancias</h2>
            
            <div className="earnings-grid">
              <div className="earnings-card total">
                <div className="earnings-header">
                  <span className="earnings-icon">💰</span>
                  <h3>Ganancias Totales</h3>
                </div>
                <div className="earnings-amount">${stats.totalEarnings}</div>
                <div className="earnings-detail">Desde el inicio de la plataforma</div>
              </div>

              <div className="earnings-card monthly">
                <div className="earnings-header">
                  <span className="earnings-icon">📅</span>
                  <h3>Ganancias del Mes</h3>
                </div>
                <div className="earnings-amount">${stats.monthlyEarnings}</div>
                <div className="earnings-detail">Noviembre 2024</div>
              </div>

              <div className="earnings-card average">
                <div className="earnings-header">
                  <span className="earnings-icon">📊</span>
                  <h3>Promedio por Clase</h3>
                </div>
                <div className="earnings-amount">$3.75</div>
                <div className="earnings-detail">Comisión del 15%</div>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">ℹ️</div>
              <div className="info-content">
                <h3>Información sobre Ganancias</h3>
                <p>La plataforma cobra una comisión del 15% sobre cada clase completada. Las ganancias mostradas corresponden únicamente a la comisión de EduMatch. El 85% restante va directamente a los profesores.</p>
              </div>
            </div>

            <div className="earnings-breakdown">
              <h3 className="subsection-title">Desglose de Ganancias</h3>
              
              <div className="breakdown-stats">
                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <span className="breakdown-icon">📚</span>
                    <span>Total de Clases Completadas</span>
                  </div>
                  <div className="breakdown-value">{stats.totalClasses}</div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <span className="breakdown-icon">💵</span>
                    <span>Ingresos Brutos Totales</span>
                  </div>
                  <div className="breakdown-value">$6,125.00</div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <span className="breakdown-icon">👨‍🏫</span>
                    <span>Pagado a Profesores (85%)</span>
                  </div>
                  <div className="breakdown-value">$5,206.25</div>
                </div>

                <div className="breakdown-item highlight">
                  <div className="breakdown-label">
                    <span className="breakdown-icon">💰</span>
                    <span>Comisión EduMatch (15%)</span>
                  </div>
                  <div className="breakdown-value">${stats.totalEarnings}</div>
                </div>
              </div>
            </div>

            <div className="earnings-by-month">
              <h3 className="subsection-title">Ganancias por Mes</h3>
              <div className="months-grid">
                <div className="month-card">
                  <div className="month-name">Noviembre 2024</div>
                  <div className="month-amount">${stats.monthlyEarnings}</div>
                  <div className="month-classes">68 clases</div>
                </div>
                <div className="month-card">
                  <div className="month-name">Octubre 2024</div>
                  <div className="month-amount">$765.00</div>
                  <div className="month-classes">51 clases</div>
                </div>
                <div className="month-card">
                  <div className="month-name">Septiembre 2024</div>
                  <div className="month-amount">$843.75</div>
                  <div className="month-classes">56 clases</div>
                </div>
                <div className="month-card">
                  <div className="month-name">Agosto 2024</div>
                  <div className="month-amount">$712.50</div>
                  <div className="month-classes">47 clases</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USUARIOS */}
        {activeTab === 'users' && (
          <div className="users-section">
            <div className="section-header-admin">
              <h2 className="section-title">👥 Gestión de Usuarios</h2>
              <div className="search-bar-admin">
                <input
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-admin"
                />
                <span className="search-icon-admin">🔍</span>
              </div>
            </div>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar-small">
                            {user.firstName?.[0] || 'U'}
                          </div>
                          <span>{user.firstName} {user.lastName}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role === 'student' ? '🎓 Estudiante' : 
                           user.role === 'professor' ? '👨‍🏫 Profesor' : 
                           '👑 Admin'}
                        </span>
                      </td>
                      <td>
                        <span className="status-badge active">Activo</span>
                      </td>
                      <td>
                        <button className="action-btn view">👁️ Ver</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROFESORES */}
        {activeTab === 'professors' && (
          <div className="professors-section">
            <div className="section-header-admin">
              <h2 className="section-title">👨‍🏫 Gestión de Profesores</h2>
              <div className="search-bar-admin">
                <input
                  type="text"
                  placeholder="Buscar profesor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-admin"
                />
                <span className="search-icon-admin">🔍</span>
              </div>
            </div>

            <div className="professors-grid-admin">
              {filteredProfessors.map(prof => (
                <div key={prof.id} className="professor-card-admin">
                  <div className="professor-header-admin">
                    <div className="professor-avatar-admin">
                      {prof.firstName?.[0] || 'P'}
                    </div>
                    <div className="professor-info-admin">
                      <h3>{prof.firstName} {prof.lastName}</h3>
                      <p>{prof.email}</p>
                    </div>
                  </div>
                  <div className="professor-details-admin">
                    <div className="detail-item">
                      <span className="detail-icon">📚</span>
                      <span>{prof.subjects?.join(', ') || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⭐</span>
                      <span>{prof.rating || 0}/5</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">💰</span>
                      <span>${prof.pricePerHour || 0}/hora</span>
                    </div>
                  </div>
                  <div className="professor-actions-admin">
                    <button className="action-btn-admin view">👁️ Ver Perfil</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PENDIENTES */}
        {activeTab === 'pending' && (
          <div className="pending-section">
            <h2 className="section-title">⏳ Profesores Pendientes de Aprobación</h2>
            
            {stats.pendingApprovals === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✅</div>
                <h3>No hay solicitudes pendientes</h3>
                <p>Todos los profesores han sido aprobados</p>
              </div>
            ) : (
              <div className="pending-list">
                {professors.filter(p => !p.isApproved).map(prof => (
                  <div key={prof.id} className="pending-card">
                    <div className="pending-header">
                      <div className="pending-avatar">
                        {prof.firstName?.[0] || 'P'}
                      </div>
                      <div className="pending-info">
                        <h3>{prof.firstName} {prof.lastName}</h3>
                        <p>{prof.email}</p>
                      </div>
                      <span className="pending-badge">Pendiente</span>
                    </div>
                    <div className="pending-details">
                      <p><strong>Universidad:</strong> {prof.university}</p>
                      <p><strong>Título:</strong> {prof.universityDegree}</p>
                      <p><strong>Experiencia:</strong> {prof.teachingExperience}</p>
                    </div>
                    <div className="pending-actions">
                      <button className="action-btn-admin approve">✅ Aprobar</button>
                      <button className="action-btn-admin reject">❌ Rechazar</button>
                      <button className="action-btn-admin view">👁️ Ver Detalles</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProfile;