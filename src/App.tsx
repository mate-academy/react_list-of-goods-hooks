import React, { useState } from 'react';
import './App.css';
import { MakeGoodsList } from './makeGoodsList';

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
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isSortByAphabetically, setIsSortedByAphabetically] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);

  const start = () => {
    setIsVisible(true);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const sortByAphabetically = () => {
    setIsSortedByAphabetically(true);
    setIsSortedByLength(false);
  };

  const sortByLength = () => {
    setIsSortedByLength(true);
    setIsSortedByAphabetically(false);
  };

  const reset = () => {
    setIsReversed(false);
    setIsSortedByAphabetically(false);
    setIsSortedByLength(false);
  };

  const stop = () => {
    setIsVisible(false);
    setIsReversed(false);
    setIsSortedByAphabetically(false);
    setIsSortedByLength(false);
  };

  const visibleGoods = [...goodsFromServer];

  if (isSortByAphabetically) {
    visibleGoods.sort((item1, item2) => item1.localeCompare(item2));
  }

  if (isSortedByLength) {
    visibleGoods.sort((item1, item2) => item1.length - item2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div>
      <h1>React List Of Goods</h1>
      {!isVisible ? (
        <button
          type="button"
          onClick={start}
        >
          Start
        </button>
      ) : (
        <>
          <MakeGoodsList
            goodsList={visibleGoods}
          />

          <button
            type="button"
            onClick={reverse}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={sortByAphabetically}
          >
            Sort by Alphabet
          </button>

          <button
            type="button"
            onClick={sortByLength}
          >
            Sort by Length
          </button>

          <button
            type="button"
            onClick={reset}
          >
            Reset
          </button>

          <button
            type="button"
            onClick={stop}
          >
            Stop
          </button>
        </>
      )}
    </div>
  );
};

export default App;
