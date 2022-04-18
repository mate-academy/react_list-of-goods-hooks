import React, { useState } from 'react';
import './App.css';
import Goods from './components/GoodsList';

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
  const [start, setStart] = useState(false);

  return (
    <div className="App">
      <h1>Goods</h1>
      {!start && (
        <button
          type="button"
          className="button"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      )}

      {start && (
        <Goods goods={goodsFromServer} />
      )}
    </div>
  );
};

export default App;
