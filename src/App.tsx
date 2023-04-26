import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  const getSortCallback = (sortingType: SortType) => {
    switch (sortingType) {
      case SortType.ALPHABET:
        return (good1: string, good2: string) => good1.localeCompare(good2);

      case SortType.LENGTH:
        return (good1: string, good2: string) => good1.length - good2.length;

      default:
        return null;
    }
  };

  const sortCallback = getSortCallback(sortType);

  if (sortCallback) {
    visibleGoods.sort(sortCallback);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const goodsList = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const isAlphabetSorting = sortType === SortType.ALPHABET;
  const isLengthSorting = sortType === SortType.LENGTH;
  const isReset = (isReversed || sortType !== SortType.NONE);

  const handleSortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': !isAlphabetSorting,
          })}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': !isLengthSorting,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
