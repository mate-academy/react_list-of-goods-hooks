/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
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
    visibleGoods.sort((a, b) => (a.localeCompare(b)));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => {
      return a.length - b.length;
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  // eslint-disable-next-line max-len
  const sortBy = (sortType: SortType.NONE | SortType.ALPHABET | SortType.LENGTH) => {
    setSortType(sortType);
    setIsReversed(false);
  };

  const reverseGoods = () => {
    setIsReversed((prevState) => !prevState);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer,
    { sortType, isReversed });
  const isHidden = sortType === SortType.NONE && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => sortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => sortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${isHidden ? 'hidden-reset-button' : 'is-light'}`}
          onClick={() => {
            setIsReversed(false); sortBy(SortType.NONE);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
