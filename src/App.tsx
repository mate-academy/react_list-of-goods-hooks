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
  SORT_FIELD_ALPHABETICALLY = 'alphabetically',
  SORT_FIELD_LENGTH = 'length',
  NONE = '',
}

interface FilterParams {
  sortField: SortType | '';
  sortOrderReverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, sortOrderReverse }: FilterParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortOrderReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.NONE);
  const [sortOrderReverse, setSortOrderReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    sortOrderReverse,
  });
  const showResetButton = sortOrderReverse || sortField;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABETICALLY)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setSortOrderReverse(!sortOrderReverse)}
          className={cn('button', 'is-info', {
            'is-light': !sortOrderReverse,
          })}
        >
          Reverse
        </button>
        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.NONE);
              setSortOrderReverse(false);
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
