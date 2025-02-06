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

type Goods = string[];

enum SortBy {
  alphabetically = 'alphabetically',
  length = 'length',
}

function sortArray(
  arr: Goods,
  { sortBy, isReversed }: { sortBy: string; isReversed: boolean },
): Goods {
  const result = [...arr];

  if (sortBy) {
    result.sort((item1, item2) => {
      switch (sortBy) {
        case SortBy.alphabetically:
          return item1.localeCompare(item2);

        case SortBy.length:
          return item1.length - item2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return result.reverse();
  }

  return result;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = sortArray(goodsFromServer, {
    sortBy,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortBy.alphabetically,
          })}
          onClick={() => setSortBy(SortBy.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SortBy.length)}
          className={cn('button is-success', {
            'is-light': sortBy !== SortBy.length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
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
