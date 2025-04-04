import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiPlay, FiX, FiTv, FiFilm } from 'react-icons/fi';
import axios from 'axios';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [media, setMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [seasons, setSeasons] = useState([]);
  const [mediaType, setMediaType] = useState('movie');
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;;

  // Fetch trending media
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const [movies, tvShows] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_API_KEY}`)
        ]);
        
        setMedia([
          ...movies.data.results.map(m => ({ ...m, media_type: 'movie' })),
          ...tvShows.data.results.map(t => ({ ...t, media_type: 'tv' }))
        ]);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };
    fetchTrending();
  }, []);

  // Fetch seasons for TV shows
  useEffect(() => {
    const fetchSeasons = async () => {
      if (selectedMedia?.media_type === 'tv') {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${selectedMedia.id}?api_key=${TMDB_API_KEY}`
          );
          setSeasons(response.data.seasons.filter(s => s.season_number > 0));
        } catch (error) {
          console.error('Error fetching seasons:', error);
        }
      }
    };
    fetchSeasons();
  }, [selectedMedia]);

  const handleMediaClick = (item) => {
    setSelectedMedia(item);
    setMediaType(item.media_type);
    setSelectedSeason(1);
    setSelectedEpisode(1);
  };

  const closePlayer = () => {
    setSelectedMedia(null);
    setSeasons([]);
  };

  return (
    <div className="app">
      <style>{`
        :root {
          --primary: #e50914;
          --dark: #141414;
          --light: #fff;
          --gray: #808080;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .app {
          background-color: var(--dark);
          color: var(--light);
          min-height: 100vh;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%);
          position: fixed;
          width: 100%;
          z-index: 1000;
        }

        .logo {
          color: var(--primary);
          font-size: 2rem;
          font-weight: bold;
        }

        .nav {
          display: flex;
          gap: 1rem;
        }

        .nav-btn {
          background: none;
          border: none;
          color: var(--light);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-btn.active {
          background-color: var(--primary);
        }

        .search-container input {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: none;
          background-color: rgba(255,255,255,0.1);
          color: var(--light);
          width: 200px;
        }

        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          padding: 5rem 2rem 2rem;
        }

        .media-card {
          position: relative;
          cursor: pointer;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 2/3;
        }

        .media-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-player {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-content {
          width: 90%;
          max-width: 1200px;
          background-color: var(--dark);
          border-radius: 8px;
          padding: 1rem;
          position: relative;
        }

        iframe {
          width: 100%;
          height: 500px;
          border: none;
          border-radius: 8px;
        }

        .season-selector {
          margin-bottom: 1rem;
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        select {
          padding: 0.5rem;
          background-color: rgba(255,255,255,0.1);
          border: none;
          color: white;
          border-radius: 4px;
        }
      `}</style>

      <header className="header">
        <div className="logo">StreamFlix</div>
        <div className="nav">
          <button
            className={`nav-btn ${mediaType === 'movie' ? 'active' : ''}`}
            onClick={() => setMediaType('movie')}
          >
            <FiFilm /> Movies
          </button>
          <button
            className={`nav-btn ${mediaType === 'tv' ? 'active' : ''}`}
            onClick={() => setMediaType('tv')}
          >
            <FiTv /> TV Shows
          </button>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="media-grid">
        {media
          .filter(item => 
            item.media_type === mediaType &&
            (item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
          )
          .map((item) => (
            <div
              key={item.id}
              className="media-card"
              onClick={() => handleMediaClick(item)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                }}
              />
            </div>
          ))}
      </div>

      {selectedMedia && (
        <div className="video-player">
          <div className="video-overlay" onClick={closePlayer}></div>
          <div className="video-content">
            <button className="nav-btn" onClick={closePlayer} style={{ position: 'absolute', top: '-40px', right: 0 }}>
              <FiX /> Close
            </button>
            
            {selectedMedia.media_type === 'tv' && (
              <div className="season-selector">
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                >
                  {seasons.map((season) => (
                    <option key={season.season_number} value={season.season_number}>
                      Season {season.season_number}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedEpisode}
                  onChange={(e) => setSelectedEpisode(e.target.value)}
                >
                  {[...Array(10).keys()].map((ep) => (
                    <option key={ep+1} value={ep+1}>
                      Episode {ep+1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <iframe
              src={
                selectedMedia.media_type === 'movie' 
                  ? `https://multiembed.mov/directstream.php?video_id=${selectedMedia.id}&tmdb=1`
                  : `https://multiembed.mov/directstream.php?video_id=${selectedMedia.id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`
              }
              title={selectedMedia.title || selectedMedia.name}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
