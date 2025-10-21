import React, { useState } from 'react';
import cn from 'classnames';

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

// type SortType = SortType.alpha | SortType.length | SortType.default;
enum SortType {
  alpha,
  length,
  default,
}

function sortGoods(list: string[], sortType: SortType): string[] {
  const listCopy = [...list];

  listCopy.sort((good1, good2) => {
    switch (sortType) {
      case SortType.alpha:
        return good1.localeCompare(good2);

      case SortType.length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (sortType === SortType.default) {
    return [...goodsFromServer];
  }

  return [...listCopy];
}

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.default);
  const [reversed, setReversed] = useState(false);
  let sortedList = [...goodsFromServer];

  if (sortType) {
    sortedList = sortGoods(goodsFromServer, sortType);
  }

  if (reversed) {
    sortedList.reverse();
  }

  if (!sortType && !reversed) {
    sortedList = [...goodsFromServer];
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.alpha,
          })}
          onClick={() => setSortType(SortType.alpha)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.length,
          })}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortType !== SortType.default || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {sortedList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
