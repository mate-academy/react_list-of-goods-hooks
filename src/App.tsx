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
  SORT_BY_LENGTH = 'length',
  SORT_BY_ALHPABET = 'alpha',
  Default = '',
}

interface SortParametres {
  sortBy: SortType;
  isReversed: boolean;
}

function getSortedGoods(listOfGoods: string[],
  { sortBy, isReversed }: SortParametres): string[] {
  const copyOfGoods = [...listOfGoods];

  if (sortBy) {
    copyOfGoods.sort((goodA, goodB) => {
      switch (sortBy) {
        case SortType.SORT_BY_ALHPABET:
          return goodA.localeCompare(goodB);
        case SortType.SORT_BY_LENGTH:
          return goodA.length - goodB.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const goodsForRender = getSortedGoods(goodsFromServer,
    { sortBy, isReversed });

  const resetFilters = () => {
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light':
            sortBy !== SortType.SORT_BY_ALHPABET,
          })}
          onClick={() => setSortBy(SortType.SORT_BY_ALHPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light':
            sortBy !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortBy(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFilters}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goodsForRender.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
