import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

  visibleGoods.sort((goodA: string, goodB: string) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return goodA.localeCompare(goodB);

      case SortType.LENGTH:
        return goodA.length - goodB.length;

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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const handleSortClick = (sortBy: SortType) => {
    setSortType(sortBy);
  };

  const handleReverseClick = () => {
    setIsReversed(!isReversed);
  };

  const handleResetClick = () => {
    if (isReversed) {
      setIsReversed(false);
    }

    if (sortType !== SortType.NONE) {
      setSortType(SortType.NONE);
    }
  };

  const isResetVisible = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSortClick(SortType.ALPHABET)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortType !== SortType.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSortClick(SortType.LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverseClick}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            onClick={handleResetClick}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map((good) => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
