import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ListOfGoods } from './components/ListOfGoods/ListOfGoods';
import { Good } from './types/Good';
import { SortBy } from './types/SortBy';

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
].map(good => ({
  name: good,
  id: uuidv4(),
}));

const App: React.FC = () => {
  const [isVisibleList, setIsVisibleList] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.none);
  const [isReversedList, setIsReversedList] = useState(false);

  const showListOfGoods = () => {
    setIsVisibleList(!isVisibleList);
  };

  const reverseListOfGoods = () => {
    setIsReversedList(!isReversedList);
  };

  const toSortBy = (value: SortBy) => {
    setSortBy(value);
  };

  const resetOfList = () => {
    setSortBy(SortBy.none);
    setIsReversedList(false);
  };

  const prepareGoods = (visibleGoods: Good[]) => {
    visibleGoods.sort((firstGood, secondGood) => {
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
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const preparedGoodsList = useMemo(() => prepareGoods(
    [...goodsFromServer],
  ), [isReversedList, sortBy]);

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
            <button
              type="button"
              onClick={() => {
                toSortBy(SortBy.alphabet);
              }}
            >
              Sort by alphabetically
            </button>

            <button
              type="button"
              onClick={() => {
                toSortBy(SortBy.length);
              }}
            >
              Sort by length
            </button>

            <button type="button" onClick={reverseListOfGoods}>
              Reverse of goods
            </button>

            <button type="button" onClick={resetOfList}>
              Reset
            </button>

            <ListOfGoods goods={preparedGoodsList} />
          </>
        )}
    </div>
  );
};

export default App;
