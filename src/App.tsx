import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

enum SortType {
  SORT_FIELD_NAME = 'name',
  SORT_FIELD_LENGTH = 'length',
}

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

function getSortedGoods(goods: string[], sorter: string, isReversed: boolean) {
  const sortedGoods = [...goods];

  if (sorter) {
    sortedGoods.sort((good1, good2) => {
      switch (sorter) {
        case SortType.SORT_FIELD_NAME:
          return good1.localeCompare(good2);
        case SortType.SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', {
            'is-info': sortBy === SortType.SORT_FIELD_NAME,
            'is-light': sortBy !== SortType.SORT_FIELD_NAME,
          })}
          onClick={() => {
            setSortBy(SortType.SORT_FIELD_NAME);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-success': sortBy === SortType.SORT_FIELD_LENGTH,
            'is-light': sortBy !== SortType.SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortBy(SortType.SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-warning': isReversed,
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortBy !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setIsReversed(false);
            }}
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
