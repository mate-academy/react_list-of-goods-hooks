import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer } from './goodsFromServer';
import { SortType } from './Types/SortType';
import { State } from './Types/State';
import { ReorderOptions } from './Types/ReorderOptions';

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((goodOne, goodTwo) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return goodOne.localeCompare(goodTwo);

      case SortType.LENGTH:
        return goodOne.length - goodTwo.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC<State> = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSort] = useState(SortType.NONE);

  const reverse = () => {
    setReverse(!isReversed);
  };

  const sortByAlphabet = () => {
    setSort(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSort(SortType.LENGTH);
  };

  const resetList = () => {
    setReverse(false);
    setSort(SortType.NONE);
  };

  const isVisibleReset = isReversed || sortType !== SortType.NONE;

  const goods = getReorderedGoods(goodsFromServer, { isReversed, sortType });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlphabet}
          className={cn('button is-info',
            { 'is-light': sortType !== SortType.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={cn('button is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {isVisibleReset && (
          <button
            type="button"
            onClick={resetList}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
