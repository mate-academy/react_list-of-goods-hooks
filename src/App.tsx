/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

// Enum for SortType
enum SortType {
  NONE = 'none',
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  // Helper function to apply reverse if needed
  const applyReverseIfNeeded = (sortedGoods: string[]): string[] => {
    return isReversed ? sortedGoods.reverse() : sortedGoods;
  };

  // Sort alphabetically
  const sortAlphabetically = (): void => {
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    setGoods(applyReverseIfNeeded(sortedGoods));
    setSortType(SortType.ALPHABETICAL);
  };

  // Sort by length
  const sortByLength = (): void => {
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.length - b.length);
    setGoods(applyReverseIfNeeded(sortedGoods));
    setSortType(SortType.LENGTH);
  };

  // Reverse the order
  const reverseOrder = (): void => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  // Reset to original order
  const resetOrder = (): void => {
    setGoods(goodsFromServer);
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABETICAL ? '' : 'is-light'}`}
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
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
