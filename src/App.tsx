import React, { useState } from 'react';
import './App.css';
import { List } from './components/List';

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
  const [isVisible, setStateIsVisble] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [sortBy, setsortBy] = useState('');
  const copyGoods = [...goodsFromServer];

  const isStart = () => setStateIsVisble(true);

  const reverse = () => {
    setIsReverse(!isReverse);
  };

  const preparedGoods = () => {
    copyGoods.sort((firstGood, secondGood) => {
      switch (sortBy) {
        case 'abc':
          return firstGood.localeCompare(secondGood);

        case 'length':
          return firstGood.length - secondGood.length;

        default:
          return 0;
      }
    });

    if (isReverse) {
      copyGoods.reverse();
    }

    return copyGoods;
  };

  const sortByAbc = () => {
    setsortBy('abc');
  };

  const sortByLength = () => {
    setsortBy('length');
  };

  const resetList = () => {
    setsortBy('');
    setIsReverse(false);
  };

  return (
    <div className="App">
      {!isVisible && (
        <button
          className="start__button"
          type="button"
          onClick={isStart}
        >
          Start
        </button>
      )}

      {isVisible && (
        <>
          <button
            className="button"
            type="button"
            onClick={reverse}
          >
            Revers
          </button>

          <button
            className="button"
            type="button"
            onClick={sortByAbc}
          >
            Sort by alphabet
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
            onClick={resetList}
          >
            reset
          </button>

          <List goodsList={preparedGoods()} />
        </>
      )}
    </div>
  );
};

export default App;
