import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';

import './App.scss';
import { GoodList } from './components/GoodList';
import { SortType } from './types/sortTypes.enum';
import { SortParams } from './types/sortParams';

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

function getSortedGoods(
  goods: string[],
  { sortType, isReversed }: SortParams,
): string[] {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setsortField] = useState<SortType | null>(null);
  const [isReversed, setReversed] = useState(false);
  const visibleGoods = getSortedGoods(
    goodsFromServer,
    { sortType: sortField, isReversed },
  );
  const isShowResetButton = sortField || isReversed;

  const reverseGoods = () => {
    setReversed(reverse => !reverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.ALPHABET })}
          onClick={() => setsortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.LENGTH })}
          onClick={() => setsortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        { isShowResetButton
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setsortField(null);
                setReversed(false);
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
