import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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
  SORT_BY_ALPHABETICALLY = 'alphabet',
  SORT_BY_LENGTH = 'length',
  SORT_REVERSE = 'reverse',
  SORT_RESET = '',
}
type Goods = string[];

function getPreparedGoods(
  goods: Goods,
  sortField: SortType,
  isReverse: SortType,
): Goods {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_BY_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.SORT_RESET);
  const [isReverse, setIsReverse] = useState(SortType.SORT_RESET);

  const visibleleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReverse,
  );

  const reverseBtn = () => {
    if (isReverse) {
      setIsReverse(SortType.SORT_RESET);
    } else {
      setIsReverse(SortType.SORT_REVERSE);
    }
  };

  const resetBtn = () => {
    setSortField(SortType.SORT_RESET);
    setIsReverse(SortType.SORT_RESET);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_BY_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SortType.SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={reverseBtn}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetBtn}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
