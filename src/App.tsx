import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { PreparingOptions } from './types/PreparingOptions';
import { SortType } from './types/SortType';

import { GoodList } from './components/GoodList/GoodList';

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

function getPreparedGoods(
  goods: string[],
  {
    sortBy,
    isReversed,
  }: PreparingOptions,
): string[] {
  const preparedGoods: string[] = [...goods];

  if (sortBy) {
    preparedGoods.sort((a, b) => {
      switch (sortBy) {
        case SortType.ALPHABETICALLY:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        case SortType.NONE:
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods: string[] = getPreparedGoods(
    goodsFromServer,
    {
      sortBy,
      isReversed,
    },
  );

  const showResetBtn = sortBy !== SortType.NONE || isReversed;

  const handleReset = () => {
    setSortBy(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SortType.ALPHABETICALLY && 'is-light'}`}
          onClick={() => setSortBy(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== SortType.LENGTH && 'is-light'}`}
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>

        {showResetBtn && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
