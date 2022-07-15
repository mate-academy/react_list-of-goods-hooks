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
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState('');

  const reverse = () => (
    setIsReverse(!isReversed)
  );

  const sortByABC = () => {
    setSortType('ALPHABET');
  };

  const sortByLength = () => {
    setSortType('LENGTH');
  };

  const reset = () => {
    setIsReverse(false);
    setSortType('');
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
            className="button is-link"
            onClick={sortByABC}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="button is-success"
            onClick={sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className="button is-warning"
            onClick={reverse}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button is-danger"
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
          className="button is-primary is-large"
          onClick={() => (
            setIsStarted(true)
          )}
        >
          Start
        </button>
      )}
    </div>
  );
};
