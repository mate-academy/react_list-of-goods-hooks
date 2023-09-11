import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { GoodList } from './Components/GoodList/GoodList';
import { goodsFromServer } from './Components/goodListData';

enum SortType {
  Alphabet = 'abc',
  Id = 'id',
  Default = '',
}

interface FilterSort {
  sortType: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  {
    sortType,
    isReversed,
  }: FilterSort,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Id:

          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });
  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const isResetButtonVisible = sortType !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabet)}
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.Alphabet,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.Id)}
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.Id,
              'is-active': sortType === SortType.Id,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
          type="button"
          className={cn(
            'button ',
            'is-warning',
            {
              'is-light': !isReversed,
              'is-active': isReversed,
            },
          )}
        >
          Reverse
        </button>

        {(isResetButtonVisible) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
