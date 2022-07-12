import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoodsList from './Components/GoodsList/GoodsList';

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
  const goods: string[] = [...goodsFromServer];

  const [isVisible, setVisible] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const reset = () => {
    setReversed(false);
    setSortBy('');
  };

  if (sortBy === 'length') {
    goods.sort((a, b) => a.length - b.length);
  }

  if (sortBy === 'alphabet') {
    goods.sort((a, b) => a.localeCompare(b));
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="App position-absolute top-50 start-50 translate-middle">
      {!isVisible
        ? <button type="button" onClick={() => setVisible(true)}>Start</button>
        : (
          <>
            <h1 className="text-center">Goods</h1>
            <GoodsList goods={goods} />
            <button
              type="button"
              onClick={() => setReversed(!isReversed)}
              className="me-2 rounded"
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={() => setSortBy('alphabet')}
              className="me-2 rounded"
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              onClick={() => setSortBy('length')}
              className="me-2 rounded"
            >
              Sort by length
            </button>
            <button
              type="button"
              onClick={reset}
              className="me-2 rounded"
            >
              Reset
            </button>
          </>
        )}
    </div>
  );
};

export default App;
