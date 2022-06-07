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
  const [buttonHidden, setButtonHidden] = useState(false);

  return (
    <div className="App">
      {buttonHidden
        ? (
          <GoodsList goods={goodsFromServer} />
        )
        : (
          <button
            className="button is-success"
            type="button"
            onClick={() => {
              setButtonHidden(current => !current);
            }}
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
