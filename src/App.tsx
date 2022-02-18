import React, { useState } from 'react';
import GoodsList from './components/GoodsList';
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

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortAlphabet, setSortAlphabet] = useState(false);
  const [sortedByLength, setSortedByLength] = useState(false);
  const [selectedGoodsLength, setSelectedGoodsLength] = useState(1);

  const start = () => {
    setStarted(true);
  };

  const closer = () => {
    setStarted(false);
  };

  const reverse = () => {
    setReversed(!isReversed);
  };

  const sortByAlphabet = () => {
    setSortAlphabet(true);
    setSortedByLength(false);
  };

  const sortByLength = () => {
    setSortedByLength(true);
    setSortAlphabet(false);
  };

  const reset = () => {
    setReversed(false);
    setSortAlphabet(false);
    setSortedByLength(false);
    setSelectedGoodsLength(1);
  };

  const selectGoodsLength = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGoodsLength(+event.target.value);
  };

  const visibleGoods = goodsFromServer.filter(good => good.length >= selectedGoodsLength);

  if (sortAlphabet) {
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
      <h1>Goods list</h1>
      {!started && (
        <button
          className="startButton"
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
            onClick={sortByAlphabet}
          >
            Sort by alphabet
          </button>
          <button
            type="button"
            onClick={sortByLength}
          >
            Sort by length
          </button>
          <select
            id="length"
            onChange={selectGoodsLength}
            value={selectedGoodsLength}
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
          <button
            type="button"
            onClick={reset}
          >
            Reset
          </button>
          <button
            className="finButton"
            type="button"
            onClick={closer}
          >
            FIN
          </button>
        </>
      )}
    </div>
  );
};

export default App;
