import React from 'react';
import './VideoPresentation.css';

const VideoPresentation = ({ video }) => {
  return (
    <div className="video-presentation">
      <h2 className="video-presentation__title">🎥 Video de presentación</h2>
      <div className="video-presentation__container">
        <div className="video-presentation__player">
          <iframe
            src={video.url}
            title="Video de presentación del profesor"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="video-presentation__description">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoPresentation;