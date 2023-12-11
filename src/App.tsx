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
  BY_NONE,
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
    setIsSortReversed(prev => !prev);
  };

  const handleSortReset = () => {
    setSortBy(SortType.BY_NONE);
    setIsSortReversed(false);
  };

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortBy, isSortReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortBy !== SortType.BY_ALPHABET },
          )}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortBy !== SortType.BY_LENGTH },
          )}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isSortReversed },
          )}
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
      </ul>
    </div>
  );
};
