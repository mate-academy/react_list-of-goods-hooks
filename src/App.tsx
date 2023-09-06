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
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((a, b) => {
    if (sortType === SortType.ALPHABET) {
      return a.localeCompare(b);
    }

    if (sortType === SortType.LENGTH) {
      return a.length - b.length;
    }

    return 0;
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, handleSort] = useState(SortType.NONE);
  const [isReversed, handleReverse] = useState(false);

  const handleReset = () => {
    handleSort(SortType.NONE);
    handleReverse(false);
  };

  const reorderedGoods = getReorderedGoods({ sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': true,
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': true,
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': true,
            'is-light': isReversed !== true,
          })}
          onClick={() => handleReverse(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => handleReset()}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {reorderedGoods.map(item => {
          return (
            <li data-cy="Good">{item}</li>
          );
        })}
      </ul>
    </div>
  );
};
