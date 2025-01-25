import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import React from 'react';

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
  NONE,
  ALPHABET,
  LENGTH,
}



export const App: React.FC = () => {
  const goods = [...goodsFromServer];
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  if (sortType === SortType.ALPHABET) {
    goods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    goods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.ALPHABET)}
          type="button"
          className={
            sortType === SortType.ALPHABET ? 'button is-info ' : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.LENGTH)}
          type="button"
          className={
            sortType === SortType.LENGTH ? 'button is-success' : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(reversed => !reversed)}
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {isReversed || sortType !== 0 ? (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>
        <ul>
          {goods.map(good => {
            return (
              <li key={`${good}`} data-cy="Good">
                {good}
              </li>
            );
          })}
        </ul>
    </div>
  );
};
