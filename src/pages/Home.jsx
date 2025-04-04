import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MediaGrid from '../components/MediaGrid';
import '../styles/Home.css';

const Home = () => {
  const [media, setMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('all');
  const navigate = useNavigate();
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  // Unified search function
  const searchMedia = async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${query}`
      );
      setMedia(response.data.results);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Handle search with debounce
  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (searchTerm) {
        searchMedia(searchTerm);
      } else {
        // Load trending when search is empty
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`)
          .then(res => setMedia(res.data.results));
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  return (
    <div className="home-page">
      <Header 
        mediaType={mediaType}
        setMediaType={setMediaType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <MediaGrid
        media={media.filter(item => 
          mediaType === 'all' || 
          item.media_type === mediaType
        )}
        handleMediaClick={(item) => navigate(`/watch/${item.media_type}/${item.id}`)}
      />
    </div>
  );
};

export default Home;
