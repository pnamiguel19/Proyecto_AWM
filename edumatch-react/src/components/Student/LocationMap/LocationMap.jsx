import React from 'react';
import './LocationMap.css';

const LocationMap = ({ location }) => {
  const address = location?.address || 'Ubicación no especificada';
  const mapUrl = location?.mapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.799152796609!2d-78.48838668523688!3d-0.18005369987180655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a10aa48c943%3A0x44f3448c143cd11c!2sUniversidad%20Central%20del%20Ecuador!5e0!3m2!1ses!2sec!4v1635789012345!5m2!1ses!2sec';

  return (
    <section className="map-section">
      <div className="container">
        <header className="section__header">
          <span aria-hidden="true">📍</span>
          <h3 className="section__title">Ubicación para clases presenciales</h3>
        </header>

        <div className="map-address">
          <span className="map-address__icon">📌</span>
          <div className="map-address__text">
            <strong>Dirección:</strong> {address}
          </div>
        </div>

        <div className="map-container">
          <iframe 
            src={mapUrl}
            title="Ubicación para clases presenciales"
            allowFullScreen
            loading="lazy">
          </iframe>
        </div>

        <p className="map-description">
          Las clases presenciales se realizan en esta ubicación o puedo desplazarme dentro de la ciudad 
          según tus necesidades. También ofrezco clases virtuales mediante plataformas como Zoom o Google Meet.
        </p>
      </div>
    </section>
  );
};

export default LocationMap;
