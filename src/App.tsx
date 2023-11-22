import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

import { GoodsList } from './components/GoodsList';

export const goodsFromServer: string[] = [
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

enum SortType {
  DEFAULT = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

function getPreparedGoods(
  goodsList: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goodsList];

  if (sortField) {
    preparedGoods.sort((firstGood, secondGood) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return firstGood.localeCompare(secondGood);

        case SortType.LENGTH:
          return firstGood.length - secondGood.length;

        default:
          return 0;
      }
    });
  }

  return isReversed
    ? preparedGoods.reverse()
    : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.ALPHABET,
          })}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn(
            sortField === SortType.DEFAULT && !isReversed
              ? 'is-hidden'
              : 'button is-danger is-light',
          )}
          onClick={() => {
            setIsReversed(false);
            setSortField(SortType.DEFAULT);
          }}
        >
          Reset
        </button>
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
