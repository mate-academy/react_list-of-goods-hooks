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
  DEFAULT = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.DEFAULT);
    setIsReversed(false);
  };

  const handleAlphabetSort = () => {
    if (sortType === SortType.ALPHABET && !isReversed) {
      resetGoods();

      return;
    }

    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? [...sorted].reverse() : sorted);
    setSortType(SortType.ALPHABET);
  };

  const handleLengthSort = () => {
    if (sortType === SortType.LENGTH && !isReversed) {
      resetGoods();

      return;
    }

    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(isReversed ? [...sorted].reverse() : sorted);
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(current => !current);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleAlphabetSort}
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleLengthSort}
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
