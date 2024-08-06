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
  Alphabet = 'Sort alphabetically',
  Length = 'Sort by length',
  None = '',
}

function useGoodIn(
  good: string[],
  isReverse: boolean,
  sortTypeFilter: SortType,
): string[] {
  const currentGoods: string[] = [...good];

  if (sortTypeFilter) {
    currentGoods.sort((item1, item2) => {
      switch (sortTypeFilter) {
        case SortType.Alphabet:
          return item1.localeCompare(item2);
        case SortType.Length:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    currentGoods.reverse();
  }

  return currentGoods;
}

export const App: React.FC = () => {
  const [sortTypeFilter, setSortTypeFilter] = useState(SortType.None);
  const [isReverse, setIsReverse] = useState(false);
  const sortedGoods: string[] = useGoodIn(
    goodsFromServer,
    isReverse,
    sortTypeFilter,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortTypeFilter !== SortType.Alphabet,
          })}
          onClick={() => setSortTypeFilter(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortTypeFilter !== SortType.Length,
          })}
          onClick={() => setSortTypeFilter(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {sortTypeFilter !== '' && isReverse === true && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortTypeFilter(SortType.None);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
