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
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
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
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {showResetBtn && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
