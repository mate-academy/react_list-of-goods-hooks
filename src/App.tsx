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
  sortButton: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortButton) {
    preparedGoods.sort((good1, good2) => {
      switch (sortButton) {
        case SortType.sortByAlph:
          return good1.localeCompare(good2);

        case SortType.sortByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortButton, setSortButton] = useState(SortType.byDefault);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getPreparedGoods(goodsFromServer, sortButton, isReversed);

  const getReversedGoods = () => (
    !isReversed
      ? setIsReversed(true)
      : setIsReversed(false)
  );

  const getReset = () => {
    setSortButton(SortType.byDefault);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortButton(SortType.sortByAlph)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortButton !== SortType.sortByAlph,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortButton(SortType.sortByLength)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortButton !== SortType.sortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={getReversedGoods}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortButton || isReversed) && (
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
