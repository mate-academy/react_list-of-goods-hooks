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
  const [length, setLength] = useState('default');

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
    setLength('default');
  };

  const filterByLength = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLength(event.target.value);
  };

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
              Filetr by item length:
              {' '}
              <GoodsListSelect
                selectSize={goodsFromServer.length}
                filterBy={filterByLength}
              />
            </form>
            <GoodsList
              goods={goodsFromServer}
              reversed={isReversed}
              sortBy={sortBy}
              length={length}
            />
          </>
        )}
    </div>
  );
};

export default App;
