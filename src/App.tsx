import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components';

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
  const [isGoodsVisible, setIsGoodsVisible] = useState(false);

  const showGoods = () => {
    setIsGoodsVisible(current => !current);
  };

  const reverseGoods = () => {
    setGoods(current => [...current].reverse());
  };

  const sortAlphabetically = () => {
    setGoods(current => [...current]
      .sort((firstGood, secondGood) => firstGood.localeCompare(secondGood)));
  };

  const sortByLength = () => {
    setGoods(current => [...current]
      .sort((firstGood, secondGood) => firstGood.length - secondGood.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="App container">
      <button
        type="button"
        className={isGoodsVisible
          ? 'button is-warning'
          : 'button is-primary is-light'}
        onClick={showGoods}
      >
        {isGoodsVisible
          ? 'Hide goods'
          : 'Show goods'}
      </button>
      {isGoodsVisible
      && (
        <GoodsList goods={goods} />
      )}
      {isGoodsVisible
      && (
        <>
          <button
            type="button"
            className="button is-primary is-hovered"
            onClick={reverseGoods}
          >
            Reverse
          </button>
          <button
            type="button"
            className="button is-link is-hovered"
            onClick={sortAlphabetically}
          >
            Sort alphabetically
          </button>
          <button
            type="button"
            className="button is-info is-hovered"
            onClick={sortByLength}
          >
            Sort by length
          </button>
          <button
            type="button"
            className="button is-success is-hovered"
            onClick={reset}
          >
            Reset
          </button>
        </>

      )}
    </div>
  );
};

export default App;
