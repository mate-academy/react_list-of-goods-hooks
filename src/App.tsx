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
  BY_NONE = 0,
  BY_ALPHABET,
  BY_LENGTH,
}

type SortQuery = {
  sortBy: SortType;
  isSortReversed: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortBy, isSortReversed }: SortQuery,
) {
  const preparedGoods = [...goods].sort((a, b) => {
    switch (sortBy) {
      case SortType.BY_ALPHABET:
        return a.localeCompare(b);

      case SortType.BY_LENGTH:
        return (a.length - b.length);

      default:
        return 0;
    }
  });

  return isSortReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.BY_NONE);
  const [isSortReversed, setIsSortReversed] = useState(false);
  const handleSortByAlphabet = () => {
    setSortBy(sortBy === SortType.BY_ALPHABET
      ? SortType.BY_NONE
      : SortType.BY_ALPHABET);
  };

  const handleSortByLength = () => {
    setSortBy(sortBy === SortType.BY_LENGTH
      ? SortType.BY_NONE
      : SortType.BY_LENGTH);
  };

  const handleSortReversed = () => {
    setIsSortReversed((prev = isSortReversed) => {
      return !prev;
    });
  };

  const handleSortReset = () => {
    setSortBy(SortType.BY_NONE);
    setIsSortReversed(false);
  };

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortBy, isSortReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info
          ${sortBy !== SortType.BY_ALPHABET && 'is-light'}`}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success
          ${sortBy !== SortType.BY_LENGTH && 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning
          ${!isSortReversed && 'is-light'}`}
          onClick={handleSortReversed}
        >
          Reverse
        </button>

        {(sortBy || isSortReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleSortReset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
        {/* <li data-cy="Good">...</li> */}
      </ul>
    </div>
  );
};
