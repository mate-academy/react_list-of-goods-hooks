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
  const [hideGoods, setVisibleGoods] = useState(true);

  return (
    <div className="App container is-fluid">
      <h1 className="title is-1">Goods</h1>
      {hideGoods ? (
        <>
          <button
            className="button is-success"
            type="button"
            onClick={() => setVisibleGoods(false)}
          >
            Start
          </button>
        </>
      ) : (
        <GoodsList goods={goodsFromServer} />
      )}
    </div>
  );
};

export default App;
