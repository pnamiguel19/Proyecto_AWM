import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2>Perfil</h2>
            <div className="menu-item active">
                <div className="menu-icon">👤</div>
                <span>Información sobre mí</span>
            </div>
            <div className="menu-item">
                <div className="menu-icon">✈️</div>
                <span>Viajes anteriores</span>
            </div>
            <div className="menu-item">
                <div className="menu-icon">👥</div>
                <span>Conexiones</span>
            </div>
        </aside>
    );
};

export default Sidebar;