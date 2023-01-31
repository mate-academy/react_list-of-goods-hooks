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

export const App: React.FC = () => {
  const visibleGoods = [...goodsFromServer];
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const reoderedGoods = isReversed || sortType !== SortType.NONE;

  const reverseGoods = () => {
    setReversed(isReversing => !isReversing);
  };

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const resetAll = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  visibleGoods.sort((prevGood, nextGood): number => {
    switch (sortType) {
      case SortType.LENGTH:
        return prevGood.length - nextGood.length;
      case SortType.ALPHABET:
        return prevGood.localeCompare(nextGood);
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {reoderedGoods && (
          <button
            type="button"
            className="
              button
              is-danger
              is-light
            "
            onClick={resetAll}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
