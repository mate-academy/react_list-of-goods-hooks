import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  None = 'none',
  Alphabetically = 'alphabetically',
  ByLength = 'length',
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortMethod, setSortMethod] = useState<SortType>(SortType.None);

  const sortGoods = (method: SortType, reverse: boolean): string[] => {
    const sortedGoods = [...goodsFromServer];

    if (method === SortType.Alphabetically) {
      sortedGoods.sort();
    } else if (method === SortType.ByLength) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleSortAlphabetically = () => {
    setSortMethod(SortType.Alphabetically);
  };

  const handleSortByLength = () => {
    setSortMethod(SortType.ByLength);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortMethod(SortType.None);
  };

  const isActive = (method: SortType) => method === sortMethod;
  const isResetVisible = sortMethod !== SortType.None || isReversed;

  const goods = sortGoods(sortMethod, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isActive(SortType.Alphabetically) ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isActive(SortType.ByLength) ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
