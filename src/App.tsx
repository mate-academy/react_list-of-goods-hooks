import React from 'react';
import 'bulma/css/bulma.css';
import { useState } from 'react';
import classNames from 'classnames';

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

export const App: React.FC = () => {
  enum SortType {
    alphabetically = 'sort alphabetically',
    byLength = 'sort by length',
    default = '',
  }

  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [reversed, setReversed] = useState(false);

  const reset = () => {
    setSortField(SortType.default);
    setReversed(false);
  };

  let visibleGoods = goodsFromServer;

  if (sortField === SortType.alphabetically) {
    visibleGoods = [...visibleGoods].sort((good1, good2) =>
      good1.localeCompare(good2),
    );
  }

  if (sortField === SortType.byLength) {
    visibleGoods = [...visibleGoods].sort(
      (good1, good2) => good1.length - good2.length,
    );
  }

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={() => setSortField(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.byLength,
          })}
          onClick={() => setSortField(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
