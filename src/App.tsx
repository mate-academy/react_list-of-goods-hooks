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
  const [goods, setGoods] = useState(goodsFromServer);
  const [showList, setShowList] = useState(false);

  const isVisible = () => {
    setShowList(true);
  };

  const reverseList = () => {
    setGoods([...goods].reverse());
  };

  const sortAlphabet = () => {
    setGoods([...goods].sort());
  };

  const resetList = () => {
    setGoods([...goodsFromServer]);
  };

  const sortByLength = () => {
    setGoods(
      [...goods].sort((item1, item2) => (item1.length - item2.length)),
    );
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {showList
        ? (
          <>
            <GoodsList goods={goods} />
            <button
              type="button"
              onClick={reverseList}
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={sortAlphabet}
            >
              Sort A-Z
            </button>
            <button
              type="button"
              onClick={resetList}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={sortByLength}
            >
              Sort by length
            </button>
          </>
        )
        : (
          <button
            type="button"
            onClick={isVisible}
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
