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

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  visibleGoods.sort((el1, el2) => {
    switch (sortType) {
      case 0:
        return 0;

      case 1:
        return el1.localeCompare(el2);

      case 2:
        return el1.length - el2.length;

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
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reversed = () => {
    setReversed(!isReversed);
  };

  const reset = () => {
    setReversed(false);
    setSortType(SortType.NONE);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const sortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reversed}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
          style={sortType === SortType.NONE
            && isReversed === false ? { display: 'none' } : {}}
        >
          Reset
        </button>
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, { sortType, isReversed })
          .map(el => (
            <li data-cy="Good" key={el}>
              {el}
            </li>
          ))}
      </ul>
    </div>
  );
};
