import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  alpha = 'alpha',
  length = 'length',
  empty = '',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.empty);
  const [isReversed, setIsReversed] = useState(false);

  function sortingGoods(newSortField: SortType) {
    const sortedGoods = [...goodsFromServer];

    if (newSortField) {
      switch (newSortField) {
        case SortType.alpha:
          sortedGoods.sort((a, b) => a.localeCompare(b));
          break;

        case SortType.length:
          sortedGoods.sort((a, b) => a.length - b.length);
          break;

        default:
      }
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  const visibleGoods = sortingGoods(sortField);

  const alphaSortHandler = () => {
    setSortField(SortType.alpha);
  };

  const lengthSortHandler = () => {
    setSortField(SortType.length);
  };

  const reverseHandler = () => {
    setIsReversed(prev => !prev);
  };

  const resetHandler = () => {
    setIsReversed(false);
    setSortField(SortType.empty);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alpha,
          })}
          onClick={alphaSortHandler}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={lengthSortHandler}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={reverseHandler}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetHandler}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => {
            return (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
