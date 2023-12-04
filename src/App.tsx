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
  None = '',
  ByABC = 'abc',
  ByLength = 'length',
}

interface SortParams {
  sortType: SortType;
  isReverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortType, isReverse }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ByABC:
          return good1.localeCompare(good2);

        case SortType.ByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortType, isReverse },
  );

  const reverse = () => {
    setIsReverse(!isReverse);
  };

  const reset = () => {
    setSortType(SortType.None);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.ByABC)}
          type="button"
          className={cn(
            'button', 'is-info', {
              'is-light': sortType !== SortType.ByABC,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.ByLength)}
          type="button"
          className={cn(
            'button', 'is-success', {
              'is-light': sortType !== SortType.ByLength,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn(
            'button', 'is-warning', {
              'is-light': !isReverse,
            },
          )}
        >
          Reverse
        </button>

        {(sortType || isReverse) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
