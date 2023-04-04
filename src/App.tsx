import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodsList } from './components/GoodsList';

import goodsFromServer from './data/goods.json';

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export interface GoodsSortingOptions {
  isReversed: boolean;
  sortType: SortType;
}

export function getReorderedGoods(
  goods: string[],
  { isReversed, sortType }: GoodsSortingOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((firstGoods, secondGoods) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return firstGoods.localeCompare(secondGoods);

      case SortType.LENGTH:
        return (firstGoods.length - secondGoods.length);

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
  const visibleGoods = getReorderedGoods(
    goodsFromServer, { isReversed, sortType },
  );

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverse = () => {
    setIsReversed(currentReverse => !currentReverse);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const shouldShowReset = isReversed || sortType !== SortType.NONE;

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
          onClick={reverse}
        >
          Reverse
        </button>

        {
          shouldShowReset && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
        }
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
