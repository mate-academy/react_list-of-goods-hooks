import React, { useState, useMemo } from 'react';
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
  Default = 'Default',
  Alphabetical = 'Alphabetical',
  Length = 'Length',
  Reverse = 'Reverse',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  const sortedGoods = useMemo(() => {
    switch (sortType) {
      case SortType.Alphabetical:
        return [...goodsFromServer].sort((a, b) => a.localeCompare(b));

      case SortType.Length:
        return [...goodsFromServer].sort((a, b) => a.length - b.length);

      case SortType.Reverse:
        return [...goodsFromServer].slice().reverse();

      case SortType.Default:
      default:
        return [...goodsFromServer];
    }
  }, [sortType]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info is-light ${
            sortType === SortType.Alphabetical ? 'is-focused' : ''
          }`}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success is-light ${
            sortType === SortType.Length ? 'is-focused' : ''
          }`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning is-light ${
            sortType === SortType.Reverse ? 'is-focused' : ''
          }`}
          onClick={() => setSortType(SortType.Reverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger is-light ${
            sortType === SortType.Default ? 'is-focused' : ''
          }`}
          onClick={() => setSortType(SortType.Default)}
        >
          Reset
        </button>
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
