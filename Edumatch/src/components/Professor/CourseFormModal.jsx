import React, { useState, useEffect } from 'react';
import './CourseFormModal.css';

const CourseFormModal = ({ isOpen, onClose, courseData, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    price: '',
    image: '',
    published: false,
    modules: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courseData) {
      setFormData(courseData);
    } else {
      setFormData({
        title: '',
        description: '',
        category: '',
        level: '',
        price: '',
        image: '',
        published: false,
        modules: []
      });
    }
    setErrors({});
  }, [courseData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (formData.title.length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.length < 20) {
      newErrors.description = 'La descripción debe tener al menos 20 caracteres';
    }

    if (!formData.category) {
      newErrors.category = 'Selecciona una categoría';
    }

    if (!formData.level) {
      newErrors.level = 'Selecciona un nivel';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'El precio es requerido';
    } else if (!/^\$?\d+(\.\d{1,2})?$/.test(formData.price.replace('$', ''))) {
      newErrors.price = 'Ingresa un precio válido (ej: $25 o 25.00)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal-content prof-course-modal" onClick={(e) => e.stopPropagation()}>
        <div className="prof-modal-header">
          <div className="prof-modal-title-wrapper">
            <span className="prof-modal-icon">📚</span>
            <h2>{courseData ? 'Editar Curso' : 'Crear Nuevo Curso'}</h2>
          </div>
          <button className="prof-modal-close" onClick={onClose} type="button">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="prof-course-form">
          <div className="prof-form-section">
            <h3 className="prof-section-title">Información Básica</h3>
            
            <div className="prof-form-group">
              <label htmlFor="title">
                Título del Curso <span className="prof-required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Curso Completo de Física"
                className={errors.title ? 'prof-input-error' : ''}
              />
              {errors.title && <span className="prof-error-message">{errors.title}</span>}
            </div>

            <div className="prof-form-group">
              <label htmlFor="description">
                Descripción <span className="prof-required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe de qué trata tu curso, qué aprenderán los estudiantes y qué conocimientos previos necesitan..."
                className={errors.description ? 'prof-input-error' : ''}
              />
              <div className="prof-char-count">
                {formData.description.length} caracteres
              </div>
              {errors.description && <span className="prof-error-message">{errors.description}</span>}
            </div>
          </div>

          <div className="prof-form-section">
            <h3 className="prof-section-title">Categorización</h3>
            
            <div className="prof-form-row">
              <div className="prof-form-group">
                <label htmlFor="category">
                  Categoría <span className="prof-required">*</span>
                </label>
                <select 
                  id="category"
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className={errors.category ? 'prof-input-error' : ''}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Matemáticas">📐 Matemáticas</option>
                  <option value="Física">⚛️ Física</option>
                  <option value="Química">🧪 Química</option>
                  <option value="Programación">💻 Programación</option>
                  <option value="Idiomas">🗣️ Idiomas</option>
                  <option value="Historia">📜 Historia</option>
                  <option value="Biología">🧬 Biología</option>
                  <option value="Literatura">📖 Literatura</option>
                </select>
                {errors.category && <span className="prof-error-message">{errors.category}</span>}
              </div>

              <div className="prof-form-group">
                <label htmlFor="level">
                  Nivel <span className="prof-required">*</span>
                </label>
                <select 
                  id="level"
                  name="level" 
                  value={formData.level} 
                  onChange={handleChange}
                  className={errors.level ? 'prof-input-error' : ''}
                >
                  <option value="">Seleccionar nivel</option>
                  <option value="Básico">🌱 Básico</option>
                  <option value="Intermedio">🌿 Intermedio</option>
                  <option value="Avanzado">🌳 Avanzado</option>
                </select>
                {errors.level && <span className="prof-error-message">{errors.level}</span>}
              </div>
            </div>
          </div>

          <div className="prof-form-section">
            <h3 className="prof-section-title">Detalles Adicionales</h3>
            
            <div className="prof-form-row">
              <div className="prof-form-group">
                <label htmlFor="price">
                  Precio <span className="prof-required">*</span>
                </label>
                <div className="prof-input-with-icon">
                  <span className="prof-input-icon">💵</span>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="25.00"
                    className={errors.price ? 'prof-input-error' : ''}
                  />
                </div>
                {errors.price && <span className="prof-error-message">{errors.price}</span>}
              </div>

              <div className="prof-form-group">
                <label htmlFor="image">
                  URL de Imagen <span className="prof-optional">(opcional)</span>
                </label>
                <div className="prof-input-with-icon">
                  <span className="prof-input-icon">🖼️</span>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="prof-form-section">
            <div className="prof-form-group prof-checkbox-group">
              <label className="prof-checkbox-label">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                />
                <span className="prof-checkbox-text">
                  <strong>Publicar curso inmediatamente</strong>
                  <small>El curso estará visible para los estudiantes</small>
                </span>
              </label>
            </div>
          </div>

          <div className="prof-modal-footer">
            <button type="button" className="prof-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="prof-btn-save">
              {courseData ? '💾 Guardar Cambios' : '✨ Crear Curso'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;