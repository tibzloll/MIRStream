import React from 'react';
import '../styles/MediaGrid.css';

const MediaGrid = ({ media, mediaType, searchTerm, handleMediaClick }) => {
  const filteredMedia = media.filter(item => {
    const matchesType = item.media_type === mediaType;
    const matchesSearch = (item.title || item.name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="media-grid">
      {filteredMedia.map((item) => (
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
          <div className="media-overlay">
            <h3 className="media-title">{item.title || item.name}</h3>
            <p className="media-year">
              {(item.release_date || item.first_air_date)?.split('-')[0]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
