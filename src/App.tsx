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
  sortAlfabet = 'Sort alphabetically',
  sortLength = 'Sort by length',
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: { sortField: string; reverse: boolean },
): string[] {
  const preperedGoods = [...goods];

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.sortAlfabet:
          return good1.localeCompare(good2);

        case SortType.sortLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.sortAlfabet);
          }}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.sortAlfabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.sortLength);
          }}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.sortLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverse(!reverse);
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(reverse || sortField) && (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
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
