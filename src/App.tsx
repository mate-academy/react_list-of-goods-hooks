import React, { useState } from 'react';
import './App.css';
import GoodsList from './GoodsList';

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
  const [isClicked, showGoodsList] = useState(false);
  const [products, transformGoodsList] = useState(copy);

  return (
    <div className="App">
      <h1>Goods</h1>

      <div className="Button">
        {!isClicked && (
          <button
            type="button"
            className="Button__show"
            onClick={() => showGoodsList(!isClicked)}
          >
            Start
          </button>
        )}

        <button
          type="button"
          className="Button__reverse"
          onClick={() => transformGoodsList(prevGoods => (
            [...prevGoods].reverse()
          ))}
        >
          Reverse
        </button>

        <button
          type="button"
          className="Button__alpha"
          onClick={() => transformGoodsList(prevGoods => (
            [...prevGoods].sort()
          ))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="Button__reset"
          onClick={() => transformGoodsList(copy)}
        >
          Reset
        </button>

        <button
          type="button"
          className="Button__length"
          onClick={() => transformGoodsList(prevGoods => (
            [...prevGoods].sort((a, b) => (
              a.length - b.length
            ))
          ))}
        >
          Sort by length
        </button>
      </div>

      {isClicked && <GoodsList products={products} />}
    </div>
  );
};

export default App;
