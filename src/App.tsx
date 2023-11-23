import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  length = 'length',
  alphabet = 'alphabet',
  default = 0,
}

function getSortedGoods(
  goods: string[],
  sortParameter: SortType,
  isReversed: boolean,
): string[] {
  const copyGoods = [...goods];

  if (isReversed) {
    copyGoods.reverse();
  }

  if (sortParameter) {
    copyGoods.sort((good1, good2) => {
      switch (sortParameter) {
        case SortType.length:
          return isReversed ? good2.length - good1.length
            : good1.length - good2.length;

        case SortType.alphabet:
          return isReversed ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        default:
          return SortType.default;
      }
    });
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortParameter, setSortParameter] = useState(SortType.default);

  const visibleGoods
    = getSortedGoods(goodsFromServer, sortParameter, isReversed);

  const reset = () => {
    setSortParameter(SortType.default);
    setIsReversed(false);
  };

  const reverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleSortClick = (type: SortType) => () => {
    setSortParameter(type);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortClick(SortType.alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortParameter !== SortType.alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortClick(SortType.length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortParameter !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>
        {(sortParameter || isReversed) && (
          <>
            <button
              onClick={reset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          </>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
