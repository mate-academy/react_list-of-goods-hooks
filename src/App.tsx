import cn from 'classnames';
import React, { useState } from 'react';
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
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getSortedGoods(goods: string[], sortField: SortType): string[] {
  const goodsCopy = [...goods];

  if (sortField !== SortType.Default) {
    goodsCopy.sort((a, b): number => {
      switch (sortField) {
        case SortType.Alphabet: {
          return a.localeCompare(b);
        }

        case SortType.Length: {
          return a.length - b.length;
        }

        default: {
          return 0;
        }
      }
    });
  }

  return goodsCopy;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.Default);
  const isResetButtonActive = sortType || isReversed;

  const handleReset = () => {
    setIsReversed(false);
    setSortType(SortType.Default);
  };

  const filteredGoods = getSortedGoods(goodsFromServer, sortType);

  if (isReversed) {
    filteredGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.Alphabet)}
          className={cn(
            'button', 'is-info', { 'is-light': sortType !== SortType.Alphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.Length)}
          className={cn(
            'button', 'is-success',
            { 'is-light': sortType !== SortType.Length },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {isResetButtonActive && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {filteredGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
