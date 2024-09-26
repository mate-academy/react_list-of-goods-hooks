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
  Default = '',
  SortAlphabetically = 'Sort alphabetically',
  SortByLength = 'Sort by length',
}

const REVERSE = 'Reverse';

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  reversed: boolean,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SortAlphabetically:
          return good1.localeCompare(good2);
        case SortType.SortByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sortField === SortType.SortAlphabetically ? `is-info` : `is-light`}`}
          onClick={() => setSortField(SortType.SortAlphabetically)}
        >
          {SortType.SortAlphabetically}
        </button>

        <button
          type="button"
          className={`button ${sortField === SortType.SortByLength ? `is-success` : `is-light`}`}
          onClick={() => setSortField(SortType.SortByLength)}
        >
          {SortType.SortByLength}
        </button>

        <button
          type="button"
          className={`button ${reversed ? `is-warning` : `is-light`}`}
          onClick={() => setReversed(!reversed)}
        >
          {REVERSE}
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.Default);
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
