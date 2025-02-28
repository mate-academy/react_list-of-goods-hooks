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

interface FilterParams {
  sortField: string;
  reverse: boolean;
}

enum SortType {
  SORT_FIELD_ALPHABET = 'Sort alphabetically',
  SORT_FIELD_LENGTH = 'Sort by length',
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: FilterParams,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });

    if (reverse) {
      preparedGoods = preparedGoods.reverse();
    }
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [reverse, setReversed] = useState(false);
  const [sortField, setSortField] = useState(SortType.SORT_FIELD_ALPHABET);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reverse)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={() => {
              setSortField(SortType.SORT_FIELD_ALPHABET);
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      {visibleGoods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </div>
  );
};
