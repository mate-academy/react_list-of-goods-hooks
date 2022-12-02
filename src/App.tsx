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

export const App: React.FC = () => {
  const visibleGoods = [...goodsFromServer];
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(0);

  if (sortBy === 1) {
    visibleGoods.sort();
  }

  if (sortBy === 2) {
    visibleGoods.sort((g1, g2) => {
      return g1.length - g2.length;
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(1)}
          type="button"
          className={
            sortBy === 1
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(2)}
          type="button"
          className={
            sortBy === 2
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={
            isReversed === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {
          (sortBy > 0 || isReversed === true)
            ? (
              <button
                onClick={() => {
                  setIsReversed(false); setSortBy(0);
                }}
                type="button"
                className="button is-danger is-light"
              >
                Reset
              </button>
            )
            : ('')
        }
      </div>

      <ul>
        {visibleGoods.map(good => <li data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
