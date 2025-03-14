/* eslint-disable max-len */
import React from 'react';
import { useState } from 'react';
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

enum SortField {
  None = '',
  Alphabetically = 'abc',
  ByLength = 'length',
}

function solutionGoods(
  goods: string[],
  sortField: string,
  reversed: boolean,
): string[] {
  let newGoods = [...goods];

  if (sortField) {
    newGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'abc':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    newGoods = newGoods.reverse();
  }

  return newGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.None);
  const [reversed, setReversed] = useState<boolean>(false);
  const visibleGoods = solutionGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortField.Alphabetically)}
          className={cn('button', { 'is-light': sortField !== 'abc' })}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => setSortField(SortField.ByLength)}
          className={cn('button', { 'is-light': sortField !== 'length' })}
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button', { 'is-light': reversed === false })}
        >
          Reverse
        </button>
        {(sortField !== SortField.None || reversed === true) && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortField.None);
              setReversed(false);
            }}
            className={cn('button', 'is-light')}
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
