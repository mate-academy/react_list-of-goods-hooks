import React, { useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    if (sortType === SortType.LENGTH) {
      return good1.length - good2.length;
    }

    if (sortType === SortType.ALPHABET) {
      return good1.localeCompare(good2);
    }

    return 0;
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleReverse = () => {
    setIsReversed((prevReverse) => (!prevReverse));
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const handleSort = (sort: SortType) => {
    setSortType(sort);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    { isReversed, sortType },
  );

  const canReset = (sortType !== SortType.NONE) || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {canReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={reorderedGoods} />
    </div>
  );
};
