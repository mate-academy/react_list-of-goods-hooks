import React, { useMemo, useState } from 'react';
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
  Alphabetically = 'alphabetically',
  Length = 'length',
  Reverse = 'reverse',
  Default = 'default',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  const visibleGoods = useMemo(() => {
    const copy = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabetically:
        return copy.sort((a, b) => a.localeCompare(b));

      case SortType.Length:
        return copy.sort((a, b) => a.length - b.length);

      case SortType.Reverse:
        return copy.reverse();

      case SortType.Default:
        return copy;
    }
  }, [sortType]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info is-light ${sortType === SortType.Alphabetically ? 'is-active' : ''}`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success is-light ${sortType === SortType.Length ? 'is-active' : ''}`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning is-light ${sortType === SortType.Reverse ? 'is-active' : ''}`}
          onClick={() => setSortType(SortType.Reverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger is-light ${sortType === SortType.Default ? 'is-active' : ''}`}
          onClick={() => setSortType(SortType.Default)}
        >
          Reset
        </button>
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
