import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';

import './App.scss';

import { goodsFromServer } from './constants/goodsFromServer';
import { SortType } from './types/sortType';
import { getGoodsList } from './helpers/getGoodsList';

export const App = () => {
  const [targetInnerText, setTargetInnerText] = useState<SortType | string>('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getGoodsList(
    goodsFromServer, targetInnerText, isReversed,
  );

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTargetInnerText(e.currentTarget.innerText);
  };

  const handlleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setTargetInnerText('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button is-info',
              { 'is-light': targetInnerText !== SortType.Alphabetically },
            )
          }
          onClick={handleSort}
        >
          {SortType.Alphabetically}
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-success',
              { 'is-light': targetInnerText !== SortType.Length },
            )
          }
          onClick={handleSort}
        >
          {SortType.Length}
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={handlleReverse}
        >
          Reverse
        </button>

        {
          (targetInnerText || isReversed)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={handleReset}
              >
                Reset
              </button>
            )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
