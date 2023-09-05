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
  Idle = 'idle',
  Alphabet = 'alphabet',
  Length = 'length',
}

interface Filter {
  active: SortType;
  isReversed: boolean;
}

const initialFilter: Filter = {
  active: SortType.Idle,
  isReversed: false,
};

const getGoodsForRender = ({ active, isReversed }: Filter): string[] => {
  const cloneGoodsFromServer = [...goodsFromServer];

  switch (active) {
    case SortType.Idle:
      break;

    case SortType.Alphabet:
      cloneGoodsFromServer.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.Length:
      cloneGoodsFromServer.sort((a, b) => a.length - b.length);
      break;

    default:
      throw new Error('Switch case error!');
  }

  if (isReversed) {
    cloneGoodsFromServer.reverse();
  }

  return cloneGoodsFromServer;
};

export const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const isResetButtonVisible = activeFilter.active !== initialFilter.active
    || activeFilter.isReversed !== initialFilter.isReversed;

  const handleSetSortFilter = (filter: SortType) => {
    setActiveFilter({
      ...activeFilter,
      active: filter,
    });
  };

  const goodsForRender = getGoodsForRender(activeFilter);

  const handleToggleReversed = () => {
    setActiveFilter({
      ...activeFilter,
      isReversed: !activeFilter.isReversed,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': activeFilter.active !== SortType.Alphabet,
          })}
          onClick={() => handleSetSortFilter(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': activeFilter.active !== SortType.Length,
          })}
          onClick={() => handleSetSortFilter(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !activeFilter.isReversed,
          })}
          onClick={handleToggleReversed}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setActiveFilter(initialFilter)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsForRender.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
