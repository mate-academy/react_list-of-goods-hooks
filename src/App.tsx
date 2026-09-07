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

type SortType = '' | 'alphabet' | 'length';

const SORT_ALPHABETICALY: SortType = 'alphabet';
const SORT_LENGTHLY: SortType = 'length';

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>('');
  const [isReversed, setIsReversed] = useState(false);

  function sortedGoods(goodsArr: string[]): string[] {
    const sortedArray = [...goodsArr];

    switch (sortBy) {
      case SORT_ALPHABETICALY:
        sortedArray.sort((good1: string, good2: string) =>
          good1.localeCompare(good2),
        );
        break;

      case SORT_LENGTHLY:
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
            'is-light': sortBy !== SORT_ALPHABETICALY,
          })}
          onClick={() => setSortBy(SORT_ALPHABETICALY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_LENGTHLY,
          })}
          onClick={() => setSortBy(SORT_LENGTHLY)}
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
              setSortBy('');
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
