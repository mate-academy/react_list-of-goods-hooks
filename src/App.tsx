import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';
import { goodsFromServer } from './api/goodsFromServer';

function getPreparesGoods(
  goods: string[],
  sortType: SortType,
  reverse = false,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Empty);
  const [sortReverse, setSortReverse] = useState(false);

  const visibleGoods = getPreparesGoods(
    goodsFromServer, sortType, sortReverse,
  );

  const resetSort = () => {
    setSortType(SortType.Empty);
    setSortReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.Alphabet)}
          className={cn('button is-info',
            { 'is-light': sortType !== SortType.Alphabet })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.Length)}
          className={cn('button is-succes',
            { 'is-light': sortType !== SortType.Length })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setSortReverse(!sortReverse)}
          className={cn('button is-warning',
            { 'is-light': !sortReverse })}
        >
          Reverse
        </button>

        {(sortType !== SortType.Empty || sortReverse) && (
          <button
            type="button"
            onClick={resetSort}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>

    </div>
  );
};
