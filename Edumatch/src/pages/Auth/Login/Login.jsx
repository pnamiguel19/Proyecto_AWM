import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button/Button';
import Input from '../../../components/common/Input/Input';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    };

    let isValid = true;

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
      isValid = false;
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Login data:', formData);
      // Aquí irá la lógica de autenticación
    }
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
    // Lógica para login con Google
  };

  const handleFacebookLogin = () => {
    console.log('Login with Facebook');
    // Lógica para login con Facebook
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">🎓</div>
            <span className="logo-text">EduMatch</span>
          </div>
          <h1 className="login-title">Iniciar sesión</h1>
          <p className="login-subtitle">Accede a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Recordarme</span>
            </label>
            <a href="/recover-password" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button type="submit" variant="primary" fullWidth>
            Iniciar sesión
          </Button>
        </form>

        <div className="divider">
          <span>o continúa con</span>
        </div>

        <div className="social-login">
          <Button variant="secondary" onClick={handleGoogleLogin}>
            <span className="social-icon">G</span> Google
          </Button>
          <Button variant="secondary" onClick={handleFacebookLogin}>
            <span className="social-icon">f</span> Facebook
          </Button>
        </div>

        <p className="register-link">
          ¿No tienes cuenta?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); handleRegisterRedirect(); }}>
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;