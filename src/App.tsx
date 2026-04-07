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
  NONE,
  alphabetically = 'alphabetically',
  length = 'length',
}

function sortGoods(goods: string[], sortBy: SortType) {
  const sortedGoods = [...goods];

  if (!sortBy) {
    return sortedGoods;
  }

  return sortedGoods.sort((good1: string, good2: string) => {
    switch (sortBy) {
      case SortType.alphabetically:
        return good1.localeCompare(good2);
      case SortType.length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  let visibleGoods = sortGoods(goodsFromServer, sortBy);

  if (isReversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SortType.alphabetically)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SortType.length)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortBy !== SortType.NONE || isReversed) && (
          <button
            onClick={() => {
              setSortBy(SortType.NONE);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good: string) => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
