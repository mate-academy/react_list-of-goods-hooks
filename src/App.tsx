import React, { useState } from 'react';
import './App.css';
import { ListGoods } from './components';
import { GoodsWithId } from './react-app-env';

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

const goodWithId: GoodsWithId[] = goodsFromServer
  .map((good, index) => ({
    id: index + 1,
    good,
  }));

export const App: React.FC = () => {
  const [goods, setGoods] = useState(new Array(0));
  const [isVisible, setIsVisible] = useState(false);

  const getListFoods = () => {
    setGoods(() => [...goodWithId]);
    setIsVisible(current => !current);
  };

  const getReverse = () => {
    setGoods(() => [...goods].reverse());
  };

  const getSortByAlphabet = () => {
    setGoods(() => [...goods].sort((a, b) => a.good.localeCompare(b.good)));
  };

  const getReset = () => {
    setGoods(() => [...goodWithId]);
  };

  const getSortByLength = () => {
    setGoods(() => [...goods].sort((a, b) => a.good.length - b.good.length));
  };

  return (
    <div className="App box is-primary has-background-danger">
      <button
        className="button is-primary"
        type="button"
        onClick={getListFoods}
      >
        {isVisible ? 'Hide List' : 'Start' }
      </button>
      <div className={isVisible
        ? 'm-3'
        : 'is-hidden m-3'}
      >
        <p className="title is-4 m-3 has-text-warning-light">Goods</p>
        <ListGoods goods={goods} />
        <button
          className="button is-primary m-3"
          type="button"
          onClick={getReverse}
        >
          Reverse
        </button>
        <button
          className="button is-primary m-3"
          type="button"
          onClick={getSortByAlphabet}
        >
          Sort alphabetically
        </button>
        <button
          className="button is-primary m-3"
          type="button"
          onClick={getReset}
        >
          Reset
        </button>
        <button
          className="button is-primary m-3"
          type="button"
          onClick={getSortByLength}
        >
          Sort by length
        </button>
      </div>
    </div>
  );
};
