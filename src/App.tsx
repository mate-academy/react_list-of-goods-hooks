import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './Components/GoodsList';

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
  sortType: SortType;
  isReversed: boolean;
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

// DON'T save goods to the state
// type State = {
//   isReversed: boolean,
//   sortType: SortType,
// };

export const App: React.FC = () => {
  const defaultOptions = {
    sortType: SortType.NONE,
    isReversed: false,
  };

  const [reorderOptions, setReorderOptions] =
    useState<ReorderOptions>(defaultOptions);

  const createSortTypeHandler = (sortType: SortType) => () => {
    setReorderOptions({ ...reorderOptions, sortType: sortType });
  };

  const toggleReverseHandler = () => {
    setReorderOptions({
      ...reorderOptions,
      isReversed: !reorderOptions.isReversed,
    });
  };

  const resetHandler = () => {
    setReorderOptions(defaultOptions);
  };

  const isResetVisible =
    reorderOptions.sortType !== SortType.NONE || reorderOptions.isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${reorderOptions.sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={createSortTypeHandler(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${reorderOptions.sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={createSortTypeHandler(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reorderOptions.isReversed ? '' : 'is-light'}`}
          onClick={toggleReverseHandler}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetHandler}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodsList goods={getReorderedGoods(goodsFromServer, reorderOptions)} />
      </ul>
    </div>
  );
};
