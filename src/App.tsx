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
  sortBy: string,
  isReversed: boolean) {
  const preparedGoods = [...goods];

  if (sortBy === SortType.ALPHABET) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === SortType.LENGTH) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  if (sortBy === SortType.DEFAULT) {
    return preparedGoods;
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy('alphabet')}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortBy !== SortType.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy('length')}
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
            onClick={() => {
              setSortBy('');
              setIsReversed(false);
            }}
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
