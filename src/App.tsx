import React, { Fragment, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

interface ForState {
  sortField: string,
}

type SortOrder = 'asc' | 'desc';

enum SortField {
  Alphabet = 'Sort alphabetically',
  Length = 'Sort by length',
  Clear = '',
}

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

function getPreparedGoods(
  visibleGoods: string[],
  { sortField }: ForState,
  sortOrder: SortOrder,
) {
  const newGoods = [...visibleGoods];

  if (sortField) {
    newGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabet:
          return good1.localeCompare(good2);
        case SortField.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return sortOrder === 'asc' ? newGoods : newGoods.reverse();
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.Clear);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField },
    sortOrder,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortField.Alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortField.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortOrder('desc')}
          type="button"
          className={cn('button is-warning', {
            'is-light': sortOrder !== 'desc',
          })}
        >
          Reverse
        </button>

        {(sortField || sortOrder === 'desc') && (
          <button
            onClick={() => {
              setSortField(SortField.Clear);
              setSortOrder('asc');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {[...visibleGoods].map((good) => (
          <Fragment key={good}>
            <li data-cy="Good">{good}</li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};
