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
  NONE,
  ALPHABET,
  LENGTH,
}

function gerOrderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

      case SortType.NONE:
        return 0;

      default:
        throw new Error('Invalid sortType');
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setsortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const setSortAlphabetically = () => {
    setsortType(SortType.ALPHABET);
  };

  const setSortTypeLength = () => {
    setsortType(SortType.LENGTH);
  };

  const reverseGoodsList = () => {
    setReverse(reverse => !reverse);
  };

  const resetGoodsList = () => {
    setsortType(SortType.NONE);
    setReverse(false);
  };

  const orderedGoods = gerOrderedGoods(goodsFromServer, sortType, isReversed);
  const isListReversed = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={setSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={setSortTypeLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseGoodsList}
        >
          Reverse
        </button>

        {isListReversed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoodsList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {orderedGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
