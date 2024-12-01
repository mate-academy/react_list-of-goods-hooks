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
  alphabet,
  length,
}

interface SortParams {
  sortBy: number | null;
  isReverse: boolean;
}

const getPreparedGoods = (goods: string[], sorter: SortParams) => {
  const { sortBy, isReverse } = sorter;
  const prepGoods = [...goods];

  if (sortBy === SortType.alphabet) {
    prepGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === SortType.length) {
    prepGoods.sort((a, b) => a.length - b.length);
  }

  if (isReverse) {
    prepGoods.reverse();
  }

  return prepGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<number | null>(null);
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    isReverse,
  });

  const handleReset = () => {
    setIsReverse(false);
    setSortBy(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.alphabet,
          })}
          onClick={() => setSortBy(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.length,
          })}
          onClick={() => setSortBy(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReverse !== true,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortBy !== null || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
