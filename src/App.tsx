import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList';

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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="App container">
      <h1 className="title">Goods</h1>
      {isVisible
        ? <GoodsList goodsList={goodsFromServer} />
        : (
          <button
            type="button"
            onClick={() => setIsVisible(true)}
            className="button is-success is-outlined"
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
