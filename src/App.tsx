import React from 'react';
import { useState } from 'react';
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
  None = 'none',
  Alphabetically = 'abc',
  ByLength = 'length',
}

export const App: React.FC = () => {
  const [originalGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState(false);
  let sortedGoods = [...originalGoods];

  switch (sortField) {
    case SortType.Alphabetically:
      sortedGoods.sort((g1, g2) => g1.localeCompare(g2));

      break;

    case SortType.ByLength:
      sortedGoods.sort((g1, g2) => g1.length - g2.length);

      break;

    case SortType.None:
    default:
      break;
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetically)}
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.ByLength)}
          type="button"
          className={`button is-success ${sortField === SortType.ByLength ? '' : 'is-light'}`}
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

        {(sortField !== SortType.None || reversed) && (
          <button
            onClick={() => {
              setReversed(false);
              setSortField(SortType.None);
              sortedGoods = [...originalGoods];
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
