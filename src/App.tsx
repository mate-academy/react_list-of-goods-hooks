import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  None = 'none',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

interface SortOptions {
  sortField: SortType;
  reversed: boolean;
}

const getPreparedGoods = (
  goods: string[],
  { sortField, reversed }: SortOptions,
): string[] => {
  const preparedGoods = [...goods];

  if (sortField !== SortType.None) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Length:
          return good1.length - good2.length;
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const resetFilters = () => {
    setSortField(SortType.None);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || reversed) && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
