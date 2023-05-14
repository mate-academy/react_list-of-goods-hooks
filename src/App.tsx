import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = [...goodsFromServer];
  const [sortType, setSortType] = useState(SortType.NONE);

  const resetAll = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort();
      break;

    case SortType.LENGTH:
      visibleGoods.sort((g1, g2) => g1.length - g2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button', 'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success', { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(value => !value)}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={resetAll}
              >
                Reset
              </button>
            )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
