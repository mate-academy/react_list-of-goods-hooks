import React, { useState } from 'react';
import './App.css';

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

export const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);

  const startGoods = () => {
    setIsOpened(true);
  };

  const reversedGoods = () => {
    setVisibleGoods([...visibleGoods].reverse());
  };

  const sortByABCGoods = () => {
    setVisibleGoods([...visibleGoods].sort((good1, good2) => {
      return good1.localeCompare(good2);
    }));
  };

  const sortByGoodsLength = () => {
    setVisibleGoods([...visibleGoods].sort((good1, good2) => {
      return (good1.length - good2.length);
    }));
  };

  const resetGoods = () => {
    setVisibleGoods([...goodsFromServer]);
  };

  return (
    <div className="App">
      <h1>Goods</h1>

      {!isOpened
        ? (
          <button
            type="button"
            onClick={() => {
              startGoods();
            }}
          >
            Start
          </button>
        )
        : null}

      {isOpened
        ? (
          <>
            <button
              type="button"
              onClick={() => {
                reversedGoods();
              }}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => {
                sortByABCGoods();
              }}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => {
                sortByGoodsLength();
              }}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => {
                resetGoods();
              }}
            >
              Reset
            </button>
          </>
        )
        : null}

      <ul>
        {isOpened && visibleGoods.map((good) => {
          return (
            <li key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
