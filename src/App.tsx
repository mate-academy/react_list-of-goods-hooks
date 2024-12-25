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
  Alphabetically = 'Sort alphabetically',
  ByLength = 'Sort by length',
  Default = '',
}

interface SortedParams {
  sortField: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: SortedParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.ByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const resetSorting = () => {
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  const isResetButtonVisible = !!sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.Alphabetically)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.ByLength)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.ByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            onClick={resetSorting}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="GoodList">
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
