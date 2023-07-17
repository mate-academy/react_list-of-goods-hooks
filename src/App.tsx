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

enum SortBy {
  Length = 'length',
  Alphabetically = 'alphabetically',
  None = '',
}

interface SortingOptions {
  sortBy: SortBy;
  isReversed: boolean;
}

function sortGoods(goods: string[], options: SortingOptions): string[] {
  const sortedGoods = [...goods];

  if (options.sortBy) {
    sortedGoods.sort((good1, good2) => {
      switch (options.sortBy) {
        case SortBy.Length:
          return good1.length - good2.length;

        case SortBy.Alphabetically:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (options.isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.None);
  const [isReversed, setIsReversed] = useState(false);

  const displayedGoods = sortGoods(goodsFromServer, { sortBy, isReversed });

  const resetSorting = () => {
    setIsReversed(false);
    setSortBy(SortBy.None);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SortBy.Alphabetically)}
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortBy !== SortBy.Alphabetically },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SortBy.Length)}
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortBy !== SortBy.Length },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {(sortBy !== SortBy.None || isReversed) && (
          <button
            onClick={resetSorting}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
