import React, { useState, useEffect } from 'react';
import './ClassFormModal.css';

const ClassFormModal = ({ isOpen, onClose, classData, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    studentName: '',
    date: '',
    time: '',
    duration: '60',
    price: '',
    description: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (classData) {
      setFormData(classData);
    } else {
      // Reset form para nueva clase
      setFormData({
        title: '',
        subject: '',
        studentName: '',
        date: '',
        time: '',
        duration: '60',
        price: '',
        description: '',
        status: 'active'
      });
    }
    setErrors({});
  }, [classData, isOpen]);

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

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.subject) {
      newErrors.subject = 'La materia es requerida';
    }

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    }

    if (!formData.time) {
      newErrors.time = 'La hora es requerida';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'El precio es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal-content prof-class-modal" onClick={(e) => e.stopPropagation()}>
        <div className="prof-modal-header">
          <div className="prof-modal-title-wrapper">
            <span className="prof-modal-icon">📝</span>
            <h2>{classData ? 'Editar Clase' : 'Crear Nueva Clase'}</h2>
          </div>
          <button className="prof-modal-close" onClick={onClose} type="button">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="prof-class-form">
          <div className="prof-form-section">
            <h3 className="prof-section-title">Información de la Clase</h3>
            
            <div className="prof-form-row">
              <div className="prof-form-group">
                <label htmlFor="title">
                  Título de la Clase <span className="prof-required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ej: Introducción a la Física"
                  className={errors.title ? 'prof-input-error' : ''}
                />
                {errors.title && <span className="prof-error-message">{errors.title}</span>}
              </div>

              <div className="prof-form-group">
                <label htmlFor="subject">
                  Materia <span className="prof-required">*</span>
                </label>
                <select 
                  id="subject"
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                  className={errors.subject ? 'prof-input-error' : ''}
                >
                  <option value="">Seleccionar materia</option>
                  <option value="Matemáticas">📐 Matemáticas</option>
                  <option value="Física">⚛️ Física</option>
                  <option value="Química">🧪 Química</option>
                  <option value="Historia">📜 Historia</option>
                  <option value="Inglés">🗣️ Inglés</option>
                  <option value="Programación">💻 Programación</option>
                  <option value="Biología">🧬 Biología</option>
                </select>
                {errors.subject && <span className="prof-error-message">{errors.subject}</span>}
              </div>
            </div>

            <div className="prof-form-group">
              <label htmlFor="studentName">
                Nombre del Estudiante <span className="prof-optional">(opcional)</span>
              </label>
              <div className="prof-input-with-icon">
                <span className="prof-input-icon">👤</span>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Nombre del estudiante"
                />
              </div>
            </div>
          </div>

          <div className="prof-form-section">
            <h3 className="prof-section-title">Programación</h3>
            
            <div className="prof-form-row prof-form-row-3">
              <div className="prof-form-group">
                <label htmlFor="date">
                  Fecha <span className="prof-required">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={errors.date ? 'prof-input-error' : ''}
                />
                {errors.date && <span className="prof-error-message">{errors.date}</span>}
              </div>

              <div className="prof-form-group">
                <label htmlFor="time">
                  Hora <span className="prof-required">*</span>
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={errors.time ? 'prof-input-error' : ''}
                />
                {errors.time && <span className="prof-error-message">{errors.time}</span>}
              </div>

              <div className="prof-form-group">
                <label htmlFor="duration">
                  Duración (min) <span className="prof-required">*</span>
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                  <option value="120">120 min</option>
                </select>
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
                    placeholder="5.00"
                    className={errors.price ? 'prof-input-error' : ''}
                  />
                </div>
                {errors.price && <span className="prof-error-message">{errors.price}</span>}
              </div>

              <div className="prof-form-group">
                <label htmlFor="status">Estado</label>
                <select 
                  id="status"
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange}
                >
                  <option value="active">✅ Activa</option>
                  <option value="completed">✔️ Completada</option>
                  <option value="cancelled">❌ Cancelada</option>
                </select>
              </div>
            </div>

            <div className="prof-form-group">
              <label htmlFor="description">
                Descripción / Notas <span className="prof-optional">(opcional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Detalles adicionales sobre la clase, temas a tratar, materiales necesarios..."
              />
              <div className="prof-char-count">
                {formData.description.length} caracteres
              </div>
            </div>
          </div>

          <div className="prof-modal-footer">
            <button type="button" className="prof-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="prof-btn-save">
              {classData ? '💾 Guardar Cambios' : '✨ Crear Clase'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassFormModal;