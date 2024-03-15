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
  SORT_BY_ALPHABET = 'name',
  SORT_BY_LENGTH = 'length',
  DEFAULT = '',
}

const sortFunctions = {
  [SortType.SORT_BY_ALPHABET]: (good1: string, good2: string) =>
    good1.localeCompare(good2),
  [SortType.SORT_BY_LENGTH]: (good1: string, good2: string) =>
    good1.length - good2.length,
};

interface Goods {
  sortField: SortType;
  isReversed: boolean;
}

function getPreparedGoods(goods: string[], { sortField, isReversed }: Goods) {
  const preparedGoods = [...goods];

  if (sortField && sortFunctions[sortField]) {
    preparedGoods.sort(sortFunctions[sortField]);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleSortFieldChange = (newSortField: SortType) => {
    setSortField(newSortField);
  };

  const toggleIsReversed = () => {
    setIsReversed(reverse => !reverse);
  };

  const handleReset = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  const isResetButtonVisible = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_BY_ALPHABET,
          })}
          onClick={() => handleSortFieldChange(SortType.SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => handleSortFieldChange(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleIsReversed}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
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
