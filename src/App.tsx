import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  SORT_GOODS_NAME = 'name',
  SORT_GOODS_LENGTH = 'length',
  DEFAULT = '',
}

interface SortParams {
  sortField: SortType,
  reversField: boolean,
}

function getPreparedGoods(
  goods: string[], { sortField, reversField }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_GOODS_NAME:
          return good1.localeCompare(good2);

        case SortType.SORT_GOODS_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [reversField, setReversField] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reversField },
  );
  const reset = () => {
    setSortField(SortType.DEFAULT);
    setReversField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.SORT_GOODS_NAME);
          }}
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortField !== SortType.SORT_GOODS_NAME },
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.SORT_GOODS_LENGTH);
          }}
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortField !== SortType.SORT_GOODS_LENGTH },
            )
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReversField(!reversField);
          }}
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !reversField },
            )
          }
        >
          Reverse
        </button>

        {(sortField || reversField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
