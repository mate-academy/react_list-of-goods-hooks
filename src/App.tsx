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

const SORT_BY_ALPH: number = 1;
const SORT_BY_LENGTH: number = 2;

const sortGoods = (goods: string[], key: number): string[] => {
  switch (key) {
    case SORT_BY_ALPH:
      return goods.sort((a, b) => a.localeCompare(b));
    case SORT_BY_LENGTH:
      return goods.sort((a, b) => a.length - b.length);
    default:
      return goods;
  }
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(0);
  const [toReverse, setToReverse] = useState(false);

  const goods = sortGoods(goodsFromServer.slice(), sortBy);

  if (toReverse) {
    goods.reverse();
  }

  const handleReverse = () => {
    setSortBy(0);
    setToReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SORT_BY_ALPH,
          })}
          onClick={() => setSortBy(SORT_BY_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !toReverse,
          })}
          onClick={() => setToReverse(!toReverse)}
        >
          Reverse
        </button>

        {!(sortBy === 0 && !toReverse) && (
          <button
            type="button"
            className={cn('button is-danger is-light')}
            onClick={() => handleReverse()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
