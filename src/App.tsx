import React, { useState } from 'react';
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

const SORT_BY_ALPHABET = 'Sort alphabetically' as const;
const SORT_BY_LENGTH = 'Sort by length' as const;
const REVERSE = 'Reverse';
const RESET = 'Reset';

type SortType = typeof SORT_BY_ALPHABET | typeof SORT_BY_LENGTH | '';

function getVisibleGoods(
  goods: string[],
  sortType: SortType,
  reverse = false,
): string[] {
  const sortedGoods = [...goods];

  switch (sortType) {
    case SORT_BY_ALPHABET:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_BY_LENGTH:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const handleRevers = () => {
    setIsReversed(!isReversed);
  };

  const handleSort = (sortType: SortType) => {
    setSortField(sortType);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortField('');
  };

  const visibleGoods: string[] = getVisibleGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info  ${sortField !== SORT_BY_ALPHABET && 'is-light'}`}
          onClick={() => handleSort(SORT_BY_ALPHABET)}
        >
          {SORT_BY_ALPHABET}
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_BY_LENGTH && 'is-light'}`}
          onClick={() => handleSort(SORT_BY_LENGTH)}
        >
          {SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleRevers}
        >
          {REVERSE}
        </button>

        {visibleGoods.join() !== goodsFromServer.join() && (
          <button type="button" className="button" onClick={handleReset}>
            {RESET}
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
