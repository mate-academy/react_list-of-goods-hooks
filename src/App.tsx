import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { SortType } from './types/sort-types';
import { getReorderedGoods } from './helpers/get-reordered-goods';

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const goodsForRender = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const handleReverse = () => setIsReversed(!isReversed);

  const handleSortByAlphabet = () => setSortType(SortType.ALPHABET);

  const handleSortByLength = () => setSortType(SortType.LENGTH);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button', 'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE)
        && (
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
        {goodsForRender.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
