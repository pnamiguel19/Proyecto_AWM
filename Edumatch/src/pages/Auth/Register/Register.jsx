import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button/Button';
import Card from '../../../components/common/Card/Card';
import './Register.css';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState('profesor');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole === 'estudiante') {
      navigate('/register/student');
    } else {
      navigate('/register/professor');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-header">
          <h1 className="register-title">Únete a EduMatch</h1>
          <p className="register-subtitle">
            Selecciona cómo deseas formar parte de nuestra comunidad educativa
          </p>
        </div>

        <div className="role-selection">
          <Card
            icon="📚"
            title="Estudiante"
            description="Encuentra profesores expertos que te ayudarán a alcanzar tus metas académicas"
            isSelected={selectedRole === 'estudiante'}
            onClick={() => setSelectedRole('estudiante')}
          />

          <Card
            icon="👨‍🏫"
            title="Profesor"
            description="Comparte tu conocimiento y ayuda a estudiantes a crecer académicamente"
            isSelected={selectedRole === 'profesor'}
            onClick={() => setSelectedRole('profesor')}
          />
        </div>

        <Button 
          variant="primary" 
          fullWidth 
          onClick={handleContinue}
        >
          Continuar
        </Button>

        <p className="login-link">
          ¿Ya tienes una cuenta?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); handleLoginRedirect(); }}>
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;