const Header = ({ mediaType, setMediaType, searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">StreamFlix</h1>
        
        <div className="type-tabs">
          <button
            className={`type-tab ${mediaType === 'all' ? 'active' : ''}`}
            onClick={() => setMediaType('all')}
          >
            All
          </button>
          <button
            className={`type-tab ${mediaType === 'movie' ? 'active' : ''}`}
            onClick={() => setMediaType('movie')}
          >
            Movies
          </button>
          <button
            className={`type-tab ${mediaType === 'tv' ? 'active' : ''}`}
            onClick={() => setMediaType('tv')}
          >
            TV Shows
          </button>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search movies and TV shows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};
