import React, { useState } from 'react';
import classNames from 'classnames';

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
  ByLength = 'length',
  ByAlpf = 'alph',
  Reverse = 'reversed',
}

type Sorted = {
  sortType: SortType,
  direction: SortType,
};

function sortGoods(
  goods: string[],
  { sortType, direction }: Sorted,
): string[] {
  const goodsCopy = [...goods];

  if (sortType) {
    goodsCopy.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ByAlpf:
          return good1.localeCompare(good2);

        case SortType.ByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (direction) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [direction, setDirection] = useState(SortType.Default);

  const sortedGoods = sortGoods(
    goodsFromServer,
    { sortType, direction },
  );

  const reset = () => {
    setSortType(SortType.Default);
    setDirection(SortType.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames({
            'is-light': sortType !== SortType.ByAlpf,
            button: true,
            'is-info': true,
          })}
          onClick={() => setSortType(SortType.ByAlpf)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames({
            'is-light': sortType !== SortType.ByLength,
            button: true,
            'is-success': true,
          })}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames({
            'is-light': direction !== SortType.Reverse,
            button: true,
            'is-warning': true,
          })}
          onClick={() => setDirection(
            direction === SortType.Default
              ? SortType.Reverse
              : SortType.Default,
          )}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || direction !== SortType.Default)
          && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
