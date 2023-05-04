import React from 'react';
import './App.sass';
import DataList from './DataList';
import { Container } from 'react-bootstrap';
import MainImage from './MainImage';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web Scraper</h1>
      </header>
      <main className="main-container">
        <MainImage />
        <Container fluid className="py-5">
          <DataList />
        </Container>
      </main>
    </div>
  );
};

export default App;
