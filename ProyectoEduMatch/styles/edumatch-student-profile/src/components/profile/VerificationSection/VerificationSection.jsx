import React from 'react';
import './VerificationSection.css';

const VerificationSection = () => {
    return (
        <div className="verification-section">
            <span className="shield-icon">🛡️</span>
            <p className="verification-text">Identidad verificada</p>
            <a href="#" className="verification-link">Verifica tu identidad</a>
        </div>
    );
};

export default VerificationSection;