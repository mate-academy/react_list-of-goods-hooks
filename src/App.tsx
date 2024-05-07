import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { visibleGoods } from './helpers/visibleGoods';
import { SortType } from './types/SortTypes';

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
  const [sortBy, setSortBy] = useState(SortType.none);
  const [reverse, setReverse] = useState(false);

  const reset = () => {
    setSortBy(SortType.none);
    setReverse(false);
  };

  const resetButton =
    sortBy === SortType.none && reverse === false ? false : true;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            if (sortBy !== SortType.alphabetically) {
              return setSortBy(SortType.alphabetically);
            }
          }}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SortType.alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SortType.length)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(value => !value)}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': reverse === false,
          })}
        >
          Reverse
        </button>

        {resetButton && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods(reverse, sortBy, goodsFromServer).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
