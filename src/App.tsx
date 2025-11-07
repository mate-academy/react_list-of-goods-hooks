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
  None = 'none',
  Alphabetically = 'alphabetically',
  Length = 'length',
  Reverse = 'reverse',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getSortedGoods = () => {
    let result = [...goodsFromServer];

    if (searchQuery.trim()) {
      result = result.filter(good =>
        good.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    switch (sortType) {
      case SortType.Alphabetically:
        return result.sort((a, b) => a.localeCompare(b));
      case SortType.Length:
        return result.sort((a, b) => a.length - b.length);
      case SortType.Reverse:
        return result.reverse();
      default:
        return result;
    }
  };

  const goodsToDisplay = getSortedGoods();

  const getButtonClass = (type: SortType) =>
    `button ${sortType === type ? 'is-active' : ''} is-light`;

  return (
    <div className="section content">
      <div className="field">
        <input
          type="text"
          className="input"
          placeholder="Search goods..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${getButtonClass(SortType.Alphabetically)}`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${getButtonClass(SortType.Length)}`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${getButtonClass(SortType.Reverse)}`}
          onClick={() => setSortType(SortType.Reverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${getButtonClass(SortType.None)}`}
          onClick={() => setSortType(SortType.None)}
        >
          Reset
        </button>
      </div>

      <ul>
        {goodsToDisplay.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
