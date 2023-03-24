import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodsList } from './components/goodsList';

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
): string[] {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((firstGood, secondGood) => (
        firstGood.localeCompare(secondGood)
      ));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((firstGood, secondGood) => (
        firstGood.length - secondGood.length
      ));
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const SortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const SortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const ReverseList = () => {
    setIsReversed(!isReversed);
  };

  const SortReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const sortedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );
  const isSorted = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={SortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={SortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={ReverseList}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={SortReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={sortedGoods} />
    </div>
  );
};
