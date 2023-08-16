import 'bulma/css/bulma.css';
import React, { useState } from 'react';
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
  sortAlphabet = 'abc',
  sortLength = 'length',
  sortNone = '',
}

interface FilterParams {
  sortField: SortType,
  sortReverse: boolean,
}

function getPreparedGoods(
  goods: string[],
  { sortField, sortReverse }: FilterParams,
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.sortAlphabet:
        return good1.localeCompare(good2);
      case SortType.sortLength:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (sortReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.sortNone);
  const [sortReverse, setSortReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    sortReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.sortAlphabet)}
          className={cn('button is-info', {
            'is-light': sortField !== SortType.sortAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.sortLength)}
          className={cn('button is-success', {
            'is-light': sortField !== SortType.sortLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setSortReverse(!sortReverse)}
          className={cn('button is-warning', {
            'is-light': sortReverse !== true,
          })}
        >
          Reverse
        </button>
        {(sortField || sortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.sortNone);
              setSortReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
