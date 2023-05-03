import React from 'react';
import './App.css';
import DataList from './DataList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web Scraping Display</h1>
      </header>
      <main>
        <DataList />
      </main>
    </div>
  );
};

export default App;
