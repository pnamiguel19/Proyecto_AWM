import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserTypeSelection.css';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="user-type-selection">
      <div className="selection-container">
        <div className="selection-header">
          <h1 className="selection-title">¡Bienvenido a EduMatch! 🎓</h1>
          <p className="selection-subtitle">Selecciona cómo deseas unirte a nuestra comunidad</p>
        </div>

        <div className="selection-cards">
          {/* Card de Estudiante */}
          <div 
            className="selection-card student-card"
            onClick={() => navigate('/register/student')}
          >
            <div className="card-icon">👨‍🎓</div>
            <h2 className="card-title">Soy Estudiante</h2>
            <p className="card-description">
              Encuentra profesores expertos y agenda clases personalizadas
            </p>
            <ul className="card-benefits">
              <li>✓ Acceso a miles de profesores</li>
              <li>✓ Clases online y presenciales</li>
              <li>✓ Horarios flexibles</li>
              <li>✓ Pago por clase</li>
            </ul>
            <button className="card-button student-button">
              Registrarme como Estudiante
            </button>
          </div>

          {/* Card de Profesor */}
          <div 
            className="selection-card professor-card"
            onClick={() => navigate('/register/professor')}
          >
            <div className="card-icon">👨‍🏫</div>
            <h2 className="card-title">Soy Profesor</h2>
            <p className="card-description">
              Comparte tu conocimiento y gana dinero enseñando
            </p>
            <ul className="card-benefits">
              <li>✓ Define tus propias tarifas</li>
              <li>✓ Gestiona tu horario</li>
              <li>✓ Enseña desde donde quieras</li>
              <li>✓ Construye tu reputación</li>
            </ul>
            <button className="card-button professor-button">
              Registrarme como Profesor
            </button>
          </div>
        </div>

        <div className="selection-footer">
          <p>¿Ya tienes una cuenta?</p>
          <button 
            className="login-link"
            onClick={() => navigate('/login')}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
