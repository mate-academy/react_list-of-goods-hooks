import React, { useState } from 'react';
import './App.css';
import GoodsList from './components/GoodsList';

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
  const copy = [...goodsFromServer];
  const [clickState, showList] = useState(false);
  const [products, transformList] = useState(copy);
  const showFunc = () => showList(!clickState);
  const reverseFunc = () => transformList(goods => (
    [...goods].reverse()
  ));
  const sortAlfFunc = () => transformList(goods => (
    [...goods].sort()
  ));
  const reset = () => transformList(copy);
  const sortLengthFunc = () => transformList(goosd => (
    [...goosd].sort((a, b) => (
      a.length - b.length
    ))
  ));

  return (
    <div className="App">
      <h1>Goods</h1>

      <div className="Button">
        {!clickState && (
          <button
            type="button"
            className="Button__show"
            onClick={showFunc}
          >
            Start
          </button>
        )}

        <button
          type="button"
          className="Button__reverse"
          onClick={reverseFunc}
        >
          Reverse
        </button>

        <button
          type="button"
          className="Button__alpha"
          onClick={sortAlfFunc}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="Button__reset"
          onClick={reset}
        >
          Reset
        </button>

        <button
          type="button"
          className="Button__length"
          onClick={sortLengthFunc}
        >
          Sort by length
        </button>
      </div>

      {clickState && <GoodsList products={products} />}
    </div>
  );
};

export default App;
