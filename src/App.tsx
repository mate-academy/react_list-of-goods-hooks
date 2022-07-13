import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './GoodsList';

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

  return (
    <div className="App content">
      <h1 className="title mt-6">Goods</h1>
      {!isShown
        ? (
          <button
            type="button"
            className="button is-info is-inverted"
            onClick={() => setIsShown(true)}
          >
            Start
          </button>
        )
        : <GoodsList goods={goodsFromServer} />}
    </div>
  );
};

export default App;
