import React, { useState } from 'react';
import './App.css';
import GoodsList from './components/GoodsList';

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
  const [started, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortedAlphabetically, setSortedAlphabetically] = useState(false);
  const [sortedByLength, setSortedByLength] = useState(false);
  const [goodsLength, setGoodsLength] = useState(1);

  const start = () => {
    setStarted(true);
  };

  const reverse = () => {
    setReversed(!isReversed);
  };

  const sortAlphabetically = () => {
    setSortedAlphabetically(!sortedAlphabetically);
    setSortedByLength(false);
  };

  const sortByLength = () => {
    setSortedByLength(!sortedByLength);
    setSortedAlphabetically(false);
  };

  const reset = () => {
    setReversed(false);
    setSortedAlphabetically(false);
    setSortedByLength(false);
    setGoodsLength(1);
  };

  const onLengthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGoodsLength(+event.target.value);
  };

  const visibleGoods = goodsFromServer.filter(good => good.length >= goodsLength);

  if (sortedAlphabetically) {
    visibleGoods.sort();
  }

  if (sortedByLength) {
    visibleGoods.sort((g1, g2) => g1.length - g2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <h1>Goods</h1>
      {!started && (
        <button
          type="button"
          onClick={start}
        >
          Start
        </button>
      )}
      {started && (
        <>
          <GoodsList
            goods={visibleGoods}
          />
          <button
            type="button"
            onClick={reverse}
          >
            Reverse
          </button>
          <button
            type="button"
            onClick={sortAlphabetically}
          >
            Sort alphabetically
          </button>
          <button
            type="button"
            onClick={sortByLength}
          >
            Sort by length
          </button>
          <button
            type="button"
            onClick={reset}
          >
            Reset
          </button>
          <select
            id="length"
            onChange={(event) => {
              onLengthChange(event);
            }}
            value={goodsLength}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </>
      )}
    </div>
  );
};

export default App;
