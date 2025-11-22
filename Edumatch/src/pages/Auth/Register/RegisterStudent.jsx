import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button/Button';
import Input from '../../../components/common/Input/Input';
import './RegisterStudent.css';

const RegisterStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      password: '',
      confirmPassword: ''
    };

    let isValid = true;

    // Validar nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
      isValid = false;
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
      isValid = false;
    }

    // Validar apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
      isValid = false;
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
      isValid = false;
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
      isValid = false;
    }

    // Validar teléfono (OBLIGATORIO)
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Ingresa un número de teléfono válido (mínimo 10 dígitos)';
      isValid = false;
    }

    // Validar ciudad (OBLIGATORIO)
    if (!formData.city.trim()) {
      newErrors.city = 'La ciudad es obligatoria';
      isValid = false;
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'La ciudad debe tener al menos 2 caracteres';
      isValid = false;
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      console.log('Student registration data:', formData);
      // Aquí irá la lógica de registro
      // Por ejemplo: navigate('/dashboard');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="register-student-container">
      <div className="register-student-card">
        <div className="register-student-header">
          <div className="logo">
            <div className="logo-icon">🎓</div>
            <span className="logo-text">EduMatch</span>
          </div>
          <h1 className="register-student-title">Crear cuenta</h1>
          <p className="register-student-subtitle">Completa tus datos para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="register-student-form">
          <div className="form-row">
            <Input
              label="Nombre"
              type="text"
              name="firstName"
              placeholder="Juan"
              value={formData.firstName}
              onChange={handleChange}
              required
              error={errors.firstName}
            />

            <Input
              label="Apellido"
              type="text"
              name="lastName"
              placeholder="Pérez"
              value={formData.lastName}
              onChange={handleChange}
              required
              error={errors.lastName}
            />
          </div>

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
            label="Teléfono"
            type="tel"
            name="phone"
            placeholder="+593 99 123 4567"
            value={formData.phone}
            onChange={handleChange}
            required
            error={errors.phone}
          />

          <Input
            label="Ciudad"
            type="text"
            name="city"
            placeholder="Quito"
            value={formData.city}
            onChange={handleChange}
            required
            error={errors.city}
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />

          <Input
            label="Confirmar contraseña"
            type="password"
            name="confirmPassword"
            placeholder="Repite tu contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
          />

          <Button type="submit" variant="primary" fullWidth>
            Registrarse
          </Button>
        </form>

        <p className="login-link">
          ¿Ya tienes cuenta?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); handleLoginRedirect(); }}>
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterStudent;