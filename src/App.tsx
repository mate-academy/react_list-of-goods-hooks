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

enum SortTypes {
  Idle = 'idle',
  Alphabet = 'alphabet',
  Length = 'length',
}

interface SortProperties {
  sortType: SortTypes;
  isReversed: boolean;
}

const defaultSortType: SortProperties = {
  sortType: SortTypes.Idle,
  isReversed: false,
};

const getSortedGoods = ({ sortType, isReversed }: SortProperties): string[] => {
  const goodsCopy = [...goodsFromServer];

  switch (sortType) {
    case SortTypes.Idle:
      break;

    case SortTypes.Alphabet:
      goodsCopy.sort((a, b) => a.localeCompare(b));
      break;

    case SortTypes.Length:
      goodsCopy.sort((a, b) => a.length - b.length);
      break;

    default:
      throw new Error('Switch case error!');
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(defaultSortType);

  const isResetButtonVisible
    = sortType.sortType !== defaultSortType.sortType
    || sortType.isReversed !== defaultSortType.isReversed;

  const handleSetSortFilter = (filter: SortTypes) => {
    setSortType({
      ...sortType,
      sortType: filter,
    });
  };

  const goodsForRender = getSortedGoods(sortType);

  const handleToggleReversed = () => {
    setSortType({
      ...sortType,
      isReversed: !sortType.isReversed,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType.sortType !== SortTypes.Alphabet,
          })}
          onClick={() => handleSetSortFilter(SortTypes.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType.sortType !== SortTypes.Length,
          })}
          onClick={() => handleSetSortFilter(SortTypes.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !sortType.isReversed,
          })}
          onClick={handleToggleReversed}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortType(defaultSortType)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsForRender.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
