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
  NONE = "none",
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setDirection] = useState(false);

  const onReset = () => {
    setSortType(SortType.NONE);
    setDirection(false);
  };

  const onToggleDirection = () => {
    setDirection(!isReversed);
  };

  const onSortAlphabetically  = () => {
    setSortType(SortType.ALPHABET);
  };

  const onSortByStringLength = () => {
    setSortType(SortType.LENGTH);
  };

  const sortedGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET && 'is-light'}`}
          onClick={onSortAlphabetically }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH && 'is-light'}`}
          onClick={onSortByStringLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'} `}
          onClick={onToggleDirection}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE
          || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={onReset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
