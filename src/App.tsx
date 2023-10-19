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
  Alphabet = 'alphabet',
  Length = 'length',
  None = '',
}

const sortGoods = (goods: Goods,
  field: string,
  isReversed: boolean): Goods => {
  const sortedGoods = [...goods];

  if (field === SortType.Alphabet) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (field === SortType.Length) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortedGoods = sortGoods(goodsFromServer, sortField, isReversed);
  const isResetVisible = isReversed || sortField;

  const isResetVisibleHandler = () => {
    setSortField(SortType.None);
    setIsReversed(false);
  };

  const toggleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => {
            setSortField(SortType.Alphabet);
          }}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => {
            setSortField(SortType.Length);
          }}
          type="button"
        >
          Sort by length
        </button>

        <button
          className={cn('button is-warning', {
            'is-light': !isReversed,
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
