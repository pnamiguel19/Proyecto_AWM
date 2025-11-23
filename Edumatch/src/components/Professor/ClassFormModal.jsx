import React, { useState, useEffect } from 'react';
import './ClassFormModal.css';

const ClassFormModal = ({ isOpen, onClose, classData, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    studentName: '',
    date: '',
    time: '',
    duration: '',
    price: '',
    description: '',
    status: 'active'
  });

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
        duration: '',
        price: '',
        description: '',
        status: 'active'
      });
    }
  }, [classData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="prof-modal-header">
          <h2>{classData ? 'Editar Clase' : 'Crear Nueva Clase'}</h2>
          <button className="prof-modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="prof-class-form">
          <div className="prof-form-row">
            <div className="prof-form-group">
              <label>Título de la Clase *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Introducción a la Física"
                required
              />
            </div>

            <div className="prof-form-group">
              <label>Materia *</label>
              <select name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="">Seleccionar</option>
                <option value="Matemáticas">Matemáticas</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
                <option value="Historia">Historia</option>
                <option value="Inglés">Inglés</option>
              </select>
            </div>
          </div>

          <div className="prof-form-group">
            <label>Nombre del Estudiante</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Nombre del estudiante"
            />
          </div>

          <div className="prof-form-row">
            <div className="prof-form-group">
              <label>Fecha *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="prof-form-group">
              <label>Hora *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="prof-form-group">
              <label>Duración (min)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="60"
              />
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
                placeholder="$5"
                required
              />
            </div>

            <div className="prof-form-group">
              <label>Estado</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Activa</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
          </div>

          <div className="prof-form-group">
            <label>Descripción / Notas</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Detalles adicionales sobre la clase..."
            />
          </div>

          <div className="prof-modal-footer">
            <button type="button" className="prof-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="prof-btn-save">
              {classData ? 'Guardar Cambios' : 'Crear Clase'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassFormModal;