import cn from 'classnames';
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
  All = 'all',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

type Props = {
  sortField: SortType;
  isReversed: boolean;
};
function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: Props,
): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.Alphabetical:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.Length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.All);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleResetClick = () => {
    setSortField(SortType.All);
    setIsReversed(false);
  };

  const handleSortAlphabetical = () => setSortField(SortType.Alphabetical);
  const handleSortLength = () => setSortField(SortType.Length);
  const handleReverse = () => setIsReversed(prev => !prev);
  const isSorted = sortField !== SortType.All || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabetical,
          })}
          onClick={handleSortAlphabetical}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
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
