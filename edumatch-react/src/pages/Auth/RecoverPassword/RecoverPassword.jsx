import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { NotificationContainer } from '../../../components/common/Notification';
import { useForm } from '../../../hooks/useForm';
import { useNotification } from '../../../hooks/useNotification';
import { validators } from '../../../utils/validators';
import './RecoverPassword.css';

const RecoverPassword = () => {
  const navigate = useNavigate();
  const { notifications, showSuccess, showError, removeNotification } = useNotification();

  const initialValues = {
    email: ''
  };

  const formValidators = {
    email: validators.isValidEmail
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
      showError('Por favor, ingresa un correo electrónico válido');
      return;
    }

    try {
      console.log('Solicitud de recuperación para:', values.email);

      // Aquí irá la llamada a la API
      showSuccess('Se ha enviado un enlace de recuperación a tu correo electrónico');
      
      setTimeout(() => {
        resetForm();
      }, 2000);

    } catch (error) {
      showError('Error al enviar el enlace. Por favor, intenta nuevamente.');
      console.error('Error:', error);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
      
      <div className="auth-container">
        <div className="recover-form">
          <div className="logo-centered">
            <div className="logo__icon" aria-hidden="true">🎓</div>
            <div className="logo__text">EduMatch</div>
          </div>

          <div className="lock-icon">
            <div className="lock-circle">
              🔒
            </div>
          </div>

          <h1 className="auth-title">¿Olvidaste tu contraseña?</h1>
          <p className="auth-subtitle">
            No te preocupes. Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          <form onSubmit={handleSubmit} noValidate>
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

            <Button type="submit" variant="primary">
              Enviar enlace de recuperación
            </Button>
          </form>

          <div className="info-message">
            <span className="info-icon">💡</span>
            <p>Revisa tu bandeja de entrada y spam. El enlace expirará en 24 horas.</p>
          </div>

          <button 
            type="button" 
            className="back-link"
            onClick={handleBackToLogin}
          >
            ← Volver al inicio de sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default RecoverPassword;