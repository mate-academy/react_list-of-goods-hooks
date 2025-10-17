import React from 'react';
import { useState } from 'react';
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

enum SorType {
  Default = '',
  Alphabetically = 'alphabet',
  Length = 'length',
}

const getSortedGoods = (
  goods: string[],
  sortType: SorType,
  isReversed: boolean,
) => {
  const sortedGoods = [...goods];

  switch (sortType) {
    case SorType.Alphabetically:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SorType.Length:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    return sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [activeSort, setActiveSort] = useState(SorType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer, activeSort, isReversed);

  const handleSortChange = (sortType: SorType) => {
    setActiveSort(sortType);
  };

  const handleToggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleResetGoods = () => {
    setActiveSort(SorType.Default);
    setIsReversed(false);
  };

  const isModified = activeSort !== SorType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': activeSort !== 'alphabet',
          })}
          onClick={() => handleSortChange(SorType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': activeSort !== 'length',
          })}
          onClick={() => handleSortChange(SorType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleResetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
