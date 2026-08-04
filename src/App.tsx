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
  None = '',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer]
    .sort((firstGood, secondGood) => {
      switch (sortType) {
        case SortType.Alphabetically:
          return firstGood.localeCompare(secondGood);

        case SortType.ByLength:
          return firstGood.length - secondGood.length;

        default:
          return 0;
      }
    });

  if (isReversed) {
    visibleGoods.reverse();
  }

  const handleSortAlphabetically = () => {
    setSortType(SortType.Alphabetically);
  };

  const handleSortByLength = () => {
    setSortType(SortType.ByLength);
  };

  const handleReverse = () => {
    setIsReversed(currentValue => !currentValue);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const hasChanges = sortType !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabetically ? 'is-light' : ''}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.ByLength ? 'is-light' : ''}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {hasChanges && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
