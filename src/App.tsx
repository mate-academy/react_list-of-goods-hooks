import React, { useState } from 'react';
import { GoodsList } from './components/GoodsList';
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
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const show = () => {
    setIsVisible(true);
  };

  const cancel = () => {
    setIsVisible(false);
    setIsReversed(false);
    setSortBy('');
  };

  const reversed = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortBy('');
  };

  const sortAlphabet = () => {
    setSortBy('alphabet');
  };

  const sortLength = () => {
    setSortBy('length');
  };

  const visibleGoods = () => {
    const showGoods = [...goodsFromServer];

    switch (sortBy) {
      case 'length':
        showGoods.sort((el1, el2) => el1.length - el2.length);
        break;

      case 'alphabet':
        showGoods.sort((el1, el2) => el1.localeCompare(el2));
        break;

      default:
        break;
    }

    if (isReversed) {
      showGoods.reverse();
    }

    return showGoods;
  };

  return (
    <div className="App">
      <div className="App__list">
        <h1>List of Goods</h1>
        {isVisible && <GoodsList goodsList={visibleGoods()} />}
      </div>
      <div className="App__buttons">
        <button
          type="button"
          onClick={show}
        >
          Start
        </button>
        {isVisible && (
          <div className="App__buttons-close">
            <button
              type="button"
              onClick={cancel}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={reversed}
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={reset}
            >
              Reset
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
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
