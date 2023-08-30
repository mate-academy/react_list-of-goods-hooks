import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';

import './App.scss';
import { GoodsList } from './components/GooodsList';

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

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort((g1, g2) => g1.length - g2.length);
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const sortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList
        goods={getReorderedGoods(goodsFromServer, sortType, isReversed)}
      />
    </div>
  );
};
