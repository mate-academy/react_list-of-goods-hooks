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
  const [sortType, setSortType] = useState(SortType.NONE);

  const getReorderedGoods = () => {
    const visibleGoods = [...goodsFromServer];

    visibleGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });

    return isReversed ? visibleGoods.reverse() : visibleGoods;
  };

  const sortedGoods = getReorderedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
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
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
