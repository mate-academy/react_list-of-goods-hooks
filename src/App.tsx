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

interface SortType {
  sortedByAlp: boolean;
  reversed: boolean;
  sortedByLeng: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortedByAlp, sortedByLeng, reversed }: SortType,
): string[] {
  const sortedGoods = [...goods];

  if (sortedByAlp && !sortedByLeng) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortedByLeng && !sortedByAlp) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortedByAlp, setSortedByAlp] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sortedByLeng, setSortedByLeng] = useState(false);

  const visiableGoods = getPreparedGoods(goodsFromServer, {
    sortedByAlp,
    reversed,
    sortedByLeng,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': !sortedByAlp,
          })}
          onClick={() => {
            setSortedByAlp(true);
            setSortedByLeng(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': !sortedByLeng,
          })}
          onClick={() => {
            setSortedByLeng(true);
            setSortedByAlp(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortedByAlp || sortedByLeng || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedByAlp(false);
              setSortedByLeng(false);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visiableGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
