import React, { useState } from 'react';
import { GoodsList } from './GoodsList';
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
  const [isListOpened, setIsListOpened] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);
  const [isSortedByAlphabet, setIsSortedByAlphabet] = useState(false);
  const [minWordsLength, setMinWordsLength] = useState(1);
  const lengthVariations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const listOpener = () => {
    setIsListOpened(true);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const sortByAphabet = () => {
    setIsSortedByAlphabet(true);
    setIsReversed(false);
    setIsSortedByLength(false);
  };

  const sortByLength = () => {
    setIsSortedByLength(true);
    setIsSortedByAlphabet(false);
    setIsReversed(false);
  };

  const reset = () => {
    setIsReversed(false);
    setIsSortedByLength(false);
    setIsSortedByAlphabet(false);
    setMinWordsLength(1);
  };

  const setLength = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinWordsLength(Number(event.target.value));
  };

  const searchedGoods = goodsFromServer.filter(good => good.length >= minWordsLength);

  if (isSortedByLength) {
    searchedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isSortedByAlphabet) {
    searchedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (isReversed) {
    searchedGoods.reverse();
  }

  return (
    <div className="App">
      <h1>Goods</h1>
      {!isListOpened && (
        <button
          type="button"
          onClick={listOpener}
        >
          Start
        </button>
      )}

      {isListOpened && (
        <>
          <button
            onClick={reverse}
            type="button"
          >
            reverse
          </button>

          <button
            onClick={sortByLength}
            type="button"
          >
            Sort by length
          </button>

          <button
            onClick={sortByAphabet}
            type="button"
          >
            Sort by alphabet
          </button>

          <button
            onClick={reset}
            type="button"
          >
            Reset
          </button>

          <select
            name="select"
            onChange={setLength}
            value={minWordsLength}
          >
            {lengthVariations.map(num => (
              <option
                value={num}
                key={num}
              >
                {num}
              </option>
            ))}
          </select>
          <GoodsList
            goodsList={searchedGoods}
          />
        </>
      )}
    </div>
  );
};

export default App;
