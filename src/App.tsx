/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './App.css';

const goodsFromServer = [
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
  const [isStarted, letStart] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSort] = useState('');

  const reverse = () => (
    setReverse(!isReversed)
  );

  const sortByABC = () => {
    setSort('ALPHABET');
  };

  const sortByLength = () => {
    setSort('LENGTH');
  };

  const reset = () => {
    setReverse(false);
    setSort('');
  };

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case 'ALPHABET':
        return g1.localeCompare(g2);
      case 'LENGTH':
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      {isStarted ? (
        <>
          <button
            type="button"
            onClick={sortByABC}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={reverse}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={reset}
          >
            Reset
          </button>

          <ul className="Goods">
            {visibleGoods.map(good => (
              <li
                className="Goods__item"
                key={good}
              >
                {good}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button
          type="button"
          onClick={() => (
            letStart(true)
          )}
        >
          Start
        </button>
      )}
    </div>
  );
};
