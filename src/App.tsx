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
  SORT_FIELD_ABC = 'name',
  SORT_FIELD_LENGTH = 'length',
  DEFAULT = '',
}

interface Goods {
  sortField: SortType;
  reverseField: boolean;
}

function getPreparedGoods(goods: string[], { sortField, reverseField }: Goods) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_ABC:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.SORT_FIELD_ABC
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SortType.SORT_FIELD_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.SORT_FIELD_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reverseField ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
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
