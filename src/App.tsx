import React, { useState } from 'react';
import cn from 'classnames';
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

enum SortBy {
  Name = 'alphabetically',
  Length = 'length',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortBy,
  isReverse: boolean,
) {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortBy.Name:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortBy.Length:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      default: break;
    }
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortBy.Default);
  const [isReverse, setIsReverse] = useState(false);
  const sortedGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReverse,
  );
  const handleClick = () => {
    setSortField(SortBy.Default);
    setIsReverse(false);
  };

  const isListChanged = !!sortField || isReverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortBy.Name },
          )}
          onClick={() => setSortField(SortBy.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortBy.Length },
          )}
          onClick={() => setSortField(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>
        {isListChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
