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

enum SortType {
  sortByAlph = 'alphabetically',
  sortByLength = 'length',
  byDefault = '',
}

function getPreparedGoods(
  goods: string[],
  sortBy: SortType,
  toggleReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.sortByAlph:
          return good1.localeCompare(good2);

        case SortType.sortByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (toggleReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.byDefault);
  const [toggleReversed, setToggleReversed] = useState(false);

  const sortedGoods = getPreparedGoods(goodsFromServer, sortBy, toggleReversed);

  const getReversedGoods = () => (
    setToggleReversed(currentValue => !currentValue)
  );

  const getReset = () => {
    setSortBy(SortType.byDefault);
    setToggleReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SortType.sortByAlph)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.sortByAlph,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SortType.sortByLength)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.sortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={getReversedGoods}
          type="button"
          className={cn('button is-warning', {
            'is-light': !toggleReversed,
          })}
        >
          Reverse
        </button>

        {(sortBy || toggleReversed) && (
          <button
            onClick={getReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
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
