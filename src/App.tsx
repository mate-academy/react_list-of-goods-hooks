import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  SORT_BY_ALPHABET = 'Sort alphabetically',
  SORT_BY_LENGTH = 'Sort by length',
}

interface SortParams {
  sortField: SortType;
  reverse: boolean;
}

function getPrepareGoods(goods: string[], { sortField, reverse }: SortParams) {
  let prepareGoods = [...goods];

  if (sortField) {
    prepareGoods = prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortParams, setSortParams] = useState<SortParams>({
    sortField: SortType.SORT_BY_ALPHABET,
    reverse: false,
  });

  const resetSorting = () => {
    if (sortParams.sortField || sortParams.reverse) {
      setSortParams({
        sortField: SortType.SORT_BY_ALPHABET,
        reverse: false,
      });
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortParams({ sortField: SortType.SORT_BY_ALPHABET, reverse: false });
          }}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortParams.sortField !== SortType.SORT_BY_ALPHABET })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortParams({ sortField: SortType.SORT_BY_LENGTH, reverse: false});
          }}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortParams.sortField !== SortType.SORT_BY_LENGTH })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setSortParams({ ...sortParams, reverse: !sortParams.reverse });
          }}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !sortParams.reverse })
          }
        >
          Reverse
        </button>

        <button
          onClick={resetSorting}
          type="button"
          className={cn('button is-danger is-light',
            { 'is-hidden': !(sortParams.sortField || sortParams.reverse) })
          }
        >
          Reset
        </button>
      </div>

      <ul>
        {getPrepareGoods(goodsFromServer, sortParams).map(good => (
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
