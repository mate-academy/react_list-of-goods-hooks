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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((goodA, goodB) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return goodA.localeCompare(goodB);

      case SortType.LENGTH:
        return goodA.length - goodB.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleSortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            sortType !== SortType.ALPHABET
              ? 'is-light'
              : '')}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            sortType !== SortType.LENGTH
              ? 'is-light'
              : '')}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            !isReversed
              ? 'is-light'
              : '')}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className={cn('button is-danger is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul className="list">
        {getReorderedGoods(goodsFromServer, { sortType, isReversed })
          .map(good => (
            <li key={good} data-cy="Good">
              { good }
              </li>
          ))}
      </ul>
    </div>
  );
};
