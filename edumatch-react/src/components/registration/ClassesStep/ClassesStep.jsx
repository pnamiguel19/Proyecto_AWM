import React, { useState } from 'react';
import './ClassesStep.css';
import './checkbox-grid.css';

const ClassesStep = ({ formData, onChange }) => {
  const [selectedSubjects, setSelectedSubjects] = useState(formData.subjects || []);
  const [selectedLevels, setSelectedLevels] = useState(formData.educationLevels || []);
  const [selectedModalities, setSelectedModalities] = useState(formData.teachingModalities || []);

  const subjects = [
    { id: 'matematicas', name: 'Matemáticas', icon: '🔢' },
    { id: 'fisica', name: 'Física', icon: '⚛️' },
    { id: 'quimica', name: 'Química', icon: '🧪' },
    { id: 'biologia', name: 'Biología', icon: '🧬' },
    { id: 'lengua', name: 'Lengua y Literatura', icon: '📚' },
    { id: 'ingles', name: 'Inglés', icon: '🇬🇧' },
    { id: 'historia', name: 'Historia', icon: '📜' },
    { id: 'geografia', name: 'Geografía', icon: '🌍' },
    { id: 'informatica', name: 'Informática', icon: '💻' },
    { id: 'arte', name: 'Arte', icon: '🎨' },
    { id: 'musica', name: 'Música', icon: '🎵' },
    { id: 'educacion-fisica', name: 'Educación Física', icon: '⚽' }
  ];

  const levels = [
    { id: 'elementary', name: 'Primaria', description: '1° a 6° grado' },
    { id: 'middle_school', name: 'Secundaria', description: '7° a 10° grado' },
    { id: 'high_school', name: 'Bachillerato', description: '1° a 3° año' },
    { id: 'university', name: 'Universidad', description: 'Nivel superior' },
    { id: 'postgraduate', name: 'Posgrado', description: 'Maestría y Doctorado' }
  ];

  const modalities = [
    { id: 'in_person', name: 'Presencial', icon: '🏫', description: 'En un lugar físico' },
    { id: 'online', name: 'En Línea', icon: '💻', description: 'Clases virtuales' },
    { id: 'hybrid', name: 'Híbrido', icon: '🔄', description: 'Combinación de ambas' }
  ];

  const handleSubjectToggle = (subjectId) => {
    const updated = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter(id => id !== subjectId)
      : [...selectedSubjects, subjectId];
    setSelectedSubjects(updated);
    onChange('subjects', updated);
  };

  const handleLevelToggle = (levelId) => {
    const updated = selectedLevels.includes(levelId)
      ? selectedLevels.filter(id => id !== levelId)
      : [...selectedLevels, levelId];
    setSelectedLevels(updated);
    onChange('educationLevels', updated);
  };

  const handleModalityToggle = (modalityId) => {
    const updated = selectedModalities.includes(modalityId)
      ? selectedModalities.filter(id => id !== modalityId)
      : [...selectedModalities, modalityId];
    setSelectedModalities(updated);
    onChange('teachingModalities', updated);
  };

  return (
    <section className="form-step">
      <div className="step-header">
        <h2>📚 Materias y Modalidades</h2>
        <p>Selecciona las materias que enseñas y los niveles educativos</p>
      </div>

      {/* Materias */}
      <div className="section-box">
        <div className="section-title">
          <span className="section-icon">📖</span>
          <h3>Materias que Enseñas *</h3>
        </div>
        <p className="section-description">Selecciona todas las materias que puedes enseñar</p>

        <div className="checkbox-grid">
          {subjects.map(subject => (
            <label key={subject.id} className="checkbox-card">
              <input
                type="checkbox"
                checked={selectedSubjects.includes(subject.id)}
                onChange={() => handleSubjectToggle(subject.id)}
              />
              <div className="card-content">
                <span className="card-icon">{subject.icon}</span>
                <span className="card-label">{subject.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Niveles Educativos */}
      <div className="section-box">
        <div className="section-title">
          <span className="section-icon">🎓</span>
          <h3>Niveles Educativos *</h3>
        </div>
        <p className="section-description">¿A qué niveles educativos puedes enseñar?</p>

        <div className="checkbox-grid levels">
          {levels.map(level => (
            <label key={level.id} className="checkbox-card level-card">
              <input
                type="checkbox"
                checked={selectedLevels.includes(level.id)}
                onChange={() => handleLevelToggle(level.id)}
              />
              <div className="card-content">
                <span className="card-label">{level.name}</span>
                <small className="card-description">{level.description}</small>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Modalidades */}
      <div className="section-box">
        <div className="section-title">
          <span className="section-icon">🌐</span>
          <h3>Modalidades de Enseñanza *</h3>
        </div>
        <p className="section-description">¿Cómo prefieres impartir tus clases?</p>

        <div className="checkbox-grid modalities">
          {modalities.map(modality => (
            <label key={modality.id} className="checkbox-card modality-card">
              <input
                type="checkbox"
                checked={selectedModalities.includes(modality.id)}
                onChange={() => handleModalityToggle(modality.id)}
              />
              <div className="card-content">
                <span className="card-icon">{modality.icon}</span>
                <span className="card-label">{modality.name}</span>
                <small className="card-description">{modality.description}</small>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Precio por Hora */}
      <div className="section-box">
        <div className="section-title">
          <span className="section-icon">💰</span>
          <h3>Tarifa por Hora</h3>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="hourlyRate">Precio por Hora (USD) *</label>
            <input
              type="number"
              id="hourlyRate"
              value={formData.hourlyRate || ''}
              onChange={(e) => onChange('hourlyRate', e.target.value)}
              placeholder="15"
              min="5"
              max="200"
              step="0.5"
              required
            />
            <small className="input-hint">Establece tu tarifa por hora de clase</small>
          </div>

          <div className="input-group">
            <label htmlFor="currency">Moneda</label>
            <select
              id="currency"
              value={formData.currency || 'USD'}
              onChange={(e) => onChange('currency', e.target.value)}
            >
              <option value="USD">USD - Dólar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="MXN">MXN - Peso Mexicano</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resumen de Selección */}
      <div className="selection-summary">
        <div className="summary-title">
          <span className="summary-icon">📊</span>
          <h3>Resumen de tu Selección</h3>
        </div>
        <div className="summary-list">
          <div className="summary-item">
            <span className="doc-label">Materias seleccionadas:</span>
            <span className="doc-badge info">{selectedSubjects.length} materia{selectedSubjects.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="summary-item">
            <span className="doc-label">Niveles educativos:</span>
            <span className="doc-badge info">{selectedLevels.length} nivel{selectedLevels.length !== 1 ? 'es' : ''}</span>
          </div>
          <div className="summary-item">
            <span className="doc-label">Modalidades:</span>
            <span className="doc-badge info">{selectedModalities.length} modalidad{selectedModalities.length !== 1 ? 'es' : ''}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassesStep;