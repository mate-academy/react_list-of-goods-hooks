import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './GoodsList/GoodsList';

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
  const [isVisible, setVisibility] = useState(false);
  const [goodsState, setGoodsState] = useState(goodsFromServer);

  return (
    (isVisible)
      ? (
        <div className="App">
          <GoodsList list={goodsState} />
          <button
            type="button"
            onClick={() => (setGoodsState([...goodsFromServer].reverse()))}
          >
            Reverse
          </button>
          <button
            type="button"
            onClick={() => (setGoodsState([...goodsFromServer].sort()))}
          >
            Sort by alphabet
          </button>
          <button
            type="button"
            onClick={() => (
              setGoodsState(
                [...goodsFromServer].sort((a, b) => a.length - b.length),
              )
            )}
          >
            Sort by length
          </button>
          <button
            type="button"
            onClick={() => (setGoodsState([...goodsFromServer]))}
          >
            Reset
          </button>
        </div>
      )
      : (
        <button
          type="button"
          onClick={() => setVisibility(true)}
        >
          start
        </button>
      )

  );
};

export default App;
