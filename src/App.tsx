import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { SortType } from './types/SortType';
import { GoodsState } from './types/GoodsState';

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

const defaultState: GoodsState = {
  sortType: SortType.default,
  reversed: false,
};

export const App: React.FC = () => {
  const [goodsState, setGoodsState] = useState<GoodsState>(defaultState);
  const { sortType, reversed } = goodsState;

  const getSortedGoods = (): string[] => {
    const goods = [...goodsFromServer];

    if (sortType === SortType.alphabetically) {
      goods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.length) {
      goods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      goods.reverse();
    }

    return goods;
  };

  const resetOrder = () => {
    setGoodsState(defaultState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.alphabetically ? '' : 'is-light'}`}
          onClick={() =>
            setGoodsState({
              ...goodsState,
              sortType: SortType.alphabetically,
            })
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.length ? '' : 'is-light'}`}
          onClick={() =>
            setGoodsState({
              ...goodsState,
              sortType: SortType.length,
            })
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() =>
            setGoodsState({
              ...goodsState,
              reversed: !reversed,
            })
          }
        >
          Reverse
        </button>

        {(reversed || sortType !== SortType.default) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getSortedGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
