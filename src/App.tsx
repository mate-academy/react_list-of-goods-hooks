import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);

      case SortType.LENGTH:
        return g1.length - g2.length;

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
  const [reorderOptions, setReorderOptions] = useState({
    sortType: SortType.NONE,
    isReversed: false,
  });

  function handleChangeSortType(
    type: SortType = reorderOptions.sortType,
    reverse = reorderOptions.isReversed,
  ) {
    setReorderOptions({
      sortType: type,
      isReversed: reverse,
    });
  }

  const unSorted = !reorderOptions.isReversed
    && reorderOptions.sortType === SortType.NONE;

  const goods = getReorderedGoods(goodsFromServer, reorderOptions);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': reorderOptions.sortType !== SortType.ALPHABET,
          })}
          onClick={() => handleChangeSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': reorderOptions.sortType !== SortType.LENGTH,
          })}
          onClick={() => handleChangeSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reorderOptions.isReversed === false,
          })}
          onClick={() => (
            handleChangeSortType(undefined, !reorderOptions.isReversed)
          )}
        >
          Reverse
        </button>

        {
          !unSorted && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => handleChangeSortType(SortType.NONE, false)}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          goods.map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
