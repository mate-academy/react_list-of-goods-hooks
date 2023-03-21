import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { goodsFromServer } from './Goods';
import { GoodsList } from './GoodsList';

enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export function getReorderedGoods(
  goods: string[], sortType: string, isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((first, second) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return first.localeCompare(second);

      case SortType.LENGTH:
        return first.length - second.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReserved] = useState(false);
  const isSorted = sortType !== SortType.NONE || isReversed;
  const reorderedGoods
    = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReserved(current => !current)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.NONE);
              setIsReserved(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={reorderedGoods} />
    </div>
  );
};
