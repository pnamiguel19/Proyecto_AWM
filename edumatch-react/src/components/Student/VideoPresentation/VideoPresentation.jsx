import React from 'react';
import './VideoPresentation.css';

const VideoPresentation = ({ video }) => {
  return (
    <section className="section">
      <header className="section__header">
        <span aria-hidden="true">🎥</span>
        <h3 className="section__title">Video de presentación</h3>
      </header>
      <div className="video-wrapper">
        {video ? (
          <iframe
            src={video}
            title="Video de presentación del profesor"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="video-placeholder">▶️</div>
        )}
      </div>
      <p className="video-caption">
        Conoce más sobre mi metodología de enseñanza y cómo puedo ayudarte a alcanzar tus objetivos académicos
      </p>
    </section>
  );
};

export default VideoPresentation;
