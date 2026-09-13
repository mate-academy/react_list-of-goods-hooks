import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Goods } from './components/Goods/Goods';

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

enum SortType {
  None = 'none',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  // Sorted GOODS

  const visibleGoods: string[] = [...goodsFromServer].sort((a, b) => {
    switch (sortBy) {
      case SortType.Alphabetically:
        return a.localeCompare(b);
      case SortType.Length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // HandleClicks

  function handleSortClick(value: SortType) {
    setSortBy(value);
  }

  function handleResetClick() {
    setSortBy(SortType.None);
    setIsReversed(false);
  }

  function handleReverseClick() {
    setIsReversed(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === SortType.Alphabetically ? 'is-active' : 'is-light'}`}
          onClick={() => handleSortClick(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === SortType.Length ? 'is-active' : 'is-light'}`}
          onClick={() => handleSortClick(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? 'is-active' : 'is-light'}`}
          onClick={handleReverseClick}
        >
          Reverse
        </button>
        {!(sortBy === SortType.None && !isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <Goods goods={visibleGoods} />
    </div>
  );
};
