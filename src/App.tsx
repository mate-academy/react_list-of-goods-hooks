import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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

type Good = string;

enum SortType {
  Alphabet = 'string',
  Length = 'number',
  Default = '',
}

interface SortParams {
  sortBy: SortType;
  isReversed: boolean;
}

function getPreparedGood(
  goods: Good[],
  {
    sortBy,
    isReversed,
  }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortBy) {
        case SortType.Alphabet:
          return goodA.localeCompare(goodB);
        case SortType.Length:
          return goodA.length - goodB.length;
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
  const [sortBy, setSortBy] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGood(
    goodsFromServer,
    {
      sortBy,
      isReversed,
    },
  );

  const reset = () => {
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy(SortType.Alphabet)}
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SortType.Length)}
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
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
