import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;