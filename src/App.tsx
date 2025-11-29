import React from 'react';
import { useState } from 'react';
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
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReverse, setIsReverse] = useState(false);

  const sortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const sortReverse = () => {
    setIsReverse(prevState => !prevState);
  };

  const sortReset = () => {
    setSortType(SortType.NONE);
    setIsReverse(false);
  };

  let sortedGoods = [...goodsFromServer];

  if (sortType === 'alphabet') {
    sortedGoods = [...goodsFromServer].sort((a, b) => {
      return a.localeCompare(b);
    });
  } else if (sortType === 'length') {
    sortedGoods = [...goodsFromServer].sort((a, b) => {
      return a.length - b.length;
    });
  }

  if (isReverse) {
    sortedGoods = [...sortedGoods].reverse();
  }

  const isAlphabetActive = sortType === 'alphabet';
  const isLengthActive = sortType === 'length';
  const isReverseActive = isReverse;
  const isNotInitialState = sortType !== 'none' || isReverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphabetActive ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isLengthActive ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverseActive ? '' : 'is-light'}`}
          onClick={sortReverse}
        >
          Reverse
        </button>

        {isNotInitialState && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={sortReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
