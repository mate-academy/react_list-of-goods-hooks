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

  const handleSetSort = (type: SortType) => {
    setSelectedSort(type);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          data-cy="SortAlphabetically"
          className={`button is-info is-light ${
            selectedSort === SortType.Alphabetical ? 'is-active' : ''
          }`}
          onClick={() => handleSetSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          data-cy="SortByLength"
          className={`button is-success is-light ${
            selectedSort === SortType.Length ? 'is-active' : ''
          }`}
          onClick={() => handleSetSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          data-cy="Reset"
          className={`button is-danger is-light ${
            selectedSort === SortType.None ? 'is-active' : ''
          }`}
          onClick={() => handleSetSort(SortType.None)}
        >
          Reset
        </button>
      </div>

      <ul>
        {sortedGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
