import React, { useState } from 'react';
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
  ALPABET,
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

  visibleGoods.sort((prevGood, nextGood) => {
    switch (sortType) {
      case SortType.LENGTH:
        return prevGood.length - nextGood.length;
      case SortType.ALPABET:
        return prevGood.localeCompare(nextGood);
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type Props = {};

export const App: React.FC<Props> = () => {
  const [sortType, handleSortType] = useState(SortType.NONE);
  const [isReversed, handleReverse] = useState(false);

  const reset = () => {
    handleSortType(SortType.NONE);
    handleReverse(false);
  };

  const prepareGoods
    = getReorderedGoods(goodsFromServer, { isReversed, sortType });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType !== SortType.ALPABET
              ? 'button is-info is-light'
              : 'button is-info'
          }
          onClick={() => handleSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType !== SortType.LENGTH
              ? 'button is-success is-light'
              : 'button is-success'
          }
          onClick={() => handleSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed !== true
              ? 'button is-warning is-light'
              : 'button is-warning'
          }
          onClick={() => handleReverse(isReversed !== true)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed === true)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => reset()}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {prepareGoods
            .map(good => <li data-cy="Good">{good}</li>)}
        </ul>
      </ul>
    </div>
  );
};
