import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Default = 'default',
  Name = 'name',
  Length = 'length',
}

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

function getSortedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  const result = [...goods];

  switch (sortField) {
    case SortType.Name:
      result.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.Length:
      result.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortField, isReversed);

  const isChanged =
    JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer);

  function handleSortByName() {
    setSortField(SortType.Name);
  }

  function handleSortByLength() {
    setSortField(SortType.Length);
  }

  function handleReverse() {
    setIsReversed(prev => !prev);
  }

  function handleReset() {
    setSortField(SortType.Default);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Name ? '' : 'is-light'}`}
          onClick={handleSortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.Length ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
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
