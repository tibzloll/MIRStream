import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SeasonSelector from '../components/SeasonSelector';
import '../styles/Watch.css';

const Watch = () => {
  const { id, mediaType } = useParams();
  const navigate = useNavigate();
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [seasons, setSeasons] = useState([]);
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchSeasons = async () => {
      if (mediaType === 'tv') {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}`
          );
          setSeasons(response.data.seasons.filter(s => s.season_number > 0));
        } catch (error) {
          console.error('Error fetching seasons:', error);
        }
      }
    };
    fetchSeasons();
  }, [id, mediaType]);

  return (
    <div className="watch-page">
      <div className="player-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr; Back
        </button>

        {mediaType === 'tv' && (
          <SeasonSelector
            seasons={seasons}
            selectedSeason={selectedSeason}
            setSelectedSeason={setSelectedSeason}
            selectedEpisode={selectedEpisode}
            setSelectedEpisode={setSelectedEpisode}
          />
        )}

        <iframe
          src={
            mediaType === 'movie'
              ? `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`
              : `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`
          }
          title="video-player"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Watch;
