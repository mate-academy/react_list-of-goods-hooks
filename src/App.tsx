import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortingOptions {
  None,
  Name,
  Length,
}

function getPreparedGoods(
  goods: string[],
  sortOption: SortingOptions,
  isReverse: boolean,
) {
  const preparedGoods = [...goods];

  switch (sortOption) {
    case SortingOptions.Name:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortingOptions.Length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortOption, setSortOption] = useState(SortingOptions.None);
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortOption, isReverse);

  const handleReset = () => {
    setSortOption(SortingOptions.None);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortOption(SortingOptions.Name)}
          className={cn('button', 'is-info', {
            'is-light': sortOption !== SortingOptions.Name,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortOption(SortingOptions.Length)}
          className={cn('button', 'is-success', {
            'is-light': sortOption !== SortingOptions.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setIsReverse(!isReverse);
          }}
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>
        {(sortOption !== SortingOptions.None || isReverse) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
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
