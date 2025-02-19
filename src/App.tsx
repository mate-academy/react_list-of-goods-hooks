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

export enum SortType {
  alphabet = 'alphabet',
  length = 'length',
  default = '',
}

export const GoodsList: React.FC<{ goods: string[] }> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [reverse, setReverse] = useState(false);

  let showReset = false;

  const goods = [...goodsFromServer].sort((good1, good2) => {
    if (sortBy === SortType.alphabet) {
      return good1.localeCompare(good2);
    } else if (sortBy === SortType.length) {
      return good1.length - good2.length;
    }

    return 0;
  });

  if (reverse) {
    goods.reverse();
  }

  const isArraySame = (goods1: string[], goods2: string[]) => {
    return (
      goods1.length === goods2.length &&
      goods1.every((val, idx) => val === goods2[idx])
    );
  };

  showReset = !isArraySame(goods, [...goodsFromServer]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortBy === 'alphabet' ? 'button is-info' : 'button is-info is-light'
          }
          onClick={() => setSortBy(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortBy === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortBy(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reverse ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>
        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.default);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};
