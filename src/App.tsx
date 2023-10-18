import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

type Goods = string[];

export const goodsFromServer: Goods = [
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
  ALPHABETICALLY = 'Sort alphabetically',
  BY_LENGTH = 'Sort by length',
  NONE = '',
}

const sortGoods = (goods: Goods,
  field: string,
  isReversed: boolean): Goods => {
  const sortedGoods = [...goods];

  switch (field) {
    case SortType.ALPHABETICALLY:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.BY_LENGTH:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = sortGoods(goodsFromServer, sortField, isReversed);
  const isResetVisible = isReversed || sortField;

  const isResetVisibleHandler = () => {
    setSortField(SortType.NONE);
    setIsReversed(false);
  };

  const toggleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={cn('button', {
            'is-info': sortField === SortType.ALPHABETICALLY,
            'is-info is-light': sortField !== SortType.ALPHABETICALLY,
          })}
          onClick={() => {
            setSortField(SortType.ALPHABETICALLY);
          }}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          className={cn('button', {
            'is-success': sortField === SortType.BY_LENGTH,
            'is-success is-light': sortField !== SortType.BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SortType.BY_LENGTH);
          }}
          type="button"
        >
          Sort by length
        </button>

        <button
          className={cn('button', {
            'is-warning': isReversed,
            'is-warning is-light': !isReversed,
          })}
          onClick={toggleReverse}
          type="button"
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            onClick={isResetVisibleHandler}
            type="button"
            className={cn('button', 'is-danger is-light')}
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
