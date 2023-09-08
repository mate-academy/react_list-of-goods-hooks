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

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortGoodsByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortGoodsByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverseGoods = () => {
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
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
          onClick={sortGoodsByAlphabet}
        >
          Sort alphabetically

        </button>
        <button
          type="button"
          className={
            sortType === SortType.LENGTH
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={sortGoodsByLength}
        >
          Sort by length

        </button>
        <button
          type="button"
          className={
            isReversed === true
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={reverseGoods}
        >
          Reverse

        </button>
        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
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
                key={good}
                data-cy="Good"
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
