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

enum SortType {
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
  None = 'none',
}

type SortingOptions = {
  sortField: string;
  isReversed: boolean;
};

function prepareGoods(
  goods: string[],
  { sortField, isReversed }: SortingOptions,
): string[] {
  const newGoods = [...goods];

  if (sortField === SortType.None) {
    return isReversed ? newGoods.reverse() : newGoods;
  }

  switch (sortField) {
    case SortType.Alphabetically:
      newGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.ByLength:
      newGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    newGoods.reverse();
  }

  return newGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = prepareGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetically)}
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.ByLength)}
          type="button"
          className={`button is-success ${sortField === SortType.ByLength ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || isReversed) && (
          <button
            onClick={() => {
              setSortField(SortType.None);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger"
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
