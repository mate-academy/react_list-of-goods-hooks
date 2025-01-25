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

export const App: React.FC = () => {
  const ALPHABETICALLY = 'alphabetically';
  const LENGTH = 'length';

  type SortBy = typeof ALPHABETICALLY | typeof LENGTH | '';

  const [sortBy, setSortBy] = useState<SortBy>('');
  const [isReverse, setIsReverse] = useState<boolean>(false);

  function sortGoods(
    goods: string[],
    sort: SortBy,
    needReverse: boolean,
  ): string[] {
    const copyGoods = [...goods];

    if (sort) {
      copyGoods.sort((a: string, b: string): number => {
        if (sort === ALPHABETICALLY) {
          return a.localeCompare(b);
        }

        if (sort === LENGTH) {
          return a.length - b.length;
        }

        return 0;
      });
    }

    if (needReverse) {
      copyGoods.reverse();
    }

    return copyGoods;
  }

  const sortedGoods = sortGoods(goodsFromServer, sortBy, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== ALPHABETICALLY ? 'is-light' : null}`}
          onClick={() => setSortBy(ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortBy !== LENGTH ? 'is-light' : null}`}
          onClick={() => setSortBy(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse ? null : 'is-light'}`}
          onClick={() => setIsReverse(currentState => !currentState)}
        >
          Reverse
        </button>

        {(sortBy || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(value => (
          <li key={value} data-cy="Good">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
