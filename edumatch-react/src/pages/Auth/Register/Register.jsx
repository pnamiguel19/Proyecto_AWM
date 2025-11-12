import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { NotificationContainer } from '../../../components/common/Notification';
import { useForm } from '../../../hooks/useForm';
import { useNotification } from '../../../hooks/useNotification';
import { validators } from '../../../utils/validators';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { notifications, showSuccess, showError, removeNotification } = useNotification();

  const initialValues = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    ciudad: '',
    password: '',
    confirmPassword: ''
  };

  const formValidators = {
    nombre: validators.isValidName,
    apellido: validators.isValidName,
    email: validators.isValidEmail,
    telefono: validators.isValidPhone,
    ciudad: validators.isValidCity,
    password: validators.isValidPassword,
    confirmPassword: (value, allValues) => 
      validators.isValidPasswordConfirmation(value, allValues.password)
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
      console.log('Datos a enviar:', {
        nombre: values.nombre,
        apellido: values.apellido,
        email: values.email,
        telefono: values.telefono,
        ciudad: values.ciudad,
        password: values.password
      });

      showSuccess('¡Registro exitoso! Redirigiendo...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

      resetForm();
    } catch (error) {
      showError('Error al registrar usuario. Por favor, intenta nuevamente.');
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
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* Logo */}
          <div className="logo-centered">
            <div className="logo__icon" aria-hidden="true">🎓</div>
            <div className="logo__text">EduMatch</div>
          </div>

          {/* Título */}
          <h1 className="auth-title">Crear cuenta</h1>
          <p className="auth-subtitle">Completa tus datos para comenzar</p>

          {/* Nombre y Apellido */}
          <div className="form-row">
            <Input
              label="Nombre"
              name="nombre"
              type="text"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.nombre ? errors.nombre : null}
              placeholder="Juan"
              required
              minLength={2}
            />
            <Input
              label="Apellido"
              name="apellido"
              type="text"
              value={values.apellido}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.apellido ? errors.apellido : null}
              placeholder="Pérez"
              required
              minLength={2}
            />
          </div>

          {/* Correo electrónico */}
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : null}
            placeholder="ejemplo@correo.com"
            required
          />

          {/* Teléfono */}
          <Input
            label="Teléfono"
            name="telefono"
            type="tel"
            value={values.telefono}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.telefono ? errors.telefono : null}
            placeholder="+593 99 123 4567"
          />

          {/* Ciudad */}
          <Input
            label="Ciudad"
            name="ciudad"
            type="text"
            value={values.ciudad}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.ciudad ? errors.ciudad : null}
            placeholder="Quito"
          />

          {/* Contraseña */}
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : null}
            placeholder="Mínimo 8 caracteres"
            required
            minLength={8}
          />

          {/* Confirmar contraseña */}
          <Input
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword ? errors.confirmPassword : null}
            placeholder="Repite tu contraseña"
            required
            minLength={8}
          />

          {/* Botón de registro */}
          <Button type="submit" variant="primary">
            Registrarse
          </Button>

          {/* Link de inicio de sesión */}
          <div className="login-link">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;