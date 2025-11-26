import React from 'react';
import './LocationSelector.css';

const LocationSelector = ({ location, onSelectLocation, teacherLocation }) => {
  // Dirección del estudiante (mock - en producción vendría del perfil del usuario)
  const studentAddress = "Av. 6 de Diciembre N34-120 y Av. Ignacio de Veintimilla, Quito, Ecuador";
  
  const currentAddress = location === 'student' ? studentAddress : teacherLocation.address;
  
  // URL del mapa embebido de Google Maps
  const getMapUrl = (address) => {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="location-selector">
      <h2 className="location-selector__title">El sitio donde vamos a llevar a cabo la clase:</h2>
      
      <div className="location-selector__options">
        <label
          className={`location-selector__option ${
            location === 'student' ? 'location-selector__option--active' : ''
          }`}
        >
          <input
            type="radio"
            name="location"
            value="student"
            checked={location === 'student'}
            onChange={(e) => onSelectLocation(e.target.value)}
            className="location-selector__radio"
          />
          <div className="location-selector__option-content">
            <span className="location-selector__option-label">Mi ubicación:</span>
            <span className="location-selector__option-address">{studentAddress}</span>
          </div>
        </label>

        <label
          className={`location-selector__option ${
            location === 'teacher' ? 'location-selector__option--active' : ''
          }`}
        >
          <input
            type="radio"
            name="location"
            value="teacher"
            checked={location === 'teacher'}
            onChange={(e) => onSelectLocation(e.target.value)}
            className="location-selector__radio"
          />
          <div className="location-selector__option-content">
            <span className="location-selector__option-label">Ubicación del Profesor:</span>
            <span className="location-selector__option-address">{teacherLocation.address}</span>
          </div>
        </label>
      </div>

      <div className="location-selector__map-container">
        <div className="location-selector__map-header">
          <span className="location-selector__map-icon">📍</span>
          <div className="location-selector__map-info">
            <div className="location-selector__map-title">
              {location === 'student' ? 'Mi ubicación' : 'Ubicación del Profesor'}
            </div>
            <div className="location-selector__map-address">{currentAddress}</div>
          </div>
        </div>
        <div className="location-selector__map">
          <iframe
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={getMapUrl(currentAddress)}
            title="Ubicación de la clase"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;