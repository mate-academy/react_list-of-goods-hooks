import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer: string[] = [
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

export enum SortType {
  default = 'default',
  alphabetically = 'alphabetically',
  length = 'length',
}

const getPreperedGoods = (
  goods: string[],
  sort: string,
  isReversed: boolean,
) => {
  const preparedGoods: string[] = [...goods];

  switch (sort) {
    case SortType.alphabetically:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreperedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.alphabetically,
          })}
          onClick={() => setSortBy(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.length,
          })}
          onClick={() => setSortBy(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>

        {(sortBy !== SortType.default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
