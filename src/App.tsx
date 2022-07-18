import React, { useState } from 'react';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const [isOpened, setValue] = useState(false);
  const [visibleGoods, setValue2] = useState([...goodsFromServer]);

  const startGoods = () => {
    setValue(true);
  };

  const reversedGoods = () => {
    setValue2([...visibleGoods.reverse()]);
  };

  const sortByABCGoods = () => {
    setValue2([...visibleGoods.sort((good1, good2) => {
      return good1.localeCompare(good2);
    })]);
  };

  const sortByGoodsLength = () => {
    setValue2([...visibleGoods.sort((good1, good2) => {
      return (good1.length - good2.length);
    })]);
  };

  const resetGoods = () => {
    setValue2([...goodsFromServer]);
  };

  return (
    <div className="App">
      <h1>Goods</h1>

      {!isOpened
      && (
        <button
          type="button"
          onClick={() => {
            startGoods();
          }}
        >
          Start
        </button>
      )}

      {isOpened
      && (
        <button
          type="button"
          onClick={() => {
            reversedGoods();
          }}
        >
          Reverse
        </button>
      )}

      {isOpened
      && (
        <button
          type="button"
          onClick={() => {
            sortByABCGoods();
          }}
        >
          Sort alphabetically
        </button>
      )}

      {isOpened
      && (
        <button
          type="button"
          onClick={() => {
            sortByGoodsLength();
          }}
        >
          Sort by length
        </button>
      )}

      {isOpened
      && (
        <button
          type="button"
          onClick={() => {
            resetGoods();
          }}
        >
          Reset
        </button>
      )}

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
