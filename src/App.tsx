import React, { useState } from 'react';
import MainContent from './MainContent';
import './App.css';

const App: React.FC = () => {
  const [isStarted, setStart] = useState(false);

  return (
    <div className="App">
      { isStarted
        ? <MainContent />
        : <button type="button" onClick={() => setStart(true)}>Start</button>}
    </div>
  );
};

export default App;
