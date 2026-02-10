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
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => {
      return a.localeCompare(b);
    });
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => {
      return a.length - b.length;
    });
  }

  if (isReversed === true) {
    return visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [reverse, setReverse] = useState(false);
  const [currentSort, setCurrentSort] = useState(SortType.NONE);

  const reorderedGoods = getReorderedGoods(goodsFromServer, {
    sortType: currentSort,
    isReversed: reverse,
  });

  const sortByAlphabet = () => {
    setCurrentSort(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setCurrentSort(SortType.LENGTH);
  };

  const sortReversed = () => {
    setReverse(!reverse);
  };

  const sortReset = () => {
    setCurrentSort(SortType.NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSort !== SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${currentSort !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse === false ? 'is-light' : ''}`}
          onClick={sortReversed}
        >
          Reverse
        </button>

        {(reverse === true || currentSort !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={sortReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {reorderedGoods.map(item => {
          return (
            <li data-cy="Good" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
