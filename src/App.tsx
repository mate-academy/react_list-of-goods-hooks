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
  alphabetical = 'alphabetical',
  length = 'length',
  default = 'default',
}

interface SortParams {
  sortField: SortType;
  reverse: boolean;
}

function getPreparedGoods(goods: string[], { sortField, reverse }: SortParams) {
  let preparedGoods = [...goods];

  if (sortField !== SortType.default) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.alphabetical:
          return a.localeCompare(b);
        case SortType.length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);  // default sort type
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  const handleSortFieldChange = (sortBy: SortType) => {
    setSortField(sortBy);
  };

  const handleReset = () => {
    setSortField(SortType.default);
    setReverse(false);
  };

  const isResetVisible = sortField !== SortType.default || reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info ', {
            'is-light': sortField !== SortType.alphabetical,
          })}
          onClick={() => handleSortFieldChange(SortType.alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => handleSortFieldChange(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {isResetVisible && (
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
