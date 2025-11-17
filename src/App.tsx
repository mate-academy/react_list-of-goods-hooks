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

export enum SortType {
  NONE,
  BY_NAME,
  BY_LENGTH,
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);

  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  // Sort alphabetically, starting from the original goods list
  function sortByName() {
    const sortedGoods = [...goodsFromServer].sort(); // Always sort from original array
    const finalGoods = isReversed ? sortedGoods.reverse() : sortedGoods;

    setVisibleGoods(finalGoods); // Update visible goods
    setSortType(SortType.BY_NAME);
  }

  // Sort by length, starting from the original goods list
  function sortByLength() {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );
    const finalGoods = isReversed ? sortedGoods.reverse() : sortedGoods;

    setVisibleGoods(finalGoods); // Update visible goods
    setSortType(SortType.BY_LENGTH);
  }

  // Reverse the current visible list
  function reverseOrder() {
    const reversedGoods = [...visibleGoods].reverse();

    setVisibleGoods(reversedGoods);
    setIsReversed(!isReversed);
  }

  // Reset to the original order
  function resetOrder() {
    setVisibleGoods([...goodsFromServer]); // Reset to original list
    setSortType(SortType.NONE);
    setIsReversed(false); // Reset all states
  }

  // Show reset button only if any sorting or reversing has been applied
  const showResetButton = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByName}
          type="button"
          className={`button is-info ${sortType !== SortType.BY_NAME ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortType !== SortType.BY_LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseOrder}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            onClick={resetOrder}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
