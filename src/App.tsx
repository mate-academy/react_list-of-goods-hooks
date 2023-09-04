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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  NONE = '',
}

function getPreparedGoods(
  goods: string[], sortField: SortType, isReversed = false,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const { ALPHABET, LENGTH, NONE } = SortType;

  const [sortField, setSortField] = useState(NONE);
  const [
    isReversed,
    setIsReversed,
  ] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const ifShowResetButton = sortField || isReversed;

  function reset() {
    setSortField(NONE);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(ALPHABET)}
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortField !== ALPHABET,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(LENGTH)}
          className={cn(
            'button',
            'is-success',
            {
              'is-light': sortField !== LENGTH,
            },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={cn(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {ifShowResetButton && (
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
          <li data-cy="Good" key={good}>{good}</li>
        ))}

      </ul>
    </div>
  );
};
