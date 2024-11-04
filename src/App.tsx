import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

enum SortType {
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
  DEFAULT = '',
}

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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [reverse, setReverse] = useState<boolean>(false);

  const visibleGoods = [...goodsFromServer].sort(
    (good1: string, good2: string) => {
      switch (sortField) {
        case SortType.ALPHABETICALLY:
          return good1.toLowerCase().localeCompare(good2.toLowerCase());
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    },
  );

  if (reverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
          type="button"
          className={`button is-info ${sortField !== SortType.ALPHABETICALLY ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={`button is-success ${sortField !== SortType.LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={`button is-warning ${!reverse ? 'is-light' : ''}`}
        >
          Reverse
        </button>
        {(sortField !== SortType.DEFAULT || reverse) && (
          <button
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setReverse(false);
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
