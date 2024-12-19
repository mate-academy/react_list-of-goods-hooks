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
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

const getSortedGoods = (sortField: SortType, isReversed: boolean): string[] => {
  const sortedGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SortType.Alphabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  return isReversed ? sortedGoods.reverse() : sortedGoods;
};

const reset = (
  setSortField: React.Dispatch<React.SetStateAction<SortType>>,
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setSortField(SortType.None);
  setIsReversed(false);
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const isVisibleReset = sortField || isReversed;
  const visibleGoods = getSortedGoods(sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>
        {isVisibleReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset(setSortField, setIsReversed)}
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
