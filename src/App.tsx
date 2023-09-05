// import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

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

interface PreparedGoodsParams {
  sortCase: string;
  isReversed: boolean;
}

enum SortCases {
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  { sortCase, isReversed }: PreparedGoodsParams,
): string[] {
  const preparedGoods = [...goods];

  if (sortCase) {
    preparedGoods.sort((good1, good2) => {
      switch (sortCase) {
        case SortCases.Alphabet:
          return good1.localeCompare(good2);

        case SortCases.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortCase, setSortCase] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods
    = getPreparedGoods(goodsFromServer, { sortCase, isReversed });

  function handleReset(): void {
    setSortCase('');
    setIsReversed(false);
  }

  const resetPossible = sortCase || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => (setSortCase(SortCases.Alphabet))}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortCase !== SortCases.Alphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => (setSortCase(SortCases.Length))}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortCase !== SortCases.Length },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {resetPossible && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
