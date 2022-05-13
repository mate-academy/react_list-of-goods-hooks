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

const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortByAlphabet, setSrotByAlphabet] = useState(false);
  const [sortByLength, setSrotByLength] = useState(false);

  if (isReversed) {
    goods.reverse();
    setIsReversed(false);
  }

  if (sortByAlphabet) {
    goods.sort((item1, item2) => item1.localeCompare(item2));
    setSrotByAlphabet(false);
  }

  if (sortByLength) {
    goods.sort((item1, item2) => item1.length - item2.length);
    setSrotByLength(false);
  }

  const reset = () => {
    setIsReversed(false);
    setGoods([...goodsFromServer]);
  };

  return isVisible
    ? (
      <div className="App">
        {setGoods}
        <h1>Goods</h1>
        <GoodsList goods={[...goods]} />
        <button
          type="button"
          onClick={() => setIsReversed(true)}
        >
          Reverse
        </button>
        <button
          type="button"
          onClick={() => setSrotByAlphabet(true)}
        >
          Srot by alphabet
        </button>
        <button
          type="button"
          onClick={reset}
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setSrotByLength(true)}
        >
          Sort by length
        </button>
      </div>
    )
    : (
      <button
        type="button"
        onClick={() => setIsVisible(true)}
      >
        Start
      </button>
    );
};

export default App;
