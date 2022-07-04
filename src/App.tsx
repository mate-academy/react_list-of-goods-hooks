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
  const [value, setValue] = useState(false);

  const start = () => {
    setValue(current => !current);
  };

  return (
    <div className="App">
      {!value && (
        <button
          type="button"
          onClick={start}
        >
          Start
        </button>
      )}
      {value && (
        <GoodsList goods={goodsFromServer} />
      )}
    </div>
  );
};

export default App;
