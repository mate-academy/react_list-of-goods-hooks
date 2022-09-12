import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList/GoodsList';

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
  };

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={start}
          >
            Start
          </button>
        )
        : (
          <GoodsList />
        )}
    </div>
  );
};
