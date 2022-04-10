import React, { useState } from 'react';
import { ListOfGoods } from './components/ListOfGoods/ListOfGoods';

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
  const [isVisibleList, setIsVisibleList] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [isReversedList, setIsReversedList] = useState(false);
  const [filterByLength, setFilterByLength] = useState(0);

  const showListOfGoods = () => {
    setIsVisibleList(!isVisibleList);
  };

  const sortByAbc = () => {
    setSortBy('abc');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const reverseListOfGoods = () => {
    setIsReversedList(!isReversedList);
  };

  const resetOfList = () => {
    setSortBy('default');
    setIsReversedList(false);
    setFilterByLength(0);
  };

  let copyOfList = [...goodsFromServer];

  if (filterByLength > 0) {
    copyOfList = copyOfList
      .filter((item) => item.length <= filterByLength);
  }

  copyOfList.sort((firstGood, secondGood) => {
    switch (sortBy) {
      case 'abc':
        return firstGood.localeCompare(secondGood);
      case 'length':
        return firstGood.length - secondGood.length;
      default:
        return 0;
    }
  });

  if (isReversedList) {
    copyOfList.reverse();
  }

  return (
    <div className="App">
      {!isVisibleList
        && (
          <button type="button" onClick={showListOfGoods}>
            Start
          </button>
        )}
      {isVisibleList
        && (
          <>
            <button type="button" onClick={sortByAbc}>
              Sort by alphabetically
            </button>

            <button type="button" onClick={sortByLength}>
              Sort by length
            </button>

            <button type="button" onClick={reverseListOfGoods}>
              Reverse of goods
            </button>

            <button type="button" onClick={resetOfList}>
              Reset
            </button>

            <ListOfGoods goods={copyOfList} />
          </>
        )}
    </div>
  );
};

export default App;
