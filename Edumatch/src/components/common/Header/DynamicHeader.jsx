import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './DynamicHeader.css';

const DynamicHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRoleChange = (newRole) => {
    if (newRole === 'profesor') {
      navigate('/register/professor');
    } else if (newRole === 'estudiante') {
      navigate('/register/student');
    }
  };

  return (
    <header className="dynamic-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">EduMatch</span>
        </Link>

        <nav className="header-nav">
          {!user ? (
            // Usuario NO autenticado
            <div className="auth-buttons">
              <Link to="/login" className="btn-header btn-login">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn-header btn-register">
                Registrarte
              </Link>
            </div>
          ) : (
            // Usuario autenticado
            <>
              <div className="user-info">
                <span className="user-avatar">
                  {user.name?.charAt(0).toUpperCase() || '👤'}
                </span>
                <span className="user-name">{user.name}</span>
              </div>

              <div className="user-menu">
                <Link 
                  to={user.role === 'estudiante' ? '/student/profile' : '/professor/profile'} 
                  className="btn-header btn-profile"
                >
                  Mi Perfil
                </Link>

                {user.role === 'estudiante' && (
                  <button 
                    onClick={() => handleRoleChange('profesor')}
                    className="btn-header btn-switch-role"
                  >
                    Conviértete en Profesor
                  </button>
                )}

                {user.role === 'profesor' && (
                  <button 
                    onClick={() => handleRoleChange('estudiante')}
                    className="btn-header btn-switch-role"
                  >
                    Conviértete en Estudiante
                  </button>
                )}

                <button onClick={handleLogout} className="btn-header btn-logout">
                  Cerrar Sesión
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default DynamicHeader;