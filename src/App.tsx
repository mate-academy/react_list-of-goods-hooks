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
  if (sortType !== SortType.NONE) {
    visibleGoods.sort((firstGood, secondGood) => {
      if (sortType === SortType.ALPHABET) {
        return firstGood.localeCompare(secondGood);
      }

      if (sortType === SortType.LENGTH) {
        return firstGood.length - secondGood.length;
      }

      return 0; // this is to make linter shut the hell up
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);
  const sortedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  function changeSortParameters(actionType: string) {
    if (actionType === 'reverse') {
      setReverse(!isReversed);
    }

    if (actionType === 'reset') {
      setSortType(SortType.NONE);
      setReverse(false);
    }

    if (actionType === 'sortAlphabet') {
      setSortType(SortType.ALPHABET);
    }

    if (actionType === 'sortLength') {
      setSortType(SortType.LENGTH);
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => (changeSortParameters('sortAlphabet'))}
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => (changeSortParameters('sortLength'))}
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => (changeSortParameters('reverse'))}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            onClick={() => (changeSortParameters('reset'))}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map((good) => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
