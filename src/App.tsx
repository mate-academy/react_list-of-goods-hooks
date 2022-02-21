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
  const [start, setStart] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  return (
    <div className="App">
      <button
        type="button"
        hidden={start}
        onClick={() => setStart(current => !current)}
      >
        Start
      </button>
      <div hidden={!start}>
        <ul>
          {goods.map(good => (
            <li>{good}</li>
          ))}
          <button
            type="button"
            onClick={() => setGoods(current => [...current].reverse())}
          >
            Reverse
          </button>
          <button
            type="button"
            onClick={() => setGoods(current => [...current].sort((a, b) => a.localeCompare(b)))}
          >
            Sort alphabetically
          </button>
          <button
            type="button"
            onClick={() => setGoods([...goodsFromServer])}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => setGoods(current => [...current].sort((a, b) => a.length - b.length))}
          >
            Sort by length
          </button>
        </ul>
      </div>
    </div>
  );
};

export default App;
