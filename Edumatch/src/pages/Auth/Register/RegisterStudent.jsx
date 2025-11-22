import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent, emailExists } from '../../../data/mockUsers';
import Button from '../../../components/common/Button/Button'; // CORREGIR ESTA LÍNEA (busca dónde está tu componente Button):
// O si está en otra ubicación, usa la ruta correcta

import './RegisterStudent.css';

function RegisterStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePhoto: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    bio: '',
    educationLevel: '',
    subjects: [],
    learningGoals: ''
  });

  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  const genderOptions = [
    { value: '', label: 'Selecciona una opción' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' },
    { value: 'prefiero-no-decir', label: 'Prefiero no decir' }
  ];

  const educationLevelOptions = [
    { value: '', label: 'Selecciona tu nivel' },
    { value: 'Primaria', label: 'Primaria' },
    { value: 'Secundaria', label: 'Secundaria' },
    { value: 'Bachillerato', label: 'Bachillerato' },
    { value: 'Universidad', label: 'Universidad' },
    { value: 'Postgrado', label: 'Postgrado' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePhoto: 'La imagen debe ser menor a 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es obligatoria';
    }
    if (!formData.gender) {
      newErrors.gender = 'El género es obligatorio';
    }
    if (!formData.educationLevel) {
      newErrors.educationLevel = 'El nivel educativo es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (emailExists(formData.email)) {
      setErrors({ email: 'Este correo ya está registrado' });
      return;
    }

    const newStudent = addStudent(formData);
    localStorage.setItem('currentUser', JSON.stringify(newStudent));

    alert('¡Registro exitoso! Bienvenido a EduMatch');
    navigate('/student/dashboard');
  };

  return (
    <div className="register-student-wrapper">
      <div className="register-student-container">
        <div className="register-header">
          <h1>Registro de Estudiante</h1>
          <p>Únete a nuestra comunidad de aprendizaje</p>
        </div>

        <form onSubmit={handleSubmit} className="register-student-form">
          {/* Foto de perfil */}
          <div className="photo-upload-section">
            <label className="photo-upload-label">Foto de Perfil</label>
            <div className="photo-upload-container">
              {!photoPreview ? (
                <label htmlFor="photo-upload" className="photo-upload-area">
                  <div className="photo-upload-icon">📷</div>
                  <div className="photo-upload-text">
                    <p className="photo-upload-title">Haz clic para subir tu foto</p>
                    <p className="photo-upload-hint">JPG, PNG (máx. 5MB)</p>
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="photo-upload-input"
                  />
                </label>
              ) : (
                <div className="photo-preview-container">
                  <img src={photoPreview} alt="Preview" className="photo-preview" />
                  <button
                    type="button"
                    onClick={() => { setPhotoPreview(null); setFormData(prev => ({ ...prev, profilePhoto: null })); }}
                    className="photo-remove-btn"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            {errors.profilePhoto && <span className="error-message">{errors.profilePhoto}</span>}
          </div>

          {/* Nombre y Apellido */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Nombre *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ej: Juan" // ← Más sutil
                className={errors.firstName ? 'form-input error' : 'form-input'}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Apellido *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ej: Pérez"
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          {/* Email y Teléfono */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com" // ← Más genérico
                className={errors.email ? 'form-input error' : 'form-input'}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+593 99 123 4567" // ← OK
                className={errors.phone ? 'form-input error' : 'form-input'}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          {/* Contraseña */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Contraseña *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres" // ← Más informativo
                className={errors.password ? 'form-input error' : 'form-input'}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          {/* Fecha y Género */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="birthDate">Fecha de Nacimiento *</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={errors.birthDate ? 'error' : ''}
              />
              {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Género *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'error' : ''}
              >
                {genderOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>
          </div>

          {/* Nivel Educativo */}
          <div className="form-group">
            <label htmlFor="educationLevel">Nivel Educativo *</label>
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className={errors.educationLevel ? 'error' : ''}
            >
              {educationLevelOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.educationLevel && <span className="error-message">{errors.educationLevel}</span>}
          </div>

          {/* Dirección */}
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Calle, ciudad, país" // ← Más genérico
              className="form-input"
            />
          </div>

          {/* Bio */}
          <div className="form-group">
            <label htmlFor="bio">Cuéntanos sobre ti</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tus intereses, hobbies, objetivos de aprendizaje..." // ← OK
              className="form-textarea"
            />
          </div>

          {/* Objetivos */}
          <div className="form-group">
            <label htmlFor="learningGoals">Objetivos de Aprendizaje</label>
            <textarea
              id="learningGoals"
              name="learningGoals"
              value={formData.learningGoals}
              onChange={handleChange}
              placeholder="¿Qué te gustaría aprender o mejorar?"
              rows="3"
            />
          </div>

          {/* Botones */}
          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/register')}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Registrarse
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterStudent;