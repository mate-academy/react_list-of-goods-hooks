import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
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

export enum SortType {
  None = 'none',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SortType.Alphabetically) {
      sortedGoods.sort((first, second) => first.localeCompare(second));
    }

    if (sortType === SortType.ByLength) {
      sortedGoods.sort((first, second) => first.length - second.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }, [sortType, isReversed]);

  const isResetVisible = sortType !== SortType.None || isReversed;

  const handleSort = (nextSortType: SortType) => {
    setSortType(nextSortType);
  };

  const handleReverse = () => {
    setIsReversed(current => !current);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
          onClick={() => handleSort(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
