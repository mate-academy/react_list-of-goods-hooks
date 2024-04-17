import React, { useState } from 'react';
import cn from 'classnames';
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
  name = 'name',
  length = 'length',
  default = '',
}

interface SortProps {
  sortField: SortType;
  reverse: boolean;
}

export function prepareList(list: string[], { sortField, reverse }: SortProps) {
  const res = [...list];

  if (sortField) {
    res.sort((a, b) => {
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
    res.reverse();
  }

  return res;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [reverse, setReverse] = useState(false);

  const goods = prepareList(goodsFromServer, { sortField, reverse });

  const reset = () => {
    setSortField(SortType.default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.name)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.name,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
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
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
