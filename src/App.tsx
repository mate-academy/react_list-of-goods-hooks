import React, { useState } from 'react';
import 'bulma/css/bulma.css';

import cn from 'classnames';

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

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: string,
  reversed: boolean | string | string[],
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });

    if (reversed) {
      preparedGoods.reverse();
    }
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [reversed, setReversed] = useState<boolean>(false);
  const visibleGoods: string[]
  = getPreparedGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button',
            { 'is-info': sortField === SortType.Alphabet })}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button',
            { 'is-success': sortField === SortType.Length })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', { 'is-warning': reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          // className="button is-danger is-light"
          className={cn('button', { 'is-light': sortField !== '' || reversed })}
          style={{ display: sortField !== '' || reversed ? 'block' : 'none' }}
          onClick={() => setSortField('')}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map((good, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
