import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { adminService } from '../../../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('');
  
  // Data states
  const [stats, setStats] = useState({});
  const [pendingProfessors, setPendingProfessors] = useState([]);
  const [approvedProfessors, setApprovedProfessors] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ type: '', userId: '', userName: '' });
  const [rejectReason, setRejectReason] = useState('');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.firstName) {
      setAdminName(`${user.firstName} ${user.lastName || ''}`);
    }
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, pendingData, approvedData, usersData] = await Promise.all([
        adminService.getStats(),
        adminService.getPendingProfessors(),
        adminService.getApprovedProfessors(),
        adminService.getAllUsers()
      ]);
      
      console.log('Stats:', statsData);
      console.log('Pending:', pendingData);
      console.log('Approved:', approvedData);
      console.log('Users response:', usersData);
      console.log('Users array:', usersData.data);
      
      setStats(statsData.data || {});
      setPendingProfessors(pendingData.data || []);
      setApprovedProfessors(approvedData.data || []);
      // El backend devuelve data directamente, no data.users
      setAllUsers(Array.isArray(usersData.data) ? usersData.data : []);
    } catch (error) {
      console.error('Error cargando datos:', error);
      alert('Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  const loadLogs = async () => {
    try {
      const response = await adminService.getLogs();
      setLogs(response.data || []);
    } catch (error) {
      console.error('Error cargando logs:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const openModal = (type, userId, userName) => {
    setModalData({ type, userId, userName });
    setShowModal(true);
    setRejectReason('');
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({ type: '', userId: '', userName: '' });
    setRejectReason('');
  };

  const handleConfirmAction = async () => {
    try {
      const { type, userId } = modalData;
      
      switch (type) {
        case 'approve':
          await adminService.approveProfessor(userId);
          alert('Profesor aprobado exitosamente');
          break;
        case 'reject':
          if (!rejectReason.trim()) {
            alert('Debes proporcionar una razón para rechazar');
            return;
          }
          await adminService.rejectProfessor(userId, rejectReason);
          alert('Profesor rechazado');
          break;
        case 'activate':
          await adminService.activateUser(userId);
          alert('Usuario activado');
          break;
        case 'deactivate':
          if (!rejectReason.trim()) {
            alert('Debes proporcionar una razón para desactivar');
            return;
          }
          await adminService.deactivateUser(userId, rejectReason);
          alert('Usuario desactivado');
          break;
      }
      
      closeModal();
      loadDashboardData();
    } catch (error) {
      console.error('Error en acción:', error);
      alert('Error: ' + error.message);
    }
  };

  // Filter users
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = 
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>📊 Admin Panel</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <span className="nav-icon">🏠</span>
            <span>Dashboard</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            <span className="nav-icon">👥</span>
            <span>Usuarios</span>
          </button>

          <button 
            className={`nav-item ${activeSection === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveSection('approved')}
          >
            <span className="nav-icon">✅</span>
            <span>Profesores</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'logs' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('logs');
              loadLogs();
            }}
          >
            <span className="nav-icon">📋</span>
            <span>Historial</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Custom Header */}
        <header className="admin-header">
          <div className="admin-info">
            <h1>Bienvenido, {adminName}</h1>
            <span className="admin-badge">Administrador</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Cerrar Sesión
          </button>
        </header>

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="dashboard-section">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card blue">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>Total Usuarios</h3>
                  <p className="stat-number">{stats.users?.total || 0}</p>
                  <span className="stat-detail">
                    {stats.users?.active || 0} activos · {stats.users?.inactive || 0} inactivos
                  </span>
                </div>
              </div>

              <div className="stat-card orange">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>Profesores Pendientes</h3>
                  <p className="stat-number">{stats.professors?.pending || 0}</p>
                  <span className="stat-detail">Requieren aprobación</span>
                </div>
              </div>

              <div className="stat-card green">
                <div className="stat-icon">🎓</div>
                <div className="stat-content">
                  <h3>Estudiantes</h3>
                  <p className="stat-number">{stats.students?.total || 0}</p>
                  <span className="stat-detail">Usuarios registrados</span>
                </div>
              </div>

              <div className="stat-card purple">
                <div className="stat-icon">👨‍🏫</div>
                <div className="stat-content">
                  <h3>Profesores Aprobados</h3>
                  <p className="stat-number">{stats.professors?.approved || 0}</p>
                  <span className="stat-detail">
                    {stats.professors?.rejected || 0} rechazados
                  </span>
                </div>
              </div>
            </div>

            {/* Pending Professors Table */}
            <div className="section-container">
              <h2>Profesores Pendientes de Aprobación</h2>
              
              {pendingProfessors.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">✅</span>
                  <p>No hay profesores pendientes de aprobación</p>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Título</th>
                        <th>Universidad</th>
                        <th>Materias</th>
                        <th>Experiencia</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingProfessors.map((professor) => (
                        <tr key={professor._id}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar">
                                {professor.firstName?.[0]}{professor.lastName?.[0]}
                              </div>
                              <span>{professor.firstName} {professor.lastName}</span>
                            </div>
                          </td>
                          <td>{professor.email}</td>
                          <td>{professor.universityDegree}</td>
                          <td>{professor.university}</td>
                          <td>
                            <div className="subjects-list">
                              {professor.subjects?.slice(0, 2).map((subject, idx) => (
                                <span key={idx} className="subject-tag">{subject}</span>
                              ))}
                              {professor.subjects?.length > 2 && (
                                <span className="subject-tag">+{professor.subjects.length - 2}</span>
                              )}
                            </div>
                          </td>
                          <td>{professor.teachingExperience}</td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn-approve"
                                onClick={() => openModal('approve', professor._id, `${professor.firstName} ${professor.lastName}`)}
                              >
                                ✓ Aprobar
                              </button>
                              <button 
                                className="btn-reject"
                                onClick={() => openModal('reject', professor._id, `${professor.firstName} ${professor.lastName}`)}
                              >
                                ✗ Rechazar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Section */}
        {activeSection === 'users' && (
          <div className="users-section">
            <h2>Gestión de Usuarios</h2>
            
            {/* Filters */}
            <div className="filters-bar">
              <input 
                type="text"
                placeholder="🔍 Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              
              <select 
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="filter-select"
              >
                <option value="all">Todos los roles</option>
                <option value="student">Estudiantes</option>
                <option value="professor">Profesores</option>
                <option value="admin">Administradores</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Teléfono</th>
                    <th>Registro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </div>
                          <span>{user.firstName} {user.lastName}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge role-${user.role}`}>
                          {user.role === 'student' ? '🎓 Estudiante' : 
                           user.role === 'professor' ? '👨‍🏫 Profesor' : '👤 Admin'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                          {user.isActive ? '✓ Activo' : '✗ Inactivo'}
                        </span>
                      </td>
                      <td>{user.phone || 'N/A'}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="action-buttons">
                          {user.isActive ? (
                            <button 
                              className="btn-deactivate"
                              onClick={() => openModal('deactivate', user._id, `${user.firstName} ${user.lastName}`)}
                            >
                              🚫 Desactivar
                            </button>
                          ) : (
                            <button 
                              className="btn-activate"
                              onClick={() => openModal('activate', user._id, `${user.firstName} ${user.lastName}`)}
                            >
                              ✓ Activar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">🔍</span>
                <p>No se encontraron usuarios con los filtros aplicados</p>
              </div>
            )}
          </div>
        )}

        {/* Approved Professors Section */}
        {activeSection === 'approved' && (
          <div className="approved-section">
            <h2>Profesores Aprobados</h2>
            
            {approvedProfessors.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">👨‍🏫</span>
                <p>No hay profesores aprobados aún</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Título</th>
                      <th>Universidad</th>
                      <th>Materias</th>
                      <th>Tarifa/Hora</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedProfessors.map((professor) => (
                      <tr key={professor._id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">
                              {professor.firstName?.[0]}{professor.lastName?.[0]}
                            </div>
                            <span>{professor.firstName} {professor.lastName}</span>
                          </div>
                        </td>
                        <td>{professor.email}</td>
                        <td>{professor.universityDegree}</td>
                        <td>{professor.university}</td>
                        <td>
                          <div className="subjects-list">
                            {professor.subjects?.slice(0, 2).map((subject, idx) => (
                              <span key={idx} className="subject-tag">{subject}</span>
                            ))}
                            {professor.subjects?.length > 2 && (
                              <span className="subject-tag">+{professor.subjects.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td>{professor.hourlyRate} {professor.currency || 'USD'}</td>
                        <td>
                          <span className="status-badge active">
                            ✓ Activo
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Logs Section */}
        {activeSection === 'logs' && (
          <div className="logs-section">
            <h2>Historial de Acciones</h2>
            
            {logs.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📋</span>
                <p>No hay registros de acciones</p>
              </div>
            ) : (
              <div className="logs-list">
                {logs.map((log, index) => (
                  <div key={index} className="log-item">
                    <div className="log-icon">📝</div>
                    <div className="log-content">
                      <p className="log-action">{log.action}</p>
                      <p className="log-details">{log.details}</p>
                      <span className="log-date">{new Date(log.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalData.type === 'approve' && '✓ Aprobar Profesor'}
                {modalData.type === 'reject' && '✗ Rechazar Profesor'}
                {modalData.type === 'activate' && '✓ Activar Usuario'}
                {modalData.type === 'deactivate' && '🚫 Desactivar Usuario'}
              </h3>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              <p className="modal-text">
                {modalData.type === 'approve' && 
                  `¿Estás seguro que deseas aprobar a ${modalData.userName}?`}
                {modalData.type === 'reject' && 
                  `¿Estás seguro que deseas rechazar a ${modalData.userName}?`}
                {modalData.type === 'activate' && 
                  `¿Estás seguro que deseas activar a ${modalData.userName}?`}
                {modalData.type === 'deactivate' && 
                  `¿Estás seguro que deseas desactivar a ${modalData.userName}?`}
              </p>

              {(modalData.type === 'reject' || modalData.type === 'deactivate') && (
                <div className="form-group">
                  <label>Razón *</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Explica el motivo de esta acción..."
                    rows="4"
                    className="modal-textarea"
                  />
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>
                Cancelar
              </button>
              <button 
                className={`btn-confirm ${
                  modalData.type === 'approve' || modalData.type === 'activate' 
                    ? 'btn-confirm-success' 
                    : 'btn-confirm-danger'
                }`}
                onClick={handleConfirmAction}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
