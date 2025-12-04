import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  Alphabet = 'alphabet',
  Length = 'length',
  Reset = 'none',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Reset);
  const [isReverse, setIsReverse] = useState(false);

  const sortAlphabetically = () => {
    setSortType(SortType.Alphabet);
  };

  const sortByLength = () => {
    setSortType(SortType.Length);
  };

  const sortByReverse = () => {
    setIsReverse(prevState => !prevState);
  };

  const sortReset = () => {
    setSortType(SortType.Reset);
    setIsReverse(false);
  };

  let sortedGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabet) {
    sortedGoods = [...goodsFromServer].sort((a, b) => {
      return a.localeCompare(b);
    });
  } else if (sortType === SortType.Length) {
    sortedGoods = [...goodsFromServer].sort((a, b) => {
      return a.length - b.length;
    });
  }

  if (isReverse) {
    sortedGoods = [...sortedGoods].reverse();
  }

  const isAlphabetActive = sortType === SortType.Alphabet;

  const isLengthtActive = sortType === SortType.Length;

  const isReverseActive = isReverse;

  const isNotInitialStateActive = sortType !== SortType.Reset || isReverse;

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
          className={`button is-success ${isLengthtActive ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverseActive ? '' : 'is-light'}`}
          onClick={sortByReverse}
        >
          Reverse
        </button>
        {isNotInitialStateActive && (
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
