import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsList = [
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

enum SortOption {
  ALPHABETICALLY = 'alphabetically',
  BY_LENGTH = 'length',
  DEFAULT = '',
}

interface SortingParams {
  sortBy: SortOption;
  reverseOrder: boolean;
}

const sortingFunctions = {
  [SortOption.ALPHABETICALLY]: (itemA: string, itemB: string) =>
    itemA.localeCompare(itemB),

  [SortOption.BY_LENGTH]: (itemA: string, itemB: string) =>
    itemA.length - itemB.length,
};

function getSortedGoods(
  goods: string[],
  { sortBy, reverseOrder }: SortingParams,
) {
  const sortedGoods = [...goods];

  if (sortBy && sortingFunctions[sortBy]) {
    sortedGoods.sort(sortingFunctions[sortBy]);
  }

  if (reverseOrder) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortOption.DEFAULT);
  const [reverseOrder, setReverseOrder] = useState(false);

  const displayedGoods = getSortedGoods(goodsList, {
    sortBy,
    reverseOrder,
  });

  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
  };

  const toggleReverseOrder = () => {
    setReverseOrder(reverse => !reverse);
  };

  const resetSorting = () => {
    setSortBy(SortOption.DEFAULT);
    setReverseOrder(false);
  };

  const isReset = sortBy || reverseOrder;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortOption.ALPHABETICALLY,
          })}
          onClick={() => handleSortChange(SortOption.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortOption.BY_LENGTH,
          })}
          onClick={() => handleSortChange(SortOption.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseOrder,
          })}
          onClick={toggleReverseOrder}
        >
          Reverse
        </button>

        {isReset && (
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
        {displayedGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
