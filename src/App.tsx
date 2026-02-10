import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodsList } from './components/goodsList/GoodsList';

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
  Alphabetically = 'alphabetically',
  Length = 'length',
  None = '',
}

interface SortParams {
  sortStatus: SortType;
  reverse: boolean;
}

function sortGoods(goods: string[], { sortStatus, reverse }: SortParams) {
  const preparedGoods = [...goods];

  if (sortStatus !== SortType.None) {
    preparedGoods.sort((good1, good2) => {
      switch (sortStatus) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [reverse, setReverse] = useState(false);
  const [sortStatus, setSortOptions] = useState<SortType>(SortType.None);
  const visibleGood = sortGoods(goodsFromServer, { sortStatus, reverse });
  const reset = goodsFromServer.some(
    (value, index) => value !== visibleGood[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortStatus !== SortType.Alphabetically,
          })}
          onClick={() => {
            setSortOptions(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortStatus !== SortType.Length,
          })}
          onClick={() => {
            setSortOptions(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', { 'is-light': !reverse })}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {reset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSortOptions(SortType.None);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodsList goods={visibleGood} />
    </div>
  );
};
