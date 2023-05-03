import React from 'react';
import './App.css';
import DataList from './DataList';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Container fluid>
          <h1>Web Scraping Display</h1>
        </Container>
      </header>
      <main>
        <Container fluid className="py-5">
          <DataList />
        </Container>
      </main>
    </div>
  );
};

export default App;
