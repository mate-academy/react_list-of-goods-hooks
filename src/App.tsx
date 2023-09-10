import 'bulma/css/bulma.css';
import classnames from 'classnames';
import './App.scss';
import React, { useState } from 'react';

import { SortType } from './types/SortType';

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

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isFieldReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabet: {
          return good1.localeCompare(good2);
        }

        case SortType.Length: {
          return good1.length - good2.length;
        }

        default: {
          return 0;
        }
      }
    });
  }

  if (isFieldReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isFieldReversed, setIsFieldReversed] = useState(false);

  const filteredGoods = getPreparedGoods(
    goodsFromServer, sortType, isFieldReversed,
  );

  const isSortedOrReversed = sortType || isFieldReversed;

  const resetHandler = () => {
    setSortType(SortType.Default);
    setIsFieldReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.Alphabet)}
          className={classnames('button', 'is-info',
            {
              'is-light': sortType !== SortType.Alphabet,
            })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.Length)}
          className={classnames('button', 'is-info',
            {
              'is-light': sortType !== SortType.Length,
            })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsFieldReversed(!isFieldReversed)}
          className={classnames('button', 'is-info',
            {
              'is-light': !isFieldReversed,
            })}
        >
          Reverse
        </button>

        {isSortedOrReversed && (
          <button
            type="button"
            onClick={resetHandler}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {filteredGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
