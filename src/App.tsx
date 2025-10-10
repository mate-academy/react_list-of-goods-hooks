import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  Default,
  Alphabetically,
  ByLength,
}

interface FilterParams {
  sort: SortType;
  reversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sort, reversed }: FilterParams,
): string[] {
  const preparedGoods = [...goods];

  preparedGoods.sort((a, b) => {
    switch (sort) {
      case SortType.Alphabetically:
        return a.localeCompare(b);
      case SortType.ByLength:
        return a.length - b.length;
      case SortType.Default:
        return 0;
    }
  });

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

function arraysEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

export const App = () => {
  const [sortBy, setSortBy] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sort: sortBy,
    reversed: isReversed,
  });

  const isOriginalOrder = arraysEqual(visibleGoods, goodsFromServer);

  const handleSortAlphabetically = () => {
    setSortBy(SortType.Alphabetically);
  };

  const handleSortByLength = () => {
    setSortBy(SortType.ByLength);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            handleSortAlphabetically();
          }}
          type="button"
          className={`button is-info ${sortBy === SortType.Alphabetically ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            handleSortByLength();
          }}
          type="button"
          className={`button is-info ${sortBy === SortType.ByLength ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => handleReverse()}
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            onClick={() => {
              handleReset();
            }}
            type="button"
            className="button is-danger is-light"
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
