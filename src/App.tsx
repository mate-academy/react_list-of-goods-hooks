import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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
  None,
  Alphabetic,
  Length,
}

function getPreparedGoods(
  sortByType: SortType,
  isReverse: boolean,
): string[] {
  const preparedGoods = [...goodsFromServer];

  switch (sortByType) {
    case SortType.Alphabetic:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.Length:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    case SortType.None:
    default:
      break;
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.None);
  const [isReverse, setIsReverse] = useState(false);

  const preparedGoods = getPreparedGoods(sortBy, isReverse);
  const reset = () => {
    setSortBy(SortType.None);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SortType.Alphabetic)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.Alphabetic,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(isReverse || sortBy !== SortType.None) && (
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
        {preparedGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
