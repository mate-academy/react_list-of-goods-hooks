import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';
import { GoodList } from './components/GoodList';
import { goodsFromServer, SortString } from './variables';
import { getPreparedGoods } from './components/prepareFunction';

export const App: React.FC = () => {
  const [sortField, setsortField] = useState<string>('');
  const [isReverse, setisReverse] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  const handlerAlphabetSort = () => {
    setsortField(SortString.Alphabet);
  };

  const handlerLengthSort = () => {
    setsortField(SortString.Length);
  };

  const handlerReverseSort = () => {
    setisReverse((currentState) => !currentState);
  };

  const handlerResetSort = () => {
    setsortField('');
    setisReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handlerAlphabetSort}
          type="button"
          className={`button is-info ${cn({
            'is-light': sortField !== SortString.Alphabet,
          })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handlerLengthSort}
          type="button"
          className={`button is-success ${cn({
            'is-light': sortField !== SortString.Length,
          })}`}
        >
          Sort by length
        </button>

        <button
          onClick={handlerReverseSort}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            onClick={handlerResetSort}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList
        goods={visibleGoods}
      />
    </div>
  );
};
