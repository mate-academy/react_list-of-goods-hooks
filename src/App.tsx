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
  const [isStarted, setListStartValue] = useState(false);
  const [isReversed, setListOrder] = useState(false);
  const [sortBy, setSortMethod] = useState('default');
  const [filterLength, setLength] = useState(0);

  const toggleListStart = () => {
    setListStartValue(!isStarted);
  };

  const makeListReversed = () => {
    setListOrder(!isReversed);
  };

  const sortAlphabetically = () => {
    setSortMethod('letters');
  };

  const sortByLength = () => {
    setSortMethod('length');
  };

  const resetList = () => {
    setListOrder(false);
    setSortMethod('default');
    setLength(0);
  };

  const filterByLength = (event: React.ChangeEvent<any>) => {
    setLength(event.target.value);
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
