import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type Good = string;

export const goodsFromServer: Good[] = [
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

enum SortBy {
  Default,
  Name,
  Length,
}

type SortTheGoods = (
  items: Good[],
  sortBy: SortBy | null,
  option: boolean,
) => Good[];

const getSortedGoods: SortTheGoods = (goods, sortBy, isReverseAdded) => {
  const sortedGoods: Good[] = [...goods];

  if (sortBy) {
    sortedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortBy.Name:
          return good1.localeCompare(good2);

        case SortBy.Length:
          return good1.length - good2.length;

        default:
          return SortBy.Default;
      }
    });
  }

  if (isReverseAdded) {
    return sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [isReverseAdded, setIsReverseAdded] = useState(false);

  const visibleGoods: Good[] = getSortedGoods(
    goodsFromServer,
    sortBy,
    isReverseAdded,
  );

  const isResetButtonVisible = isReverseAdded || sortBy;

  const resetSort = () => {
    setSortBy(null);
    setIsReverseAdded(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortBy.Name,
          })}
          onClick={() => setSortBy(SortBy.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortBy.Length,
          })}
          onClick={() => setSortBy(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverseAdded,
          })}
          onClick={() => setIsReverseAdded(prev => !prev)}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
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
