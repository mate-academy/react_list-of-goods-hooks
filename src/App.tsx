import React, { useState } from 'react';
import './App.css';
import GoodsList from './components/GoodsList';
import { SortType } from './types/SortType';

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
  const [isVisible, makeVisible] = useState(false);
  const [isReversed, makeReverse] = useState(false);
  const [SortBy, selectSort] = useState(SortType.Nothing);
  const [lengthMin, changeMinimum] = useState(1);

  const Sort = (sortType: SortType) => {
    selectSort(sortType);
    makeReverse(false);
  }

  return (
    <div className="App">
      <h1>Goods</h1>
      {isVisible && (
        <>
          <GoodsList
            goods={goodsFromServer}
            isReverse={isReversed}
            SortBy={SortBy}
            lengthMin={lengthMin}
          />
          <button
            type="button"
            onClick={() => makeReverse(!isReversed)}
          >
            Reverse
          </button>
          <br />
          <button
            type="button"
            onClick={() => Sort(SortType.Alfabet)}
          >
            Sort by alfabet
          </button>
          <button
            type="button"
            onClick={() => Sort(SortType.Length)}
          >
            Sort by length
          </button>
          <br />
          <button
            type="button"
            onClick={() => {
              selectSort(SortType.Nothing);
              makeReverse(false);
              changeMinimum(1);
            }}
          >
            Reset
          </button>
          <br />
          <select
            name="numbersSelect"
            id="1"
            onChange={({ currentTarget }) => (
              changeMinimum(Number(currentTarget.value))
            )}
          >
            {Array(10).fill(null).map((_, index) => (
              <option
                value={index + 1}
              >
                {index + 1}
              </option>
            ))}
          </select>
        </>
      )}
      {!isVisible && (
        <button
          type="button"
          onClick={
            () => makeVisible(true)
          }
        >
          Start
        </button>
      )}
    </div>
  );
};

export default App;
