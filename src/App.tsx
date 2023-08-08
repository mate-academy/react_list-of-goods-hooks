import React, { useState } from 'react';
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

function getPreparedGoods(goods: string[],
  sortBy: string,
  isReversed: boolean) {
  const preparedGoods = [...goods];

  if (sortBy === 'alphabet') {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === 'length') {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
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
          className={`button is-info ${sortBy === 'alphabet' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy('length')}
          type="button"
          className={`button is-success ${sortBy === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortBy !== '' || isReversed) && (
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
