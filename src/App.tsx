import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Good, SortBy } from './components/types';

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
  const [isVisibleList, setVisibleList] = useState(false);
  const [isReversedList, setReversedList] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.none);
  const [lengthFilter, setLengthFilter] = useState(1);

  const preparedGoods = [...goodsFromServer]
    .filter(good => good.name.length >= lengthFilter);

  preparedGoods.sort((firstGood, secondGood) => {
    switch (sortBy) {
      case SortBy.alphabet:
        return firstGood.name.localeCompare(secondGood.name);
      case SortBy.length:
        return firstGood.name.length - secondGood.name.length;
      default:
        return 0;
    }
  });

  if (isReversedList) {
    preparedGoods.reverse();
  }

  const resetOfList = () => {
    setReversedList(false);
    setSortBy(SortBy.none);
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
              onClick={() => setReversedList(!isReversedList)}
            >
              Reverse
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setSortBy(SortBy.alphabet)}
            >
              Sort alphabetically
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setSortBy(SortBy.length)}
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
        <GoodsList goods={preparedGoods} />
      )}
    </div>
  );
};

export default App;
