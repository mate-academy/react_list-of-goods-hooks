import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import React from 'react';

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
];

enum SortType {
  Alphabetically = 'alphabetically',
  Length = 'length',
  Reset = 'reset',
}

export const App: React.FC = () => {
  const [viewGoods, setViewGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const isSorted = !viewGoods.every(
    (value, index) => value === goodsFromServer[index],
  );

  const sortByAlphabetic = () => {
    setSortType(SortType.Alphabetically);
    const sortedGoods = [...goodsFromServer].sort((good1, good2) =>
      good1.localeCompare(good2),
    );

    setViewGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
  };

  const sortByLength = () => {
    setSortType(SortType.Length);
    const sortedGoods = [...goodsFromServer].sort(
      (good1, good2) => good1.length - good2.length,
    );

    setViewGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
  };

  const sortReverse = () => {
    setIsReversed(prev => !prev);
    setViewGoods([...viewGoods].reverse());
  };

  const sortReset = () => {
    setSortType(SortType.Reset);
    setIsReversed(false);
    setViewGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${
            sortType !== SortType.Alphabetically ? ' is-light' : ''
          }`}
          onClick={sortByAlphabetic}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${sortType !== SortType.Length ? ' is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${!isReversed ? ' is-light' : ''}`}
          onClick={sortReverse}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className={`button is-danger${sortType !== SortType.Reset ? ' is-light' : ''}`}
            onClick={sortReset}
          >
            Reset
          </button>
        )}
      </div>

      {viewGoods.map(good => (
        <ul key={good}>
          <li data-cy="Good">{good}</li>
        </ul>
      ))}
    </div>
  );
};
