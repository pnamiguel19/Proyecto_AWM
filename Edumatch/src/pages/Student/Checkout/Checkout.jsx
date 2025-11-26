import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppointmentSummary from '../../../components/Student/AppointmentSummary/AppointmentSummary';
import PriceBreakdown from '../../../components/Student/PriceBreakdown/PriceBreakdown';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recibir datos del agendamiento desde ScheduleClass
    if (location.state?.appointmentData) {
      setAppointmentData(location.state.appointmentData);
      setLoading(false);
    } else {
      // Si no hay datos, redirigir al home
      console.error('No hay datos de agendamiento');
      navigate('/');
    }
  }, [location, navigate]);

  const handleConfirmAppointment = () => {
    // Guardar agendamiento en localStorage
    const appointments = JSON.parse(localStorage.getItem('edumatch_appointments') || '[]');
    
    const confirmedAppointment = {
      ...appointmentData,
      status: 'confirmed',
      confirmedAt: new Date().toISOString()
    };

    appointments.push(confirmedAppointment);
    localStorage.setItem('edumatch_appointments', JSON.stringify(appointments));

    console.log('✅ Agendamiento confirmado:', confirmedAppointment);

    // Mostrar mensaje de éxito y redirigir
    alert('¡Agendamiento realizado con éxito! 🎉');
    navigate('/student/my-classes');
  };

  if (loading) {
    return (
      <div className="checkout-loading">
        <p>Cargando datos del agendamiento...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Header */}
        <div className="checkout-header">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
          <h1>Finalizar Agendamiento</h1>
        </div>

        {/* Content */}
        <div className="checkout-content">
          {/* Resumen del agendamiento */}
          <AppointmentSummary appointmentData={appointmentData} />

          {/* Desglose de precios */}
          <PriceBreakdown appointmentData={appointmentData} />

          {/* Botón de confirmación */}
          <button 
            className="confirm-button"
            onClick={handleConfirmAppointment}
          >
            💳 Realizar Agendamiento
          </button>

          <p className="checkout-disclaimer">
            Al confirmar, aceptas los términos y condiciones de EduMatch
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;