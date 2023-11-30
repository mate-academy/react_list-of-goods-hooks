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

type OrderOptions = {
  sortField: SortType,
  isReversed: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: OrderOptions,
) {
  const preparedGoods = [...goods];

  switch (sortField) {
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

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const readyGoods = getPreparedGoods(goodsFromServer,
    { sortField, isReversed });

  const handleReverse = () => {
    setIsReversed(reverse => !reverse);
  };

  const reset = () => {
    setIsReversed(false);
    setSortField(SortType.None);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetic)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabetic,
          })}

        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(isReversed || sortField !== SortType.None) && (
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
        {readyGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
