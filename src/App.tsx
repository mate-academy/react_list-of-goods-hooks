import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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
  None,
  Alphabet,
  Length,
}

export const App: React.FC = () => {
  const goods = [...goodsFromServer];
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const reset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  if (sortType === SortType.Alphabet) {
    goods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    goods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabet)}
          type="button"
          className={
            sortType === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.Length)}
          type="button"
          className={
            sortType === SortType.Length
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
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {isReversed || sortType !== SortType.None ? (
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
