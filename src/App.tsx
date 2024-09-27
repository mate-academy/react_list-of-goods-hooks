import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { Goods } from './Components/Goods/Goods';

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

enum SetMode {
  alphabetically = 'alphabetically',
  length = 'length',
  reset = 'reset',
}

type PreparedGoods = Array<string>;

function getPreparedGoods(
  goods: PreparedGoods,
  mode: SetMode,
  reverse: boolean,
): PreparedGoods {
  const goodsToSort = [...goods];

  goodsToSort.sort((good1: string, good2: string): number => {
    switch (mode) {
      case SetMode.alphabetically:
        return good1.localeCompare(good2);

      case SetMode.length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    goodsToSort.reverse();
  }

  return goodsToSort;
}

export const App: React.FC = () => {
  const [actualSortMode, setActualSortMode] = useState(SetMode.reset);
  const [listReverse, setListReverse] = useState(false);
  const goodsToRender = getPreparedGoods(
    goodsFromServer,
    actualSortMode,
    listReverse,
  );
  const renderCondition = !(actualSortMode === SetMode.reset) || listReverse;
  const setRevers = () => {
    setActualSortMode(SetMode.reset);
    setListReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !(actualSortMode === SetMode.alphabetically),
          })}
          onClick={() => setActualSortMode(SetMode.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !(actualSortMode === SetMode.length),
          })}
          onClick={() => setActualSortMode(SetMode.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !listReverse,
          })}
          onClick={() => setListReverse(currrent => !currrent)}
        >
          Reverse
        </button>

        {renderCondition && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={setRevers}
          >
            Reset
          </button>
        )}
      </div>

      <Goods goods={goodsToRender} />
    </div>
  );
};
