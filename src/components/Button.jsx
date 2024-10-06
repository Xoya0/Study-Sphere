import React from 'react';
import './Button.css';

export const Button = ({ children, primary, onClick }) => {
    return (
        <button
            className={`button ${primary ? 'primary' : 'secondary'}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};