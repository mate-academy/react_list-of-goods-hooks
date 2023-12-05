import React, { useState } from 'react';
import cn from 'classnames';
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
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
  NONE = '',
}

interface SortParameters {
  sortBy: SortType;
  isReversed: boolean;
}

function sortGoods(
  goods: string[],
  { sortBy, isReversed }: SortParameters,
): string[] {
  const sortedGoods = [...goods];

  if (sortBy) {
    sortedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.ALPHABETICAL:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = sortGoods(
    goodsFromServer,
    { sortBy, isReversed },
  );

  const resetSorting = () => {
    setSortBy(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortBy !== SortType.ALPHABETICAL },
          )}
          onClick={() => setSortBy(SortType.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortBy !== SortType.LENGTH },
          )}
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
