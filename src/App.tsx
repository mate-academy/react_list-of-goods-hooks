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

export const App: React.FC = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="App">
      {started
        ? <GoodsList goods={goodsFromServer} />
        : (
          <button
            type="button"
            onClick={() => {
              setStarted(true);
            }}
          >
            Start
          </button>
        )}
    </div>
  );
};
