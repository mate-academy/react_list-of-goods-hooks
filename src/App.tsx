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
  NONE,
  ALPHABET,
  LENGTH,
}

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  if (sortType) {
    visibleGoods.sort((g1, g2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return g1.localeCompare(g2);

        case SortType.LENGTH:
          return g1.length - g2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSort] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const sortAlphabatically = () => {
    setSort(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSort(SortType.LENGTH);
  };

  const reset = () => {
    setIsReversed(false);
    setSort(SortType.NONE);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);
  const resetCheck = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info ', {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => sortAlphabatically()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success', {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => sortByLength()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning', {
              'is-light': !isReversed,
            },
          )}
          onClick={() => reverse()}
        >
          Reverse
        </button>

        {resetCheck && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(item => (
            <li data-cy="Good">{item}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
