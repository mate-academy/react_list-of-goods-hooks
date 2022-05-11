import React, { useState } from 'react';
import './App.css';
import { GoodList } from './components/GoodList/GoodList';

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
  const [isGoodsVisible, setIsGoodsVisible] = useState(false);

  const goodsVisibility = () => {
    setIsGoodsVisible(!isGoodsVisible);
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      <button type="button" onClick={goodsVisibility}>
        {isGoodsVisible ? 'Hide goods' : 'Start'}
      </button>
      {isGoodsVisible && (
        <GoodList goodItems={goodsFromServer} />
      )}
    </div>
  );
};

export default App;
