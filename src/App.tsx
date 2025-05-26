import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
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

export const App: React.FC = () => {
  const [selectedGood, setSelectedGood] = useState('');
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);

  const handleReset = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
  };

  const handleSortAlpha = () => {
    const sorted = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(sorted);
    setIsReversed(false);
  };

  const handleSortLength = () => {
    const sorted = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sorted);
    setIsReversed(false);
  };

  const handleReverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">
          {selectedGood ? `${selectedGood} is selected` : 'No goods selected'}
        </h1>

        <div className="buttons">
          <button
            type="button"
            className="button is-info is-light"
            onClick={handleSortAlpha}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="button is-success is-light"
            onClick={handleSortLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className="button is-warning is-light"
            onClick={handleReverse}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <ul>
          {goods.map(good => (
            <li
              key={good}
              data-cy="Good"
              onClick={() => setSelectedGood(good)}
              style={{
                cursor: 'pointer',
                fontWeight: selectedGood === good ? 'bold' : 'normal',
              }}
            >
              {good}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
