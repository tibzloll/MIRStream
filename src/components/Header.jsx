import React from 'react';
import { FiFilm, FiTv, FiSearch } from 'react-icons/fi';
import '../styles/Header.css';

const Header = ({ mediaType, setMediaType, searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">StreamFlix</h1>
        
        <nav className="nav-container">
          <button
            className={`nav-btn ${mediaType === 'movie' ? 'active' : ''}`}
            onClick={() => setMediaType('movie')}
          >
            <FiFilm className="nav-icon" /> Movies
          </button>
          <button
            className={`nav-btn ${mediaType === 'tv' ? 'active' : ''}`}
            onClick={() => setMediaType('tv')}
          >
            <FiTv className="nav-icon" /> TV Shows
          </button>
        </nav>

        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
