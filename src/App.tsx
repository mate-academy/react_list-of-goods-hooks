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
  SORT_FIELD_ALPHA = 'Sort alphabetically',
  SORT_FIELD_LENGTH = 'Sort by length',
  DEFAULT = 'Default',
}

interface SortFilter {
  sortField: SortType | SortType.DEFAULT;
  reversed: boolean;
}

function getPrepared(list: string[], { sortField, reversed }: SortFilter) {
  const sortedGoods = [...list].sort((el1: string, el2: string) => {
    switch (sortField) {
      case SortType.SORT_FIELD_ALPHA:
        return el1.localeCompare(el2);
      case SortType.SORT_FIELD_LENGTH:
        return el1.length - el2.length;

      default:
        return 0;
    }
  });

  if (sortField === SortType.DEFAULT) {
    return reversed ? [...list].reverse() : sortedGoods;
  }

  return reversed ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | SortType.DEFAULT>(
    SortType.DEFAULT,
  );
  const [reversed, setReversed] = useState<boolean>(false);
  const goodList = getPrepared(goodsFromServer, { sortField, reversed });

  const handleReset = () => {
    setSortField(SortType.DEFAULT);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.SORT_FIELD_ALPHA ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHA)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortField === SortType.SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(sortField !== SortType.DEFAULT || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      {goodList.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </div>
  );
};
