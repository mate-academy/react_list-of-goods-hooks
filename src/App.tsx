import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './SortType';

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



interface SortOptions {
  sortField: SortType;
  isReversed: boolean;
}

function getSortedGoods(
  goods: string[],
  { sortField, isReversed }: SortOptions,
) {
  const copyGoods = [...goods];

  if (sortField) {
    copyGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically: {
          return good1.localeCompare(good2);
        }

        case SortType.ByLength: {
          return good1.length - good2.length;
        }

        default: {
          return 0;
        }
      }
    });
  }

  if (isReversed) {
    copyGoods.reverse();
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const isModified = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
              setIsReversed(false);
            }}
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
