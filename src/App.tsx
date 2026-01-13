import classNames from 'classnames';
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { GoodsList } from './components/goodsList';
import { SortType } from './types/SortType';
import { goodsFromServer } from './api/goodsList';
import { handleSortGoods } from './functions/handleSortGoods';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  let filteredGoods = handleSortGoods(goodsFromServer, sortField);

  function handleSortType(field: SortType) {
    setSortField(field);
  }

  function resetGoods() {
    setIsReversed(false);
    setSortField(SortType.DEFAULT);
  }

  function toggleReverse() {
    setIsReversed(!isReversed);
  }

  if (isReversed) {
    filteredGoods = [...filteredGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSortType(SortType.ALPHABET)}
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSortType(SortType.LENGTH)}
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={toggleReverse}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(isReversed || sortField) && (
          <button
            type="button"
            onClick={resetGoods}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={filteredGoods} />
    </div>
  );
};
