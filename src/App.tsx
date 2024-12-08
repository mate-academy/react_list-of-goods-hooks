import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';
import { SortTypes } from './services/types/SortType';
import { sortList } from './services/utils';

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

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortTypes.default);

  const reverseList = () => {
    setIsReversed(currentState => !currentState);
  };

  const resetList = () => {
    setIsReversed(false);
    setSortType(SortTypes.default);
  };

  const isResetVisible = () => {
    return sortType || isReversed;
  };

  const prepearedListOfGoods = [...goodsFromServer];

  if (sortType) {
    sortList(prepearedListOfGoods, sortType);
  }

  if (isReversed) {
    prepearedListOfGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortType !== SortTypes.alph })}`}
          onClick={() => setSortType(SortTypes.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortType !== SortTypes.length })}`}
          onClick={() => setSortType(SortTypes.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !isReversed })}`}
          onClick={() => reverseList()}
        >
          Reverse
        </button>

        {isResetVisible() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetList()}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {prepearedListOfGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
