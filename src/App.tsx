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

function getSortedGoods(goodsArr: string[], sortField: SortType): string[] {
  if (sortField !== SortType.Default) {
    goodsArr.sort((a, b): number => {
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

  return goodsArr;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortField, setSortField] = useState(SortType.Default);
  const isHideResetBtn = sortField || isReversed;

  const resetField = () => {
    setIsReversed(false);
    setSortField(SortType.Default);
  };

  const goods = getSortedGoods([...goodsFromServer], sortField);

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.Alphabet)}
          className={cn(
            'button is-info', { 'is-light': sortField !== SortType.Alphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.Length)}
          className={cn(
            'button is-success', { 'is-light': sortField !== SortType.Length },
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

        {isHideResetBtn && (
          <button
            type="button"
            onClick={() => resetField()}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
