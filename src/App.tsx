import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

import './App.scss';
import { getPreparedGoods } from './utils/getPreparedGoods';
import { SortType } from './types/enum';

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
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleReset = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(current => !current);
  };

  const showResetButton = isReversed || sortField !== SortType.DEFAULT;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.BY_ALPHABET,
          })}
          onClick={() => setSortField(SortType.BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
