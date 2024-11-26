import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  DEFAULT = '',
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
}

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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const visibileGoods = [...goodsFromServer];

  if (sortField) {
    visibileGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibileGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sortField === SortType.ALPHABETICALLY ? 'is-info' : 'is-light'}`}
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${sortField === SortType.LENGTH ? 'is-success' : 'is-light'}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${isReversed ? 'is-warning' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField !== SortType.DEFAULT || isReversed) && (
          <button
            type="button"
            className={`button is-danger is-light`}
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibileGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
