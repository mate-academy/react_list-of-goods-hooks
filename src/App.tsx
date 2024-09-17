import { useState } from 'react';
import cn from 'classnames';

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
  SORT_BY_LENGTH = 'SORT_BY_LENGTH',
  SORT_ALPHABETICALLY = 'SORT_ALPHABETICALLY',
  DEFAULT = 'DEFAULT',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.SORT_BY_LENGTH:
          return a.length - b.length;

        case SortType.SORT_ALPHABETICALLY:
          return a.localeCompare(b);

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReverse, setIsReverse] = useState(false);

  const handleSortBy = (field: SortType) => {
    setSortField(field);
  };

  const handleReset = () => {
    setSortField(SortType.DEFAULT);
    setIsReverse(false);
  };

  const handleReverse = () => {
    setIsReverse(prev => !prev);
  };

  const isSortOrReverseActive = sortField !== SortType.DEFAULT || isReverse;
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABETICALLY,
          })}
          onClick={() => handleSortBy(SortType.SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => handleSortBy(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isSortOrReverseActive && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
