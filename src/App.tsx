import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

export enum SortType {
  NONE = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

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

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = [...goodsFromServer];

  if (sortBy === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortBy === SortType.ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortBy === SortType.LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
