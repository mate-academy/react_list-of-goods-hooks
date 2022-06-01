import React, { useState } from 'react';
import './App.scss';
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
      <h1 className="App__title">Goods</h1>
      <button
        type="button"
        onClick={goodsVisibility}
        className="App__start-button"
      >
        {isGoodsVisible ? 'Hide goods' : 'Start'}
      </button>
      <div className="App__wrapper">
        {isGoodsVisible && (
          <GoodList goodItems={goodsFromServer} />
        )}
      </div>
    </div>
  );
};

export default App;
