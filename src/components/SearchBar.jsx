import React from 'react';
import './SearchBar.css';

export const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
        </div>
    );
};