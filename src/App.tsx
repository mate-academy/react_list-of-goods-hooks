import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import React, { useState } from 'react';

import { GoodsList } from './components/GoodsList';

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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

// Use this function in the render to prepare goods
export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((g1, g2) => g1.length - g2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isChanged, setChanging] = useState(false);

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
    setChanging(true);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
    setChanging(true);
  };

  const reverseList = () => {
    setReverse(current => !current);
  };

  const resetOptions = () => {
    setSortType(SortType.NONE);
    setReverse(false);
    setChanging(false);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer,
    sortType,
    isReversed);

  const isAnyChange = isChanged || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        <button
          type="button"
          className={classNames('button is-danger is-light',
            {
              'is-visible': isAnyChange,
              'is-hidden': !isAnyChange,
            })}
          onClick={resetOptions}
        >
          Reset
        </button>
      </div>

      <ul>
        <ul>
          <GoodsList visibleGoods={visibleGoods} />
        </ul>
      </ul>
    </div>
  );
};
