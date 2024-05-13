import React from 'react';
import cn from 'classnames';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export type Good = string;
export const goodsFromServer: Good[] = [
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

export enum SortType {
  ALPHABETICALLY = 'ALPHABETICALLY',
  BY_LENGTH = 'BY_LENGTH',
}

export type RereversType = true | false;

interface SortParams {
  sortType: SortType;
  isReverse: RereversType;
}

function getPreparedGoods(goods: Good[], { sortType, isReverse }: SortParams) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortType) {
      case 'ALPHABETICALLY':
        return good1.localeCompare(good2);

      case 'BY_LENGTH':
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.ALPHABETICALLY);

  const sortedGoods = getPreparedGoods(goodsFromServer, {
    sortType,
    isReverse,
  });

  function sortReset() {
    setSortType(SortType.ALPHABETICALLY);
    setIsReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABETICALLY,
          })}
          onClick={() => setSortType(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.BY_LENGTH,
          })}
          onClick={() => setSortType(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>
        {(sortType || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => sortReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
