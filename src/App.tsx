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

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType) {
    visibleGoods.sort((goodA, goodB) => (sortType === SortType.ALPHABET
      ? goodA.localeCompare(goodB)
      : goodB.length - goodA.length));
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

const defaultSort: ReorderOptions = {
  sortType: SortType.NONE,
  isReversed: false,
};

export const App: React.FC = () => {
  const [sortState, setSortState] = useState<ReorderOptions>(defaultSort);

  const handleSortClick = (newSortType: SortType) => setSortState(
    prev => ({ ...prev, sortType: newSortType }),
  );

  const handleReversClick = () => setSortState((prev) => (
    { ...prev, isReversed: !prev.isReversed }));

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => handleSortClick(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => handleSortClick(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={handleReversClick}
        >
          Reverse
        </button>

        {JSON.stringify(sortState) !== JSON.stringify(defaultSort) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={
              () => setSortState(defaultSort)
            }
          >
            Reset
          </button>
        ) }
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, sortState).map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
