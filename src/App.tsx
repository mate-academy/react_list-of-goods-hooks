import React, { useState } from 'react';
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
  const [clicked, setClicked] = useState(false);

  return (
    <div className="App">
      <h1>Goods</h1>
      {!clicked ? (
        <button
          type="button"
          onClick={() => setClicked(true)}
        >
          Start
        </button>
      ) : (
        <ul>
          {goodsFromServer.map(item => (
            <li key={item}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
