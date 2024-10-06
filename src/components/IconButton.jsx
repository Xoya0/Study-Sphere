import React from 'react';
import './IconButton.css';

export const IconButton = ({ icon, onClick }) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <i className={`icon-${icon}`}></i>
    </button>
  );
};