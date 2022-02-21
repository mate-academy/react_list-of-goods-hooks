import React, { useState } from 'react';
import { GoodsList } from './Components/GoodsList/GoodsList';
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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortBy, setSortBy] = useState('default');
  const [isReversed, setIsReversed] = useState(false);
  const [start, setStart] = useState(false);

  const isStarted = () => {
    setStart(true);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const sortAlphabet = () => {
    setSortBy('alphabet');
  };

  const sortLength = () => {
    setSortBy('length');
  };

  const resetSort = () => {
    setGoods([...goodsFromServer]);
    setSortBy('default');
  };

  goods.sort((a, b) => {
    switch (sortBy) {
      case 'alphabet':
        return a.localeCompare(b);

      case 'length':
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="app">
      {!start
        ? (
          <button
            type="button"
            className="app__start"
            onClick={isStarted}
          >
            Start
          </button>
        )
        : (
          <>
            <div className="app__buttons">
              <button
                type="button"
                onClick={reverse}
              >
                Reverse
              </button>
              <button
                type="button"
                onClick={sortAlphabet}
              >
                Sort alphabetically
              </button>
              <button
                type="button"
                onClick={sortLength}
              >
                Sort by length
              </button>
              <button
                type="button"
                onClick={resetSort}
              >
                Reset
              </button>
            </div>
            <GoodsList goodsArray={goods} />
          </>
        )}
    </div>
  );
};

export default App;
