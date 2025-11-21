import './Button.css';

const Button = ({ children, type = 'button', variant = 'primary', onClick, disabled, fullWidth }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full-width' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;