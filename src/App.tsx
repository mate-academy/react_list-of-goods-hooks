import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { SortType } from './types/types';
import { getPreparedGoods } from './utils/utils';

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
  const [sortBy, setSortBy] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const showReset = sortBy || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SortType.BY_ALPHA,
          })}
          onClick={() => setSortBy(SortType.BY_ALPHA)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SortType.BY_LENGTH,
          })}
          onClick={() => setSortBy(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getPreparedGoods(goodsFromServer, sortBy, isReversed).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
