import React, { useState } from 'react';

import { GoodsList } from './GoodsList';

import './App.scss';

const goodsFromServer: string[] = [
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

const App: React.FC = () => {
  const [goodsList, setGoodsList] = useState(goodsFromServer);
  const [isVisibleStart, setVisibleStart] = useState(true);

  const hideStart = () => {
    setVisibleStart(prev => !prev);
  };

  const reverseGoods = () => {
    setGoodsList([...goodsList].reverse());
  };

  const sortByAbcGoods = () => {
    setGoodsList([...goodsList]
      .sort((good1, good2) => good1.localeCompare(good2)));
  };

  const sortByLengtGoods = () => {
    setGoodsList([...goodsList]
      .sort((good1, good2) => good1.length - good2.length));
  };

  const resetGoods = () => {
    setGoodsList([...goodsFromServer]);
  };

  return isVisibleStart
    ? (
      <button
        type="button"
        className="button"
        onClick={hideStart}
      >
        Start
      </button>
    )
    : (
      <div className="goods">
        { goodsList.length > 0 && (
          <GoodsList
            goodsList={goodsList}
          />
        )}

        <div className="goods__buttons">
          <button
            type="button"
            className="button"
            onClick={reverseGoods}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button"
            onClick={sortByAbcGoods}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="button"
            onClick={resetGoods}
          >
            Reset
          </button>

          <button
            type="button"
            className="button"
            onClick={sortByLengtGoods}
          >
            Sort by length
          </button>
        </div>
      </div>
    );
};

export default App;
