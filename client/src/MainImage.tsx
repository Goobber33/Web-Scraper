import React from 'react';
import webscrapeImage from './webscrape.png';
import './App.sass';

const MainImage: React.FC = () => {
  return (
    <div className="main-image-container">
      <div className="welcome-text">
        <p>
          Welcome to my web scraping project! I built this website to test and showcase my skills as a full stack developer. My goal is to demonstrate my ability to work with various technologies and create a visually appealing and functional application. Please scroll down to see the data collected and presented using web scraping techniques.
        </p>
      </div>
      <img src={webscrapeImage} alt="Web Scraping" className="webscrape-image" />
    </div>
  );
};

export default MainImage;
