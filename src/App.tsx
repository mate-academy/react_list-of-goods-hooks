import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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


type SortField = '' | 'alphabet' | 'length';

export const App = () => {
  const [sortField, setSortField] = useState<SortField>('');
  let visibleGoods: string[] = [...goodsFromServer];
  const [reversedState, setReverseState] = useState<boolean>(false);

  if (sortField === '') {
    visibleGoods = [...goodsFromServer];
  }

  if (sortField === 'alphabet') {
    visibleGoods = [...visibleGoods].sort();
  }

  if (sortField === 'length') {
    visibleGoods = [...visibleGoods].sort((a, b) => a.length - b.length);
  }

  if (reversedState) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => setSortField('alphabet')}
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
          className={`button is-warning ${reversedState ? '' : 'is-light'}`}
          onClick={() => {
            setReverseState(!reversedState);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || reversedState) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseState(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good: string) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
