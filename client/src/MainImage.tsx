import React from 'react';
import webscrapeImage from './webscrape.png';
import './App.sass';

const MainImage: React.FC = () => {
  return (
    <div className="main-image-container">
      <img src={webscrapeImage} alt="Web Scraping" className="webscrape-image" />
    </div>
  );
};

export default MainImage;
