import React from 'react';
import DataList from './DataList'; // Import DataList component
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div>
      <DataList /> {/* Use the DataList component */}
    </div>
  );
};

export default App;
