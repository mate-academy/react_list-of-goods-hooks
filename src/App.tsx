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

// type SortType = SortType.Default | 'alphabet' | 'length';
enum SortType {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

// const SortType.Alphabet: SortType = 'alphabet';
// const SortType.Length: SortType = 'length';

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  function sortedGoods(goodsArr: string[]): string[] {
    const sortedArray = [...goodsArr];

    switch (sortBy) {
      case SortType.Alphabet:
        sortedArray.sort((good1: string, good2: string) =>
          good1.localeCompare(good2),
        );
        break;

      case SortType.Length:
        sortedArray.sort(
          (good1: string, good2: string) => good1.length - good2.length,
        );
        break;
    }

    if (isReversed) {
      sortedArray.reverse();
    }

    return sortedArray;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.Alphabet,
          })}
          onClick={() => setSortBy(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods(goodsFromServer).map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
