import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortType {
  default,
  alphabetically,
  length,
}

type Params = {
  sortField: SortType,
  isReversed: boolean,
};

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed = false }: Params,
): string[] {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1: string, good2: string) => {
      switch (sortField) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState(SortType.default);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={() => {
            setSortField(SortType.alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => {
            setSortField(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortField !== SortType.default || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField(SortType.default);
                setReversed(false);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {visibleGoods.map((good: string) => (
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
