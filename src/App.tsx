import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type Goods = string[];
type SortType = 'alphabetically' | 'length' | '';

export const goodsFromServer: Goods = [
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
  const [sort, setSort] = useState<SortType>('');
  const [reverse, setReverse] = useState<boolean>(false);
  const goodsSort = [...goodsFromServer].sort((good1, good2) => {
    switch (sort) {
      case 'alphabetically':
        return good1.localeCompare(good2);
      case 'length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    goodsSort.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSort('alphabetically')}
          type="button"
          className={`button is-info ${sort === 'alphabetically' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSort('length')}
          type="button"
          className={`button is-success ${sort === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>
        {reverse || sort ? (
          <button
            onClick={() => {
              setSort('');
              setReverse(false);
            }}
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
        {goodsSort.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
