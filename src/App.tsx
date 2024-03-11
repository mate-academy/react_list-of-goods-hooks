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
  SORT_FIELD_BY_NAME = 'name',
  SORT_FIELD_BY_LENGTH = 'length',
  SORT_BY_NONE = '',
}

interface Goods {
  sortField: SortType;
  reversed: boolean;
}

function getPreparedGoods(goods: string[], { sortField, reversed }: Goods) {
  const copyGoods = [...goods];

  if (sortField) {
    copyGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_BY_NAME:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return copyGoods.reverse();
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.SORT_BY_NONE);
  const [reversed, SetReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.SORT_FIELD_BY_NAME ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.SORT_FIELD_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === SortType.SORT_FIELD_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.SORT_FIELD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
          onClick={() => SetReversed(!reversed)}
        >
          Reverse
        </button>

        {sortField || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.SORT_BY_NONE);
              SetReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
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
