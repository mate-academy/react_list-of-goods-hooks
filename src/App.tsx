import React, { useState } from 'react';
import './App.css';
import { GoodList } from './GoodList';

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
  const [goods] = useState(goodsFromServer);
  const [isGoodsVisible, setIsGoodsVisible] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const isVisible = () => (setIsGoodsVisible(current => !current));

  const reverse = () => (setIsReverse(!isReverse));

  const sortByLetter = () => {
    setSortBy('alphabet');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const reset = () => {
    setSortBy('');
    setIsReverse(false);
  };

  const goodsCopy = [...goods];

  goodsCopy.sort((a, b) => {
    switch (sortBy) {
      case 'length':
        return (a.length - b.length);
      case 'alphabet':
        return a.localeCompare(b);

      default:
        return 0;
    }
  });

  if (isReverse) {
    goodsCopy.reverse();
  }

  return (
    <div className="App">
      <h1
        className="App__title"
      >
        Goods List
      </h1>
      {isGoodsVisible
        ? (
          <div className="container__button">
            <button
              onClick={reverse}
              type="button"
              className="button"
            >
              Reverse
            </button>
            <button
              onClick={sortByLetter}
              type="button"
              className="button"
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              className="button"
              onClick={sortByLength}
            >
              Sort by length
            </button>
            <button
              onClick={reset}
              type="button"
              className="button"
            >
              Reset
            </button>
            <div>
              <GoodList
                goods={goodsCopy}
              />
            </div>
          </div>
        )
        : (
          <button
            onClick={isVisible}
            className="start_button"
            type="button"
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
