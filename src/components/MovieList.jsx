import React from 'react';
import '../styles/Home.css';

const MovieList = () => {
  return (
    <div className="movie-list">
      <div className="movie-section">
        <h2 className="section-title">A Missend Movie</h2>
        <div className="movie-grid">
          {/* Movie cards */}
          <div className="movie-card">
            <img 
              src="path/to/poster.jpg" 
              className="movie-poster" 
              alt="Black Big"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
            />
            <div className="movie-info">
              <h3 className="movie-title">Black Big</h3>
              <p className="movie-year">2021</p>
            </div>
          </div>
          {/* Repeat for other movies */}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
