import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

import { getSortedGoods } from './components/getSortedGoods/getSortedGoods';

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

export enum SortType {
  sortAlphabet = 'alphabet',
  sortLength = 'length',
  default = '',
}

export type SortedGoods = {
  sortField: SortType | '';
  goodsReverse: boolean;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.default);
  const [goodsReverse, setGoodsReverse] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer, {
    sortField,
    goodsReverse,
  });

  const handleReset = () => {
    setSortField(SortType.default);
    setGoodsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.sortAlphabet)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.sortAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.sortLength)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.sortLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setGoodsReverse(!goodsReverse)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !goodsReverse })}
        >
          Reverse
        </button>

        {(sortField || goodsReverse) && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
