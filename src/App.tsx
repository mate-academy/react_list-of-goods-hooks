/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import className from 'classnames';
import { GoodsList } from './components/GoodsList';

import './App.scss';

const goodsFromServer = [
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

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1: string, g2: string) => {
    switch (sortType) {
      case SortType.ALPABET:
        return g1.localeCompare(g2);
      case SortType.LENGTH:
        return g1.length - g2.length;
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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [buttonStatus, setButtonStatus] = useState('');

  const sortAlphabeth = () => {
    setSortType(SortType.ALPABET);
    setButtonStatus('sortAlphabeth');
  };

  const sortLength = () => {
    setSortType(SortType.LENGTH);
    setButtonStatus('sortLength');
  };

  const reverse = () => {
    setIsReversed((current) => !current);
  };

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
    setButtonStatus('');
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App">

      <div
        className="App__buttons"
      >
        <button
          className={className('button is-info',
            { 'is-light': buttonStatus !== 'sortAlphabeth' })}
          type="button"
          onClick={sortAlphabeth}
        >
          Sort alphabetically
        </button>

        <button
          className={className('button is-link',
            { 'is-light': buttonStatus !== 'sortLength' })}
          type="button"
          onClick={sortLength}
        >
          Sort by length
        </button>
        <button
          className={className('button is-warning',
            { 'is-light': !isReversed })}
          type="button"
          onClick={reverse}
        >
          Reverse
        </button>
        {(isReversed || sortType !== SortType.NONE) && (
          <button
            className="button is-danger is-light"
            type="button"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>
      <GoodsList goods={reorderedGoods} />
    </div>
  );
};
