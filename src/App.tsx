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

const arrOfNumbers: number[] = [];

for (let i = 1; i <= 10; i += 1) {
  arrOfNumbers.push(i);
}

console.log(arrOfNumbers);

const App: React.FC = () => {
  const [filteredGoods, setFilteredGoods] = useState(goodsFromServer);
  const [listIsVisible, setListIsVisible] = useState(false);
  const [goods, setGoods] = useState(filteredGoods);
  const [isReversed, setIsReversed] = useState(false);

  const reverseGoods = () => {
    setIsReversed(!isReversed);
    setGoods(current => [...current].reverse());
  };

  const filterGoods = (value: number) => {
    setFilteredGoods([...goodsFromServer].filter(good => good.length >= value));
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
            onClick={reverseGoods}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => setGoods(
              [...filteredGoods].sort((a, b) => a.localeCompare(b)),
            )}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => setGoods([...filteredGoods])}
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => setGoods(
              [...filteredGoods].sort((a, b) => a.length - b.length),
            )}
          >
            Sort by length
          </button>

          <select
            name="goodslength"
            onChange={(event) => {
              filterGoods(+event.target.value);
            }}
          >
            {arrOfNumbers.map(option => (
              <option>{option}</option>
            ))}
          </select>
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
