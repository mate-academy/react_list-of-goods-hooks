import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
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
  Alphabet = 'alphabet',
  Length = 'length',
  Empty = '',
}

interface FilterParams {
  sortMethod: SortType;
  isReverse: boolean;
}

function getSortedGoods(
  goods: string[],
  {
    sortMethod,
    isReverse,
  }: FilterParams,
) {
  const sortedGoods = [...goods];

  if (isReverse && sortMethod === SortType.Alphabet) {
    return sortedGoods
      .sort((good1, good2) => good1.localeCompare(good2))
      .reverse();
  }

  if (isReverse && sortMethod === SortType.Length) {
    return sortedGoods
      .sort((good1, good2) => good1.length - good2.length)
      .reverse();
  }

  if (isReverse) {
    return sortedGoods.reverse();
  }

  if (sortMethod) {
    sortedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortMethod, setSortMethod] = useState(SortType.Empty);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getSortedGoods(
    goodsFromServer,
    {
      sortMethod,
      isReverse,
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortMethod !== SortType.Alphabet },
          )}
          onClick={() => setSortMethod(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortMethod !== SortType.Length },
          )}
          onClick={() => setSortMethod(SortType.Length)}
        >
          Sort by length
        </button>

        {!isReverse ? (
          <button
            type="button"
            className={cn(
              'button',
              'is-warning',
              { 'is-light': !isReverse },
            )}
            onClick={() => setIsReverse(state => !state)}
          >
            Reverse
          </button>
        ) : (
          <button
            type="button"
            className={cn(
              'button',
              'is-warning',
              { 'is-light': !isReverse },
            )}
            onClick={() => setIsReverse(state => !state)}
          >
            Reverse
          </button>
        )}

        {(sortMethod || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortMethod(SortType.Empty);
              setIsReverse(state => !state);
            }}
          >
            Reset
          </button>
        )}
      </div>

      {visibleGoods.map(good => (
        <li data-cy="Good" key={good}>{good}</li>
      ))}
    </div>
  );
};
