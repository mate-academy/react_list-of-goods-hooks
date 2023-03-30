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

interface ReorderOptions {
  sortByType: SortType,
  isReversed: boolean,
}

export function getReorderedGoods(
  goods: string[],
  { sortByType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((previousGood, currentGood) => {
    switch (sortByType) {
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
  const [isReversed, setIsReversed] = useState(false);
  const [sortByType, setSortByType] = useState(SortType.NONE);
  const isResetButtonVisible = isReversed || sortByType !== SortType.NONE;
  const goods = getReorderedGoods(goodsFromServer, {
    isReversed,
    sortByType,
  });

  const reverseList = () => {
    setIsReversed((state) => !state);
  };

  const sortBy = (sortTypeValue: SortType) => {
    setSortByType(sortTypeValue);
  };

  const resetChanges = () => {
    setIsReversed(false);
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
              'is-light': sortByType !== SortType.ALPHABET,
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
              'is-light': sortByType !== SortType.LENGTH,
            },
          )}
          onClick={() => sortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning', {
              'is-light': !isReversed,
            },
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
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
