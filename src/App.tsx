import React, { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

import { SortField } from './types/sortField';
import { SortType } from './types/sortType';

export const goodsFromServer: Array<string> = [
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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [reverseToogle, setReverseToogle] = useState<boolean | string>(false);

  let goods = [...goodsFromServer].sort((goods1: string, goods2: string) => {
    switch (sortField) {
      case SortType.alphabet:
        return goods1.localeCompare(goods2);
      case SortType.length:
        return goods1.length - goods2.length;
      default:
        return 0;
    }
  });

  if (reverseToogle) {
    goods = goods.reverse();
  }

  const reverse = () => {
    setReverseToogle(!reverseToogle);
  };

  const reset = () => {
    setSortField('');
    setReverseToogle('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.alphabet)}
          type="button"
          className={`button is-info ${sortField !== SortType.alphabet && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={`button is-success ${sortField !== SortType.length && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={`button is-warning ${!reverseToogle && 'is-light'}`}
        >
          Reverse
        </button>

        {sortField !== '' || reverseToogle ? (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {goods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
