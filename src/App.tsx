import React, { useState } from 'react';
import Product from './Components/Product/Product';
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
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isSortedByABC, setIsSortedByABC] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);

  const listOpen = () => {
    setIsStartClicked(true);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const sortByABC = () => {
    setIsSortedByABC(true);
    setIsSortedByLength(false);
  };

  const sortByLength = () => {
    setIsSortedByLength(true);
    setIsSortedByABC(false);
  };

  const reset = () => {
    setIsReversed(false);
    setIsSortedByABC(false);
    setIsSortedByLength(false);
  };

  const exit = () => {
    setIsStartClicked(false);
    setIsReversed(false);
    setIsSortedByABC(false);
    setIsSortedByLength(false);
  };

  const copyProducts = [...goodsFromServer];

  if (isSortedByABC) {
    copyProducts.sort();
  }

  if (isSortedByLength) {
    copyProducts.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    copyProducts.reverse();
  }

  return (
    <div className="app">
      <h1 className="app__title">React List Of Goods</h1>
      {!isStartClicked && (
        <button
          type="button"
          className="app__button-start"
          onClick={listOpen}
        >
          Start
        </button>
      )}

      {isStartClicked && (
        <>
          <button
            type="button"
            className="app__button-reverse"
            onClick={reverse}
          >
            Reverse
          </button>

          <button
            type="button"
            className="app__button-sort-abc"
            onClick={sortByABC}
          >
            Sort by Alphabet
          </button>

          <button
            type="button"
            className="app__button-sort-length"
            onClick={sortByLength}
          >
            Sort by Length
          </button>

          <button
            type="button"
            className="app__button-reverse"
            onClick={reset}
          >
            Reset
          </button>

          <button
            type="button"
            className="app__button-exit"
            onClick={exit}
          >
            Exit
          </button>

          <Product products={copyProducts} />
        </>
      )}
    </div>
  );
};

export default App;
