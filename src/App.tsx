import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  Alphabetically,
  ByLength,
  Default,
}

function sortArray(
  array: string[],
  sotrType: SortType,
  reverse: boolean,
): string[] {
  let goodcopy = [...array];

  if (sotrType === SortType.ByLength) {
    goodcopy.sort((good1, good2) => good1.length - good2.length);
  }

  if (sotrType === SortType.Alphabetically) {
    goodcopy.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (reverse) {
    goodcopy = goodcopy.reverse();
  }

  return goodcopy;
}

export const App: React.FC = () => {
  const [nameSort, setNameSort] = useState(SortType.Default);
  const [arrRev, setArrRev] = useState(false);

  const readyArray = sortArray(goodsFromServer, nameSort, arrRev);
  const sortAlphadet = () => setNameSort(SortType.Alphabetically);
  const sortLength = () => setNameSort(SortType.ByLength);
  const toogleReverse = () => setArrRev(!arrRev);
  const handleReset = () => {
    setNameSort(SortType.Default);
    setArrRev(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': nameSort !== SortType.Alphabetically,
          })}
          onClick={sortAlphadet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': nameSort !== SortType.ByLength,
          })}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': arrRev !== true,
          })}
          onClick={toogleReverse}
        >
          Reverse
        </button>

        {(nameSort !== SortType.Default || arrRev !== false) && (
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
        {readyArray.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
