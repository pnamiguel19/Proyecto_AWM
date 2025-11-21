import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <span className="logo-icon">🎓</span>
                    <span className="logo-text">EduMatch</span>
                </div>
                <nav className="header__nav">
                    <a href="/" className="header__link">Inicio</a>
                    <a href="/about" className="header__link">¿Cómo funciona?</a>
                    <a href="/register" className="header__link">Regístrate</a>
                    <a href="/login" className="header__link">Iniciar Sesión</a>
                </nav>
                <div className="header__search">
                    <input type="text" className="header__search-input" placeholder="Buscar..." />
                    <button className="header__search-button">🔍</button>
                </div>
            </div>
        </header>
    );
};

export default Header;