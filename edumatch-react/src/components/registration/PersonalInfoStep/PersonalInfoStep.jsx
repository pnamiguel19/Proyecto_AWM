import React, { useState } from 'react';
import './PersonalInfoStep.css';

const PersonalInfoStep = ({ formData, onChange }) => {
  const [photoPreview, setPhotoPreview] = useState(formData.photoPreview || null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        onChange('photo', file);
        onChange('photoPreview', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    onChange('photo', null);
    onChange('photoPreview', null);
  };

  return (
    <section className="form-step active">
      <div className="step-header">
        <h2>👤 Información Personal</h2>
        <p>Cuéntanos un poco sobre ti para crear tu perfil de profesor</p>
      </div>

      {/* Foto de Perfil */}
      <div className="input-group full-width">
        <label>Foto de Perfil *</label>
        <div className="file-upload-area">
          {!photoPreview ? (
            <>
              <input
                type="file"
                id="photo"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
              <label htmlFor="photo" className="upload-label">
                <span className="upload-icon">📷</span>
                <span className="upload-text">Subir foto</span>
                <small>JPG, PNG o GIF (máx. 5MB)</small>
              </label>
            </>
          ) : (
            <div className="photo-preview">
              <div className="photo-preview-item">
                <img src={photoPreview} alt="Vista previa" />
                <button
                  type="button"
                  className="remove-photo"
                  onClick={removePhoto}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nombre y Apellido */}
      <div className="form-row">
        <div className="input-group">
          <label htmlFor="firstName">Nombre *</label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName || ''}
            onChange={(e) => onChange('firstName', e.target.value)}
            placeholder="Ej: Juan"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Apellido *</label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName || ''}
            onChange={(e) => onChange('lastName', e.target.value)}
            placeholder="Ej: Pérez"
            required
          />
        </div>
      </div>

      {/* Email y Teléfono */}
      <div className="form-row">
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico *</label>
          <input
            type="email"
            id="email"
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Teléfono *</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+593 99 123 4567"
            required
          />
        </div>
      </div>

      {/* Fecha de Nacimiento y Género */}
      <div className="form-row">
        <div className="input-group">
          <label htmlFor="birthDate">Fecha de Nacimiento *</label>
          <input
            type="date"
            id="birthDate"
            value={formData.birthDate || ''}
            onChange={(e) => onChange('birthDate', e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="gender">Género *</label>
          <select
            id="gender"
            value={formData.gender || ''}
            onChange={(e) => onChange('gender', e.target.value)}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
            <option value="prefiero-no-decir">Prefiero no decir</option>
          </select>
        </div>
      </div>

      {/* Dirección */}
      <div className="input-group full-width">
        <label htmlFor="address">Dirección *</label>
        <input
          type="text"
          id="address"
          value={formData.address || ''}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder="Calle, número, ciudad"
          required
        />
      </div>

      {/* Biografía */}
      <div className="input-group full-width">
        <label htmlFor="bio">Biografía *</label>
        <textarea
          id="bio"
          value={formData.bio || ''}
          onChange={(e) => onChange('bio', e.target.value)}
          rows="5"
          placeholder="Cuéntanos sobre tu experiencia, tus pasiones por la enseñanza y qué te hace un gran profesor..."
          required
        />
        <small className="input-hint">Mínimo 100 caracteres</small>
      </div>

      {/* Contraseña y Confirmación */}
      <div className="form-row">
        <div className="input-group">
          <label htmlFor="password">Contraseña *</label>
          <input
            type="password"
            id="password"
            value={formData.password || ''}
            onChange={(e) => onChange('password', e.target.value)}
            placeholder="Mínimo 8 caracteres"
            required
            minLength="8"
          />
          <small className="input-hint">Debe tener al menos 8 caracteres, una mayúscula y un número</small>
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword || ''}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            placeholder="Repite tu contraseña"
            required
          />
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoStep;