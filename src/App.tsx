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
  Alphabetically = 'alphabetically',
  By_lengyh = 'length',
  Deffault = '',
}

interface SortingParams {
  sortBy: SortOption;
  isReverseOrder: boolean;
}

const sortingFunctions = {
  [SortOption.Alphabetically]: (itemA: string, itemB: string) =>
    itemA.localeCompare(itemB),

  [SortOption.By_lengyh]: (itemA: string, itemB: string) =>
    itemA.length - itemB.length,
};

function getSortedGoods(
  goods: string[],
  { sortBy, isReverseOrder }: SortingParams,
) {
  const sortedGoods = [...goods];

  if (sortBy && sortingFunctions[sortBy]) {
    sortedGoods.sort(sortingFunctions[sortBy]);
  }

  if (isReverseOrder) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortOption.Deffault);
  const [isReverseOrder, setIsReverseOrder] = useState(false);

  const displayedGoods = getSortedGoods(goodsList, {
    sortBy,
    isReverseOrder,
  });

  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
  };

  const toggleReverseOrder = () => {
    setIsReverseOrder(reverse => !reverse);
  };

  const resetSorting = () => {
    setSortBy(SortOption.Deffault);
    setIsReverseOrder(false);
  };

  const isReset = sortBy || isReverseOrder;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortOption.Alphabetically,
          })}
          onClick={() => handleSortChange(SortOption.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortOption.By_lengyh,
          })}
          onClick={() => handleSortChange(SortOption.By_lengyh)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverseOrder,
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
