import './Card.css';

const Card = ({ icon, title, description, isSelected, onClick }) => {
  return (
    <div 
      className={`card ${isSelected ? 'card-selected' : ''}`}
      onClick={onClick}
    >
      {isSelected && <div className="card-check">✓</div>}
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;