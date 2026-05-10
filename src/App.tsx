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

type Sorted = 'alphabetically' | 'length';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<Sorted | ''>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = [...goodsFromServer];

  if (sortField === 'alphabetically') {
    visibleGoods.sort((a: string, b: string) => a.localeCompare(b));
  }

  if (sortField === 'length') {
    visibleGoods.sort((a: string, b: string) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => setSortField('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((item: string) => {
          return (
            <li key={item} data-cy="Good">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
