import React, { useState } from 'react';
import './App.css';
import { List } from './List';

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
  const [isVisible, setIsVisible] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  const reverse = () => (
    setGoods(current => [...current].reverse())
  );
  const sortAlphabetically = () => (
    setGoods(current => [...current].sort((a, b) => a.localeCompare(b)))
  );
  const reset = () => (
    setGoods([...goodsFromServer])
  );
  const sortByLength = () => (
    setGoods(current => [...current].sort((a, b) => a.length - b.length))
  );

  return (
    <div className="App">
      {!isVisible
        && (
          <button
            type="button"
            onClick={() => setIsVisible(current => !current)}
          >
            Start
          </button>
        )}

      {isVisible
        && (
          <div>
            <List goods={goods} />

            <button
              type="button"
              onClick={reverse}
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={sortAlphabetically}
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              onClick={reset}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={sortByLength}
            >
              Sort by length
            </button>
          </div>
        )}

    </div>
  );
};

export default App;
