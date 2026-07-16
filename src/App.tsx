import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
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

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const isModified = sortType !== SortType.Default || isReversed;

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabet) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
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
            sortType === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortType(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortType(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
