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
                    <a href="#funcionamiento" className="header__link">¿Cómo funciona?</a>
                    <a href="#registro" className="header__link">Regístrate</a>
                    <a href="#postula" className="header__link">Postúlate</a>
                </nav>
                <form className="header__search" role="search" aria-label="Búsqueda principal">
                    <input type="text" aria-label="Campo de búsqueda" placeholder="Buscar clases o profesores" />
                    <button type="submit" className="header__search-button" aria-label="Buscar">🔍</button>
                </form>
            </div>
        </header>
    );
};

export default Header;