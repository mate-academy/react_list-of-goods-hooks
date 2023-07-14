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
  // eslint-disable-next-line no-console
  switch (sortType) {
    case SortType.ALPHABET: {
      visibleGoods.sort((firstGood, secondGood) => (
        firstGood.localeCompare(secondGood)
      ));
      break;
    }

    case SortType.LENGTH: {
      visibleGoods.sort((firstGood, secondGood) => (
        firstGood.length - secondGood.length
      ));
      break;
    }

    default: { // necessary for linter
      break;
    }
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);
  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  function handleReset() {
    setSortType(SortType.NONE);
    setReverse(false);
  }

  function reverseOrder() {
    setReverse(!isReversed);
  }

  function sortAlphabetically() {
    setSortType(SortType.ALPHABET);
  }

  function sortByLength() {
    setSortType(SortType.LENGTH);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => (sortAlphabetically())}
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => (sortByLength())}
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => (reverseOrder())}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            onClick={() => (handleReset())}
            type="button"
            className="button is-danger is-light"
          >
            handleReset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
