import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Good } from './components/types';

import './App.css';
import { GoodsList } from './components/GoodsList/GoodsList';
import { LengthFilter } from './components/LengthFilter';

const goodsFromServer: Good[] = [
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
].map(good => ({ name: good, id: uuidv4() }));

const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isVisibleList, setVisibleList] = useState(false);
  const [lengthFilter, setLengthFilter] = useState(1);

  const reverseList = () => {
    setGoods([...goods].reverse());
  };

  const sortByName = () => {
    setGoods([...goods]
      .sort((goodA, goodB) => goodA.name.localeCompare(goodB.name)));
  };

  const sortByLength = () => {
    setGoods([...goods]
      .sort((goodA, goodB) => (goodA.name.length - goodB.name.length)));
  };

  const selectLength = goods.filter(good => good.name.length >= lengthFilter);

  const resetOfList = () => {
    setGoods(goodsFromServer);
    setLengthFilter(1);
  };

  return (
    <div className="app">
      <h1 className="app__title">List of Goods</h1>
      {!isVisibleList && (
        <button
          className="button"
          type="button"
          onClick={() => setVisibleList(true)}
        >
          Start
        </button>
      )}

      {
        isVisibleList && (
          <div className="app__buttons">
            <button
              className="button"
              type="button"
              onClick={reverseList}
            >
              Reverse
            </button>

            <button
              className="button"
              type="button"
              onClick={sortByName}
            >
              Sort alphabetically
            </button>

            <button
              className="button"
              type="button"
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <button
              className="button"
              type="button"
              onClick={resetOfList}
            >
              Reset
            </button>

            <select
              className="button"
              name="lengthFilter"
              id="lengthFilter"
              value={lengthFilter}
              onChange={(event) => setLengthFilter(+event.target.value)}
            >
              <LengthFilter lengthGoodName={10} />
            </select>
          </div>
        )
      }
      {isVisibleList && (
        <GoodsList goods={selectLength} />
      )}
    </div>
  );
};

export default App;
