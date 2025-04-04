import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const TMDB_API_KEY = '1caf3d8d76372de72d054a395eba76';

  // Fetch trending movies
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrending();
  }, []);

  // Handle search
  useEffect(() => {
    const searchMovies = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}`
          );
          setSearchResults(response.data.results);
        } catch (error) {
          console.error('Error searching movies:', error);
        }
      }
    };

    const debounceSearch = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  // Handle movie selection
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Close video player
  const closePlayer = () => {
    setSelectedMovie(null);
  };

  const displayMovies = searchTerm ? searchResults : movies;

  return (
    <div className="app">
      <header className="header">
        <h1>MIStream</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="movie-grid">
        {displayMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="video-player">
          <div className="video-overlay" onClick={closePlayer}></div>
          <div className="video-content">
            <button className="close-btn" onClick={closePlayer}>
              &times;
            </button>
            <iframe
              src={`https://superembed.stream/embed/movie/${selectedMovie.id}`}
              title={selectedMovie.title}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
