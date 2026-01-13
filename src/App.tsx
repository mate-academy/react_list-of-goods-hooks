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
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [reverse, setReverse] = useState(false);

  const goods = [...goodsFromServer];

  if (sortType === SortType.ALPHABET) {
    goods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    goods.sort((a, b) => a.length - b.length);
  }

  if (reverse) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ALPHABET ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.LENGTH ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.NONE);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
