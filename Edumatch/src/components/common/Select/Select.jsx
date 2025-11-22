import './Select.css';

const Select = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false,
  error,
  placeholder = 'Selecciona una opción'
}) => {
  return (
    <div className="select-group">
      {label && (
        <label className="select-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`select-field ${error ? 'select-error' : ''}`}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Select;