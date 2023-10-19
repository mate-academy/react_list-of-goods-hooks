import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { SortType, sortGoods } from './functions';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const goods = sortGoods(sortField, isReversed);
  const isResetButton = sortField || isReversed;

  const reset = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            {
              'is-light': sortField !== SortType.ALPHABET,
            },
          )}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            {
              'is-light': sortField !== SortType.LENGTH,
            },
          )}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            {
              'is-light': isReversed === false,
            },
          )}
          onClick={() => {
            setIsReversed(current => !current);
          }}
        >
          Reverse
        </button>

        {isResetButton && (
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
        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
