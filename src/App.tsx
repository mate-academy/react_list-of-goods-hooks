import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodList } from './Componets';

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

  visibleGoods.sort((aGood, bGood) => {
    switch (sortType) {
      case SortType.LENGTH:
        return aGood.length - bGood.length;

      case SortType.ALPHABET:
        return aGood.localeCompare(bGood);

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
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSort] = useState(SortType.NONE);

  const resetSorting = () => {
    setSort(SortType.NONE);
    setReverse(false);
  };

  const reverseSorting = () => {
    setReverse(!isReversed);
  };

  const sortingByType = (type: SortType) => {
    setSort(type);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );
  const resetButtonOn = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => (
            sortingByType(SortType.ALPHABET)
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => (
            sortingByType(SortType.LENGTH)
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={reverseSorting}
        >
          Reverse
        </button>

        {resetButtonOn && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={reorderedGoods} />
    </div>
  );
};
