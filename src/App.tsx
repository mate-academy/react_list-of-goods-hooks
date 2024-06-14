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
  default = '',
  alphabet = 'Sort alphabetically',
  length = 'Sort by length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabet:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortType.alphabet ? 'is-light' : ''}`}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortType.length ? 'is-light' : ''}`}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(reversed || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.default);
              setReversed(false);
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
