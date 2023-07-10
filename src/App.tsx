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

type Sorts = 'SORT_ALPHABETICALLY' | 'SORT_BY_LENGTH' | null;

interface SortParams {
  isReversed: boolean;
  sortType: Sorts;
}

function preparedGood(
  goods: string[],
  { sortType, isReversed }: SortParams,
): string[] {
  let currentGoods = [...goods];

  if (sortType) {
    currentGoods = currentGoods.sort((a, b) => {
      switch (sortType) {
        case 'SORT_ALPHABETICALLY':
          return a.localeCompare(b);
        case 'SORT_BY_LENGTH':
          return a.length - b.length;
        default: return 0;
      }
    });
  }

  if (isReversed) {
    currentGoods = currentGoods.reverse();
  }

  return currentGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<Sorts>(null);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = preparedGood(goodsFromServer, { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== 'SORT_ALPHABETICALLY',
          })}
          onClick={() => setSortType('SORT_ALPHABETICALLY')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== 'SORT_BY_LENGTH',
          })}
          onClick={() => setSortType('SORT_BY_LENGTH')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(previousValue => !previousValue)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good) => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
