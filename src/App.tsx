import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './Components/GoodsList/GoodsList';
import { GoodsListSelect } from './Components/GoodsListSelect/GoodsLIstSelect';

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
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [filterLength, setFilterLength] = useState(0);

  const toggleListStart = () => {
    setIsStarted(!isStarted);
  };

  const makeListReversed = () => {
    setIsReversed(!isReversed);
  };

  const sortAlphabetically = () => {
    setSortBy('letters');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const resetList = () => {
    setIsReversed(false);
    setSortBy('default');
    setFilterLength(0);
  };

  const filterByLength = (value: string) => {
    setFilterLength(Number(value));
  };

  let goodsCopy = [...goodsFromServer];

  if (filterLength > 0) {
    goodsCopy = goodsCopy.filter((item: string) => item.length <= filterLength);
  }

  goodsCopy.sort((good1: string, good2: string) => {
    switch (sortBy) {
      case 'letters':
        return good1.localeCompare(good2);

      case 'length':
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsCopy.reverse();
  }

  return (
    <div className="App">
      <h1>Goods</h1>
      {!isStarted
      && (
        <button type="button" onClick={toggleListStart}>
          Start
        </button>
      )}
      {isStarted
        && (
          <>
            <button type="button" onClick={makeListReversed}>
              Reverse
            </button>
            <button type="button" onClick={sortAlphabetically}>
              Sort alphabetically
            </button>
            <button type="button" onClick={sortByLength}>
              Sort by length
            </button>
            <button type="button" onClick={resetList}>
              reset
            </button>
            <form action="get">
              <GoodsListSelect
                selectSize={goodsFromServer.length}
                filterBy={filterByLength}
                filterLength={filterLength}
              />
            </form>
            <GoodsList
              goods={goodsCopy}
            />
          </>
        )}
    </div>
  );
};

export default App;
