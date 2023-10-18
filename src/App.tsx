import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

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

export enum SortType {
  Alphabet,
  Length,
  Default,
}

function getSortedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  const sortedGoodsCopy = [...goods];

  if (sortField === SortType.Alphabet) {
    sortedGoodsCopy.sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (sortField === SortType.Length) {
    sortedGoodsCopy.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  }

  if (isReversed) {
    sortedGoodsCopy.reverse();
  }

  return sortedGoodsCopy;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortType.Alphabet },
          )}
          onClick={() => {
            setSortField(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortType.Length },
          )}
          onClick={() => {
            setSortField(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortField !== SortType.Default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.Default);
              setIsReversed(false);
            }}
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
