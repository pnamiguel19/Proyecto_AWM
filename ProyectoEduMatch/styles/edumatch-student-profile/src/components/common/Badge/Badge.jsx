import React from 'react';
import './Badge.css';

const Badge = ({ text, color = 'blue' }) => {
    return (
        <span className={`badge badge--${color}`}>
            {text}
        </span>
    );
};

export default Badge;