import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const App: React.FC = () => {
  const [list, setShowList] = useState(false);

  return (
    <div className="App container box is-centered has-text-centered">
      <h1 className="title">Goods</h1>
      {list
        ? <GoodsList goods={goodsFromServer} />
        : (
          <button
            type="button"
            onClick={() => setShowList(true)}
            className="button is-light is-medium"
          >
            Start
          </button>
        )}
    </div>
  );
};
