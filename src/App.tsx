import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import React from 'react';

enum SortType {
  NONE = '',
  SORT_ALPHABETICALLY = 'alphabetically',
  SORT_BY_LENGTH = 'length',
}

const filtersWithReset: SortType[] = [
  SortType.SORT_ALPHABETICALLY,
  SortType.SORT_BY_LENGTH,
];

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

type SortConfig = {
  sortField: SortType;
  isReversed: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: SortConfig,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((item1, item2) => {
      switch (sortField) {
        case SortType.SORT_ALPHABETICALLY:
          return item1.localeCompare(item2);
        case SortType.SORT_BY_LENGTH:
          return item1.length - item2.length;
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

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const resetAll = () => {
    setSortField(SortType.NONE);
    setIsReversed(false);
  };

  const showResetButton = filtersWithReset.includes(sortField) || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_ALPHABETICALLY)}
          type="button"
          className={
            sortField === SortType.SORT_ALPHABETICALLY
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
          type="button"
          className={
            sortField === SortType.SORT_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            onClick={resetAll}
            type="button"
            className="button is-success is-light"
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
