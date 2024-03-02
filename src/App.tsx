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
  SORT_FIELD_BY_ALPHABET = 'name',
  SORT_FIELD_BY_LENGTH = 'length',
  none = '',
}

interface Goods {
  sortField: SortType;
  isReversed: boolean;
}

function getPreparedGoods(goods: string[], { sortField, isReversed }: Goods) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.SORT_FIELD_BY_ALPHABET)}
          className={`button is-info ${sortField === SortType.SORT_FIELD_BY_ALPHABET ? '' : 'is-light'}`}
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
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.none);
              setIsReversed(false);
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
