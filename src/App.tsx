import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortStatus {
  SORT_FIELD_ALPHABETICALLY = 'alphabetically',
  SORT_FIELD_LENGTH = 'length',
  SORT_DEFAULT = '',
}

type Goods = string[];

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

function getPreperedGoods(
  goods: Goods,
  sortField: SortStatus,
  reverseField: boolean,
) {
  const preparedGoods = [...goods];

  if (typeof sortField !== 'undefined') {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortStatus.SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortStatus.SORT_FIELD_LENGTH:
          return good1.length - good2.length;
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
  const [reverseField, setReverseField] = useState(false);
  const [sortField, setSortField] = useState<SortStatus>(
    SortStatus.SORT_DEFAULT
  );
  const visibleGoods = getPreperedGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortStatus.SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={`button is-info
          ${sortField === SortStatus.SORT_FIELD_ALPHABETICALLY ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortStatus.SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success
          ${sortField === SortStatus.SORT_FIELD_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={`button is-warning
          ${reverseField ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setSortField(SortStatus.SORT_DEFAULT);
              setReverseField(false);
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
