import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { SortType } from './types/SortType';
import { SortButton } from './types/SortButton';

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
const sortButtons: SortButton[] = [
  { id: SortType.ALPHABET, label: 'Sort alphabetically', color: 'is-info' },
  { id: SortType.LENGTH, label: 'Sort by length', color: 'is-success' },
];

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  function getVisibleGoods(): string[] {
    const goods = [...goodsFromServer];

    if (sortField === SortType.ALPHABET) {
      goods.sort((a, b) => a.localeCompare(b));
    }

    if (sortField === SortType.LENGTH) {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  }

  const visibleGoods = getVisibleGoods();

  const handleSort = (field: SortType) => {
    setSortField(field);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortField(SortType.NONE);
    setIsReversed(false);
  };

  const isResetVisible = sortField !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        {sortButtons.map(({ id, label, color }) => (
          <button
            key={id}
            type="button"
            className={cn('button', color, {
              'is-light': sortField !== id,
            })}
            onClick={() => handleSort(id)}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
