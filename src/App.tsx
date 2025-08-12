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

enum SortStatus {
  All = 'all',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

function getSort(
  Goods: string[],
  activeSort: SortStatus,
  isReversed: boolean,
): string[] {
  const sorted = [...Goods];

  switch (activeSort) {
    case SortStatus.Alphabetical:
      sorted.sort((a, b) => a.localeCompare(b));
      break;

    case SortStatus.Length:
      sorted.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    sorted.reverse();
  }

  return sorted;
}

export const App: React.FC = () => {
  const [activeSort, setActiveSort] = useState<SortStatus>(SortStatus.All);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleResetClick = () => {
    setActiveSort(SortStatus.All);
    setIsReversed(false);
  };

  const sortedGoods = getSort(goodsFromServer, activeSort, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            activeSort === SortStatus.Alphabetical
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setActiveSort(SortStatus.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            activeSort === SortStatus.Length
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setActiveSort(SortStatus.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(activeSort !== SortStatus.All || isReversed) && (
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
        <ul>
          {sortedGoods.map(item => {
            return (
              <li data-cy="Good" key={item}>
                {item}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
