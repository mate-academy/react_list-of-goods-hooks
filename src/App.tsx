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
  const [isActive, setStartBtn] = useState(false);

  return (
    <div
      className="
      App
        has-text-warning
        has-background-dark"
    >
      {!isActive
        ? (
          <button
            type="button"
            className="button is-warning"
            onClick={() => setStartBtn(true)}
          >
            start
          </button>
        )
        : (
          <>
            <button
              type="button"
              className="button is-warning"
              onClick={() => setStartBtn(false)}
            >
              end
            </button>

            <GoodsList goodsFromServer={goodsFromServer} />
          </>
        )}
    </div>
  );
};

export default App;
