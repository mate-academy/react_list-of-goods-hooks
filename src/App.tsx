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
  none,
  alphabet,
  length,
}
interface ReoderedChange {
  sortBy: SortType;
  reverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortBy, reverse }: ReoderedChange,
) {
  const prepareGoods = [...goods];

  if (sortBy) {
    prepareGoods.sort((goodA, goodB) => {
      switch (sortBy) {
        case SortType.alphabet:
          return goodA.localeCompare(goodB);
        case SortType.length:
          return goodA.length - goodB.length;
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
  const [sortBy, setSortBy] = useState(SortType.none);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    reverse,
  }) as string[];

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.alphabet,
          })}
          onClick={() => setSortBy(1)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-sucsses', {
            'is-light': sortBy !== SortType.length,
          })}
          onClick={() => setSortBy(2)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverse !== true,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {sortBy !== 0 || reverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(0);
              setReverse(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
