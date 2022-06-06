/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './GoodsList';

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
  const [listIsVisible, setListIsVisible] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);

  const reverseGoods = () => {
    setIsReversed(!isReversed);
    setGoods(current => [...current].reverse());
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {console.log(isReversed)}
      {listIsVisible && (
        <>
          <GoodsList goods={goods} />

          <button
            type="button"
            onClick={() => reverseGoods()}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => setGoods(
              [...goodsFromServer].sort((a, b) => a.localeCompare(b)),
            )}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => setGoods([...goodsFromServer])}
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => setGoods(
              [...goodsFromServer].sort((a, b) => a.length - b.length),
            )}
          >
            Sort by length
          </button>
        </>
      )}
      {!listIsVisible && (
        <button
          type="button"
          onClick={() => setListIsVisible(true)}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default App;
