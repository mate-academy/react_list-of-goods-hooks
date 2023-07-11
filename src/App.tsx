import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  SORT_BY_ABC = 'abc',
  SORT_BY_LENGTH = 'length',
  DEFAULT = '',
}

interface FilterParams {
  sortBy: SortType;
  isReverse: boolean;
}

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

function getPreparedGoods(goods: string[],
  { sortBy, isReverse }: FilterParams) {
  const sortedGoods = [...goods];

  if (sortBy) {
    sortedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.SORT_BY_ABC:
          return good1.localeCompare(good2);

        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

function toggleReverse(isReverse : boolean,
  setIsRevers: React.Dispatch<React.SetStateAction<boolean>>) {
  return isReverse === false ? setIsRevers(true) : setIsRevers(!isReverse);
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.DEFAULT);
  const [isReverse, setIsReverse] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, { sortBy, isReverse });

  const resetSorting = () => {
    setIsReverse(false);
    setSortBy(SortType.DEFAULT);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortBy !== SortType.SORT_BY_ABC })}
          onClick={() => setSortBy(SortType.SORT_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortBy !== SortType.SORT_BY_LENGTH })}
          onClick={() => setSortBy(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReverse })}
          onClick={() => toggleReverse(isReverse, setIsReverse)}
        >
          Reverse
        </button>

        {(sortBy || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
