/* eslint-disable max-len */
import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { SORT_BY } from './variables/sortBy';

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

export const App: React.FC = () => {
  const [sortValue, setSortValue] = useState(SORT_BY.none);
  const [isReversed, setIsReversed] = useState(false);

  const sortBy = (value: string) => {
    if (value === SORT_BY.alphabetically) {
      if (isReversed) {
        [...goodsFromServer].sort((a, b) => b.localeCompare(a));
      } else {
        [...goodsFromServer].sort((a, b) => a.localeCompare(b));
      }

      setSortValue(SORT_BY.alphabetically);

      return;
    }

    if (value === SORT_BY.length) {
      if (isReversed) {
        [...goodsFromServer].sort((a, b) => b.length - a.length);
      } else {
        [...goodsFromServer].sort((a, b) => a.length - b.length);
      }

      setSortValue(SORT_BY.length);

      return;
    }

    setSortValue(SORT_BY.none);
    setIsReversed(false);
  };

  const reverse = () => setIsReversed(prevIsReversed => !prevIsReversed);

  const reset = () => sortBy(SORT_BY.none);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortValue !== SORT_BY.alphabetically,
          })}
          onClick={() => sortBy(SORT_BY.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortValue !== SORT_BY.length,
          })}
          onClick={() => sortBy(SORT_BY.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {!isReversed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsFromServer.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
