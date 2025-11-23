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
  }, [courseData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal-content prof-course-modal" onClick={(e) => e.stopPropagation()}>
        <div className="prof-modal-header">
          <h2>{courseData ? 'Editar Curso' : 'Crear Nuevo Curso'}</h2>
          <button className="prof-modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="prof-course-form">
          <div className="prof-form-group">
            <label>Título del Curso *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej: Curso Completo de Física"
              required
            />
          </div>

          <div className="prof-form-group">
            <label>Descripción *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe de qué trata tu curso..."
              required
            />
          </div>

          <div className="prof-form-row">
            <div className="prof-form-group">
              <label>Categoría *</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Seleccionar</option>
                <option value="Matemáticas">Matemáticas</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
                <option value="Programación">Programación</option>
                <option value="Idiomas">Idiomas</option>
              </select>
            </div>

            <div className="prof-form-group">
              <label>Nivel *</label>
              <select name="level" value={formData.level} onChange={handleChange} required>
                <option value="">Seleccionar</option>
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>

          <div className="prof-form-row">
            <div className="prof-form-group">
              <label>Precio *</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="$25"
                required
              />
            </div>

            <div className="prof-form-group">
              <label>URL de Imagen (opcional)</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="prof-form-group prof-checkbox-group">
            <label className="prof-checkbox-label">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
              />
              <span>Publicar curso inmediatamente</span>
            </label>
          </div>

          <div className="prof-modal-footer">
            <button type="button" className="prof-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="prof-btn-save">
              {courseData ? 'Guardar Cambios' : 'Crear Curso'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;