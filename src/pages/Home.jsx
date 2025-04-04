import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MediaGrid from '../components/MediaGrid';
import MovieList from '../components/MovieList';
import '../styles/Home.css';

const Home = () => {
  const [media, setMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('movie');
  const navigate = useNavigate();
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

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

  const handleMediaClick = (item) => {
    navigate(`/watch/${item.media_type}/${item.id}`);
  };

  const Home = () => {
  return (
    <div className="home-page">
      <MovieList />
    </div>
  );
};

  return (
    <div className="home-page">
      <Header 
        mediaType={mediaType}
        setMediaType={setMediaType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <MediaGrid
        media={media}
        mediaType={mediaType}
        searchTerm={searchTerm}
        handleMediaClick={handleMediaClick}
      />
    </div>
  );
};

export default Home;
