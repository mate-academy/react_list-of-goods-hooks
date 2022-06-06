import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './componet/GoodsList';

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
  const [show, setShow] = useState(false);

  const toggleList = () => {
    setShow(current => !current);
  };

  const revers = () => {
    setGoods(current => [...current].reverse());
  };

  const sortAlpgabet = () => {
    setGoods(current => [...current].sort());
  };

  const sortLength = () => {
    setGoods(current => [...current].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="box">
      <>
        <h1 className="title is-1">Goods</h1>
        {show && <GoodsList goods={goods} />}
        <button
          type="button"
          onClick={toggleList}
          className="button is-success is-light"
        >
          Start
        </button>

        <button
          type="button"
          onClick={revers}
          className="button is-info is-light"
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={sortAlpgabet}
          className="button is-info is-light"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortLength}
          className="button is-info is-light"
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reset}
          className="button is-danger is-light"
        >
          Reset
        </button>
      </>
    </div>
  );
};

export default App;
