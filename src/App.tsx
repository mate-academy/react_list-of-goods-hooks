import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList';

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
  const [isReverse, setIsReverse] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [minLength, setMinLength] = useState(1);
  const [goods] = useState(goodsFromServer);

  const start = () => setIsStarted(true);

  const reverse = () => setIsReverse(!isReverse);

  const sortAlphabetically = () => {
    setSortBy('alphabet');
    setIsReverse(false);
  };

  const reset = () => {
    setSortBy('');
    setIsReverse(false);
    setMinLength(1);
  };

  const sortByLength = () => {
    setSortBy('length');
    setIsReverse(false);
  };

  const setLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const length = +event.target.value;

    setMinLength(length);
  };

  const options = Array.from(Array(10).keys());

  return (
    <div className="App">
      <h1>Goods</h1>

      <button type="button" onClick={start}>
        Start
      </button>

      {isStarted && (
        <>
          <GoodsList
            reverse={isReverse}
            sortBy={sortBy}
            goods={goods}
            minLength={minLength}
          />

          <button type="button" onClick={reverse}>
            Reverse
          </button>

          <button type="button" onClick={sortAlphabetically}>
            Sort alphabetically
          </button>

          <button type="button" onClick={reset}>
            Reset
          </button>

          <button type="button" onClick={sortByLength}>
            Sort by length
          </button>

          <select onChange={setLimit} value={minLength}>
            {options.map((option) => (
              <option key={option} value={option + 1}>
                {option + 1}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default App;
