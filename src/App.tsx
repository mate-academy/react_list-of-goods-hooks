import React, { useState } from 'react';
import GoodsList from './components/GoodsList';
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
  const [isVisible, setVisible] = useState(false);

  return (
    <div className="App">
      <h1>Goods</h1>
      {isVisible
        ? <GoodsList goodsList={goodsFromServer} />
        : (
          <button
            type="button"
            onClick={() => setVisible(true)}
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
