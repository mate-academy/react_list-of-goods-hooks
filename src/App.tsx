import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { getPreparedGoods } from './utils/helpers';
import { goodsFromServer } from './utils/data';
import { SortMethod } from './types/common';

export const App = () => {
  const [sortMethod, setSortMethod] = useState<SortMethod | null>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const isResetShown = sortMethod || isReversed;

  const goods = getPreparedGoods(goodsFromServer, {
    sort: sortMethod,
    reversed: isReversed,
  });

  const onSort = (method: SortMethod) => {
    setSortMethod(method);
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const onReset = () => {
    setSortMethod(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortMethod !== SortMethod.ALPHABETICALLY,
          })}
          onClick={() => onSort(SortMethod.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortMethod !== SortMethod.LENGTH,
          })}
          onClick={() => onSort(SortMethod.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isResetShown && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
