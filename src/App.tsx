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
  ALPHABETICALLY = 'Alphabetically',
  BY_LENGTH = 'By length',
  DEFAULT = '',
}

interface ISortParams {
  sortBy: SortType,
  isReverse: boolean,
}

const getPreperedGoods = (
  goods: string[],
  { sortBy, isReverse }: ISortParams,
) => {
  const preperedGoods = [...goods];

  if (sortBy) {
    preperedGoods.sort((goodA, goodB) => {
      switch (sortBy) {
        case SortType.ALPHABETICALLY:
          return goodA.localeCompare(goodB);

        case SortType.BY_LENGTH:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.DEFAULT);
  const [isReverse, setIsReverse] = useState(false);

  const goods = getPreperedGoods(goodsFromServer, { sortBy, isReverse });

  const handleSort = (sort:SortType) => () => setSortBy(sort);

  const handleReverse = () => setIsReverse(!isReverse);

  const reset = () => {
    setSortBy(SortType.DEFAULT);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.ALPHABETICALLY,
          })}
          onClick={handleSort(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.BY_LENGTH,
          })}
          onClick={handleSort(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {(sortBy || isReverse)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {goods.map((good) => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
