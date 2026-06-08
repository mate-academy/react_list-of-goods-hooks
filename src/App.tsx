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
  Default = 'default',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

type FilterParams = {
  sortType: SortType;
  isReversed: boolean;
};

const getPreparedGoods = (
  goods: string[],
  { sortType, isReversed }: FilterParams,
) => {
  const preparedGoods = [...goods];

  if (sortType !== SortType.Default) {
    preparedGoods.sort((good1, good2) => {
      if (sortType === SortType.Alphabetical) {
        return good1.localeCompare(good2);
      }

      if (sortType === SortType.Length) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.Alphabetical)}
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabetical,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.Length)}
          className={cn('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || isReversed) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
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
