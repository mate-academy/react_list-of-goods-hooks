import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type SortType = '' | 'alphabet' | 'length';

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
  const [sortType, setSortType] = useState<SortType>('');
  const [isReversed, setIsReversed] = useState(false);

  const isModified = sortType !== '' || isReversed;

  const visibleGoods = [...goodsFromServer];

  if (sortType === 'alphabet') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === 'length') {
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
            sortType === 'alphabet'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortType('alphabet');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortType('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed
              ? 'button is-warning'
              : 'button is-warning is-light'
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
              setSortType('');
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
