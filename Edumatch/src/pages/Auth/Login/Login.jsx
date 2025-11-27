import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authenticateUser } from '../../../data/mockUsers';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!validateForm()) {
      return;
    }

    console.log('📧 Intentando login con:', formData.email);

    // Autenticar usuario
    const foundUser = authenticateUser(formData.email, formData.password);

    console.log('👤 Usuario encontrado:', foundUser);

    if (foundUser) {
      // Guardar usuario en localStorage
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      
      // Notificar al Header
      window.dispatchEvent(new Event("storage"));
      
      console.log('🎭 Rol del usuario:', foundUser.role);
      
      // Redirigir según el rol
      if (foundUser.role === 'admin') {
        console.log('✅ Redirigiendo a /admin/profile');
        window.location.href = '/admin/profile';
      } else if (foundUser.role === 'professor') {
        console.log('✅ Redirigiendo a /professor/profile');
        window.location.href = '/professor/profile';
      } else if (foundUser.role === 'student') {
        console.log('✅ Redirigiendo a / (Home)');
        window.location.href = '/';
      } else {
        console.log('⚠️ Rol desconocido, redirigiendo a /');
        window.location.href = '/';
      }
    } else {
      console.log('❌ Credenciales incorrectas');
      setLoginError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo-container">
          <div className="logo-circle">
            <span className="logo-icon">🎓</span>
          </div>
        </div>

        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-subtitle">Accede a tu cuenta para continuar</p>

        <form onSubmit={handleSubmit} className="login-form">
          {loginError && (
            <div className="login-error">
              <span className="error-icon">⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          <div className="form-field">
            <label htmlFor="email">
              Correo electrónico <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="password">
              Contraseña <span className="required">*</span>
            </label>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkbox-label">Recordarme</span>
            </label>
            <Link to="/recover-password" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button type="submit" className="btn-submit">
            INICIAR SESIÓN
          </button>

          <div className="divider">
            <span>o continúa con</span>
          </div>

          <div className="social-buttons">
            <button type="button" className="btn-social google">
              <span className="social-icon">G</span>
              <span>GOOGLE</span>
            </button>
            <button type="button" className="btn-social facebook">
              <span className="social-icon">F</span>
              <span>FACEBOOK</span>
            </button>
          </div>

          <div className="register-link">
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </div>
        </form>

        <div className="test-info">
          <p className="test-title">🔑 Credenciales de Prueba</p>
          <div className="test-credentials">
            <div className="test-item">
              <strong>👤 Estudiante:</strong> maria.gonzalez@student.com / Student123
            </div>
            <div className="test-item">
              <strong>👨‍🏫 Profesor:</strong> juan.perez@professor.com / Professor123
            </div>
            <div className="test-item">
              <strong>👑 Admin:</strong> admin@edumatch.com / Admin123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;