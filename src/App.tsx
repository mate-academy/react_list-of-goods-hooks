import 'bulma/css/bulma.css';
import React, { useState } from 'react';
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
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      return !isReversed
        ? visibleGoods.sort()
        : visibleGoods.sort((a, b) => (a > b ? -1 : 1));
    case SortType.LENGTH:
      return !isReversed
        ? visibleGoods.sort((a, b) => a.length - b.length)
        : visibleGoods.sort((a, b) => a.length - b.length).reverse();
    case SortType.NONE:
      return isReversed ? visibleGoods.reverse() : visibleGoods;
    default:
      return visibleGoods;
  }
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const isInitialState = !isReversed && sortType === SortType.NONE;

  const reverse = () => {
    setIsReversed((state) => !state);
  };

  const alphSort = () => {
    setSortType(SortType.ALPHABET);
  };

  const byLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === SortType.ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={alphSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === SortType.LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={byLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={reverse}
        >
          Reverse
        </button>

        {!isInitialState && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer, { sortType, isReversed }).map(
            (good) => (
              <li
                data-cy="Good"
                key={good}
              >
                {good}
              </li>
            ),
          )}
        </ul>
      </ul>
    </div>
  );
};
