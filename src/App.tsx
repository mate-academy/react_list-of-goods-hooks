import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './GoodList';

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
  const [initialOrder] = useState([...goodsFromServer]);
  const [isStarted, setIsStarted] = useState(false);
  const [actualOrder, setActualOrder] = useState([...goodsFromServer]);

  const start = () => {
    setIsStarted(true);
  };

  const sortAlphabetically = () => {
    setActualOrder([...actualOrder].sort());
  };

  const reverseItem = () => {
    setActualOrder([...actualOrder].reverse());
  };

  const reset = () => {
    setActualOrder([...initialOrder]);
  };

  const lengthSort = () => {
    setActualOrder([...actualOrder].sort((a, b) => a.length - b.length));
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {(isStarted) ? (
        <div>
          <GoodsList actualOrder={actualOrder} />
          <button
            type="button"
            className="button"
            onClick={reverseItem}
          >
            Reverse
          </button>
          <button
            type="button"
            className="button"
            onClick={sortAlphabetically}
          >
            Sort alphabetically
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
            onClick={lengthSort}
          >
            Sort by length
          </button>
        </div>
      )
        : (
          <button
            type="button"
            className="button"
            onClick={start}
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
