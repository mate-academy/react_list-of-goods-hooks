import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import SortType from './types/SortType';
import { getReorderedGoods } from './functions/getReorderedGoods';

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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const isResetRendered = isReversed || sortType !== SortType.NONE;

  const handleClickSortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleClickSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleClickReverse = () => {
    setReverse(!isReversed);
  };

  const handleClickReset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': true,
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={handleClickSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': true,
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={handleClickSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': true,
            'is-light': !isReversed,
          })}
          onClick={handleClickReverse}
        >
          Reverse
        </button>

        {
          (isResetRendered) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleClickReset}
            >
              Reset
            </button>
          )
        }

      </div>

      <ul>
        <ul>
          {
            getReorderedGoods(goodsFromServer, { sortType, isReversed })
              .map((good) => (
                <li key={good} data-cy="Good">{good}</li>
              ))
          }
        </ul>
      </ul>
    </div>
  );
};
