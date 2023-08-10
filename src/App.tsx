import React, { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './components/GoodList/GoodList';

import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortType {
  LENGTH = 'length',
  ALPHABET = 'alphabet',
  DEFAULT = '',
}

function getPreparedGoods(goods: string[],
  sortBy: SortType,
  isReversed: boolean) {
  const preparedGoods = [...goods];

  switch (sortBy) {
    case SortType.ALPHABET:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  const reverseHandler = () => {
    setSortBy(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SortType.ALPHABET)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortBy !== SortType.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SortType.LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortBy !== SortType.LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {(!!sortBy || isReversed) && (
          <button
            onClick={reverseHandler}
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
