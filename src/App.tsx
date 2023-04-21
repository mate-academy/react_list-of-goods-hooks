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
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((firstGood, secondGood) => (
      firstGood.localeCompare(secondGood)));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((firstGood, secondGood) => (
      firstGood.length - secondGood.length));
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversing] = useState(false);
  const [sortType, setSortingType] = useState(SortType.NONE);

  const handleReversing = () => {
    setReversing(!isReversed);
  };

  const handleAlphabetSorting = () => {
    setSortingType(SortType.ALPHABET);
  };

  const handleLengthSorting = () => {
    setSortingType(SortType.LENGTH);
  };

  const handleReseting = () => {
    setReversing(false);
    setSortingType(SortType.NONE);
  };

  const goodsToDisplay = getReorderedGoods(
    goodsFromServer,
    { isReversed, sortType },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortType !== SortType.ALPHABET })}
          onClick={handleAlphabetSorting}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={handleLengthSorting}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={handleReversing}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReseting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goodsToDisplay.map((good) => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
