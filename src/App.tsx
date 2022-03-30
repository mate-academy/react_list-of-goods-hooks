import React, { useState } from 'react';
import { GoodsList } from './components/GoodsList/GoodsList';

import './App.scss';
import './additional_styles/button.css';

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
  const [start, setStarted] = useState(false);
  const [goodsList, setGoodsList] = useState<string[]>([]);

  const reverse = () => {
    setGoodsList([...goodsList].reverse());
  };

  const sortBy = (sortType: 'alphabet' | 'length') => {
    const sortedList = [...goodsList].sort((a, b) => {
      switch (sortType) {
        case 'alphabet':
          return a.localeCompare(b);
        case 'length':
          return a.length - b.length;
        default:
          return 0;
      }
    });

    setGoodsList(sortedList);
  };

  const reset = () => {
    setGoodsList([...goodsFromServer]);
  };

  return (
    <div className="App">
      {!start
        ? (
          <div className="App__start">
            <button
              type="button"
              onClick={() => {
                setStarted(true);
                setGoodsList(goodsFromServer);
              }}
              className="button"
            >
              Start
            </button>
          </div>
        )
        : (
          <>
            <div className="App__sort-by">
              <button
                type="button"
                className="button"
                onClick={() => reverse()}
              >
                Reverse
              </button>

              <button
                type="button"
                className="button"
                onClick={() => sortBy('alphabet')}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                className="button"
                onClick={() => sortBy('length')}
              >
                Sort by length
              </button>

              <button
                type="button"
                className="button"
                onClick={reset}
              >
                Reset
              </button>
            </div>

            <GoodsList goods={goodsList} />
          </>
        )}
    </div>
  );
};

export default App;
