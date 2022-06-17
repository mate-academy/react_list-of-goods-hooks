import './App.css';
import React, { useState } from 'react';

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

enum GoodSort {
  none,
  name,
  length,
}

const App: React.FC = () => {
  let goods = [...goodsFromServer];
  const [visible, setVisible] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sorted, setSorted] = useState(GoodSort.none);

  switch (sorted) {
    case GoodSort.name:
      goods.sort((product1, product2) => (product1.localeCompare(product2)));
      break;

    case GoodSort.length:
      goods.sort((product1, product2) => (product1.length - product2.length));
      break;

    default:
      goods = [...goods];
  }

  if (reversed) {
    goods.reverse();
  }

  return (
    <div className="App">
      <div>
        <h1>Goods</h1>

        {!visible && (
          <button
            className="button"
            type="button"
            onClick={() => setVisible(true)}
          >
            Start
          </button>
        )}
      </div>

      {visible && (
        <div>
          <div>
            <button
              className="button"
              type="button"
              onClick={() => setReversed(!reversed)}
            >
              Reverse
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setSorted(GoodSort.name)}
            >
              Sort by name
            </button>

            <button
              className="button"
              type="button"
              onClick={() => {
                setReversed(false);
                setSorted(GoodSort.none);
              }}
            >
              Reset
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setSorted(GoodSort.length)}
            >
              Sort by length
            </button>
          </div>

          <div className="goods">
            <ul>
              {goods.map((product) => (
                <li>
                  {product}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
