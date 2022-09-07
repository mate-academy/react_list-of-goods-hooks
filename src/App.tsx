import React, { useState } from 'react';
import { GoodsList } from './GoodsList';
import './App.scss';

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
  const [isShown, setIsShown] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);
  const [length, setLength] = useState('1');

  const reverse = () => {
    setGoods([...goods].reverse().filter(good => good.length >= +length));
  };

  const sort = () => {
    setGoods([...goods]
      .sort((a, b) => a.localeCompare(b))
      .filter(good => good.length >= +length));
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setLength('1');
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => b.length - a.length));
  };

  if (!isShown) {
    return (
      <div className="App">
        <button
          type="button"
          className="button"
          onClick={() => setIsShown(true)}
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <GoodsList
        goods={goods}
        onReverse={reverse}
        onSort={sort}
        onReset={reset}
        onSortByLength={sortByLength}
        setLength={setLength}
        length={length}
      />
    </div>
  );
};

export default App;
