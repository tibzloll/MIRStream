import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Watch from './pages/Watch';

const App = () => {
  useEffect(() => {
    console.log('App mounted - check network requests');
  }, []);

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:mediaType/:id" element={<Watch />} />
      </Routes>
    </div>
  );
};

export default App;
