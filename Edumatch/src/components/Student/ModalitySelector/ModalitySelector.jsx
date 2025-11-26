import React from 'react';
import './ModalitySelector.css';

const ModalitySelector = ({ modality, onSelectModality, platform, onSelectPlatform }) => {
  const platforms = [
    { value: 'zoom', label: 'Zoom' },
    { value: 'teams', label: 'Teams' },
    { value: 'webex', label: 'Webex' },
    { value: 'meet', label: 'Google Meet' }
  ];

  return (
    <div className="modality-selector">
      <div className="modality-selector__section">
        <h2 className="modality-selector__title">Elige tu modalidad:</h2>
        <div className="modality-selector__buttons">
          <button
            onClick={() => onSelectModality('presencial')}
            className={`modality-selector__button ${
              modality === 'presencial' ? 'modality-selector__button--active' : ''
            }`}
          >
            <span className="modality-selector__icon">📍</span>
            Presencial
          </button>
          <button
            onClick={() => onSelectModality('virtual')}
            className={`modality-selector__button ${
              modality === 'virtual' ? 'modality-selector__button--active' : ''
            }`}
          >
            <span className="modality-selector__icon">💻</span>
            Virtual
          </button>
        </div>
      </div>

      {modality === 'virtual' && (
        <div className="modality-selector__section">
          <h2 className="modality-selector__title">El sitio donde vamos a llevar a cabo la clase:</h2>
          <div className="modality-selector__platforms">
            {platforms.map((plat) => (
              <label
                key={plat.value}
                className={`modality-selector__platform ${
                  platform === plat.value ? 'modality-selector__platform--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="platform"
                  value={plat.value}
                  checked={platform === plat.value}
                  onChange={(e) => onSelectPlatform(e.target.value)}
                  className="modality-selector__radio"
                />
                <span className="modality-selector__platform-label">{plat.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalitySelector;