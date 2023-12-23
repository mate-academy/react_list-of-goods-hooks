import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer } from './api/goodFromServer';
import { SortType } from './types/SortType';

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReverse = false,
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

  return isReverse ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Empty);
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, isReverse);

  const handleResetButton = () => {
    setSortType(SortType.Empty);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>
        {
          (sortType || isReverse) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleResetButton}
            >
              Reset
            </button>
          )
        }
      </div>
      <ul>
        {visibleGoods.map((visibleGood => (
          <li key={visibleGood} data-cy="Good">{visibleGood}</li>
        )))}
      </ul>
    </div>
  );
};
