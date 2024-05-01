import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortTypes } from './Types/SortTypes';
import { Good } from './Types/Good';
import { getPreparedGoods } from './getPreparedGoods/getPreparedGoods';

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

const goods: Good[] = goodsFromServer.map((name, id) => ({ name, id }));

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortTypes.NoSort);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goods, { sortField, isReversed });
  const isVisibleReset = sortField !== SortTypes.NoSort || isReversed;

  function handleReset() {
    setIsReversed(false);
    setSortField(SortTypes.NoSort);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortTypes.Alfabetically)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortTypes.Alfabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortTypes.ByLength)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortTypes.ByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {isVisibleReset && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good.id} data-cy="Good">
              {good.name}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
