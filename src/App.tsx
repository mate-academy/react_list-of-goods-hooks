import React, { useState } from 'react';
import './App.scss';
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

  const showGoods = () => {
    setIsVisible(true);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const sortByAlphabet = () => {
    setGoods([...goods]
      .sort((item1, item2) => item1.localeCompare(item2)));
  };

  const sortByLength = () => {
    setGoods([...goods]
      .sort((item1, item2) => item1.length - item2.length));
  };

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
          className="button"
          type="button"
          onClick={reverseGoods}
        >
          Reverse
        </button>
        <button
          className="button"
          type="button"
          onClick={sortByAlphabet}
        >
          Srot by alphabet
        </button>
        <button
          className="button"
          type="button"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="button"
          type="button"
          onClick={sortByLength}
        >
          Sort by length
        </button>
      </div>
    )
    : (
      <button
        className="button"
        type="button"
        onClick={showGoods}
      >
        Start
      </button>
    );
};

export default App;
