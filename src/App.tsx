import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];
enum SortType {
  alphabetically = 'alphabetically',
  byLength = 'byLength',
  default = '',
}

interface Good {
  id: number,
  name: string,
}

interface SortAndReverse {
  sortBy: SortType
  isReversed: boolean,
}

function getPreparedGoods(
  goods : Good[],
  { sortBy, isReversed } : SortAndReverse,
) : Good[] {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.alphabetically:
          return good1.name.localeCompare(good2.name);
        case SortType.byLength:
          return good1.name.length - good2.name.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortBy: sortField, isReversed },
  );

  function handleReverseClick() {
    setIsReversed(!isReversed);
  }

  function handleResetClick() {
    setSortField(SortType.default);
    if (isReversed) {
      setIsReversed(!isReversed);

    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.alphabetically)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortType.alphabetically },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.byLength)}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortType.byLength },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => handleReverseClick()}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': isReversed !== true },
          )}
        >
          Reverse
        </button>

        { (sortField || isReversed) && (
          <button
            onClick={() => handleResetClick()}
            type="button"
            className={cn(
              'button',
              'is-danger',
              'is-light',
            )}
          >
            Reset
          </button>
        ) }

      </div>

      <ul>
        {visibleGoods.map((good) => {
          return (
            <li key={good.id} data-cy="Good">{good.name}</li>
          );
        })}
      </ul>
    </div>
  );
};
