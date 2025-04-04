import React from 'react';

const SeasonSelector = ({
  seasons,
  selectedSeason,
  setSelectedSeason,
  selectedEpisode,
  setSelectedEpisode
}) => {
  return (
    <div className="season-selector">
      <div className="selector-group">
        <label>Season:</label>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
        >
          {seasons.map((season) => (
            <option key={season.season_number} value={season.season_number}>
              {season.season_number}
            </option>
          ))}
        </select>
      </div>

      <div className="selector-group">
        <label>Episode:</label>
        <select
          value={selectedEpisode}
          onChange={(e) => setSelectedEpisode(Number(e.target.value))}
        >
          {[...Array(10).keys()].map((ep) => (
            <option key={ep + 1} value={ep + 1}>
              {ep + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SeasonSelector;
