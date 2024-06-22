import { useState } from 'react';
import './App.scss';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import React from 'react';

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
  SORT_BY_ALPHABET = 'alphabet',
  SORT_BY_LENGTH = 'length',
  Default = '',
}

interface FilterParams {
  sortField: SortType;
  reverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: FilterParams,
) {
  const newGoods = [...goods];

  if (sortField) {
    newGoods.sort((good1, good2) => {
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
    newGoods.reverse();
  }

  return newGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reverse, setReverse] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  const reset = () => {
    setSortField(SortType.Default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SortType.SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField !== SortType.Default || reverse) && (
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
