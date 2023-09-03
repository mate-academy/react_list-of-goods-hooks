/* eslint-disable max-len */
import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortBY } from './variables/sortBy';

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
  const [sortValue, setSortValue] = useState(SortBY.none);
  const [isReversed, setIsReversed] = useState(false);

  const sortBy = (value: string) => {
    switch (value) {
      case SortBY.alphabetically:
        goodsFromServer.sort((a, b) => a.localeCompare(b));
        setSortValue(SortBY.alphabetically);

        if (isReversed) {
          goodsFromServer.reverse();
        }

        break;
      case SortBY.length:
        goodsFromServer.sort((a, b) => a.length - b.length);
        setSortValue(SortBY.length);

        if (isReversed) {
          goodsFromServer.reverse();
        }

        break;
      default:
        setSortValue(SortBY.none);
        setIsReversed(false);
    }
  };

  const reverse = () => setIsReversed(prevIsReversed => !prevIsReversed);

  const reset = () => sortBy(SortBY.none);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortValue !== SortBY.alphabetically,
          })}
          onClick={() => sortBy(SortBY.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortValue !== SortBY.length,
          })}
          onClick={() => sortBy(SortBY.length)}
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
