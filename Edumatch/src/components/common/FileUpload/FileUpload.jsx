import { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ 
  label, 
  name, 
  onChange, 
  required = false,
  error,
  accept = "image/*",
  maxSize = 5 // MB
}) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validar tamaño
      if (file.size > maxSize * 1024 * 1024) {
        alert(`El archivo debe ser menor a ${maxSize}MB`);
        return;
      }

      setFileName(file.name);
      
      // Crear preview si es imagen
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
      
      onChange(e);
    }
  };

  return (
    <div className="file-upload-group">
      {label && (
        <label className="file-upload-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      
      <div className={`file-upload-area ${error ? 'file-upload-error' : ''}`}>
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          accept={accept}
          required={required}
          className="file-upload-input"
          id={`file-${name}`}
        />
        
        <label htmlFor={`file-${name}`} className="file-upload-label-area">
          {preview ? (
            <div className="file-preview">
              <img src={preview} alt="Preview" />
            </div>
          ) : (
            <div className="file-upload-placeholder">
              <span className="upload-icon">📷</span>
              <span className="upload-text">Subir foto</span>
              <span className="upload-hint">JPG, PNG o GIF (máx. {maxSize}MB)</span>
            </div>
          )}
        </label>
        
        {fileName && <p className="file-name">{fileName}</p>}
      </div>
      
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FileUpload;