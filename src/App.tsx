import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer: string[] = [
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
  Alpha = 'alpha',
  Length = 'length',
  Default = 'default',
}

type SortingFunction = (a: string, b: string) => number;

const SORTING_FUNCTIONS: {
  [key in Exclude<SortType, SortType.Default>]: SortingFunction;
} = {
  [SortType.Alpha]: (a, b) => a.localeCompare(b),
  [SortType.Length]: (a, b) => a.length - b.length,
};

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortByAlpha = () => {
    setSortField(SortType.Alpha);
  };

  const sortByLength = () => {
    setSortField(SortType.Length);
  };

  const reverse = () => {
    setIsReversed(r => !r);
  };

  const reset = () => {
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  const isOriginalList = () => {
    return !isReversed && sortField === SortType.Default;
  };

  useEffect(() => {
    const newGoods = [...goodsFromServer];

    if (sortField !== SortType.Default) {
      newGoods.sort(SORTING_FUNCTIONS[sortField]);
    }

    setVisibleGoods(isReversed ? newGoods.reverse() : newGoods);
  }, [sortField, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlpha}
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alpha,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {!isOriginalList() && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
