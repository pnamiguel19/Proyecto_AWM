import './Textarea.css';

const Textarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  rows = 4,
  minLength,
  maxLength,
  showCharCount = false
}) => {
  return (
    <div className="textarea-group">
      {label && (
        <label className="textarea-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`textarea-field ${error ? 'textarea-error' : ''}`}
        rows={rows}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
      <div className="textarea-footer">
        {error && <span className="error-message">{error}</span>}
        {showCharCount && maxLength && (
          <span className="char-count">
            {value.length} / {maxLength}
          </span>
        )}
      </div>
      {!error && minLength && (
        <span className="helper-text">Mínimo {minLength} caracteres</span>
      )}
    </div>
  );
};

export default Textarea;