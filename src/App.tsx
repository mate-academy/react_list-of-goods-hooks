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

// This is also test code but I am not syre that is correct
// export function getReorderedGoods(
//   goods: string[],
//   { isReversed = false, sortType }: GoodsSortingOptions,
// ) {
//   const visibleGoods = [...goods];

//   visibleGoods.sort((firstGoods, secondGoods) => {
//     switch (sortType) {
//       case SortType.ALPHABET:
//         return (isReversed ? -1 : 1) * firstGoods.localeCompare(secondGoods);

//       case SortType.LENGTH:
//         return (isReversed ? -1 : 1) * (firstGoods.length - secondGoods.length);

//       default:
//         return 0;
//     }
//   });

//   return visibleGoods;
// }

// test code
export function getReorderedGoods(
  goods: string[],
  { isReversed = false, sortType }: GoodsSortingOptions,
  isReverseSorting = false,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((firstGoods, secondGoods) => {
    let order = isReversed ? -1 : 1;

    switch (sortType) {
      case SortType.ALPHABET:
        order *= firstGoods.localeCompare(secondGoods);
        break;

      case SortType.LENGTH:
        order *= firstGoods.length - secondGoods.length;
        break;

      default:
        order = 0;
        break;
    }

    if (isReverseSorting) {
      order *= -1;
    }

    return order;
  });

  return visibleGoods;
}

// Valid code!!! dont remove this!!
// export function getReorderedGoods(
//   goods: string[],
//   { isReversed, sortType }: GoodsSortingOptions,
// ) {
//   const visibleGoods = [...goods];

//   visibleGoods.sort((firstGoods, secondGoods) => {
//     switch (sortType) {
//       case SortType.ALPHABET:
//         return firstGoods.localeCompare(secondGoods);

//       case SortType.LENGTH:
//         return (firstGoods.length - secondGoods.length);

//       default:
//         return 0;
//     }
//   });

//   if (isReversed) {
//     visibleGoods.reverse();
//   }

//   return visibleGoods;
// }

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

  const showReset = isReversed || sortType !== SortType.NONE;

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
          (showReset) && (
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
