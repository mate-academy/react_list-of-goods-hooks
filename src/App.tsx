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

enum SortType {
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
}

export const App: React.FC = () => {
  const [sorting, setSorting] = useState('');
  const [reverse, setReverse] = useState(false);

  const getReorderedGoods = () => {
    const visibleGoods = [...goodsFromServer];

    visibleGoods.sort((good1, good2) => {
      switch (sorting) {
        case SortType.ALPHABET:
          return (good1.localeCompare(good2));

        case SortType.LENGTH:
          return (good1.length - good2.length);

        default:
          return 0;
      }
    });

    if (reverse) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const reorderedGoods = getReorderedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sorting === SortType.ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSorting(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sorting === SortType.LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSorting(SortType.LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={
            reverse
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(reverse || sorting) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSorting('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reorderedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
