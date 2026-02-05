import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/api';
import './StudentRegister.css';

const StudentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    educationLevel: '',
    aboutMe: '',
    learningGoals: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!formData.birthDate) newErrors.birthDate = 'La fecha de nacimiento es requerida';
    if (!formData.gender) newErrors.gender = 'El género es requerido';
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.educationLevel) newErrors.educationLevel = 'El nivel educativo es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await authService.registerStudent(dataToSend);

      if (response.success) {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      alert('Error al registrarse: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-register">
      <div className="register-container">
        <div className="register-header">
          <button 
            className="back-button"
            onClick={() => navigate('/register')}
          >
            ← Volver
          </button>
          <h1 className="register-title">Registro de Estudiante</h1>
          <p className="register-subtitle">Completa tus datos para comenzar a aprender</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Información Personal */}
          <div className="form-section">
            <h2 className="section-title">Información Personal</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="Tu nombre"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label>Apellido *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Tu apellido"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="tu@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+51 999 999 999"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Fecha de Nacimiento *</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={errors.birthDate ? 'error' : ''}
                />
                {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
              </div>

              <div className="form-group">
                <label>Género *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">Selecciona</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                  <option value="prefer_not_to_say">Prefiero no decir</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Dirección *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
                placeholder="Calle, número, distrito, ciudad"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </div>

          {/* Seguridad */}
          <div className="form-section">
            <h2 className="section-title">Seguridad</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Contraseña *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Mínimo 8 caracteres"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>Confirmar Contraseña *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Repite tu contraseña"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          {/* Información Académica */}
          <div className="form-section">
            <h2 className="section-title">Información Académica</h2>
            
            <div className="form-group">
              <label>Nivel Educativo *</label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className={errors.educationLevel ? 'error' : ''}
              >
                <option value="">Selecciona tu nivel</option>
                <option value="elementary">Primaria</option>
                <option value="middle_school">Secundaria</option>
                <option value="high_school">Bachillerato</option>
                <option value="university">Universidad</option>
                <option value="postgraduate">Posgrado</option>
                <option value="other">Otro</option>
              </select>
              {errors.educationLevel && <span className="error-message">{errors.educationLevel}</span>}
            </div>

            <div className="form-group">
              <label>Sobre mí (opcional)</label>
              <textarea
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                rows="3"
                placeholder="Cuéntanos un poco sobre ti..."
              />
            </div>

            <div className="form-group">
              <label>Objetivos de Aprendizaje (opcional)</label>
              <textarea
                name="learningGoals"
                value={formData.learningGoals}
                onChange={handleChange}
                rows="3"
                placeholder="¿Qué te gustaría aprender o mejorar?"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => navigate('/register')}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Completar Registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
