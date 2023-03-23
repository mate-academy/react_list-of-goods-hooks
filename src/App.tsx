import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodsList } from './components/GoodsList/GoodsList';

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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((previousGood, currentGood) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return previousGood.localeCompare(currentGood);

      case SortType.LENGTH:
        return previousGood.length - currentGood.length;

      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortByType] = useState(SortType.NONE);
  const isVisibleReset = isReversed || sortType !== SortType.NONE;
  const goods = getReorderedGoods(goodsFromServer, {
    isReversed,
    sortType,
  });

  const reverseList = () => {
    setReversed(!isReversed);
  };

  const sortBy = (sortTypeValue: SortType) => {
    setSortByType(sortTypeValue);
  };

  const resetChanges = () => {
    setReversed(false);
    setSortByType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => sortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => sortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        {isVisibleReset && (
          <button
            type="button"
            className={classNames(
              'button is-danger is-light',
            )}
            onClick={resetChanges}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};
