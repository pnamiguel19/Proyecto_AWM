import React from 'react';
import './LocationMap.css';

const LocationMap = ({ location }) => {
  // Construir URL de Google Maps embed
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location.address)}`;
  
  // URL alternativa sin API key (usando query)
  const mapUrlAlternative = `https://maps.google.com/maps?q=${encodeURIComponent(location.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="location-map">
      <h2 className="location-map__title">📍 Ubicación para clases presenciales</h2>
      
      <div className="location-map__address">
        <span className="location-map__icon">📌</span>
        <p className="location-map__address-text">
          <strong>Dirección:</strong> {location.address}
        </p>
      </div>

      <div className="location-map__container">
        <iframe
          src={mapUrlAlternative}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación del profesor"
        ></iframe>
      </div>

      <p className="location-map__note">
        Las clases presenciales se realizan en esta ubicación o puedo desplazarme dentro de Quito según tus necesidades. 
        También ofrezco clases virtuales mediante plataformas como Zoom o Google Meet.
      </p>
    </div>
  );
};

export default LocationMap;