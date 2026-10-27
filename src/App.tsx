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
  Alphabetically,
  Length,
  Reverse,
  Reset,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Reset);
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.Alphabetically ? '' : 'is-light'
          }`}
          onClick={() => {
            const sortedGoods = [...goodsFromServer].sort((a, b) =>
              a.localeCompare(b),
            );

            if (isReversed) {
              setGoods([...sortedGoods].reverse());
            } else {
              setGoods(sortedGoods);
            }

            setSortType(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.Length ? '' : 'is-light'
          }`}
          onClick={() => {
            const sortedGoods = [...goodsFromServer].sort(
              (a, b) => a.length - b.length,
            );

            if (isReversed) {
              setGoods([...sortedGoods].reverse());
            } else {
              setGoods(sortedGoods);
            }

            setSortType(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(previous => !previous);
            setGoods([...goods].reverse());
          }}
        >
          Reverse
        </button>

        {(sortType !== SortType.Reset || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.Reset);
              setGoods([...goodsFromServer]);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
