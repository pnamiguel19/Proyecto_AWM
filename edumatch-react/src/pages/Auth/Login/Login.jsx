import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { NotificationContainer } from '../../../components/common/Notification';
import { useForm } from '../../../hooks/useForm';
import { useNotification } from '../../../hooks/useNotification';
import { validators } from '../../../utils/validators';
import { authService } from '../../../services/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { notifications, showSuccess, showError, removeNotification } = useNotification();
  const [rememberMe, setRememberMe] = useState(false);

  const initialValues = {
    email: '',
    password: ''
  };

  const formValidators = {
    email: validators.isValidEmail,
    password: (value) => {
      if (!value) return 'La contraseña es requerida';
      return null;
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  } = useForm(initialValues, formValidators);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      showError('Por favor, corrige los errores en el formulario');
      return;
    }

    try {
      const response = await authService.login(values.email, values.password);
      
      // Guardar token y datos del usuario
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      showSuccess('¡Inicio de sesión exitoso!');
      
      setTimeout(() => {
        // Redirigir según el rol
        if (response.user.role === 'admin') {
          navigate('/Admin/Dashboard');
        } else {
          // Estudiantes y profesores van al home
          navigate('/');
        }
      }, 1500);

      resetForm();
    } catch (error) {
      showError(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
      
      <div className="auth-container">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="logo-centered">
            <div className="logo__icon" aria-hidden="true">🎓</div>
            <div className="logo__text">EduMatch</div>
          </div>

          <h1 className="auth-title">Iniciar sesión</h1>
          <p className="auth-subtitle">Accede a tu cuenta para continuar</p>

          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? errors.email : null}
            placeholder="ejemplo@correo.com"
            required
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password ? errors.password : null}
            placeholder="Ingresa tu contraseña"
            required
          />

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Recordarme</span>
            </label>
            <a href="/recover-password" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button type="submit" variant="primary">
            Iniciar sesión 
          </Button>

          <div className="divider">
            <span>o continúa con</span>
          </div>

          <div className="social-buttons">
            <button type="button" className="social-btn social-btn--google">
              <span className="social-icon">G</span>
              Google
            </button>
            <button type="button" className="social-btn social-btn--facebook">
              <span className="social-icon">f</span>
              Facebook
            </button>
          </div>

          <div className="register-link">
            ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;