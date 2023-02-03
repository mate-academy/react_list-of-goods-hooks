import React, { useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

import { SortType } from './types/SortType';
import { ReorderOptions } from './types/ReorderOptions';

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

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.LENGTH:
        return good1.length - good2.length;

      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.NONE:
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const isResetButtonVisible = sortType !== SortType.NONE || isReversed;
  const isLightAlphabetButton = sortType !== SortType.ALPHABET;
  const isLightLengthButton = sortType !== SortType.LENGTH;
  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { isReversed, sortType },
  );
  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': isLightAlphabetButton },
          )}
          onClick={() => (
            setSortType(SortType.ALPHABET)
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': isLightLengthButton },
          )}
          onClick={() => (
            setSortType(SortType.LENGTH)
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
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
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
