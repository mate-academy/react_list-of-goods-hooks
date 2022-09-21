import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodsList } from './GoodsList';

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
  ALPABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,

) {
  const visibleGoods = [...goods];

  visibleGoods.sort((product1, product2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return product1.localeCompare(product2);

      case SortType.LENGTH:
        return product1.length - product2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const handleSortListByAlphabet = () => {
    setSortType(SortType.ALPABET);
  };

  const handleSortListByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const hendleReverse = () => {
    setIsReversed(curent => !curent);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info ',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={handleSortListByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleSortListByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': isReversed === false },
          )}
          onClick={hendleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodsList goods={goods} />
      </ul>
    </div>
  );
};
