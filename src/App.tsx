import { useState } from 'react';

import React from 'react';
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

const getReorderedGoods = (
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) => {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort();
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sort = (newSortType: SortType) => {
    setSortType(newSortType);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const visibleReset = sortType !== SortType.NONE || isReversed;

  return (
    <div className='section content'>
      <div className='buttons'>
        <button
          type='button'
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => sort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type='button'
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => sort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type='button'
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {visibleReset && (
          <button
            type='button'
            className='button is-danger is-light'
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good) => (
            <li data-cy='Good' key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
}
