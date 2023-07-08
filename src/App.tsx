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

enum SortingCase {
  ALPHA = 'alphabetically',
  LENGTH = 'length',
  default = '',
}

type SortingParams = {
  sortBy: string,
  isReverse: boolean
};

function getVisibleGoods(
  goods:string[],
  {
    sortBy,
    isReverse,
  }: SortingParams,
): string[] {
  const result = [...goods];

  if (sortBy) {
    result.sort((a, b) => {
      switch (sortBy) {
        case SortingCase.ALPHA:
          return a.localeCompare(b);

        case SortingCase.LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortingCase.default);
  const [isReverse, setReverse] = useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer,
    { sortBy, isReverse });

  const reset = () => {
    setSortBy(SortingCase.default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortingCase.ALPHA,
          })}
          onClick={() => setSortBy(SortingCase.ALPHA)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortingCase.LENGTH,
          })}
          onClick={() => setSortBy(SortingCase.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning ', {
            'is-light': !isReverse,
          })}
          onClick={() => setReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortBy || isReverse) && (
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
        { visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
