import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  default = '',
  ByAlphabet = 'Sort alphabetically',
  ByLength = 'Sort by length',
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

function getPreparedGoods(
  goods: string[],
  sortOption: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortOption) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortOption) {
        case SortType.ByAlphabet:
          return goodA.localeCompare(goodB);

        case SortType.ByLength:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortOption, setSortOption] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortOption,
    isReversed,
  );

  const reset = () => {
    setIsReversed(false);
    setSortOption(SortType.default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortOption !== SortType.ByAlphabet },
          )}
          onClick={() => setSortOption(SortType.ByAlphabet)}
        >
          {SortType.ByAlphabet}
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortOption !== SortType.ByLength },
          )}
          is-warning
          onClick={() => setSortOption(SortType.ByLength)}
        >
          {SortType.ByLength}
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(reverse => !reverse)}
        >
          Reverse
        </button>

        {(sortOption || isReversed)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
