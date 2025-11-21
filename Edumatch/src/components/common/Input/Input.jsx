import './Input.css';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  name 
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
    </div>
  );
};

export default Input;