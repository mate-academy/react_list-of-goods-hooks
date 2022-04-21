import React, { useState } from 'react';
import { GoodsList } from './components/GoodsList';
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
  let listOfGoods = [...goodsFromServer];
  const [isClicked, showList] = useState(false);
  const [isReversed, reverseList] = useState(false);
  const [sortBy, sortByType] = useState('');
  const [needReset, startVer] = useState(false);

  if (isReversed) {
    listOfGoods.reverse();
  }

  listOfGoods.sort((prev, next) => {
    switch (sortBy) {
      case 'name':
        return prev.localeCompare(next);

      case 'length':
        return prev.length - next.length;

      default:
        return 0;
    }
  });

  if (needReset) {
    listOfGoods = [];
    listOfGoods = [...goodsFromServer];
  }

  return (
    <>
      <div className="App">
        <h1>Goods</h1>
        {goodsFromServer.length}
        {!isClicked && (
          <button
            type="button"
            onClick={() => showList(true)}
          >
            Start
          </button>
        )}
        <button
          type="button"
          onClick={() => reverseList(true)}
        >
          Reverse
        </button>
        <button
          type="button"
          onClick={() => sortByType('name')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => sortByType('length')}
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => startVer(true)}
        >
          Reset
        </button>
        {isClicked && <GoodsList products={listOfGoods} />}
      </div>
    </>
  );
};

export default App;
