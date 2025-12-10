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
  Default = 'DEFAULT',
  Alphabetical = 'ALPHABETICAL',
  Length = 'LENGTH',
  Reverse = 'REVERSE',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  const getSortedGoods = (): string[] => {
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
  };

  const goods = getSortedGoods();

  const getButtonClass = (type: SortType, baseClass: string) =>
    `button ${baseClass} ${sortType === type ? '' : 'is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass(SortType.Alphabetical, 'is-info')}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.Length, 'is-success')}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.Reverse, 'is-warning')}
          onClick={() => setSortType(SortType.Reverse)}
        >
          Reverse
        </button>

        {sortType !== SortType.Default && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => setSortType(SortType.Default)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
