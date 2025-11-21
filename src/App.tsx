import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { SortOption } from './types/SortOption';

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

export enum SortType {
  ALPHABETICALLY = 'Sort alphabetically',
  BY_LENGTH = 'Sort by length',
  NONE = 'none',
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: SortOption,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.BY_LENGTH:
          return good1.length - good2.length;

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
  const [sortField, setSortField] = useState(SortType.NONE);
  const [reverse, setReverse] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.BY_LENGTH)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {!(sortField === SortType.NONE && reverse === false) && (
          <button
            onClick={() => {
              setSortField(SortType.NONE);
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
        {visibleGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
