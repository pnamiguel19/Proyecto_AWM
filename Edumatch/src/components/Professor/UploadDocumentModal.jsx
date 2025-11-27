import React, { useState } from 'react';
import './UploadDocumentModal.css';

const UploadDocumentModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de archivo no permitido. Solo se aceptan PDF, JPG y PNG.');
      return;
    }
    
    if (file.size > maxSize) {
      alert('El archivo excede el tamaño máximo de 5MB.');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    if (!documentType) {
      alert('Por favor selecciona el tipo de documento.');
      return;
    }
    
    if (!selectedFile) {
      alert('Por favor selecciona un archivo.');
      return;
    }
    
    // Llamar función de callback con los datos
    if (onUpload) {
      onUpload({
        type: documentType,
        description: description,
        file: selectedFile
      });
    }
    
    // Reset form
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setDocumentType('');
    setDescription('');
    setSelectedFile(null);
    setDragActive(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch(extension) {
      case 'pdf': return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️';
      default: return '📎';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="udm-overlay" onClick={handleClose}>
      <div className="udm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="udm-header">
          <h2 className="udm-title">Subir Nuevo Documento</h2>
          <button className="udm-close-btn" onClick={handleClose}>✕</button>
        </div>
        
        <div className="udm-body">
          {/* TIPO DE DOCUMENTO */}
          <div className="udm-form-group">
            <label className="udm-form-label">
              Tipo de Documento <span className="udm-required">*</span>
            </label>
            <select 
              className="udm-form-select"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Seleccionar tipo...</option>
              <option value="titulo">Título Universitario</option>
              <option value="cedula">Cédula Profesional</option>
              <option value="identificacion">Identificación Oficial</option>
              <option value="idiomas">Certificación de Idiomas</option>
              <option value="antecedentes">Antecedentes Penales</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="udm-form-group">
            <label className="udm-form-label">Descripción</label>
            <textarea 
              className="udm-form-textarea" 
              rows="3" 
              placeholder="Describe el documento (opcional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* ÁREA DE SUBIDA */}
          <div className="udm-form-group">
            <label className="udm-form-label">
              Archivo <span className="udm-required">*</span>
            </label>
            <div 
              className={`udm-upload-area ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !selectedFile && document.getElementById('udm-fileInput').click()}
            >
              {!selectedFile ? (
                <>
                  <div className="udm-upload-icon">📤</div>
                  <p className="udm-upload-text">Arrastra el archivo aquí o haz clic para seleccionar</p>
                  <p className="udm-upload-info">PDF, JPG, PNG (Max 5MB)</p>
                  <input 
                    type="file" 
                    id="udm-fileInput"
                    className="udm-upload-input" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileInput}
                  />
                </>
              ) : (
                <div className="udm-file-preview">
                  <div className="udm-file-info">
                    <div className="udm-file-icon">{getFileIcon(selectedFile.name)}</div>
                    <div className="udm-file-details">
                      <p className="udm-file-name">{selectedFile.name}</p>
                      <p className="udm-file-size">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                  <button 
                    className="udm-remove-file"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    title="Eliminar archivo"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CONSEJOS */}
          <div className="udm-tips">
            <p className="udm-tips-title">💡 Consejos para una mejor revisión:</p>
            <ul className="udm-tips-list">
              <li>Asegúrate de que el documento esté completo y legible</li>
              <li>Usa buena iluminación si es una fotografía</li>
              <li>Evita reflejos o sombras en el documento</li>
              <li>Verifica que todos los datos sean visibles</li>
            </ul>
          </div>
        </div>

        <div className="udm-footer">
          <button className="udm-btn-cancel" onClick={handleClose}>
            Cancelar
          </button>
          <button 
            className="udm-btn-submit"
            onClick={handleSubmit}
            disabled={!documentType || !selectedFile}
          >
            Subir Documento
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;