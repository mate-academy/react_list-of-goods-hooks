import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  name = 'name',
  length = 'length',
  default = '',
}

interface SortParams {
  sortField: SortType;
  reverse: boolean;
}

export const goodsFromServer: string[] = [
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
  goods: string[],
  { sortField, reverse }: SortParams,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a: string, b: string) => {
      switch (sortField) {
        case SortType.name:
          return a.localeCompare(b);
        case SortType.length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [reverse, setReverse] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  const isReset = sortField !== SortType.default || reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.name,
          })}
          onClick={() => setSortField(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.default);
              setReverse(false);
            }}
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
