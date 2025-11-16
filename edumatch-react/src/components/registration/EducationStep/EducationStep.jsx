import React, { useState } from 'react';
import './EducationStep.css';

const EducationStep = ({ formData, onChange }) => {
  const [certificates, setCertificates] = useState(formData.certificates || []);
  const [degreeFile, setDegreeFile] = useState(formData.degreeFile || null);
  const [professionalIdFile, setProfessionalIdFile] = useState(formData.professionalIdFile || null);

  const handleAddCertificate = () => {
    const newCertificate = {
      name: '',
      institution: '',
      file: null
    };
    const updated = [...certificates, newCertificate];
    setCertificates(updated);
    onChange('certificates', updated);
  };

  const handleCertificateChange = (index, field, value) => {
    const updated = [...certificates];
    updated[index][field] = value;
    setCertificates(updated);
    onChange('certificates', updated);
  };

  const handleCertificateFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...certificates];
      updated[index].file = file;
      setCertificates(updated);
      onChange('certificates', updated);
    }
  };

  const handleDegreeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDegreeFile(file);
      onChange('degreeFile', file);
    }
  };

  const handleProfessionalIdChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfessionalIdFile(file);
      onChange('professionalIdFile', file);
    }
  };

  console.log('EducationStep renderizado');

  return (
    <section className="form-step">
      <div className="step-header">
        <h2>🎓 Formación Académica y Títulos</h2>
        <p>Sube tus documentos que avalen tu formación y experiencia como docente</p>
      </div>

      {/* Información Académica */}
      <div className="section-box">
        <div className="section-title">
          <span className="section-icon">📋</span>
          <h3>Información Académica</h3>
        </div>

        <div className="input-group full-width">
          <label htmlFor="degree">Título Universitario *</label>
          <input
            type="text"
            id="degree"
            value={formData.degree || ''}
            onChange={(e) => onChange('degree', e.target.value)}
            placeholder="Ej: Licenciatura en Física"
            required
          />
          <small className="input-hint">Título principal con el que enseñarás</small>
        </div>

        <div className="input-group full-width">
          <label htmlFor="university">Universidad *</label>
          <input
            type="text"
            id="university"
            value={formData.university || ''}
            onChange={(e) => onChange('university', e.target.value)}
            placeholder="Universidad Central del Ecuador"
            required
          />
        </div>

        <div className="input-group full-width">
          <label htmlFor="graduationYear">Año de Graduación *</label>
          <input
            type="number"
            id="graduationYear"
            value={formData.graduationYear || ''}
            onChange={(e) => onChange('graduationYear', e.target.value)}
            placeholder="2018"
            min="1950"
            max="2025"
            required
          />
        </div>

        <div className="input-group full-width">
          <label htmlFor="experience">Años de Experiencia Docente *</label>
          <select
            id="experience"
            value={formData.experience || ''}
            onChange={(e) => onChange('experience', e.target.value)}
            required
          >
            <option value="">Selecciona tu experiencia</option>
            <option value="0-1">Menos de 1 año</option>
            <option value="1-3">1 a 3 años</option>
            <option value="3-5">3 a 5 años</option>
            <option value="5-10">5 a 10 años</option>
            <option value="10+">Más de 10 años</option>
          </select>
        </div>
      </div>

      {/* Documentos de Respaldo */}
      <div className="section-box">
        <div className="section-title">
          <span className="section-icon">📄</span>
          <h3>Documentos de Respaldo</h3>
        </div>

        <div className="input-group full-width">
          <label>Título Universitario (PDF) *</label>
          <div className="file-upload-box">
            <input
              type="file"
              id="degreeFile"
              accept=".pdf"
              hidden
              onChange={handleDegreeFileChange}
            />
            <label htmlFor="degreeFile" className="file-upload-label">
              <span className="file-icon">📎</span>
              <span className="file-text">Subir PDF</span>
            </label>
          </div>
          {degreeFile && (
            <div className="file-uploaded">
              ✓ {degreeFile.name}
            </div>
          )}
        </div>

        <div className="input-group full-width">
          <label>Cédula Profesional (PDF) *</label>
          <div className="file-upload-box">
            <input
              type="file"
              id="professionalIdFile"
              accept=".pdf"
              hidden
              onChange={handleProfessionalIdChange}
            />
            <label htmlFor="professionalIdFile" className="file-upload-label">
              <span className="file-icon">📎</span>
              <span className="file-text">Subir PDF</span>
            </label>
          </div>
          {professionalIdFile && (
            <div className="file-uploaded">
              ✓ {professionalIdFile.name}
            </div>
          )}
        </div>
      </div>

      {/* Botón para agregar certificación */}
      <div className="section-box">
        <div className="section-title">
          <span className="section-icon">⭐</span>
          <h3>Certificaciones Adicionales (Opcional)</h3>
        </div>
        <p className="section-description">
          Cursos, diplomados, especializaciones u otros documentos que fortalezcan tu perfil
        </p>

        {certificates.map((cert, index) => (
          <div key={index} className="certificate-card">
            <div className="form-row">
              <div className="input-group">
                <label>Nombre de la Certificación</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                  placeholder="Ej: Diplomado en Pedagogía Digital"
                />
              </div>
              <div className="input-group">
                <label>Institución</label>
                <input
                  type="text"
                  value={cert.institution}
                  onChange={(e) => handleCertificateChange(index, 'institution', e.target.value)}
                  placeholder="Ej: Universidad Nacional"
                />
              </div>
            </div>

            <div className="file-upload-box-cert">
              <input
                type="file"
                id={`cert-file-${index}`}
                accept=".pdf"
                hidden
                onChange={(e) => handleCertificateFileChange(index, e)}
              />
              <label htmlFor={`cert-file-${index}`} className="file-upload-label-cert">
                <span className="file-icon">📎</span>
                <span className="file-text-cert">Subir PDF</span>
              </label>
            </div>
            {cert.file && (
              <div className="file-uploaded">
                ✓ {cert.file.name}
              </div>
            )}
          </div>
        ))}

        <button type="button" className="btn-add-certificate" onClick={handleAddCertificate}>
          <span className="plus-icon">+</span> Agregar Otra Certificación
        </button>
      </div>

      {/* Resumen de Documentos Cargados */}
      <div className="documents-summary-box">
        <div className="summary-title">
          <span className="summary-icon">📊</span>
          <h3>Resumen de Documentos Cargados</h3>
        </div>

        <div className="summary-list">
          <div className="summary-item">
            <span className="doc-label">Título Universitario:</span>
            <span className={`doc-badge ${degreeFile ? 'uploaded' : 'pending'}`}>
              {degreeFile ? '✓ Cargado' : '❌ Pendiente'}
            </span>
          </div>

          <div className="summary-item">
            <span className="doc-label">Cédula Profesional:</span>
            <span className={`doc-badge ${professionalIdFile ? 'uploaded' : 'pending'}`}>
              {professionalIdFile ? '✓ Cargado' : '❌ Pendiente'}
            </span>
          </div>

          <div className="summary-item">
            <span className="doc-label">Certificaciones Adicionales:</span>
            <span className="doc-badge info">
              {certificates.length} documento{certificates.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationStep;