import React, { useState } from 'react';
import './App.css';
import GoodsList from './components/GoodsList';

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
  const [visible, setVisible] = useState(false);

  return (
    <div className="App">
      <h1>Goods</h1>
      {!visible
        ? (
          <button
            type="button"
            onClick={() => setVisible(true)}
          >
            Show
          </button>
        )
        : <GoodsList goods={goodsFromServer} />}
    </div>
  );
};

export default App;
