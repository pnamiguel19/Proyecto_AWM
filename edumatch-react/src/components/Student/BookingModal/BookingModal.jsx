import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, teacher, onConfirm }) => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    modality: 'online',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookingData.date || !bookingData.time) {
      alert('Por favor selecciona fecha y hora');
      return;
    }

    setLoading(true);
    try {
      await onConfirm(bookingData);
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getPrice = () => {
    if (bookingData.modality === 'online') {
      return teacher?.hourlyRate || 0;
    }
    return (teacher?.hourlyRate || 0) + 5;
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="booking-modal__header">
          <h2>Agendar Clase</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="booking-modal__teacher-info">
          <div className="teacher-avatar">
            {teacher?.firstName?.charAt(0)}{teacher?.lastName?.charAt(0)}
          </div>
          <div className="teacher-details">
            <h3>{teacher?.firstName} {teacher?.lastName}</h3>
            <p className="teacher-subjects">{teacher?.subjects?.join(', ')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="date">Fecha de la clase *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={bookingData.date}
              onChange={handleChange}
              min={getTodayDate()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Hora *</label>
            <select
              id="time"
              name="time"
              value={bookingData.time}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una hora</option>
              <option value="08:00 AM">08:00 AM</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="06:00 PM">06:00 PM</option>
              <option value="07:00 PM">07:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="modality">Modalidad *</label>
            <div className="modality-options">
              <label className={`modality-option ${bookingData.modality === 'online' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="modality"
                  value="online"
                  checked={bookingData.modality === 'online'}
                  onChange={handleChange}
                />
                <span className="option-icon">💻</span>
                <span className="option-text">Online</span>
                <span className="option-price">S/. {teacher?.hourlyRate || 0}</span>
              </label>
              <label className={`modality-option ${bookingData.modality === 'in_person' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="modality"
                  value="in_person"
                  checked={bookingData.modality === 'in_person'}
                  onChange={handleChange}
                />
                <span className="option-icon">🏫</span>
                <span className="option-text">Presencial</span>
                <span className="option-price">S/. {(teacher?.hourlyRate || 0) + 5}</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Materia</label>
            <select
              id="subject"
              name="subject"
              value={bookingData.subject}
              onChange={handleChange}
            >
              <option value="">Selecciona una materia</option>
              {teacher?.subjects?.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje adicional (opcional)</label>
            <textarea
              id="message"
              name="message"
              value={bookingData.message}
              onChange={handleChange}
              rows="3"
              placeholder="Escribe algún comentario o solicitud especial..."
            />
          </div>

          <div className="booking-summary">
            <div className="summary-row">
              <span>Duración:</span>
              <span>1 hora</span>
            </div>
            <div className="summary-row">
              <span>Modalidad:</span>
              <span>{bookingData.modality === 'online' ? 'Online' : 'Presencial'}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>S/. {getPrice()}</span>
            </div>
          </div>

          <div className="booking-modal__actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-confirm" disabled={loading}>
              {loading ? 'Procesando...' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
