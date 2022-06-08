import React, { useState } from 'react';
import './App.css';

import { GoodsList } from './components/GoodsList';

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

const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const App: React.FC = () => {
  const [selectedGoods, setSelectedGoods] = useState([...goodsFromServer]);
  const [isVisible, setIsVisible] = useState(false);
  const [numberValue, setNumberValue] = useState(0);

  const reverse = () => {
    setSelectedGoods(current => [...current].reverse());
  };

  const sort = (sortBy: string) => {
    setSelectedGoods(current => [...current].sort((g1, g2) => {
      switch (sortBy) {
        case 'alphab':
          return g1.localeCompare(g2);

        case 'length':
          return g1.length - g2.length;

        default:
          return 0;
      }
    }));
  };

  const visibleGoods = selectedGoods.filter(good => (
    good.length >= numberValue
  ));

  return (
    <div className="App content is-large has-text-centered">
      <h1 className="fs-2">Goods</h1>
      {isVisible
        ? <GoodsList goods={visibleGoods} />
        : (
          <button
            type="button"
            className="button is-medium is-primary"
            onClick={() => {
              setIsVisible(current => !current);
            }}
          >
            Start
          </button>
        )}

      {isVisible && (
        <>
          <button
            type="button"
            className="button is-medium is-link mx-2"
            onClick={() => {
              reverse();
            }}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button is-medium is-primary mx-2"
            onClick={() => {
              sort('alphab');
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="button is-medium is-danger mx-2"
            onClick={() => {
              setNumberValue(0);
              setSelectedGoods([...goodsFromServer]);
            }}
          >
            Reset
          </button>

          <button
            type="button"
            className="button is-medium is-warning mx-2"
            onClick={() => {
              sort('length');
            }}
          >
            Sort by length
          </button>

          <select
            className="select is-medium is-primary mx-4"
            value={numberValue}
            onChange={(event) => (
              setNumberValue(Number(event.target.value))
            )}
          >
            {numbers.map(number => (
              <option
                value={number}
                key={number}
              >
                {number}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default App;
