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
  Default = 'DEFAULT',
  Alphabelically = 'ALPHABETICALLY',
  Length = 'LENGTH',
  Reverse = 'REVERSE',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  function getVisibleGoods(
    initialGoods: string[],
    currentSortType: SortType,
    valueIsReversed: boolean,
  ) {
    const sortedGoods = [...initialGoods];

    if (currentSortType === SortType.Alphabelically) {
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (currentSortType === SortType.Length) {
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (valueIsReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  const SortByAlphabet = () => {
    setSortType(SortType.Alphabelically);
  };

  const SortByLength = () => {
    setSortType(SortType.Length);
  };

  const reverse = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.Default);
  };

  const visibleGoods = getVisibleGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.Alphabelically,
          })}
          onClick={SortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={SortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.Default) && (
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
