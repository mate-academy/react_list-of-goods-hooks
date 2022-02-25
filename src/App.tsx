import React, { useState } from 'react';
import './App.css';

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [initialOrder] = useState([...goodsFromServer]);
  const [actualOrder, setActualOrder] = useState([...goodsFromServer]);

  const start = () => {
    setIsStarted(true);
  };

  const sortAlphabetically = () => {
    setActualOrder([...actualOrder].sort());
  };

  const sortReverse = () => {
    setActualOrder([...actualOrder].reverse());
  };

  const sortByLength = () => {
    setActualOrder([...actualOrder].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setActualOrder([...initialOrder]);
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {isStarted && (
        <ul className="list">
          {actualOrder.map(good => (
            <li
              key={good}
              className="list__item"
            >
              {good}
            </li>
          ))}
        </ul>
      )}

      {!isStarted && (
        <button
          type="button"
          className="button"
          onClick={start}
        >
          Start
        </button>
      )}

      {isStarted && (
        <div className="buttons__container">
          <button
            type="button"
            className="button"
            onClick={sortAlphabetically}
          >
            Sort Alphabetically
          </button>

          <button
            type="button"
            className="button"
            onClick={sortReverse}
          >
            Reverse Sort
          </button>

          <button
            type="button"
            className="button"
            onClick={reset}
          >
            Reset
          </button>

          <button
            type="button"
            className="button"
            onClick={sortByLength}
          >
            Sort by length
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
