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

export enum SortType {
  None = 'none',
  Name = 'name',
  Length = 'length',
}

interface SortBy {
  sortBy: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortBy, isReversed }: SortBy,
): string[] {
  const sortedGoods = [...goods].sort((good1, good2) => {
    switch (sortBy) {
      case SortType.Name:
        return good1.localeCompare(good2);

      case SortType.Length:
        return good1.length - good2.length;

      case SortType.None:
      default:
        return 0;
    }
  });

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SortType.Name ? 'is-light' : ''}`}
          onClick={() => setSortBy(SortType.Name)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortBy !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(isReversed || sortBy !== SortType.None) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.None);
              setIsReversed(false);
            }}
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
