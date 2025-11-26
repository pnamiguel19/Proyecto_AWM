import React from 'react';
import './PriceBreakdown.css';

const PriceBreakdown = ({ appointmentData }) => {
  const { totalHours, pricePerHour, modality } = appointmentData;

  // Calcular subtotal
  const subtotal = totalHours * parseFloat(pricePerHour);

  // Tarifa de servicio (5%)
  const serviceFeePercentage = 0.05;
  const serviceFee = subtotal * serviceFeePercentage;

  // Total final
  const total = subtotal + serviceFee;

  return (
    <div className="price-breakdown">
      <h2>💰 Desglose de Costos</h2>

      <div className="breakdown-table">
        {/* Subtotal */}
        <div className="breakdown-row">
          <div className="row-label">
            <span>Clases ({modality})</span>
            <span className="row-detail">
              {totalHours} hora{totalHours > 1 ? 's' : ''} × ${parseFloat(pricePerHour).toFixed(2)} USD
            </span>
          </div>
          <div className="row-value">
            ${subtotal.toFixed(2)} USD
          </div>
        </div>

        {/* Tarifa de servicio */}
        <div className="breakdown-row">
          <div className="row-label">
            <span>Tarifa de servicio</span>
            <span className="row-detail">({(serviceFeePercentage * 100).toFixed(0)}%)</span>
          </div>
          <div className="row-value">
            ${serviceFee.toFixed(2)} USD
          </div>
        </div>

        {/* Divider */}
        <div className="breakdown-divider"></div>

        {/* Total */}
        <div className="breakdown-row total-row">
          <div className="row-label">
            <span>Total a pagar</span>
          </div>
          <div className="row-value total-value">
            ${total.toFixed(2)} USD
          </div>
        </div>
      </div>

      <div className="payment-info">
        <p>💳 Métodos de pago aceptados: Tarjeta de crédito/débito, PayPal</p>
      </div>
    </div>
  );
};

export default PriceBreakdown;