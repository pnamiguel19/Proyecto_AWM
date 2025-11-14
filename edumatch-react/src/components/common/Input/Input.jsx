import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  onBlur,
  error, 
  required = false,
  placeholder = '',
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required"> *</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={error ? 'input-error' : ''}
        aria-required={required}
        aria-invalid={!!error}
        {...props}
      />
      {error && <small className="error-message">{error}</small>}
    </div>
  );
};

export default Input;