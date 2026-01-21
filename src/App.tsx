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

enum SortType {
  RESET,
  ALPHABET,
  LENGTH,
  REVERSE,
}

export const App: React.FC = () => {
  const [currentGoods, setCurrentGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.RESET);

  const sortAlphabet = () => {
    setCurrentGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
    setSortType(SortType.ALPHABET);
  };

  const sortLength = () => {
    setCurrentGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
    setSortType(SortType.LENGTH);
  };

  const sortRevers = () => {
    setCurrentGoods(prev => [...prev].reverse());
    setSortType(SortType.REVERSE);
  };

  const resetGoods = () => {
    setCurrentGoods([...goodsFromServer]);
    setSortType(SortType.RESET);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType === SortType.REVERSE ? '' : 'is-light'}`}
          onClick={sortRevers}
        >
          Reverse
        </button>

        {sortType !== SortType.RESET && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {currentGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
