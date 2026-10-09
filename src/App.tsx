import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
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
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  {
    sortBy = SortType.None,
    isReversed = false,
  }: {
    sortBy?: SortType;
    isReversed?: boolean;
  } = {},
): string[] {
  const preparedGoods = [...goods];

  if (sortBy !== SortType.None) {
    preparedGoods.sort((good1: string, good2: string) => {
      let result = 0;

      switch (sortBy) {
        case SortType.Alphabet:
          result = good1.localeCompare(good2);
          break;

        case SortType.Length:
          result = good1.length - good2.length;
          break;

        default:
          break;
      }

      return result;
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.Alphabet,
          })}
          onClick={() => setSortBy(SortType.Alphabet)}
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
          className={cn('button is-success', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy !== SortType.None || isReversed) && (
          <button
            type="button"
            className="button is-success is-light"
            onClick={() => {
              setSortBy(SortType.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
