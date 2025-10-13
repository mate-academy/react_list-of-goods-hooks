import 'bulma/css/bulma.css';
import React, { useMemo, useState } from 'react';
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
  None,
  Alphabetical,
  Length,
}

const getSortedGoods = (goods: string[], sortType: SortType) => {
  switch (sortType) {
    case SortType.Alphabetical:
      return [...goods].sort((a, b) => a.localeCompare(b));
    case SortType.Length:
      return [...goods].sort((a, b) => a.length - b.length);
    case SortType.None:
    default:
      return goods;
  }
};

export const App: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<SortType>(SortType.None);

  const sortedGoods = useMemo(
    () => getSortedGoods(goodsFromServer, selectedSort),
    [selectedSort],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info is-light ${
            selectedSort === SortType.Alphabetical ? 'is-active' : ''
          }`}
          onClick={() => setSelectedSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success is-light ${
            selectedSort === SortType.Length ? 'is-active' : ''
          }`}
          onClick={() => setSelectedSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => setSelectedSort(SortType.None)}
        >
          Reset
        </button>
      </div>

      <ul>
        {sortedGoods.map((good: string) => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};