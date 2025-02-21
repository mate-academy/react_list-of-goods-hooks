import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortType {
  None = '',
  Alphabetically = 'alphabetically',
  ByLength = 'by length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);

  let visibleGoods = [...goodsFromServer].sort((a, b) => {
    if (sortField === SortType.Alphabetically) {
      return a.localeCompare(b);
    }

    if (sortField === SortType.ByLength) {
      return a.length - b.length;
    }

    return 0;
  });

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const isOriginalOrder =
    JSON.stringify(visibleGoods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetically)}
          type="button"
          className={`button is-info ${
            sortField === SortType.Alphabetically ? '' : 'is-light'
          }`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.ByLength)}
          type="button"
          className={`button is-success ${
            sortField === SortType.ByLength ? '' : 'is-light'
          }`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            onClick={() => {
              setSortField(SortType.None);
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
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
